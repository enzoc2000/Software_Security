import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  preview: {
    host: true,
    port: 5173,
    // https: {
    //   key: 'path/to/your/key.pem',
    //   cert: 'path/to/your/cert.pem',
    // },
  },
  plugins: [
    react(),
    tailwindcss(),
  ]
})
