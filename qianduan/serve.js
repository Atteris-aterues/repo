import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// 静态文件服务
app.use(express.static(path.join(__dirname, 'dist')))

// SPA路由支持 - 所有路由都返回index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const HOST = process.env.HOST || '0.0.0.0'
const BASE_PORT = parseInt(process.env.PORT || '8081', 10)

function startServer(port) {
  const server = app.listen(port, HOST, () => {
    const displayHost = HOST === '0.0.0.0' ? 'localhost' : HOST
    console.log(`服务器运行在 http://${displayHost}:${port}`)
  })

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = port + 1
      if (nextPort > BASE_PORT + 20) {
        console.error(`端口范围 ${BASE_PORT}-${BASE_PORT + 20} 均被占用，启动失败。`)
        process.exit(1)
      }
      console.warn(`端口 ${port} 已被占用，尝试使用端口 ${nextPort}...`)
      startServer(nextPort)
    } else {
      console.error('服务器启动错误：', err)
      process.exit(1)
    }
  })
}

startServer(BASE_PORT)
