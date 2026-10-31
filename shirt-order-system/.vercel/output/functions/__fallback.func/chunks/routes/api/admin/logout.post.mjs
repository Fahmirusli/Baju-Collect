import { d as defineEventHandler, x as clearUserSession } from '../../../_/nitro.mjs';
import 'bcryptjs';
import '@neondatabase/serverless';
import 'drizzle-orm/neon-http';
import 'exceljs';
import 'drizzle-orm';
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

const logout_post = defineEventHandler(async (event) => {
  await clearUserSession(event);
  return { success: true };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
