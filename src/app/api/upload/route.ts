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
      region: process.env.AWS_REGION,

    })
    const { url, fields, } = await createPresignedPost(client, {
      Bucket: process.env.AWS_S3_BUCKET || '',
      // Key: uuidv4(),
      Key: filename,
      // Conditions: [
      //   ['content-length-range', 0, 10485760], // up to 10 MB
      //   ['starts-with', '$Content-Type', contentType],
      // ],
      // Fields: {
      //   acl: 'public-read',
      //   'Content-Type': contentType,
      // },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    })
    console.log('url:',url)
    console.log('fields:',fields)
    return Response.json({ url, fields })
  } catch (err:any) {
    return Response.json({ error: err.message },{status:400})
  }
}
