import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@/api',
        replacement: path.resolve(__dirname, './src/api'),
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './'),
      },
    ],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5185',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})

