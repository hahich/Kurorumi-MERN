import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: ["kurorumi.shop", "www.kurorumi.shop"],
    cors: true,
  },
  plugins: [react()],
})
