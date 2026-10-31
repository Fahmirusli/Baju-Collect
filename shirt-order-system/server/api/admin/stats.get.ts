import { defineEventHandler, createError } from 'h3'
import { eq, sql, desc } from 'drizzle-orm'
import { useDb } from '~/server/utils/db'
import { requireAdminSession } from '~/server/utils/auth'
import { orders, orderItems } from '~/server/database/schema'
import type { DashboardStats } from '~/shared/types'

export default defineEventHandler(async (event): Promise<DashboardStats> => {
  await requireAdminSession(event)
  const db = useDb()

  try {
    // Total orders count
    const [orderCountResult] = await db
      .select({ value: sql<number>`cast(count(*) as int)` })
      .from(orders)

    const totalOrders = orderCountResult?.value ?? 0

    // Total shirts (sum of totalQuantity)
    const [shirtsResult] = await db
      .select({ value: sql<number>`cast(coalesce(sum(${orders.totalQuantity}), 0) as int)` })
      .from(orders)

    const totalShirts = shirtsResult?.value ?? 0

    // Total revenue (sum of totalPrice)
    const [revenueResult] = await db
      .select({ value: sql<number>`cast(coalesce(sum(cast(${orders.totalPrice} as numeric)), 0) as float)` })
      .from(orders)

    const totalRevenue = revenueResult?.value ?? 0

    // Paid amount (sum of amountPaid)
    const [paidResult] = await db
      .select({ value: sql<number>`cast(coalesce(sum(cast(${orders.amountPaid} as numeric)), 0) as float)` })
      .from(orders)

    const paidAmount = paidResult?.value ?? 0
    const unpaidAmount = totalRevenue - paidAmount

    // Shirts by size
    const shirtsBySizeRows = await db
      .select({
        label: orderItems.sizeLabel,
        count: sql<number>`cast(sum(${orderItems.quantity}) as int)`,
      })
      .from(orderItems)
      .groupBy(orderItems.sizeLabel)
      .orderBy(desc(sql`sum(${orderItems.quantity})`))

    const shirtsBySize = shirtsBySizeRows.map((row) => ({
      label: row.label,
      count: row.count,
    }))

    // Shirts by sleeve
    const shirtsBySleeveRows = await db
      .select({
        label: orderItems.sleeveLabel,
        count: sql<number>`cast(sum(${orderItems.quantity}) as int)`,
      })
      .from(orderItems)
      .groupBy(orderItems.sleeveLabel)
      .orderBy(desc(sql`sum(${orderItems.quantity})`))

    const shirtsBySleeve = shirtsBySleeveRows.map((row) => ({
      label: row.label,
      count: row.count,
    }))

    // Orders by day (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const ordersByDayRows = await db
      .select({
        date: sql<string>`to_char(${orders.createdAt}::date, 'YYYY-MM-DD')`,
        count: sql<number>`cast(count(*) as int)`,
      })
      .from(orders)
      .where(sql`${orders.createdAt} >= ${thirtyDaysAgo.toISOString()}`)
      .groupBy(sql`${orders.createdAt}::date`)
      .orderBy(sql`${orders.createdAt}::date`)

    const ordersByDay = ordersByDayRows.map((row) => ({
      date: row.date,
      count: row.count,
    }))

    // Recent orders (latest 8 with item counts)
    const recentOrderRows = await db
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
      .orderBy(desc(orders.createdAt))
      .limit(8)

    const recentOrders = await Promise.all(
      recentOrderRows.map(async (order) => {
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
      totalOrders,
      totalShirts,
      totalRevenue,
      paidAmount,
      unpaidAmount,
      shirtsBySize,
      shirtsBySleeve,
      ordersByDay,
      recentOrders,
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Failed to fetch stats:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch dashboard statistics',
    })
  }
})
