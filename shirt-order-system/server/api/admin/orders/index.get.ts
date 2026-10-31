import { defineEventHandler, getQuery, createError } from 'h3'
import { eq, and, or, desc, asc, sql, ilike, gte, lte } from 'drizzle-orm'
import { useDb } from '~/server/utils/db'
import { requireAdminSession } from '~/server/utils/auth'
import { orders, orderItems } from '~/server/database/schema'
import { ordersQuerySchema } from '~/shared/schemas'
import type { PaginatedResponse, OrderListItem } from '~/shared/types'

export default defineEventHandler(async (event): Promise<PaginatedResponse<OrderListItem>> => {
  await requireAdminSession(event)
  const db = useDb()

  try {
    const rawQuery = getQuery(event)
    const parsed = ordersQuerySchema.safeParse(rawQuery)

    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        message: 'Invalid query parameters',
        data: { errors: parsed.error.flatten().fieldErrors },
      })
    }

    const { page, limit, search, status, paymentStatus, size, sleeve, dateFrom, dateTo, sortBy, sortDir } = parsed.data
    const offset = (page - 1) * limit

    // Build where conditions
    const conditions: ReturnType<typeof eq>[] = []

    if (search) {
      const searchPattern = `%${search}%`
      conditions.push(
        or(
          ilike(orders.customerName, searchPattern),
          ilike(orders.contact, searchPattern),
          ilike(orders.code, searchPattern)
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

    // Filter by size: orders that have items with the matching size_label
    if (size) {
      conditions.push(
        sql`EXISTS (
          SELECT 1 FROM ${orderItems}
          WHERE ${orderItems.orderId} = ${orders.id}
          AND ${orderItems.sizeLabel} = ${size}
        )`
      )
    }

    // Filter by sleeve: orders that have items with the matching sleeve_label
    if (sleeve) {
      conditions.push(
        sql`EXISTS (
          SELECT 1 FROM ${orderItems}
          WHERE ${orderItems.orderId} = ${orders.id}
          AND ${orderItems.sleeveLabel} = ${sleeve}
        )`
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    // Sorting
    const sortColumn = (() => {
      switch (sortBy) {
        case 'created_at':
          return orders.createdAt
        case 'total_price':
          return orders.totalPrice
        case 'customer_name':
          return orders.customerName
        case 'code':
          return orders.code
        default:
          return orders.createdAt
      }
    })()

    const sortOrder = sortDir === 'asc' ? asc(sortColumn) : desc(sortColumn)

    // Count total matching records
    const [countResult] = await db
      .select({ value: sql<number>`cast(count(*) as int)` })
      .from(orders)
      .where(whereClause)

    const total = countResult?.value ?? 0

    // Fetch paginated orders
    const orderRows = await db
      .select({
        id: orders.id,
        code: orders.code,
        customerName: orders.customerName,
        contact: orders.contact,
        totalQuantity: orders.totalQuantity,
        totalPrice: orders.totalPrice,
        status: orders.status,
        paymentStatus: orders.paymentStatus,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .where(whereClause)
      .orderBy(sortOrder)
      .limit(limit)
      .offset(offset)

    // Get items count for each order
    const data: OrderListItem[] = await Promise.all(
      orderRows.map(async (order) => {
        const [itemCountResult] = await db
          .select({ value: sql<number>`cast(count(*) as int)` })
          .from(orderItems)
          .where(eq(orderItems.orderId, order.id))

        return {
          id: order.id,
          code: order.code,
          customerName: order.customerName,
          contact: order.contact,
          itemsCount: itemCountResult?.value ?? 0,
          totalQuantity: order.totalQuantity,
          totalPrice: Number(order.totalPrice),
          status: order.status,
          paymentStatus: order.paymentStatus,
          createdAt: order.createdAt.toISOString(),
        }
      })
    )

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Failed to fetch orders:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch orders',
    })
  }
})
