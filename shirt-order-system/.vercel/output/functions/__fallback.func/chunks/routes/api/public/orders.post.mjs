import { d as defineEventHandler, a as useDb, k as readBody, h as createError, o as orders, c as orderItems, l as getRequestIP, m as checkRateLimit, s as settings, e as sizes, f as sleeveTypes, z as calculateUnitPrice, A as calculateLineTotal, B as calculateOrderTotal, C as getUniqueOrderCode } from '../../../_/nitro.mjs';
import { eq, asc } from 'drizzle-orm';
import { createHash } from 'node:crypto';
import { f as createOrderSchema } from '../../../_/schemas.mjs';
import 'bcryptjs';
import '@neondatabase/serverless';
import 'drizzle-orm/neon-http';
import 'exceljs';
import 'drizzle-orm/pg-core';
import '@aws-sdk/client-s3';
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
const orders_post = defineEventHandler(async (event) => {
  const db = useDb();
  try {
    const body = await readBody(event);
    const parsed = createOrderSchema.safeParse(body);
    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        message: "Validation failed",
        data: { errors: parsed.error.flatten().fieldErrors }
      });
    }
    const { customerName, contact, notes, items, honeypot, idempotencyKey } = parsed.data;
    if (honeypot && honeypot.length > 0) {
      throw createError({
        statusCode: 400,
        message: "Invalid submission"
      });
    }
    if (idempotencyKey) {
      const [existingOrder] = await db.select().from(orders).where(eq(orders.idempotencyKey, idempotencyKey)).limit(1);
      if (existingOrder) {
        const existingItems = await db.select().from(orderItems).where(eq(orderItems.orderId, existingOrder.id));
        return {
          order: {
            id: existingOrder.id,
            code: existingOrder.code,
            customerName: existingOrder.customerName,
            contact: existingOrder.contact,
            items: existingItems.map((item) => ({
              id: item.id,
              shirtName: item.shirtName,
              sizeLabel: item.sizeLabel,
              sleeveLabel: item.sleeveLabel,
              quantity: item.quantity,
              unitPrice: Number(item.unitPrice),
              lineTotal: Number(item.lineTotal)
            })),
            totalPrice: Number(existingOrder.totalPrice),
            totalQuantity: existingOrder.totalQuantity,
            createdAt: existingOrder.createdAt.toISOString()
          }
        };
      }
    }
    const clientIp = getRequestIP(event, { xForwardedFor: true }) || "127.0.0.1";
    const ipHash = hashIp(clientIp);
    await checkRateLimit(db, {
      key: `order:${ipHash}`,
      maxAttempts: 5,
      windowMinutes: 10,
      errorMessage: "Too many orders. Please try again later."
    });
    const [settingsRow] = await db.select().from(settings).where(eq(settings.id, 1)).limit(1);
    if (!settingsRow) {
      throw createError({
        statusCode: 500,
        message: "System not configured"
      });
    }
    if (!settingsRow.isOpen) {
      throw createError({
        statusCode: 403,
        message: "Orders are currently closed"
      });
    }
    if (settingsRow.deadline && new Date(settingsRow.deadline) < /* @__PURE__ */ new Date()) {
      throw createError({
        statusCode: 403,
        message: "The ordering deadline has passed"
      });
    }
    const activeSizes = await db.select().from(sizes).where(eq(sizes.isActive, true)).orderBy(asc(sizes.sortOrder));
    const activeSleeveTypes = await db.select().from(sleeveTypes).where(eq(sleeveTypes.isActive, true)).orderBy(asc(sleeveTypes.sortOrder));
    const sizeMap = new Map(activeSizes.map((s) => [s.label, Number(s.surcharge)]));
    const sleeveMap = new Map(activeSleeveTypes.map((st) => [st.label, Number(st.surcharge)]));
    const basePrice = Number(settingsRow.basePrice);
    const calculatedItems = items.map((item) => {
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
    const code = await getUniqueOrderCode(db);
    const result = await db.transaction(async (tx) => {
      const [newOrder] = await tx.insert(orders).values({
        code,
        customerName,
        contact,
        notes: notes || "",
        adminNotes: "",
        status: "pending",
        paymentStatus: "unpaid",
        amountPaid: "0",
        totalPrice: totalPrice.toString(),
        totalQuantity,
        ipHash,
        idempotencyKey: idempotencyKey || null
      }).returning();
      const insertedItems = await tx.insert(orderItems).values(
        calculatedItems.map((item) => ({
          orderId: newOrder.id,
          shirtName: item.shirtName,
          sizeLabel: item.sizeLabel,
          sleeveLabel: item.sleeveLabel,
          quantity: item.quantity,
          unitPrice: item.unitPrice.toString(),
          lineTotal: item.lineTotal.toString()
        }))
      ).returning();
      return {
        order: newOrder,
        items: insertedItems
      };
    });
    return {
      order: {
        id: result.order.id,
        code: result.order.code,
        customerName: result.order.customerName,
        contact: result.order.contact,
        items: result.items.map((item) => ({
          id: item.id,
          shirtName: item.shirtName,
          sizeLabel: item.sizeLabel,
          sleeveLabel: item.sleeveLabel,
          quantity: item.quantity,
          unitPrice: Number(item.unitPrice),
          lineTotal: Number(item.lineTotal)
        })),
        totalPrice: Number(result.order.totalPrice),
        totalQuantity: result.order.totalQuantity,
        createdAt: result.order.createdAt.toISOString()
      }
    };
  } catch (error) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error("Failed to create order:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to create order"
    });
  }
});

export { orders_post as default };
//# sourceMappingURL=orders.post.mjs.map
