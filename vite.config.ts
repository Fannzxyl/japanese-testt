// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  base: '/japanese-testt/',   // HARUS sama persis dengan nama repo GitHub
  build: { outDir: 'docs' },  // hasil build masuk ke folder docs
  resolve: {
    alias: { '@': resolve(__dirname, '.') }
  }
})
