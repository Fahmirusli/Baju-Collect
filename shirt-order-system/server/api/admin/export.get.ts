import { defineEventHandler, getQuery, setResponseHeaders, createError } from 'h3'
import { eq, and, or, ilike, gte, lte, desc } from 'drizzle-orm'
import { useDb } from '~/server/utils/db'
import { requireAdminSession } from '~/server/utils/auth'
import { orders, orderItems, settings, sizes, sleeveTypes } from '~/server/database/schema'
import { ordersQuerySchema } from '~/shared/schemas'
import { buildOrdersExcel, type OrderWithItems } from '~/server/utils/excel'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)
  const db = useDb()

  try {
    const rawQuery = getQuery(event)
    const parsed = ordersQuerySchema.safeParse(rawQuery)

    const conditions: ReturnType<typeof eq>[] = []

    if (parsed.success) {
      const { search, status, paymentStatus, dateFrom, dateTo } = parsed.data

      if (search) {
        const pattern = `%${search}%`
        conditions.push(
          or(
            ilike(orders.customerName, pattern),
            ilike(orders.contact, pattern),
            ilike(orders.code, pattern)
          )!
        )
      }

      if (status) {
        conditions.push(eq(orders.status, status))
      }

      if (paymentStatus) {
        conditions.push(eq(orders.paymentStatus, paymentStatus))
      }

      if (dateFrom) {
        conditions.push(gte(orders.createdAt, new Date(dateFrom)))
      }

      if (dateTo) {
        const endDate = new Date(dateTo)
        endDate.setHours(23, 59, 59, 999)
        conditions.push(lte(orders.createdAt, endDate))
      }
    }

    // Fetch orders
    const orderRows = conditions.length > 0
      ? await db.select().from(orders).where(and(...conditions)).orderBy(desc(orders.createdAt))
      : await db.select().from(orders).orderBy(desc(orders.createdAt))

    // Fetch items for each order
    const allItems = await db.select().from(orderItems)
    const itemsByOrderId = new Map<string, typeof allItems>()
    for (const item of allItems) {
      const list = itemsByOrderId.get(item.orderId) || []
      list.push(item)
      itemsByOrderId.set(item.orderId, list)
    }

    // Apply size & sleeve filtering if specified in query
    let filteredOrders = orderRows.map((o) => ({
      ...o,
      items: itemsByOrderId.get(o.id) || [],
    })) as OrderWithItems[]

    if (parsed.success) {
      if (parsed.data.size) {
        filteredOrders = filteredOrders.filter((o) =>
          o.items.some((item) => item.sizeLabel === parsed.data.size)
        )
      }
      if (parsed.data.sleeve) {
        filteredOrders = filteredOrders.filter((o) =>
          o.items.some((item) => item.sleeveLabel === parsed.data.sleeve)
        )
      }
    }

    // Fetch settings, sizes, sleeveTypes
    const [settingsRow] = await db.select().from(settings).limit(1)
    const sizesList = await db.select().from(sizes).orderBy(sizes.sortOrder)
    const sleeveTypesList = await db.select().from(sleeveTypes).orderBy(sleeveTypes.sortOrder)

    if (!settingsRow) {
      throw createError({ statusCode: 500, message: 'Settings not initialized' })
    }

    const buffer = await buildOrdersExcel(filteredOrders, settingsRow, sizesList, sleeveTypesList)
    const today = new Date().toISOString().split('T')[0]

    setResponseHeaders(event, {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="shirt-orders-${today}.xlsx"`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    })

    return buffer
  } catch (error: any) {
    if (error.statusCode) throw error
    console.error('Export error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to generate Excel export',
    })
  }
})

