import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Same-origin proxy so captions work even when the page is HTTPS (Vercel)
      // or when the browser would otherwise block http://16.16.124.190.
      '/abol-proxy': {
        target: 'http://16.16.124.190',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/abol-proxy/, ''),
      },
      // Job-card strips audio-summary-api to `.origin`, then POSTs `/api/...`.
      '/api': {
        target: 'http://16.16.124.190',
        changeOrigin: true,
      },
    },
  },
  preview: {
    proxy: {
      '/abol-proxy': {
        target: 'http://16.16.124.190',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/abol-proxy/, ''),
      },
      '/api': {
        target: 'http://16.16.124.190',
        changeOrigin: true,
      },
    },
  },
})

