import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'

export function getNeonS3Client() {
  const endpoint = process.env.AWS_ENDPOINT_URL_S3
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  const region = process.env.AWS_REGION || 'ap-southeast-1'

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error('Neon Object Storage environment variables (AWS_ENDPOINT_URL_S3, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY) are not configured')
  }

  return new S3Client({
    endpoint,
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: true,
  })
}

export async function uploadObjectToBucket(
  key: string,
  body: Buffer | Uint8Array | string,
  contentType = 'application/octet-stream',
  bucket = process.env.NEON_OBJECT_STORAGE_BUCKET || 'assets'
) {
  const client = getNeonS3Client()
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: typeof body === 'string' ? Buffer.from(body) : body,
      ContentType: contentType,
    })
  )
  return { success: true, bucket, key }
}

export async function getObjectFromBucket(
  key: string,
  bucket = process.env.NEON_OBJECT_STORAGE_BUCKET || 'assets'
) {
  const client = getNeonS3Client()
  const res = await client.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  )
  const bytes = await res.Body?.transformToByteArray()
  return {
    key,
    contentType: res.ContentType,
    data: bytes ? Buffer.from(bytes) : null,
  }
}

export async function listBucketObjects(
  bucket = process.env.NEON_OBJECT_STORAGE_BUCKET || 'assets'
) {
  const client = getNeonS3Client()
  const res = await client.send(
    new ListObjectsV2Command({
      Bucket: bucket,
    })
  )
  return res.Contents || []
}

