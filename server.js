import { createServer } from 'http'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createReadStream } from 'fs'
import { handleListFiles } from './src/server/list-files.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const publicDir = join(__dirname, 'dist')

const server = createServer(async (req, res) => {
  // 处理API请求
  if (req.url === '/api/list-files') {
    const response = await handleListFiles()
    res.writeHead(response.status, response.headers)
    res.end(response.body)
    return
  }

  // 处理静态文件请求
  let filePath = join(publicDir, req.url === '/' ? 'index.html' : req.url)
  
  try {
    const stream = createReadStream(filePath)
    stream.on('error', () => {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('<h1>404 Not Found</h1>')
    })
    stream.pipe(res)
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/html' })
    res.end('<h1>500 Internal Server Error</h1>')
  }
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
