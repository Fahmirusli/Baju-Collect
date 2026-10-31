import { defineEventHandler, readBody, createError } from 'h3'
import { eq, asc } from 'drizzle-orm'
import { useDb } from '~/server/utils/db'
import { requireAdminSession } from '~/server/utils/auth'
import { settings, sizes, sleeveTypes, orders, orderItems } from '~/server/database/schema'
import { updateOrderSchema } from '~/shared/schemas'
import { calculateUnitPrice, calculateLineTotal, calculateOrderTotal } from '~/server/utils/pricing'
import type { OrderData } from '~/shared/types'

export default defineEventHandler(async (event): Promise<{ order: OrderData }> => {
  await requireAdminSession(event)
  const db = useDb()

  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Order ID is required',
      })
    }

    const body = await readBody(event)
    const parsed = updateOrderSchema.safeParse(body)

    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        message: 'Validation failed',
        data: { errors: parsed.error.flatten().fieldErrors },
      })
    }

    const updateData = parsed.data

    // Check order exists
    const [existingOrder] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1)

    if (!existingOrder) {
      throw createError({
        statusCode: 404,
        message: 'Order not found',
      })
    }

    // Build update fields
    const updateFields: Record<string, unknown> = {
      updatedAt: new Date(),
    }

    if (updateData.customerName !== undefined) {
      updateFields.customerName = updateData.customerName
    }
    if (updateData.contact !== undefined) {
      updateFields.contact = updateData.contact
    }
    if (updateData.notes !== undefined) {
      updateFields.notes = updateData.notes
    }
    if (updateData.adminNotes !== undefined) {
      updateFields.adminNotes = updateData.adminNotes
    }
    if (updateData.status !== undefined) {
      updateFields.status = updateData.status
    }
    if (updateData.paymentStatus !== undefined) {
      updateFields.paymentStatus = updateData.paymentStatus
    }
    if (updateData.amountPaid !== undefined) {
      updateFields.amountPaid = updateData.amountPaid.toString()
    }

    // If items are provided, recalculate prices
    if (updateData.items && updateData.items.length > 0) {
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

      // Validate and calculate prices for new items
      const calculatedItems = updateData.items.map((item) => {
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
      updateFields.totalPrice = totalPrice.toString()
      updateFields.totalQuantity = totalQuantity

      // Delete existing items and insert new ones in transaction
      await db.transaction(async (tx) => {
        await tx
          .delete(orderItems)
          .where(eq(orderItems.orderId, id))

        await tx
          .insert(orderItems)
          .values(
            calculatedItems.map((item) => ({
              orderId: id,
              shirtName: item.shirtName,
              sizeLabel: item.sizeLabel,
              sleeveLabel: item.sleeveLabel,
              quantity: item.quantity,
              unitPrice: item.unitPrice.toString(),
              lineTotal: item.lineTotal.toString(),
            }))
          )

        await tx
          .update(orders)
          .set(updateFields)
          .where(eq(orders.id, id))
      })
    } else {
      // Just update the order fields
      await db
        .update(orders)
        .set(updateFields)
        .where(eq(orders.id, id))
    }

    // Fetch updated order with items
    const [updatedOrder] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1)

    const updatedItems = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, id))

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
          lineTotal: Number(item.lineTotal),
        })),
      },
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Failed to update order:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to update order',
    })
  }
})
