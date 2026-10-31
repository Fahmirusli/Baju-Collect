import { d as defineEventHandler, h as createError, n as useRuntimeConfig } from '../../../_/nitro.mjs';
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

const hello_get = defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const functionUrl = config.neonFunctionHelloBaseUrl || process.env.NEON_FUNCTION_HELLO_BASE_URL;
  if (!functionUrl) {
    throw createError({
      statusCode: 500,
      message: "NEON_FUNCTION_HELLO_BASE_URL is not configured"
    });
  }
  try {
    const res = await fetch(functionUrl);
    const text = await res.text();
    return {
      success: true,
      service: "Neon Functions",
      url: functionUrl,
      response: text
    };
  } catch (error) {
    throw createError({
      statusCode: 502,
      message: `Failed to contact Neon Function: ${error.message}`
    });
  }
});

export { hello_get as default };
//# sourceMappingURL=hello.get.mjs.map
