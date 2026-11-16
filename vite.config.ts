import react from '@vitejs/plugin-react'
import type { ProxyOptions } from 'vite'
import { defineConfig, loadEnv } from 'vite'

/**
 * Dev proxies:
 * - `/abol-proxy` + `/api` → Abol Kit API (local Compose by default)
 * - `/abol-minio` → MinIO with Host `localhost:9000` (presigned URL requirement)
 *
 * Override targets with ABOL_API_PROXY_TARGET / ABOL_MINIO_ORIGIN.
 * Vercel uses vercel.json → EC2 (and needs Caddy `/abol-minio` there).
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = (env.ABOL_API_PROXY_TARGET || 'http://127.0.0.1:8787').replace(/\/+$/, '')
  const minioTarget = (env.ABOL_MINIO_ORIGIN || 'http://127.0.0.1:9000').replace(/\/+$/, '')

  const proxy: Record<string, ProxyOptions> = {
    '/abol-proxy': {
      target: apiTarget,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/abol-proxy/, ''),
    },
    '/api': {
      target: apiTarget,
      changeOrigin: true,
    },
    '/abol-minio': {
      target: minioTarget,
      changeOrigin: false,
      rewrite: (path) => path.replace(/^\/abol-minio/, ''),
      configure: (proxyServer) => {
        proxyServer.on('proxyReq', (proxyReq) => {
          proxyReq.setHeader('host', 'localhost:9000')
        })
      },
    },
  }

  return {
    plugins: [react()],
    server: { proxy },
    preview: { proxy },
  }
})
