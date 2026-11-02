import { defineEventHandler, readBody, createError, getRequestIP } from 'h3'
import { createHash } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { useDb } from '~/server/utils/db'
import { users } from '~/server/database/schema'
import { adminLoginSchema } from '~/shared/schemas'
import { verifyBcryptPassword } from '~/server/utils/auth'
import { checkRateLimit } from '~/server/utils/rate-limit'

function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex')
}

export default defineEventHandler(async (event) => {
  const db = useDb()

  try {
    const body = await readBody(event)
    const parsed = adminLoginSchema.safeParse(body)

    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        message: 'Validation failed',
        data: { errors: parsed.error.flatten().fieldErrors },
      })
    }

    const { username, password } = parsed.data
    const inputUsername = username.trim().toLowerCase()

    // Rate limit login attempts by IP (max 10 attempts per 15 minutes)
    const clientIp = getRequestIP(event, { xForwardedFor: true }) || '127.0.0.1'
    const ipHash = hashIp(clientIp)

    await checkRateLimit(db, {
      key: `login:${ipHash}`,
      maxAttempts: 10,
      windowMinutes: 15,
      errorMessage: 'Too many login attempts. Please try again later.',
    })

    // 1. Check user in Neon database `users` table
    let authenticatedUser: { id?: number; username: string; name: string; role: string } | null = null

    try {
      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.username, inputUsername))
        .limit(1)

      if (dbUser) {
        const isValid = await verifyBcryptPassword(password, dbUser.passwordHash)
        if (isValid) {
          authenticatedUser = {
            id: dbUser.id,
            username: dbUser.username,
            name: dbUser.name,
            role: dbUser.role,
          }
        }
      }
    } catch (dbErr) {
      console.warn('[login] Could not query users table, falling back to environment config:', dbErr)
    }

    // 2. Fallback to runtime config / env credentials if not found or matched in database
    if (!authenticatedUser) {
      const config = useRuntimeConfig()
      const envUsername = ((config.adminUsername || process.env.NUXT_ADMIN_USERNAME || 'admin') as string).trim().toLowerCase()
      const envPasswordHash = (config.adminPasswordHash || process.env.NUXT_ADMIN_PASSWORD_HASH || '$2a$10$xGHRQ5ZDwGgEPYLXCYLhm.S14TmUlUt1GiYwm5R72BlRwCZwz1/WW') as string

      if (inputUsername === envUsername) {
        const isValid = await verifyBcryptPassword(password, envPasswordHash)
        if (isValid) {
          authenticatedUser = {
            username: envUsername,
            name: 'System Admin',
            role: 'admin',
          }

          // Sync into users table in Neon so it's persisted for the future
          try {
            await db
              .insert(users)
              .values({
                username: envUsername,
                passwordHash: envPasswordHash,
                name: 'System Admin',
                role: 'admin',
              })
              .onConflictDoNothing()
          } catch (syncErr) {
            console.warn('[login] Non-critical error syncing user to DB:', syncErr)
          }
        }
      }
    }

    // 3. Reject if credentials do not match
    if (!authenticatedUser) {
      throw createError({
        statusCode: 401,
        message: 'Invalid username or password',
      })
    }

    // 4. Set sealed session cookie using nuxt-auth-utils
    await setUserSession(event, {
      user: {
        role: authenticatedUser.role as 'admin',
        username: authenticatedUser.username,
        name: authenticatedUser.name,
      },
    })

    return { success: true }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Login error:', error)
    throw createError({
      statusCode: 500,
      message: 'Login failed',
    })
  }
})
