import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8081,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  define: {
    'process.env.VUE_APP_API_BASE_URL': JSON.stringify(process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api'),
    'process.env.VUE_APP_ENV': JSON.stringify(process.env.VUE_APP_ENV || 'development')
  }
})
