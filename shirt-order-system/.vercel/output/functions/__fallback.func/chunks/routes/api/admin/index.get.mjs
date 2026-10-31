import { d as defineEventHandler, r as requireAdminSession, a as useDb, b as getQuery, h as createError, o as orders, c as orderItems } from '../../../_/nitro.mjs';
import { or, ilike, eq, gte, lte, sql, and, asc, desc } from 'drizzle-orm';
import { o as ordersQuerySchema } from '../../../_/schemas.mjs';
import 'bcryptjs';
import '@neondatabase/serverless';
import 'drizzle-orm/neon-http';
import 'exceljs';
import 'drizzle-orm/pg-core';
import '@aws-sdk/client-s3';
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

const index_get = defineEventHandler(async (event) => {
  var _a;
  await requireAdminSession(event);
  const db = useDb();
  try {
    const rawQuery = getQuery(event);
    const parsed = ordersQuerySchema.safeParse(rawQuery);
    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        message: "Invalid query parameters",
        data: { errors: parsed.error.flatten().fieldErrors }
      });
    }
    const { page, limit, search, status, paymentStatus, size, sleeve, dateFrom, dateTo, sortBy, sortDir } = parsed.data;
    const offset = (page - 1) * limit;
    const conditions = [];
    if (search) {
      const searchPattern = `%${search}%`;
      conditions.push(
        or(
          ilike(orders.customerName, searchPattern),
          ilike(orders.contact, searchPattern),
          ilike(orders.code, searchPattern)
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
    if (size) {
      conditions.push(
        sql`EXISTS (
          SELECT 1 FROM ${orderItems}
          WHERE ${orderItems.orderId} = ${orders.id}
          AND ${orderItems.sizeLabel} = ${size}
        )`
      );
    }
    if (sleeve) {
      conditions.push(
        sql`EXISTS (
          SELECT 1 FROM ${orderItems}
          WHERE ${orderItems.orderId} = ${orders.id}
          AND ${orderItems.sleeveLabel} = ${sleeve}
        )`
      );
    }
    const whereClause = conditions.length > 0 ? and(...conditions) : void 0;
    const sortColumn = (() => {
      switch (sortBy) {
        case "created_at":
          return orders.createdAt;
        case "total_price":
          return orders.totalPrice;
        case "customer_name":
          return orders.customerName;
        case "code":
          return orders.code;
        default:
          return orders.createdAt;
      }
    })();
    const sortOrder = sortDir === "asc" ? asc(sortColumn) : desc(sortColumn);
    const [countResult] = await db.select({ value: sql`cast(count(*) as int)` }).from(orders).where(whereClause);
    const total = (_a = countResult == null ? void 0 : countResult.value) != null ? _a : 0;
    const orderRows = await db.select({
      id: orders.id,
      code: orders.code,
      customerName: orders.customerName,
      contact: orders.contact,
      totalQuantity: orders.totalQuantity,
      totalPrice: orders.totalPrice,
      status: orders.status,
      paymentStatus: orders.paymentStatus,
      createdAt: orders.createdAt
    }).from(orders).where(whereClause).orderBy(sortOrder).limit(limit).offset(offset);
    const data = await Promise.all(
      orderRows.map(async (order) => {
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
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error("Failed to fetch orders:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch orders"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
