import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const functionUrl = config.neonFunctionHelloBaseUrl || process.env.NEON_FUNCTION_HELLO_BASE_URL

  if (!functionUrl) {
    throw createError({
      statusCode: 500,
      message: 'NEON_FUNCTION_HELLO_BASE_URL is not configured',
    })
  }

  try {
    const res = await fetch(functionUrl)
    const text = await res.text()
    return {
      success: true,
      service: 'Neon Functions',
      url: functionUrl,
      response: text,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 502,
      message: `Failed to contact Neon Function: ${error.message}`,
    })
  }
})

