import { d as defineEventHandler, r as requireAdminSession, a as useDb, b as getQuery, o as orders, c as orderItems, s as settings, e as sizes, f as sleeveTypes, h as createError, i as buildOrdersExcel, j as setResponseHeaders } from '../../../_/nitro.mjs';
import { or, ilike, eq, gte, lte, and, desc } from 'drizzle-orm';
import { o as ordersQuerySchema } from '../../../_/schemas.mjs';
import 'bcryptjs';
import '@neondatabase/serverless';
import 'drizzle-orm/neon-http';
import 'exceljs';
import 'drizzle-orm/pg-core';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'consola';
import 'node:fs';
import 'node:path';
import 'zod';

const export_get = defineEventHandler(async (event) => {
  await requireAdminSession(event);
  const db = useDb();
  try {
    const rawQuery = getQuery(event);
    const parsed = ordersQuerySchema.safeParse(rawQuery);
    const conditions = [];
    if (parsed.success) {
      const { search, status, paymentStatus, dateFrom, dateTo } = parsed.data;
      if (search) {
        const pattern = `%${search}%`;
        conditions.push(
          or(
            ilike(orders.customerName, pattern),
            ilike(orders.contact, pattern),
            ilike(orders.code, pattern)
          )
        );
      }
      if (status) {
        conditions.push(eq(orders.status, status));
      }
      if (paymentStatus) {
        conditions.push(eq(orders.paymentStatus, paymentStatus));
      }
      if (dateFrom) {
        conditions.push(gte(orders.createdAt, new Date(dateFrom)));
      }
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);
        conditions.push(lte(orders.createdAt, endDate));
      }
    }
    const orderRows = conditions.length > 0 ? await db.select().from(orders).where(and(...conditions)).orderBy(desc(orders.createdAt)) : await db.select().from(orders).orderBy(desc(orders.createdAt));
    const allItems = await db.select().from(orderItems);
    const itemsByOrderId = /* @__PURE__ */ new Map();
    for (const item of allItems) {
      const list = itemsByOrderId.get(item.orderId) || [];
      list.push(item);
      itemsByOrderId.set(item.orderId, list);
    }
    let filteredOrders = orderRows.map((o) => ({
      ...o,
      items: itemsByOrderId.get(o.id) || []
    }));
    if (parsed.success) {
      if (parsed.data.size) {
        filteredOrders = filteredOrders.filter(
          (o) => o.items.some((item) => item.sizeLabel === parsed.data.size)
        );
      }
      if (parsed.data.sleeve) {
        filteredOrders = filteredOrders.filter(
          (o) => o.items.some((item) => item.sleeveLabel === parsed.data.sleeve)
        );
      }
    }
    const [settingsRow] = await db.select().from(settings).limit(1);
    const sizesList = await db.select().from(sizes).orderBy(sizes.sortOrder);
    const sleeveTypesList = await db.select().from(sleeveTypes).orderBy(sleeveTypes.sortOrder);
    if (!settingsRow) {
      throw createError({ statusCode: 500, message: "Settings not initialized" });
    }
    const buffer = await buildOrdersExcel(filteredOrders, settingsRow, sizesList, sleeveTypesList);
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    setResponseHeaders(event, {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="shirt-orders-${today}.xlsx"`,
      "Cache-Control": "no-cache, no-store, must-revalidate"
    });
    return buffer;
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Export error:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to generate Excel export"
    });
  }
});

export { export_get as default };
//# sourceMappingURL=export.get.mjs.map
