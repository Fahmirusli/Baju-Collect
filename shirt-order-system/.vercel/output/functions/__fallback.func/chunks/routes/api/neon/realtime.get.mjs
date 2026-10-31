import { d as defineEventHandler } from '../../../_/nitro.mjs';
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

const realtime_get = defineEventHandler(async () => {
  const realtimeUrl = process.env.NEON_REALTIME_URL;
  const hasSecret = Boolean(process.env.NEON_REALTIME_SECRET);
  return {
    success: true,
    service: "Neon Realtime",
    url: realtimeUrl,
    hasSecret,
    status: realtimeUrl && hasSecret ? "ready" : "unconfigured"
  };
});

export { realtime_get as default };
//# sourceMappingURL=realtime.get.mjs.map
