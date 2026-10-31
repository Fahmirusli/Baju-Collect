import { defineEventHandler, createError } from 'h3'
import { listBucketObjects } from '~/server/utils/storage'

export default defineEventHandler(async () => {
  try {
    const bucket = process.env.NEON_OBJECT_STORAGE_BUCKET || 'assets'
    const objects = await listBucketObjects(bucket)
    return {
      success: true,
      service: 'Neon Object Storage',
      bucket,
      count: objects.length,
      objects: objects.map((o) => ({
        key: o.Key,
        size: o.Size,
        lastModified: o.LastModified,
      })),
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: `Neon Object Storage error: ${error.message}`,
    })
  }
})

