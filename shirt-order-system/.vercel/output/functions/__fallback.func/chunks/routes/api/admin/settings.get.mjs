import { d as defineEventHandler, r as requireAdminSession, a as useDb, s as settings, h as createError, e as sizes, f as sleeveTypes } from '../../../_/nitro.mjs';
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

const settings_get = defineEventHandler(async (event) => {
  await requireAdminSession(event);
  const db = useDb();
  try {
    const [settingsRow] = await db.select().from(settings).limit(1);
    if (!settingsRow) {
      throw createError({ statusCode: 404, message: "Settings not found" });
    }
    const sizesList = await db.select().from(sizes).orderBy(sizes.sortOrder);
    const sleeveTypesList = await db.select().from(sleeveTypes).orderBy(sleeveTypes.sortOrder);
    return {
      eventTitle: settingsRow.eventTitle,
      eventDescription: settingsRow.eventDescription || "",
      currency: settingsRow.currency,
      basePrice: Number(settingsRow.basePrice),
      deadline: settingsRow.deadline ? settingsRow.deadline.toISOString() : null,
      isOpen: settingsRow.isOpen,
      sizeChartImage: settingsRow.sizeChartImage,
      sizes: sizesList.map((s) => ({
        id: s.id,
        label: s.label,
        surcharge: Number(s.surcharge),
        sortOrder: s.sortOrder,
        isActive: s.isActive
      })),
      sleeveTypes: sleeveTypesList.map((st) => ({
        id: st.id,
        label: st.label,
        surcharge: Number(st.surcharge),
        sortOrder: st.sortOrder,
        isActive: st.isActive
      }))
    };
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "Failed to load settings"
    });
  }
});

export { settings_get as default };
//# sourceMappingURL=settings.get.mjs.map
