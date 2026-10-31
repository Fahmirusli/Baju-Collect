import { describe, it, expect } from 'vitest'
import ExcelJS from 'exceljs'
import { buildOrdersExcel, type OrderWithItems } from '../server/utils/excel'
import type { SettingsRow, SizeRow, SleeveTypeRow } from '../server/utils/excel'

describe('Excel Export Builder', () => {
  const mockSettings: SettingsRow = {
    id: 1,
    eventTitle: 'Test Event 2026',
    eventDescription: 'Test Description',
    currency: 'MYR',
    basePrice: '35.00',
    deadline: new Date(),
    isOpen: true,
    sizeChartImage: null,
    updatedAt: new Date(),
  }

  const mockSizes: SizeRow[] = [
    { id: 1, label: 'S', surcharge: '0.00', sortOrder: 0, isActive: true },
    { id: 2, label: 'M', surcharge: '0.00', sortOrder: 1, isActive: true },
    { id: 3, label: 'L', surcharge: '0.00', sortOrder: 2, isActive: true },
    { id: 4, label: 'XL', surcharge: '0.00', sortOrder: 3, isActive: true },
    { id: 5, label: '2XL', surcharge: '2.00', sortOrder: 4, isActive: true },
  ]

  const mockSleeveTypes: SleeveTypeRow[] = [
    { id: 1, label: 'Short Sleeve', surcharge: '0.00', sortOrder: 0, isActive: true },
    { id: 2, label: 'Long Sleeve', surcharge: '5.00', sortOrder: 1, isActive: true },
    { id: 3, label: '3/4 Sleeve', surcharge: '3.00', sortOrder: 2, isActive: true },
    { id: 4, label: 'Sleeveless', surcharge: '0.00', sortOrder: 3, isActive: true },
  ]

  const mockOrders: OrderWithItems[] = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      code: 'SHIRT-AAA11',
      customerName: 'John Doe',
      contact: '+60123456789',
      notes: 'Notes 1',
      adminNotes: 'Admin 1',
      status: 'confirmed',
      paymentStatus: 'paid',
      amountPaid: '75.00',
      totalPrice: '75.00',
      totalQuantity: 2,
      ipHash: null,
      idempotencyKey: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        {
          id: 'item-1',
          orderId: '11111111-1111-1111-1111-111111111111',
          shirtName: 'JOHND',
          sizeLabel: 'M',
          sleeveLabel: 'Short Sleeve',
          quantity: 1,
          unitPrice: '35.00',
          lineTotal: '35.00',
        },
        {
          id: 'item-2',
          orderId: '11111111-1111-1111-1111-111111111111',
          shirtName: 'JOHND_L',
          sizeLabel: '2XL',
          sleeveLabel: 'Long Sleeve',
          quantity: 1,
          unitPrice: '42.00',
          lineTotal: '42.00',
        },
      ],
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      code: 'SHIRT-BBB22',
      customerName: 'Jane Smith',
      contact: 'jane@example.com',
      notes: '',
      adminNotes: '',
      status: 'pending',
      paymentStatus: 'unpaid',
      amountPaid: '0.00',
      totalPrice: '35.00',
      totalQuantity: 1,
      ipHash: null,
      idempotencyKey: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        {
          id: 'item-3',
          orderId: '22222222-2222-2222-2222-222222222222',
          shirtName: 'JANES',
          sizeLabel: 'S',
          sleeveLabel: 'Sleeveless',
          quantity: 1,
          unitPrice: '35.00',
          lineTotal: '35.00',
        },
      ],
    },
  ]

  it('generates a valid .xlsx workbook buffer with 4 expected worksheets', async () => {
    const buffer = await buildOrdersExcel(mockOrders, mockSettings, mockSizes, mockSleeveTypes)
    expect(buffer).toBeDefined()
    expect(buffer.length).toBeGreaterThan(0)

    // Load back with ExcelJS to inspect worksheets
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(buffer as any)

    const sheetNames = workbook.worksheets.map((s) => s.name)
    expect(sheetNames).toContain('Orders')
    expect(sheetNames).toContain('Summary by Size')
    expect(sheetNames).toContain('Size x Sleeve Matrix')
    expect(sheetNames).toContain('Production List')
    expect(sheetNames.length).toBe(4)
  })

  it('includes proper header formatting and data rows on Orders sheet', async () => {
    const buffer = await buildOrdersExcel(mockOrders, mockSettings, mockSizes, mockSleeveTypes)
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(buffer as any)

    const ordersSheet = workbook.getWorksheet('Orders')
    expect(ordersSheet).toBeDefined()

    // Row 1 is header
    const headerRow = ordersSheet!.getRow(1)
    expect(headerRow.getCell(1).value).toBe('Order Code')
    expect(headerRow.getCell(2).value).toBe('Customer Name')

    // 3 items across 2 orders => 3 data rows (rows 2, 3, 4)
    expect(ordersSheet!.rowCount).toBeGreaterThanOrEqual(4)
  })

  it('includes Excel SUM formulas on the Size x Sleeve Matrix sheet', async () => {
    const buffer = await buildOrdersExcel(mockOrders, mockSettings, mockSizes, mockSleeveTypes)
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(buffer as any)

    const matrixSheet = workbook.getWorksheet('Size x Sleeve Matrix')
    expect(matrixSheet).toBeDefined()

    // Find the total row and total column formulas
    let hasFormula = false
    matrixSheet!.eachRow((row) => {
      row.eachCell((cell) => {
        if (cell.formula || (typeof cell.value === 'object' && cell.value !== null && 'formula' in cell.value)) {
          hasFormula = true
        }
      })
    })

    expect(hasFormula).toBe(true)
  })
})

