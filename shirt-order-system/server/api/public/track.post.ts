import { defineEventHandler, readBody, createError } from 'h3'
import { eq, and, sql } from 'drizzle-orm'
import { useDb } from '~/server/utils/db'
import { orders, orderItems } from '~/server/database/schema'
import { trackOrderSchema } from '~/shared/schemas'

export default defineEventHandler(async (event) => {
  const db = useDb()

  try {
    const body = await readBody(event)
    const parsed = trackOrderSchema.safeParse(body)

    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        message: 'Validation failed',
        data: { errors: parsed.error.flatten().fieldErrors },
      })
    }

    const { code, contact } = parsed.data

    // Look up order by code AND contact (case-insensitive match on contact)
    const [order] = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.code, code),
          sql`LOWER(${orders.contact}) = LOWER(${contact})`
        )
      )
      .limit(1)

    if (!order) {
      throw createError({
        statusCode: 404,
        message: 'Order not found. Please check your order code and contact info.',
      })
    }

    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id))

    return {
      order: {
        id: order.id,
        code: order.code,
        customerName: order.customerName,
        contact: order.contact,
        notes: order.notes,
        status: order.status,
        paymentStatus: order.paymentStatus,
        amountPaid: Number(order.amountPaid),
        totalPrice: Number(order.totalPrice),
        totalQuantity: order.totalQuantity,
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
        items: items.map((item) => ({
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
    console.error('Failed to track order:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to track order',
    })
  }
})
