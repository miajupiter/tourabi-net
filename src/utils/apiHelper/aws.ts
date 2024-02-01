"use server"

import { PutObjectCommand, GetObjectCommand,S3Client } from "@aws-sdk/client-s3"
// import { awsClient } from './awsClient'

const awsClient = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  region: process.env.AWS_REGION || '',

})

export const awsGetObject=async (key: string)=>{

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  })
  try {
    const response = await awsClient.send(command)
    console.log('awsGetObject response', response.$metadata)

  } catch (err: any) {
    console.log(err.message)
  }

}


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