import { d as defineEventHandler, r as requireAdminSession, k as readBody, h as createError, a as useDb, o as orders } from '../../../../_/nitro.mjs';
import { sql, inArray } from 'drizzle-orm';
import { b as bulkActionSchema } from '../../../../_/schemas.mjs';
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

const bulk_post = defineEventHandler(async (event) => {
  await requireAdminSession(event);
  const body = await readBody(event);
  const parsed = bulkActionSchema.safeParse(body);
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid bulk action payload",
      data: { errors: parsed.error.flatten().fieldErrors }
    });
  }
  const { ids, action, value } = parsed.data;
  const db = useDb();
  try {
    if (action === "set_status") {
      if (!value) {
        throw createError({ statusCode: 400, message: "Status value is required" });
      }
      await db.update(orders).set({ status: value, updatedAt: sql`now()` }).where(inArray(orders.id, ids));
      return { success: true, affected: ids.length };
    }
    if (action === "set_payment_status") {
      if (!value) {
        throw createError({ statusCode: 400, message: "Payment status value is required" });
      }
      await db.update(orders).set({ paymentStatus: value, updatedAt: sql`now()` }).where(inArray(orders.id, ids));
      return { success: true, affected: ids.length };
    }
    if (action === "delete") {
      await db.delete(orders).where(inArray(orders.id, ids));
      return { success: true, affected: ids.length };
    }
    throw createError({ statusCode: 400, message: "Unknown action" });
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "Failed to perform bulk action"
    });
  }
});

export { bulk_post as default };
//# sourceMappingURL=bulk.post.mjs.map
