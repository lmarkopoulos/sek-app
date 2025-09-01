import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite as ESM (.mts) to avoid "ESM-only" require issues
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 }
})
