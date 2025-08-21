import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0', // <- Allows access from external hosts (e.g., EC2 DNS)
    allowedHosts:true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5007',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
