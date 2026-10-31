import { defineEventHandler } from 'h3'
import { requireAdminSession } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const session = await requireAdminSession(event)

  return {
    user: session.user,
  }
})
