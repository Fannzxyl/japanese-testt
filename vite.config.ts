import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  base: '/japanese-testt/',   // HARUS sama persis dg nama repo
  build: { outDir: 'docs' },  // hasil build ke /docs (branch main)
  resolve: { alias: { '@': resolve(__dirname, '.') } }
})
