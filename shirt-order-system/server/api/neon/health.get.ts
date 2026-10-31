import { defineEventHandler } from 'h3'
import { sql } from 'drizzle-orm'
import { useDb } from '~/server/utils/db'
import { uploadObjectToBucket, getObjectFromBucket, listBucketObjects } from '~/server/utils/storage'

export default defineEventHandler(async () => {
  const results: Record<string, any> = {}

  // 1. Test Neon Postgres
  try {
    const db = useDb()
    const dbTest = await db.execute(sql`SELECT current_database(), current_user, version(), count(*) as table_count FROM information_schema.tables WHERE table_schema = 'public';`)
    const settingsCount = await db.execute(sql`SELECT count(*) as count FROM settings;`)
    const ordersCount = await db.execute(sql`SELECT count(*) as count FROM orders;`)

    results.postgres = {
      status: 'healthy',
      database: dbTest.rows[0]?.current_database,
      user: dbTest.rows[0]?.current_user,
      publicTables: Number(dbTest.rows[0]?.table_count || 0),
      settingsRows: Number(settingsCount.rows[0]?.count || 0),
      ordersRows: Number(ordersCount.rows[0]?.count || 0),
    }
  } catch (err: any) {
    results.postgres = { status: 'error', message: err.message }
  }

  // 2. Test Neon Functions
  try {
    const functionUrl = process.env.NEON_FUNCTION_HELLO_BASE_URL
    if (functionUrl) {
      const res = await fetch(functionUrl)
      const text = await res.text()
      results.functions = {
        status: 'healthy',
        url: functionUrl,
        response: text.trim(),
      }
    } else {
      results.functions = { status: 'unconfigured' }
    }
  } catch (err: any) {
    results.functions = { status: 'error', message: err.message }
  }

  // 3. Test Neon Object Storage
  try {
    const testKey = `test/health-check-${Date.now()}.txt`
    const testContent = `Neon Object Storage Health Check at ${new Date().toISOString()}`
    
    // Upload test file
    await uploadObjectToBucket(testKey, testContent, 'text/plain')
    
    // Read back test file
    const fetched = await getObjectFromBucket(testKey)
    const readContent = fetched.data ? fetched.data.toString('utf-8') : null

    // List objects in bucket
    const objects = await listBucketObjects()

    results.objectStorage = {
      status: 'healthy',
      bucket: process.env.NEON_OBJECT_STORAGE_BUCKET || 'assets',
      testKey,
      verifiedWriteRead: readContent === testContent,
      totalObjectsInBucket: objects.length,
    }
  } catch (err: any) {
    results.objectStorage = { status: 'error', message: err.message }
  }

  // 4. Test Neon Realtime
  try {
    const rtUrl = process.env.NEON_REALTIME_URL
    const rtSecret = process.env.NEON_REALTIME_SECRET
    results.realtime = {
      status: rtUrl && rtSecret ? 'configured' : 'unconfigured',
      url: rtUrl,
      hasSecret: Boolean(rtSecret),
    }
  } catch (err: any) {
    results.realtime = { status: 'error', message: err.message }
  }

  return {
    timestamp: new Date().toISOString(),
    branch: process.env.NEON_BRANCH || 'production',
    services: results,
  }
})

