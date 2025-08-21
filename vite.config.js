import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0', // listen on all network interfaces
    port: 5173,
    allowedHosts: [
      'ec2-50-16-20-9.compute-1.amazonaws.com' // ✅ allow your EC2 public DNS
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:5007',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
