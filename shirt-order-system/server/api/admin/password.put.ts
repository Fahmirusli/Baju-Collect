import { defineEventHandler, readBody, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { useDb } from '~/server/utils/db'
import { users } from '~/server/database/schema'
import { requireAdminSession, verifyBcryptPassword, hashBcryptPassword } from '~/server/utils/auth'
import { changePasswordSchema } from '~/shared/schemas'

export default defineEventHandler(async (event) => {
  const session = await requireAdminSession(event)
  const body = await readBody(event)

  const parsed = changePasswordSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid password payload',
      data: { errors: parsed.error.flatten().fieldErrors },
    })
  }

  const db = useDb()
  const currentUsername = (session.user as any)?.username || 'admin'

  // Fetch current user from database
  let currentHash: string | undefined

  try {
    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.username, currentUsername.toLowerCase()))
      .limit(1)

    if (dbUser) {
      currentHash = dbUser.passwordHash
    }
  } catch (err) {
    console.warn('[password.put] Could not fetch user from DB:', err)
  }

  // Fallback to runtime config if not in database
  if (!currentHash) {
    const config = useRuntimeConfig()
    currentHash = (config.adminPasswordHash || process.env.NUXT_ADMIN_PASSWORD_HASH || '$2a$10$xGHRQ5ZDwGgEPYLXCYLhm.S14TmUlUt1GiYwm5R72BlRwCZwz1/WW') as string
  }

  const isValid = await verifyBcryptPassword(parsed.data.currentPassword, currentHash)
  if (!isValid) {
    throw createError({
      statusCode: 401,
      message: 'Current password does not match',
    })
  }

  const newHash = await hashBcryptPassword(parsed.data.newPassword)

  // Update in Neon database
  try {
    const updated = await db
      .update(users)
      .set({
        passwordHash: newHash,
        updatedAt: new Date(),
      })
      .where(eq(users.username, currentUsername.toLowerCase()))

    // If user wasn't in users table yet, insert it
    const [exists] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, currentUsername.toLowerCase()))
      .limit(1)

    if (!exists) {
      await db.insert(users).values({
        username: currentUsername.toLowerCase(),
        passwordHash: newHash,
        name: 'Administrator',
        role: 'admin',
      })
    }
  } catch (dbErr) {
    console.error('[password.put] Failed to persist new password in database:', dbErr)
  }

  return {
    success: true,
    newHash,
    message: 'Password updated successfully in database.',
  }
})
