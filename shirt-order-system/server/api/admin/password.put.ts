import { defineEventHandler, readBody, createError } from 'h3'
import { requireAdminSession, verifyPassword, hashPassword } from '~/server/utils/auth'
import { changePasswordSchema } from '~/shared/schemas'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)
  const body = await readBody(event)

  const parsed = changePasswordSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid password payload',
      data: { errors: parsed.error.flatten().fieldErrors },
    })
  }

  const config = useRuntimeConfig()
  const currentHash = config.adminPasswordHash || process.env.NUXT_ADMIN_PASSWORD_HASH

  if (!currentHash) {
    throw createError({
      statusCode: 500,
      message: 'Admin password hash not configured in environment',
    })
  }

  const isValid = await verifyPassword(parsed.data.currentPassword, currentHash)
  if (!isValid) {
    throw createError({
      statusCode: 401,
      message: 'Current password does not match',
    })
  }

  const newHash = await hashPassword(parsed.data.newPassword)

  return {
    success: true,
    newHash,
    message: 'Password hashed successfully. Update NUXT_ADMIN_PASSWORD_HASH in your .env or Vercel dashboard.',
  }
})

