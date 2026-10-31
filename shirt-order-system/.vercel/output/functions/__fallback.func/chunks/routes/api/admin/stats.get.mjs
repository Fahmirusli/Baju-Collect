import { d as defineEventHandler, r as requireAdminSession, a as useDb, o as orders, c as orderItems, h as createError } from '../../../_/nitro.mjs';
import { sql, desc, eq } from 'drizzle-orm';
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

const stats_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  await requireAdminSession(event);
  const db = useDb();
  try {
    const [orderCountResult] = await db.select({ value: sql`cast(count(*) as int)` }).from(orders);
    const totalOrders = (_a = orderCountResult == null ? void 0 : orderCountResult.value) != null ? _a : 0;
    const [shirtsResult] = await db.select({ value: sql`cast(coalesce(sum(${orders.totalQuantity}), 0) as int)` }).from(orders);
    const totalShirts = (_b = shirtsResult == null ? void 0 : shirtsResult.value) != null ? _b : 0;
    const [revenueResult] = await db.select({ value: sql`cast(coalesce(sum(cast(${orders.totalPrice} as numeric)), 0) as float)` }).from(orders);
    const totalRevenue = (_c = revenueResult == null ? void 0 : revenueResult.value) != null ? _c : 0;
    const [paidResult] = await db.select({ value: sql`cast(coalesce(sum(cast(${orders.amountPaid} as numeric)), 0) as float)` }).from(orders);
    const paidAmount = (_d = paidResult == null ? void 0 : paidResult.value) != null ? _d : 0;
    const unpaidAmount = totalRevenue - paidAmount;
    const shirtsBySizeRows = await db.select({
      label: orderItems.sizeLabel,
      count: sql`cast(sum(${orderItems.quantity}) as int)`
    }).from(orderItems).groupBy(orderItems.sizeLabel).orderBy(desc(sql`sum(${orderItems.quantity})`));
    const shirtsBySize = shirtsBySizeRows.map((row) => ({
      label: row.label,
      count: row.count
    }));
    const shirtsBySleeveRows = await db.select({
      label: orderItems.sleeveLabel,
      count: sql`cast(sum(${orderItems.quantity}) as int)`
    }).from(orderItems).groupBy(orderItems.sleeveLabel).orderBy(desc(sql`sum(${orderItems.quantity})`));
    const shirtsBySleeve = shirtsBySleeveRows.map((row) => ({
      label: row.label,
      count: row.count
    }));
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const ordersByDayRows = await db.select({
      date: sql`to_char(${orders.createdAt}::date, 'YYYY-MM-DD')`,
      count: sql`cast(count(*) as int)`
    }).from(orders).where(sql`${orders.createdAt} >= ${thirtyDaysAgo.toISOString()}`).groupBy(sql`${orders.createdAt}::date`).orderBy(sql`${orders.createdAt}::date`);
    const ordersByDay = ordersByDayRows.map((row) => ({
      date: row.date,
      count: row.count
    }));
    const recentOrderRows = await db.select({
      id: orders.id,
      code: orders.code,
      customerName: orders.customerName,
      contact: orders.contact,
      totalQuantity: orders.totalQuantity,
      totalPrice: orders.totalPrice,
      status: orders.status,
      paymentStatus: orders.paymentStatus,
      createdAt: orders.createdAt
    }).from(orders).orderBy(desc(orders.createdAt)).limit(8);
    const recentOrders = await Promise.all(
      recentOrderRows.map(async (order) => {
        var _a2;
        const [itemCountResult] = await db.select({ value: sql`cast(count(*) as int)` }).from(orderItems).where(eq(orderItems.orderId, order.id));
        return {
          id: order.id,
          code: order.code,
          customerName: order.customerName,
          contact: order.contact,
          itemsCount: (_a2 = itemCountResult == null ? void 0 : itemCountResult.value) != null ? _a2 : 0,
          totalQuantity: order.totalQuantity,
          totalPrice: Number(order.totalPrice),
          status: order.status,
          paymentStatus: order.paymentStatus,
          createdAt: order.createdAt.toISOString()
        };
      })
    );
    return {
      totalOrders,
      totalShirts,
      totalRevenue,
      paidAmount,
      unpaidAmount,
      shirtsBySize,
      shirtsBySleeve,
      ordersByDay,
      recentOrders
    };
  } catch (error) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error("Failed to fetch stats:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch dashboard statistics"
    });
  }
});

export { stats_get as default };
//# sourceMappingURL=stats.get.mjs.map
