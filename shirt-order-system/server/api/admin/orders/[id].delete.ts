import { defineEventHandler, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { useDb } from '~/server/utils/db'
import { requireAdminSession } from '~/server/utils/auth'
import { orders } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Order ID is required',
    })
  }

  const db = useDb()

  try {
    const existing = await db
      .select({ id: orders.id })
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1)

    if (existing.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Order not found',
      })
    }

    await db.delete(orders).where(eq(orders.id, id))

    return { success: true, message: 'Order deleted successfully' }
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      message: 'Failed to delete order',
    })
  }
})

