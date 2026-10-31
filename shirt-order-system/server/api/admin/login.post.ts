import { defineEventHandler, readBody, createError, getRequestIP } from 'h3'
import { createHash } from 'node:crypto'
import { useDb } from '~/server/utils/db'
import { adminLoginSchema } from '~/shared/schemas'
import { verifyPassword } from '~/server/utils/auth'
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

    // Rate limit login attempts by IP
    const clientIp = getRequestIP(event, { xForwardedFor: true }) || '127.0.0.1'
    const ipHash = hashIp(clientIp)

    await checkRateLimit(db, {
      key: `login:${ipHash}`,
      maxAttempts: 5,
      windowMinutes: 15,
      errorMessage: 'Too many login attempts. Please try again later.',
    })

    // Check credentials from runtime config
    const config = useRuntimeConfig()
    const adminUsername = config.adminUsername as string
    const adminPasswordHash = config.adminPasswordHash as string

    if (!adminUsername || !adminPasswordHash) {
      console.error('Admin credentials not configured in environment')
      throw createError({
        statusCode: 500,
        message: 'Server configuration error',
      })
    }

    if (username !== adminUsername) {
      throw createError({
        statusCode: 401,
        message: 'Invalid username or password',
      })
    }

    const passwordValid = await verifyPassword(password, adminPasswordHash)

    if (!passwordValid) {
      throw createError({
        statusCode: 401,
        message: 'Invalid username or password',
      })
    }

    // Set session using nuxt-auth-utils
    await setUserSession(event, {
      user: {
        role: 'admin' as const,
        username,
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
