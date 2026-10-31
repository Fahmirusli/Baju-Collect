import { d as defineEventHandler, r as requireAdminSession, k as readBody, h as createError, a as useDb, s as settings, e as sizes, c as orderItems, f as sleeveTypes } from '../../../_/nitro.mjs';
import { sql, eq } from 'drizzle-orm';
import { e as updateSettingsSchema } from '../../../_/schemas.mjs';
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

const settings_put = defineEventHandler(async (event) => {
  var _a, _b;
  await requireAdminSession(event);
  const body = await readBody(event);
  const parsed = updateSettingsSchema.safeParse(body);
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid settings payload",
      data: { errors: parsed.error.flatten().fieldErrors }
    });
  }
  const db = useDb();
  const warnings = [];
  try {
    const {
      eventTitle,
      eventDescription,
      currency,
      basePrice,
      deadline,
      isOpen,
      sizeChartImage,
      sizes: inputSizes,
      sleeveTypes: inputSleeveTypes
    } = parsed.data;
    const settingsUpdate = { updatedAt: sql`now()` };
    if (eventTitle !== void 0) settingsUpdate.eventTitle = eventTitle;
    if (eventDescription !== void 0) settingsUpdate.eventDescription = eventDescription;
    if (currency !== void 0) settingsUpdate.currency = currency;
    if (basePrice !== void 0) settingsUpdate.basePrice = basePrice.toString();
    if (deadline !== void 0) settingsUpdate.deadline = deadline ? new Date(deadline) : null;
    if (isOpen !== void 0) settingsUpdate.isOpen = isOpen;
    if (sizeChartImage !== void 0) settingsUpdate.sizeChartImage = sizeChartImage;
    await db.update(settings).set(settingsUpdate).where(eq(settings.id, 1));
    if (inputSizes) {
      const existingSizes = await db.select().from(sizes);
      const inputIds = inputSizes.filter((s) => s.id).map((s) => s.id);
      for (const s of inputSizes) {
        if (s.id) {
          await db.update(sizes).set({
            label: s.label,
            surcharge: s.surcharge.toString(),
            sortOrder: s.sortOrder,
            isActive: s.isActive
          }).where(eq(sizes.id, s.id));
        } else {
          await db.insert(sizes).values({
            label: s.label,
            surcharge: s.surcharge.toString(),
            sortOrder: s.sortOrder,
            isActive: s.isActive
          });
        }
      }
      const omitted = existingSizes.filter((s) => !inputIds.includes(s.id));
      for (const s of omitted) {
        const used = await db.select({ count: sql`count(*)` }).from(orderItems).where(eq(orderItems.sizeLabel, s.label));
        if (Number(((_a = used[0]) == null ? void 0 : _a.count) || 0) > 0) {
          await db.update(sizes).set({ isActive: false }).where(eq(sizes.id, s.id));
          warnings.push(`Size "${s.label}" is used in existing orders and was deactivated instead of deleted.`);
        } else {
          await db.delete(sizes).where(eq(sizes.id, s.id));
        }
      }
    }
    if (inputSleeveTypes) {
      const existingSleeves = await db.select().from(sleeveTypes);
      const inputIds = inputSleeveTypes.filter((st) => st.id).map((st) => st.id);
      for (const st of inputSleeveTypes) {
        if (st.id) {
          await db.update(sleeveTypes).set({
            label: st.label,
            surcharge: st.surcharge.toString(),
            sortOrder: st.sortOrder,
            isActive: st.isActive
          }).where(eq(sleeveTypes.id, st.id));
        } else {
          await db.insert(sleeveTypes).values({
            label: st.label,
            surcharge: st.surcharge.toString(),
            sortOrder: st.sortOrder,
            isActive: st.isActive
          });
        }
      }
      const omittedSleeves = existingSleeves.filter((st) => !inputIds.includes(st.id));
      for (const st of omittedSleeves) {
        const used = await db.select({ count: sql`count(*)` }).from(orderItems).where(eq(orderItems.sleeveLabel, st.label));
        if (Number(((_b = used[0]) == null ? void 0 : _b.count) || 0) > 0) {
          await db.update(sleeveTypes).set({ isActive: false }).where(eq(sleeveTypes.id, st.id));
          warnings.push(`Sleeve type "${st.label}" is used in existing orders and was deactivated instead of deleted.`);
        } else {
          await db.delete(sleeveTypes).where(eq(sleeveTypes.id, st.id));
        }
      }
    }
    const [updatedRow] = await db.select().from(settings).limit(1);
    const updatedSizes = await db.select().from(sizes).orderBy(sizes.sortOrder);
    const updatedSleeves = await db.select().from(sleeveTypes).orderBy(sleeveTypes.sortOrder);
    return {
      settings: {
        eventTitle: updatedRow.eventTitle,
        eventDescription: updatedRow.eventDescription || "",
        currency: updatedRow.currency,
        basePrice: Number(updatedRow.basePrice),
        deadline: updatedRow.deadline ? updatedRow.deadline.toISOString() : null,
        isOpen: updatedRow.isOpen,
        sizeChartImage: updatedRow.sizeChartImage,
        sizes: updatedSizes.map((s) => ({
          id: s.id,
          label: s.label,
          surcharge: Number(s.surcharge),
          sortOrder: s.sortOrder,
          isActive: s.isActive
        })),
        sleeveTypes: updatedSleeves.map((st) => ({
          id: st.id,
          label: st.label,
          surcharge: Number(st.surcharge),
          sortOrder: st.sortOrder,
          isActive: st.isActive
        }))
      },
      warnings: warnings.length > 0 ? warnings : void 0
    };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Settings update error:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to update settings"
    });
  }
});

export { settings_put as default };
//# sourceMappingURL=settings.put.mjs.map
