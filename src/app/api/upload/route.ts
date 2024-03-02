import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client } from '@aws-sdk/client-s3'
// import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const { filename, contentType } = await request.json()

  try {
    const client = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
      region: process.env.AWS_REGION || 'default',
      endpoint:process.env.S3_ENDPOINT,
      disableHostPrefix:true,
      disableS3ExpressSessionAuth:true,
      forcePathStyle:true,
      
    })
    const { fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_S3_BUCKET || '',
      Key: filename,
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
      ],
      Fields:{},
      Expires: 3600,
    })
    const url=process.env.AWS_S3_PUBLIC_URI || ''
    return Response.json({url, fields })
  } catch (err:any) {
    return Response.json({ error: err.message },{status:400})
  }
}
