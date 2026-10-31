import { defineEventHandler, readBody, createError } from 'h3'
import { eq, inArray, sql } from 'drizzle-orm'
import { useDb } from '~/server/utils/db'
import { requireAdminSession } from '~/server/utils/auth'
import { settings, sizes, sleeveTypes, orderItems } from '~/server/database/schema'
import { updateSettingsSchema } from '~/shared/schemas'
import type { SettingsData } from '~/shared/types'

export default defineEventHandler(async (event): Promise<{ settings: SettingsData; warnings?: string[] }> => {
  await requireAdminSession(event)
  const body = await readBody(event)

  const parsed = updateSettingsSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid settings payload',
      data: { errors: parsed.error.flatten().fieldErrors },
    })
  }

  const db = useDb()
  const warnings: string[] = []

  try {
    const {
      eventTitle,
      eventDescription,
      currency,
      basePrice,
      deadline,
      isOpen,
      sizeChartImage,
      sizes: inputSizes,
      sleeveTypes: inputSleeveTypes,
    } = parsed.data

    // 1. Update settings row
    const settingsUpdate: Record<string, any> = { updatedAt: sql`now()` }
    if (eventTitle !== undefined) settingsUpdate.eventTitle = eventTitle
    if (eventDescription !== undefined) settingsUpdate.eventDescription = eventDescription
    if (currency !== undefined) settingsUpdate.currency = currency
    if (basePrice !== undefined) settingsUpdate.basePrice = basePrice.toString()
    if (deadline !== undefined) settingsUpdate.deadline = deadline ? new Date(deadline) : null
    if (isOpen !== undefined) settingsUpdate.isOpen = isOpen
    if (sizeChartImage !== undefined) settingsUpdate.sizeChartImage = sizeChartImage

    await db.update(settings).set(settingsUpdate).where(eq(settings.id, 1))

    // 2. Manage Sizes
    if (inputSizes) {
      const existingSizes = await db.select().from(sizes)
      const inputIds = inputSizes.filter((s) => s.id).map((s) => s.id!)

      // Update existing sizes
      for (const s of inputSizes) {
        if (s.id) {
          await db
            .update(sizes)
            .set({
              label: s.label,
              surcharge: s.surcharge.toString(),
              sortOrder: s.sortOrder,
              isActive: s.isActive,
            })
            .where(eq(sizes.id, s.id))
        } else {
          await db.insert(sizes).values({
            label: s.label,
            surcharge: s.surcharge.toString(),
            sortOrder: s.sortOrder,
            isActive: s.isActive,
          })
        }
      }

      // Check omitted sizes
      const omitted = existingSizes.filter((s) => !inputIds.includes(s.id))
      for (const s of omitted) {
        // Check if size is used in order_items
        const used = await db
          .select({ count: sql<number>`count(*)` })
          .from(orderItems)
          .where(eq(orderItems.sizeLabel, s.label))

        if (Number(used[0]?.count || 0) > 0) {
          // Deactivate instead of deleting
          await db.update(sizes).set({ isActive: false }).where(eq(sizes.id, s.id))
          warnings.push(`Size "${s.label}" is used in existing orders and was deactivated instead of deleted.`)
        } else {
          await db.delete(sizes).where(eq(sizes.id, s.id))
        }
      }
    }

    // 3. Manage Sleeve Types
    if (inputSleeveTypes) {
      const existingSleeves = await db.select().from(sleeveTypes)
      const inputIds = inputSleeveTypes.filter((st) => st.id).map((st) => st.id!)

      for (const st of inputSleeveTypes) {
        if (st.id) {
          await db
            .update(sleeveTypes)
            .set({
              label: st.label,
              surcharge: st.surcharge.toString(),
              sortOrder: st.sortOrder,
              isActive: st.isActive,
            })
            .where(eq(sleeveTypes.id, st.id))
        } else {
          await db.insert(sleeveTypes).values({
            label: st.label,
            surcharge: st.surcharge.toString(),
            sortOrder: st.sortOrder,
            isActive: st.isActive,
          })
        }
      }

      const omittedSleeves = existingSleeves.filter((st) => !inputIds.includes(st.id))
      for (const st of omittedSleeves) {
        const used = await db
          .select({ count: sql<number>`count(*)` })
          .from(orderItems)
          .where(eq(orderItems.sleeveLabel, st.label))

        if (Number(used[0]?.count || 0) > 0) {
          await db.update(sleeveTypes).set({ isActive: false }).where(eq(sleeveTypes.id, st.id))
          warnings.push(`Sleeve type "${st.label}" is used in existing orders and was deactivated instead of deleted.`)
        } else {
          await db.delete(sleeveTypes).where(eq(sleeveTypes.id, st.id))
        }
      }
    }

    // Fetch updated settings data to return
    const [updatedRow] = await db.select().from(settings).limit(1)
    const updatedSizes = await db.select().from(sizes).orderBy(sizes.sortOrder)
    const updatedSleeves = await db.select().from(sleeveTypes).orderBy(sleeveTypes.sortOrder)

    return {
      settings: {
        eventTitle: updatedRow.eventTitle,
        eventDescription: updatedRow.eventDescription || '',
        currency: updatedRow.currency,
        basePrice: Number(updatedRow.basePrice),
        deadline: updatedRow.deadline ? updatedRow.deadline.toISOString() : null,
        isOpen: updatedRow.isOpen,
        sizeChartImage: updatedRow.sizeChartImage,
        sizes: updatedSizes.map((s) => ({
          id: s.id,
          label: s.label,
          surcharge: Number(s.surcharge),
          sortOrder: s.sortOrder,
          isActive: s.isActive,
        })),
        sleeveTypes: updatedSleeves.map((st) => ({
          id: st.id,
          label: st.label,
          surcharge: Number(st.surcharge),
          sortOrder: st.sortOrder,
          isActive: st.isActive,
        })),
      },
      warnings: warnings.length > 0 ? warnings : undefined,
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    console.error('Settings update error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to update settings',
    })
  }
})

