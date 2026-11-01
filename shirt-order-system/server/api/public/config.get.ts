import { defineEventHandler, createError } from 'h3'
import { eq, asc } from 'drizzle-orm'
import { useDb } from '~/server/utils/db'
import { settings, sizes, sleeveTypes } from '~/server/database/schema'
import type { PublicConfig } from '~/shared/types'

export default defineEventHandler(async (): Promise<PublicConfig> => {
  try {
    const db = useDb()

    const [settingsRow] = await db
      .select()
      .from(settings)
      .where(eq(settings.id, 1))
      .limit(1)

    if (!settingsRow) {
      throw createError({
        statusCode: 500,
        message: 'Settings not configured',
      })
    }

    const activeSizes = await db
      .select({
        id: sizes.id,
        label: sizes.label,
        surcharge: sizes.surcharge,
        sortOrder: sizes.sortOrder,
      })
      .from(sizes)
      .where(eq(sizes.isActive, true))
      .orderBy(asc(sizes.sortOrder))

    const activeSleeveTypes = await db
      .select({
        id: sleeveTypes.id,
        label: sleeveTypes.label,
        surcharge: sleeveTypes.surcharge,
        sortOrder: sleeveTypes.sortOrder,
      })
      .from(sleeveTypes)
      .where(eq(sleeveTypes.isActive, true))
      .orderBy(asc(sleeveTypes.sortOrder))

    return {
      eventTitle: settingsRow.eventTitle,
      eventDescription: settingsRow.eventDescription,
      currency: settingsRow.currency,
      basePrice: Number(settingsRow.basePrice),
      deadline: settingsRow.deadline ? settingsRow.deadline.toISOString() : null,
      isOpen: settingsRow.isOpen,
      sizeChartImage: settingsRow.sizeChartImage,
      serverTime: new Date().toISOString(),
      sizes: activeSizes.map((s) => ({
        id: s.id,
        label: s.label,
        surcharge: Number(s.surcharge),
        sortOrder: s.sortOrder,
      })),
      sleeveTypes: activeSleeveTypes.map((st) => ({
        id: st.id,
        label: st.label,
        surcharge: Number(st.surcharge),
        sortOrder: st.sortOrder,
      })),
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Failed to fetch public config:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to load configuration',
    })
  }
})
