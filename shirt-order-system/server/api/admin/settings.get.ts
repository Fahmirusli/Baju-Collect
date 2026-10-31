import { defineEventHandler, createError } from 'h3'
import { useDb } from '~/server/utils/db'
import { requireAdminSession } from '~/server/utils/auth'
import { settings, sizes, sleeveTypes } from '~/server/database/schema'
import type { SettingsData } from '~/shared/types'

export default defineEventHandler(async (event): Promise<SettingsData> => {
  await requireAdminSession(event)
  const db = useDb()

  try {
    const [settingsRow] = await db.select().from(settings).limit(1)
    if (!settingsRow) {
      throw createError({ statusCode: 404, message: 'Settings not found' })
    }

    const sizesList = await db.select().from(sizes).orderBy(sizes.sortOrder)
    const sleeveTypesList = await db.select().from(sleeveTypes).orderBy(sleeveTypes.sortOrder)

    return {
      eventTitle: settingsRow.eventTitle,
      eventDescription: settingsRow.eventDescription || '',
      currency: settingsRow.currency,
      basePrice: Number(settingsRow.basePrice),
      deadline: settingsRow.deadline ? settingsRow.deadline.toISOString() : null,
      isOpen: settingsRow.isOpen,
      sizeChartImage: settingsRow.sizeChartImage,
      sizes: sizesList.map((s) => ({
        id: s.id,
        label: s.label,
        surcharge: Number(s.surcharge),
        sortOrder: s.sortOrder,
        isActive: s.isActive,
      })),
      sleeveTypes: sleeveTypesList.map((st) => ({
        id: st.id,
        label: st.label,
        surcharge: Number(st.surcharge),
        sortOrder: st.sortOrder,
        isActive: st.isActive,
      })),
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      message: 'Failed to load settings',
    })
  }
})

