import { d as defineEventHandler, a as useDb, E as uploadObjectToBucket, F as getObjectFromBucket, G as listBucketObjects } from '../../../_/nitro.mjs';
import { sql } from 'drizzle-orm';
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

const health_get = defineEventHandler(async () => {
  var _a, _b, _c, _d, _e;
  const results = {};
  try {
    const db = useDb();
    const dbTest = await db.execute(sql`SELECT current_database(), current_user, version(), count(*) as table_count FROM information_schema.tables WHERE table_schema = 'public';`);
    const settingsCount = await db.execute(sql`SELECT count(*) as count FROM settings;`);
    const ordersCount = await db.execute(sql`SELECT count(*) as count FROM orders;`);
    results.postgres = {
      status: "healthy",
      database: (_a = dbTest.rows[0]) == null ? void 0 : _a.current_database,
      user: (_b = dbTest.rows[0]) == null ? void 0 : _b.current_user,
      publicTables: Number(((_c = dbTest.rows[0]) == null ? void 0 : _c.table_count) || 0),
      settingsRows: Number(((_d = settingsCount.rows[0]) == null ? void 0 : _d.count) || 0),
      ordersRows: Number(((_e = ordersCount.rows[0]) == null ? void 0 : _e.count) || 0)
    };
  } catch (err) {
    results.postgres = { status: "error", message: err.message };
  }
  try {
    const functionUrl = process.env.NEON_FUNCTION_HELLO_BASE_URL;
    if (functionUrl) {
      const res = await fetch(functionUrl);
      const text = await res.text();
      results.functions = {
        status: "healthy",
        url: functionUrl,
        response: text.trim()
      };
    } else {
      results.functions = { status: "unconfigured" };
    }
  } catch (err) {
    results.functions = { status: "error", message: err.message };
  }
  try {
    const testKey = `test/health-check-${Date.now()}.txt`;
    const testContent = `Neon Object Storage Health Check at ${(/* @__PURE__ */ new Date()).toISOString()}`;
    await uploadObjectToBucket(testKey, testContent, "text/plain");
    const fetched = await getObjectFromBucket(testKey);
    const readContent = fetched.data ? fetched.data.toString("utf-8") : null;
    const objects = await listBucketObjects();
    results.objectStorage = {
      status: "healthy",
      bucket: process.env.NEON_OBJECT_STORAGE_BUCKET || "assets",
      testKey,
      verifiedWriteRead: readContent === testContent,
      totalObjectsInBucket: objects.length
    };
  } catch (err) {
    results.objectStorage = { status: "error", message: err.message };
  }
  try {
    const rtUrl = process.env.NEON_REALTIME_URL;
    const rtSecret = process.env.NEON_REALTIME_SECRET;
    results.realtime = {
      status: rtUrl && rtSecret ? "configured" : "unconfigured",
      url: rtUrl,
      hasSecret: Boolean(rtSecret)
    };
  } catch (err) {
    results.realtime = { status: "error", message: err.message };
  }
  return {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    branch: process.env.NEON_BRANCH || "production",
    services: results
  };
});

export { health_get as default };
//# sourceMappingURL=health.get.mjs.map
