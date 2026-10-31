import { d as defineEventHandler, r as requireAdminSession, k as readBody, h as createError, v as verifyPassword, D as hashPassword, n as useRuntimeConfig } from '../../../_/nitro.mjs';
import { d as changePasswordSchema } from '../../../_/schemas.mjs';
import 'bcryptjs';
import '@neondatabase/serverless';
import 'drizzle-orm/neon-http';
import 'exceljs';
import 'drizzle-orm';
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

const password_put = defineEventHandler(async (event) => {
  await requireAdminSession(event);
  const body = await readBody(event);
  const parsed = changePasswordSchema.safeParse(body);
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid password payload",
      data: { errors: parsed.error.flatten().fieldErrors }
    });
  }
  const config = useRuntimeConfig();
  const currentHash = config.adminPasswordHash || process.env.NUXT_ADMIN_PASSWORD_HASH;
  if (!currentHash) {
    throw createError({
      statusCode: 500,
      message: "Admin password hash not configured in environment"
    });
  }
  const isValid = await verifyPassword(parsed.data.currentPassword, currentHash);
  if (!isValid) {
    throw createError({
      statusCode: 401,
      message: "Current password does not match"
    });
  }
  const newHash = await hashPassword(parsed.data.newPassword);
  return {
    success: true,
    newHash,
    message: "Password hashed successfully. Update NUXT_ADMIN_PASSWORD_HASH in your .env or Vercel dashboard."
  };
});

export { password_put as default };
//# sourceMappingURL=password.put.mjs.map
