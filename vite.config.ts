import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
// Vercel deployment uses root '/'
// GitHub Pages copy is built separately via deploy script
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
})
