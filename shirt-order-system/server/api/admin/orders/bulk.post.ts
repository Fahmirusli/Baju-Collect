import { defineEventHandler, readBody, createError } from 'h3'
import { inArray, sql } from 'drizzle-orm'
import { useDb } from '~/server/utils/db'
import { requireAdminSession } from '~/server/utils/auth'
import { orders } from '~/server/database/schema'
import { bulkActionSchema } from '~/shared/schemas'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)
  const body = await readBody(event)

  const parsed = bulkActionSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid bulk action payload',
      data: { errors: parsed.error.flatten().fieldErrors },
    })
  }

  const { ids, action, value } = parsed.data
  const db = useDb()

  try {
    if (action === 'set_status') {
      if (!value) {
        throw createError({ statusCode: 400, message: 'Status value is required' })
      }
      await db
        .update(orders)
        .set({ status: value, updatedAt: sql`now()` })
        .where(inArray(orders.id, ids))
      return { success: true, affected: ids.length }
    }

    if (action === 'set_payment_status') {
      if (!value) {
        throw createError({ statusCode: 400, message: 'Payment status value is required' })
      }
      await db
        .update(orders)
        .set({ paymentStatus: value, updatedAt: sql`now()` })
        .where(inArray(orders.id, ids))
      return { success: true, affected: ids.length }
    }

    if (action === 'delete') {
      await db.delete(orders).where(inArray(orders.id, ids))
      return { success: true, affected: ids.length }
    }

    throw createError({ statusCode: 400, message: 'Unknown action' })
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      message: 'Failed to perform bulk action',
    })
  }
})

