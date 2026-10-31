import { d as defineEventHandler, r as requireAdminSession, h as createError, a as useDb, o as orders } from '../../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
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

const _id__delete = defineEventHandler(async (event) => {
  var _a;
  await requireAdminSession(event);
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Order ID is required"
    });
  }
  const db = useDb();
  try {
    const existing = await db.select({ id: orders.id }).from(orders).where(eq(orders.id, id)).limit(1);
    if (existing.length === 0) {
      throw createError({
        statusCode: 404,
        message: "Order not found"
      });
    }
    await db.delete(orders).where(eq(orders.id, id));
    return { success: true, message: "Order deleted successfully" };
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "Failed to delete order"
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
