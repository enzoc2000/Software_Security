import { defineConfig } from 'vite'
import fs from 'fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5173,
    https: {
      key: fs.readFileSync('localhost.key'),
      cert: fs.readFileSync('localhost.crt'),
    },
  },
  preview: {
    host: true,
    port: 5173,
    https: {
      key: './localhost.key',
      cert: './localhost.crt',
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ]
})
