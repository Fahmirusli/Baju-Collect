import { defineEventHandler, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { useDb } from '~/server/utils/db'
import { requireAdminSession } from '~/server/utils/auth'
import { orders, orderItems } from '~/server/database/schema'
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

    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1)

    if (!order) {
      throw createError({
        statusCode: 404,
        message: 'Order not found',
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
        adminNotes: order.adminNotes,
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
    console.error('Failed to fetch order:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch order',
    })
  }
})
