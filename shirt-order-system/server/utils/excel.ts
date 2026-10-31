import ExcelJS from 'exceljs';
import type { Order, OrderItem, Settings, Size, SleeveType } from '../database/schema';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export type SettingsRow = Settings;
export type SizeRow = Size;
export type SleeveTypeRow = SleeveType;

// ─── Styling Constants ───────────────────────────────────────────────────────

const HEADER_FILL: ExcelJS.Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FF4F46E5' }, // Indigo
};

const HEADER_FONT: Partial<ExcelJS.Font> = {
  bold: true,
  color: { argb: 'FFFFFFFF' },
  size: 11,
};

const ZEBRA_FILL: ExcelJS.Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFF3F4F6' }, // Light gray
};

const BORDER_STYLE: Partial<ExcelJS.Borders> = {
  top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
  bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
  left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
  right: { style: 'thin', color: { argb: 'FFE5E7EB' } },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function styleHeaderRow(sheet: ExcelJS.Worksheet): void {
  const headerRow = sheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = BORDER_STYLE;
  });
  headerRow.height = 28;
}

function freezeTopRow(sheet: ExcelJS.Worksheet): void {
  sheet.views = [{ state: 'frozen', ySplit: 1 }];
}

function applyZebraRows(sheet: ExcelJS.Worksheet, startRow: number, endRow: number): void {
  for (let r = startRow; r <= endRow; r++) {
    const row = sheet.getRow(r);
    if (r % 2 === 0) {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.fill = ZEBRA_FILL;
      });
    }
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = BORDER_STYLE;
      cell.alignment = { vertical: 'middle', wrapText: true };
    });
  }
}

function autoColumnWidths(sheet: ExcelJS.Worksheet): void {
  sheet.columns.forEach((column) => {
    if (!column || !column.eachCell) return;
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const cellValue = cell.value ? cell.value.toString() : '';
      maxLength = Math.max(maxLength, cellValue.length + 2);
    });
    column.width = Math.min(maxLength, 40);
  });
}

function getCurrencyFormat(currency: string): string {
  const symbolMap: Record<string, string> = {
    MYR: '"RM"#,##0.00',
    USD: '"$"#,##0.00',
    EUR: '"€"#,##0.00',
    GBP: '"£"#,##0.00',
    SGD: '"S$"#,##0.00',
    JPY: '"¥"#,##0',
  };
  return symbolMap[currency] || `"${currency} "#,##0.00`;
}

function colLetter(colIndex: number): string {
  let result = '';
  let idx = colIndex;
  while (idx > 0) {
    idx--;
    result = String.fromCharCode(65 + (idx % 26)) + result;
    idx = Math.floor(idx / 26);
  }
  return result;
}

// ─── Main Export Function ────────────────────────────────────────────────────

export async function buildOrdersExcel(
  orders: OrderWithItems[],
  settings: SettingsRow,
  sizes: SizeRow[],
  sleeveTypes: SleeveTypeRow[]
): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Shirt Order System';
  workbook.created = new Date();

  const currencyFmt = getCurrencyFormat(settings.currency);

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 1: Orders (one row per shirt line)
  // ═══════════════════════════════════════════════════════════════════════════
  const ordersSheet = workbook.addWorksheet('Orders');
  ordersSheet.columns = [
    { header: 'Order Code', key: 'orderCode', width: 16 },
    { header: 'Customer Name', key: 'customerName', width: 22 },
    { header: 'Contact', key: 'contact', width: 20 },
    { header: 'Name on Shirt', key: 'shirtName', width: 22 },
    { header: 'Size', key: 'size', width: 10 },
    { header: 'Sleeve Type', key: 'sleeveType', width: 16 },
    { header: 'Quantity', key: 'quantity', width: 10 },
    { header: 'Unit Price', key: 'unitPrice', width: 14 },
    { header: 'Line Total', key: 'lineTotal', width: 14 },
    { header: 'Order Status', key: 'orderStatus', width: 16 },
    { header: 'Payment Status', key: 'paymentStatus', width: 16 },
    { header: 'Order Date', key: 'orderDate', width: 20 },
    { header: 'Notes', key: 'notes', width: 30 },
  ];

  let ordersRowCount = 1; // header
  for (const order of orders) {
    for (const item of order.items) {
      ordersSheet.addRow({
        orderCode: order.code,
        customerName: order.customerName,
        contact: order.contact,
        shirtName: item.shirtName,
        size: item.sizeLabel,
        sleeveType: item.sleeveLabel,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        lineTotal: Number(item.lineTotal),
        orderStatus: order.status,
        paymentStatus: order.paymentStatus,
        orderDate: order.createdAt,
        notes: order.notes || '',
      });
      ordersRowCount++;
    }
  }

  // Format currency columns
  ordersSheet.getColumn('unitPrice').numFmt = currencyFmt;
  ordersSheet.getColumn('lineTotal').numFmt = currencyFmt;
  ordersSheet.getColumn('orderDate').numFmt = 'yyyy-mm-dd hh:mm';

  styleHeaderRow(ordersSheet);
  freezeTopRow(ordersSheet);
  ordersSheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: ordersRowCount, column: 13 },
  };
  applyZebraRows(ordersSheet, 2, ordersRowCount);
  autoColumnWidths(ordersSheet);

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 2: Summary by Size
  // ═══════════════════════════════════════════════════════════════════════════
  const summarySheet = workbook.addWorksheet('Summary by Size');
  summarySheet.columns = [
    { header: 'Size', key: 'size', width: 16 },
    { header: 'Total Quantity', key: 'totalQuantity', width: 18 },
    { header: 'Total Revenue', key: 'totalRevenue', width: 18 },
  ];

  // Aggregate by size
  const sizeMap = new Map<string, { qty: number; revenue: number }>();
  for (const order of orders) {
    for (const item of order.items) {
      const existing = sizeMap.get(item.sizeLabel) || { qty: 0, revenue: 0 };
      existing.qty += item.quantity;
      existing.revenue += Number(item.lineTotal);
      sizeMap.set(item.sizeLabel, existing);
    }
  }

  // Sort by sizes table sort order
  const sizeOrder = new Map(sizes.map((s) => [s.label, s.sortOrder]));
  const sortedSizeLabels = [...sizeMap.keys()].sort(
    (a, b) => (sizeOrder.get(a) ?? 999) - (sizeOrder.get(b) ?? 999)
  );

  let summaryRowCount = 1;
  for (const label of sortedSizeLabels) {
    const data = sizeMap.get(label)!;
    summarySheet.addRow({
      size: label,
      totalQuantity: data.qty,
      totalRevenue: Math.round(data.revenue * 100) / 100,
    });
    summaryRowCount++;
  }

  // Grand total row with SUM formulas
  const grandTotalRow = summaryRowCount + 1;
  const totalRow = summarySheet.addRow({ size: 'GRAND TOTAL' });
  totalRow.getCell('totalQuantity').value = {
    formula: `SUM(B2:B${summaryRowCount})`,
  } as ExcelJS.CellFormulaValue;
  totalRow.getCell('totalRevenue').value = {
    formula: `SUM(C2:C${summaryRowCount})`,
  } as ExcelJS.CellFormulaValue;
  totalRow.font = { bold: true, size: 11 };
  summaryRowCount++;

  summarySheet.getColumn('totalRevenue').numFmt = currencyFmt;

  styleHeaderRow(summarySheet);
  freezeTopRow(summarySheet);
  applyZebraRows(summarySheet, 2, summaryRowCount);
  autoColumnWidths(summarySheet);

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 3: Size x Sleeve Matrix
  // ═══════════════════════════════════════════════════════════════════════════
  const matrixSheet = workbook.addWorksheet('Size x Sleeve Matrix');

  const activeSleeves = sleeveTypes
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const activeSizes = sizes
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Build header: Size | SleeveType1 | SleeveType2 | ... | Row Total
  const matrixHeaders = ['Size', ...activeSleeves.map((s) => s.label), 'Row Total'];
  matrixSheet.addRow(matrixHeaders);

  // Build a quantity lookup: sizeLabel -> sleeveLabel -> quantity
  const matrixData = new Map<string, Map<string, number>>();
  for (const order of orders) {
    for (const item of order.items) {
      if (!matrixData.has(item.sizeLabel)) {
        matrixData.set(item.sizeLabel, new Map());
      }
      const sleeveMap = matrixData.get(item.sizeLabel)!;
      sleeveMap.set(item.sleeveLabel, (sleeveMap.get(item.sleeveLabel) || 0) + item.quantity);
    }
  }

  let matrixRowIdx = 1; // row 1 is header
  for (const size of activeSizes) {
    matrixRowIdx++;
    const rowData: (string | number | ExcelJS.CellFormulaValue)[] = [size.label];
    for (const sleeve of activeSleeves) {
      const qty = matrixData.get(size.label)?.get(sleeve.label) || 0;
      rowData.push(qty);
    }
    // Row total formula: SUM of sleeve columns for this row
    const firstCol = colLetter(2);
    const lastCol = colLetter(1 + activeSleeves.length);
    rowData.push({ formula: `SUM(${firstCol}${matrixRowIdx}:${lastCol}${matrixRowIdx})` } as unknown as number);
    matrixSheet.addRow(rowData);
  }

  // Column totals row
  matrixRowIdx++;
  const colTotalRowData: (string | number | ExcelJS.CellFormulaValue)[] = ['Column Total'];
  const dataStartRow = 2;
  const dataEndRow = matrixRowIdx - 1;
  for (let c = 2; c <= 1 + activeSleeves.length; c++) {
    const col = colLetter(c);
    colTotalRowData.push({ formula: `SUM(${col}${dataStartRow}:${col}${dataEndRow})` } as unknown as number);
  }
  // Grand total: sum of all row totals
  const rowTotalCol = colLetter(2 + activeSleeves.length);
  colTotalRowData.push({ formula: `SUM(${rowTotalCol}${dataStartRow}:${rowTotalCol}${dataEndRow})` } as unknown as number);
  const colTotalRow = matrixSheet.addRow(colTotalRowData);
  colTotalRow.font = { bold: true };

  styleHeaderRow(matrixSheet);
  freezeTopRow(matrixSheet);
  applyZebraRows(matrixSheet, 2, matrixRowIdx);
  autoColumnWidths(matrixSheet);

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 4: Production List
  // ═══════════════════════════════════════════════════════════════════════════
  const prodSheet = workbook.addWorksheet('Production List');
  prodSheet.columns = [
    { header: 'Sleeve Type', key: 'sleeveType', width: 18 },
    { header: 'Size', key: 'size', width: 14 },
    { header: 'Name on Shirt', key: 'shirtName', width: 26 },
    { header: 'Quantity', key: 'quantity', width: 12 },
  ];

  // Group all items by sleeve type, then by size
  interface ProdItem {
    shirtName: string;
    quantity: number;
  }
  const prodGroups = new Map<string, Map<string, ProdItem[]>>();
  for (const order of orders) {
    for (const item of order.items) {
      if (!prodGroups.has(item.sleeveLabel)) {
        prodGroups.set(item.sleeveLabel, new Map());
      }
      const sizeGroup = prodGroups.get(item.sleeveLabel)!;
      if (!sizeGroup.has(item.sizeLabel)) {
        sizeGroup.set(item.sizeLabel, []);
      }
      sizeGroup.get(item.sizeLabel)!.push({
        shirtName: item.shirtName,
        quantity: item.quantity,
      });
    }
  }

  // Sort sleeve types by sort order
  const sleeveOrderMap = new Map(sleeveTypes.map((s) => [s.label, s.sortOrder]));
  const sortedSleeveLabels = [...prodGroups.keys()].sort(
    (a, b) => (sleeveOrderMap.get(a) ?? 999) - (sleeveOrderMap.get(b) ?? 999)
  );

  let prodRowIdx = 1; // header row
  const mergeRanges: { startRow: number; endRow: number; col: number }[] = [];

  for (const sleeveLabel of sortedSleeveLabels) {
    const sizeGroup = prodGroups.get(sleeveLabel)!;
    const sortedProdSizes = [...sizeGroup.keys()].sort(
      (a, b) => (sizeOrder.get(a) ?? 999) - (sizeOrder.get(b) ?? 999)
    );

    const sleeveStartRow = prodRowIdx + 1;

    for (const sizeLabel of sortedProdSizes) {
      const items = sizeGroup.get(sizeLabel)!;
      // Sort items by shirt name
      items.sort((a, b) => a.shirtName.localeCompare(b.shirtName));

      for (const item of items) {
        prodRowIdx++;
        prodSheet.addRow({
          sleeveType: sleeveLabel,
          size: sizeLabel,
          shirtName: item.shirtName,
          quantity: item.quantity,
        });
      }
    }

    const sleeveEndRow = prodRowIdx;
    if (sleeveEndRow > sleeveStartRow) {
      mergeRanges.push({ startRow: sleeveStartRow, endRow: sleeveEndRow, col: 1 });
    }
  }

  // Apply merge ranges for sleeve type column
  for (const range of mergeRanges) {
    try {
      prodSheet.mergeCells(range.startRow, range.col, range.endRow, range.col);
      const mergedCell = prodSheet.getCell(range.startRow, range.col);
      mergedCell.font = { bold: true, size: 11 };
      mergedCell.alignment = { vertical: 'middle', horizontal: 'center' };
    } catch {
      // Skip if merge fails (e.g., single row)
    }
  }

  styleHeaderRow(prodSheet);
  freezeTopRow(prodSheet);
  applyZebraRows(prodSheet, 2, prodRowIdx);
  autoColumnWidths(prodSheet);

  // ═══════════════════════════════════════════════════════════════════════════
  // Write to Buffer
  // ═══════════════════════════════════════════════════════════════════════════
  const arrayBuffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer);
}
