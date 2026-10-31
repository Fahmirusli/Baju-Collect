import { defineEventHandler, readBody, createError } from 'h3'
import { eq, asc } from 'drizzle-orm'
import { useDb } from '~/server/utils/db'
import { requireAdminSession } from '~/server/utils/auth'
import { settings, sizes, sleeveTypes, orders, orderItems } from '~/server/database/schema'
import { adminCreateOrderSchema } from '~/shared/schemas'
import { calculateUnitPrice, calculateLineTotal, calculateOrderTotal } from '~/server/utils/pricing'
import { getUniqueOrderCode } from '~/server/utils/order-code'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)
  const db = useDb()

  try {
    const body = await readBody(event)
    const parsed = adminCreateOrderSchema.safeParse(body)

    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        message: 'Validation failed',
        data: { errors: parsed.error.flatten().fieldErrors },
      })
    }

    const { customerName, contact, notes, adminNotes, status, paymentStatus, amountPaid, items } = parsed.data

    // Fetch settings for base price
    const [settingsRow] = await db
      .select()
      .from(settings)
      .where(eq(settings.id, 1))
      .limit(1)

    if (!settingsRow) {
      throw createError({
        statusCode: 500,
        message: 'System not configured',
      })
    }

    // Fetch active sizes and sleeve types
    const activeSizes = await db
      .select()
      .from(sizes)
      .where(eq(sizes.isActive, true))
      .orderBy(asc(sizes.sortOrder))

    const activeSleeveTypes = await db
      .select()
      .from(sleeveTypes)
      .where(eq(sleeveTypes.isActive, true))
      .orderBy(asc(sleeveTypes.sortOrder))

    const sizeMap = new Map(activeSizes.map((s) => [s.label, Number(s.surcharge)]))
    const sleeveMap = new Map(activeSleeveTypes.map((st) => [st.label, Number(st.surcharge)]))
    const basePrice = Number(settingsRow.basePrice)

    // Validate and calculate prices
    const calculatedItems = items.map((item) => {
      if (!sizeMap.has(item.sizeLabel)) {
        throw createError({
          statusCode: 400,
          message: `Invalid size: ${item.sizeLabel}`,
        })
      }
      if (!sleeveMap.has(item.sleeveLabel)) {
        throw createError({
          statusCode: 400,
          message: `Invalid sleeve type: ${item.sleeveLabel}`,
        })
      }

      const sizeSurcharge = sizeMap.get(item.sizeLabel)!
      const sleeveSurcharge = sleeveMap.get(item.sleeveLabel)!
      const unitPrice = calculateUnitPrice(basePrice, sizeSurcharge, sleeveSurcharge)
      const lineTotal = calculateLineTotal(unitPrice, item.quantity)

      return {
        shirtName: item.shirtName,
        sizeLabel: item.sizeLabel,
        sleeveLabel: item.sleeveLabel,
        quantity: item.quantity,
        unitPrice,
        lineTotal,
      }
    })

    const { totalPrice, totalQuantity } = calculateOrderTotal(calculatedItems)

    // Generate unique order code
    const code = await getUniqueOrderCode(db)

    // Insert order and items in transaction
    const result = await db.transaction(async (tx) => {
      const [newOrder] = await tx
        .insert(orders)
        .values({
          code,
          customerName,
          contact,
          notes: notes || '',
          adminNotes: adminNotes || '',
          status: status || 'pending',
          paymentStatus: paymentStatus || 'unpaid',
          amountPaid: (amountPaid || 0).toString(),
          totalPrice: totalPrice.toString(),
          totalQuantity,
          ipHash: null,
          idempotencyKey: null,
        })
        .returning()

      const insertedItems = await tx
        .insert(orderItems)
        .values(
          calculatedItems.map((item) => ({
            orderId: newOrder.id,
            shirtName: item.shirtName,
            sizeLabel: item.sizeLabel,
            sleeveLabel: item.sleeveLabel,
            quantity: item.quantity,
            unitPrice: item.unitPrice.toString(),
            lineTotal: item.lineTotal.toString(),
          }))
        )
        .returning()

      return {
        order: newOrder,
        items: insertedItems,
      }
    })

    return {
      order: {
        id: result.order.id,
        code: result.order.code,
        customerName: result.order.customerName,
        contact: result.order.contact,
        notes: result.order.notes,
        adminNotes: result.order.adminNotes,
        status: result.order.status,
        paymentStatus: result.order.paymentStatus,
        amountPaid: Number(result.order.amountPaid),
        totalPrice: Number(result.order.totalPrice),
        totalQuantity: result.order.totalQuantity,
        createdAt: result.order.createdAt.toISOString(),
        updatedAt: result.order.updatedAt.toISOString(),
        items: result.items.map((item) => ({
          id: item.id,
          shirtName: item.shirtName,
          sizeLabel: item.sizeLabel,
          sleeveLabel: item.sleeveLabel,
          quantity: item.quantity,
          unitPrice: Number(item.unitPrice),
          lineTotal: Number(item.lineTotal),
        })),
      },
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Failed to create order (admin):', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to create order',
    })
  }
})
