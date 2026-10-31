import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  const realtimeUrl = process.env.NEON_REALTIME_URL
  const hasSecret = Boolean(process.env.NEON_REALTIME_SECRET)

  return {
    success: true,
    service: 'Neon Realtime',
    url: realtimeUrl,
    hasSecret,
    status: realtimeUrl && hasSecret ? 'ready' : 'unconfigured',
  }
})

