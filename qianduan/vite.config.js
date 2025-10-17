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
  }
})
