import { d as defineEventHandler, a as useDb, k as readBody, h as createError, l as getRequestIP, m as checkRateLimit, n as useRuntimeConfig, v as verifyPassword, q as setUserSession } from '../../../_/nitro.mjs';
import { createHash } from 'node:crypto';
import { a as adminLoginSchema } from '../../../_/schemas.mjs';
import 'bcryptjs';
import '@neondatabase/serverless';
import 'drizzle-orm/neon-http';
import 'exceljs';
import 'drizzle-orm';
import 'drizzle-orm/pg-core';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'consola';
import 'node:fs';
import 'node:path';
import 'zod';

function hashIp(ip) {
  return createHash("sha256").update(ip).digest("hex");
}
const login_post = defineEventHandler(async (event) => {
  const db = useDb();
  try {
    const body = await readBody(event);
    const parsed = adminLoginSchema.safeParse(body);
    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        message: "Validation failed",
        data: { errors: parsed.error.flatten().fieldErrors }
      });
    }
    const { username, password } = parsed.data;
    const clientIp = getRequestIP(event, { xForwardedFor: true }) || "127.0.0.1";
    const ipHash = hashIp(clientIp);
    await checkRateLimit(db, {
      key: `login:${ipHash}`,
      maxAttempts: 5,
      windowMinutes: 15,
      errorMessage: "Too many login attempts. Please try again later."
    });
    const config = useRuntimeConfig();
    const adminUsername = config.adminUsername;
    const adminPasswordHash = config.adminPasswordHash;
    if (!adminUsername || !adminPasswordHash) {
      console.error("Admin credentials not configured in environment");
      throw createError({
        statusCode: 500,
        message: "Server configuration error"
      });
    }
    if (username !== adminUsername) {
      throw createError({
        statusCode: 401,
        message: "Invalid username or password"
      });
    }
    const passwordValid = await verifyPassword(password, adminPasswordHash);
    if (!passwordValid) {
      throw createError({
        statusCode: 401,
        message: "Invalid username or password"
      });
    }
    await setUserSession(event, {
      user: {
        role: "admin",
        username
      }
    });
    return { success: true };
  } catch (error) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error("Login error:", error);
    throw createError({
      statusCode: 500,
      message: "Login failed"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
