import { d as defineEventHandler, r as requireAdminSession, a as useDb, y as getRouterParam, h as createError, k as readBody, o as orders, s as settings, e as sizes, f as sleeveTypes, z as calculateUnitPrice, A as calculateLineTotal, B as calculateOrderTotal, c as orderItems } from '../../../../_/nitro.mjs';
import { eq, asc } from 'drizzle-orm';
import { u as updateOrderSchema } from '../../../../_/schemas.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  await requireAdminSession(event);
  const db = useDb();
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Order ID is required"
      });
    }
    const body = await readBody(event);
    const parsed = updateOrderSchema.safeParse(body);
    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        message: "Validation failed",
        data: { errors: parsed.error.flatten().fieldErrors }
      });
    }
    const updateData = parsed.data;
    const [existingOrder] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    if (!existingOrder) {
      throw createError({
        statusCode: 404,
        message: "Order not found"
      });
    }
    const updateFields = {
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (updateData.customerName !== void 0) {
      updateFields.customerName = updateData.customerName;
    }
    if (updateData.contact !== void 0) {
      updateFields.contact = updateData.contact;
    }
    if (updateData.notes !== void 0) {
      updateFields.notes = updateData.notes;
    }
    if (updateData.adminNotes !== void 0) {
      updateFields.adminNotes = updateData.adminNotes;
    }
    if (updateData.status !== void 0) {
      updateFields.status = updateData.status;
    }
    if (updateData.paymentStatus !== void 0) {
      updateFields.paymentStatus = updateData.paymentStatus;
    }
    if (updateData.amountPaid !== void 0) {
      updateFields.amountPaid = updateData.amountPaid.toString();
    }
    if (updateData.items && updateData.items.length > 0) {
      const [settingsRow] = await db.select().from(settings).where(eq(settings.id, 1)).limit(1);
      if (!settingsRow) {
        throw createError({
          statusCode: 500,
          message: "System not configured"
        });
      }
      const activeSizes = await db.select().from(sizes).where(eq(sizes.isActive, true)).orderBy(asc(sizes.sortOrder));
      const activeSleeveTypes = await db.select().from(sleeveTypes).where(eq(sleeveTypes.isActive, true)).orderBy(asc(sleeveTypes.sortOrder));
      const sizeMap = new Map(activeSizes.map((s) => [s.label, Number(s.surcharge)]));
      const sleeveMap = new Map(activeSleeveTypes.map((st) => [st.label, Number(st.surcharge)]));
      const basePrice = Number(settingsRow.basePrice);
      const calculatedItems = updateData.items.map((item) => {
        if (!sizeMap.has(item.sizeLabel)) {
          throw createError({
            statusCode: 400,
            message: `Invalid size: ${item.sizeLabel}`
          });
        }
        if (!sleeveMap.has(item.sleeveLabel)) {
          throw createError({
            statusCode: 400,
            message: `Invalid sleeve type: ${item.sleeveLabel}`
          });
        }
        const sizeSurcharge = sizeMap.get(item.sizeLabel);
        const sleeveSurcharge = sleeveMap.get(item.sleeveLabel);
        const unitPrice = calculateUnitPrice(basePrice, sizeSurcharge, sleeveSurcharge);
        const lineTotal = calculateLineTotal(unitPrice, item.quantity);
        return {
          shirtName: item.shirtName,
          sizeLabel: item.sizeLabel,
          sleeveLabel: item.sleeveLabel,
          quantity: item.quantity,
          unitPrice,
          lineTotal
        };
      });
      const { totalPrice, totalQuantity } = calculateOrderTotal(calculatedItems);
      updateFields.totalPrice = totalPrice.toString();
      updateFields.totalQuantity = totalQuantity;
      await db.transaction(async (tx) => {
        await tx.delete(orderItems).where(eq(orderItems.orderId, id));
        await tx.insert(orderItems).values(
          calculatedItems.map((item) => ({
            orderId: id,
            shirtName: item.shirtName,
            sizeLabel: item.sizeLabel,
            sleeveLabel: item.sleeveLabel,
            quantity: item.quantity,
            unitPrice: item.unitPrice.toString(),
            lineTotal: item.lineTotal.toString()
          }))
        );
        await tx.update(orders).set(updateFields).where(eq(orders.id, id));
      });
    } else {
      await db.update(orders).set(updateFields).where(eq(orders.id, id));
    }
    const [updatedOrder] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    const updatedItems = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
    return {
      order: {
        id: updatedOrder.id,
        code: updatedOrder.code,
        customerName: updatedOrder.customerName,
        contact: updatedOrder.contact,
        notes: updatedOrder.notes,
        adminNotes: updatedOrder.adminNotes,
        status: updatedOrder.status,
        paymentStatus: updatedOrder.paymentStatus,
        amountPaid: Number(updatedOrder.amountPaid),
        totalPrice: Number(updatedOrder.totalPrice),
        totalQuantity: updatedOrder.totalQuantity,
        createdAt: updatedOrder.createdAt.toISOString(),
        updatedAt: updatedOrder.updatedAt.toISOString(),
        items: updatedItems.map((item) => ({
          id: item.id,
          shirtName: item.shirtName,
          sizeLabel: item.sizeLabel,
          sleeveLabel: item.sleeveLabel,
          quantity: item.quantity,
          unitPrice: Number(item.unitPrice),
          lineTotal: Number(item.lineTotal)
        }))
      }
    };
  } catch (error) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error("Failed to update order:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to update order"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
