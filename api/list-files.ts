import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

export default async function handler() {
  try {
    // Cloudflare R2配置
    const r2Config = {
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT || 'https://pub-12fc31f50c7e427a8bf85d595cb1a92e.r2.dev',
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || ''
      }
    }

    const s3Client = new S3Client(r2Config)

    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME || 'your-bucket-name'
    })
    const response = await s3Client.send(command)
    
    // 处理文件列表，添加完整的URL
    const files = (response.Contents || []).map((file: any) => ({
      name: file.Key,
      url: `${process.env.R2_ENDPOINT || 'https://pub-12fc31f50c7e427a8bf85d595cb1a92e.r2.dev'}/${encodeURIComponent(file.Key)}`,
      size: file.Size,
      lastModified: file.LastModified
    }))
    
    return {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // 允许跨域请求
      },
      body: JSON.stringify(files)
    }
  } catch (error) {
    console.error('Error listing R2 files:', error)
    return {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Failed to list files' })
    }
  }
}
