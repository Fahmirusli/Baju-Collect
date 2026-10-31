import { d as defineEventHandler, r as requireAdminSession } from '../../../_/nitro.mjs';
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

const me_get = defineEventHandler(async (event) => {
  const session = await requireAdminSession(event);
  return {
    user: session.user
  };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
