"use server"

import { PutObjectCommand,S3Client } from "@aws-sdk/client-s3"
// import { awsClient } from './awsClient'

const awsClient = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  region: process.env.AWS_REGION || '',

})

export const awsPutObject=async (key: string, body: any)=>{

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: body,
  })
  try {
    const response = await awsClient.send(command)
    console.log('awsPutObject response', response)

  } catch (err: any) {
    console.log(err.message)
  }

}