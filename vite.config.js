import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0',
    // Change this line
    allowedHosts: ['.compute-1.amazonaws.com'], // ✅ More robust solution
    // Or, for a quick fix, use the specific hostname:
    // allowedHosts: ['ec2-50-16-20-9.compute-1.amazonaws.com'], 
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