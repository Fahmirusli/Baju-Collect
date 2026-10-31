import { d as defineEventHandler, G as listBucketObjects, h as createError } from '../../../_/nitro.mjs';
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

const storage_get = defineEventHandler(async () => {
  try {
    const bucket = process.env.NEON_OBJECT_STORAGE_BUCKET || "assets";
    const objects = await listBucketObjects(bucket);
    return {
      success: true,
      service: "Neon Object Storage",
      bucket,
      count: objects.length,
      objects: objects.map((o) => ({
        key: o.Key,
        size: o.Size,
        lastModified: o.LastModified
      }))
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Neon Object Storage error: ${error.message}`
    });
  }
});

export { storage_get as default };
//# sourceMappingURL=storage.get.mjs.map
