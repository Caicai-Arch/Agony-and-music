import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

// Cloudflare R2配置
// 注意：请填写实际的访问密钥和存储桶名称
const r2Config = {
  region: 'auto',
  endpoint: 'https://pub-12fc31f50c7e427a8bf85d595cb1a92e.r2.dev',
  credentials: {
    accessKeyId: 'YOUR_CLOUDFLARE_R2_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_CLOUDFLARE_R2_SECRET_ACCESS_KEY'
  }
}

const s3Client = new S3Client(r2Config)

// 获取R2存储桶中的文件列表
export const getR2Files = async () => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: 'YOUR_BUCKET_NAME' // 请填写实际的存储桶名称
    })
    const response = await s3Client.send(command)
    return response.Contents || []
  } catch (error) {
    console.error('Error listing R2 files:', error)
    return []
  }
}

// 搜索R2存储桶中的文件
export const searchR2Files = async (query: string) => {
  try {
    const files = await getR2Files()
    const searchLower = query.toLowerCase()
    return files.filter((file: any) => 
      file.Key.toLowerCase().includes(searchLower)
    )
  } catch (error) {
    console.error('Error searching R2 files:', error)
    return []
  }
}
