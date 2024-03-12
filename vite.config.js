import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://evanescent-beautiful-venus.glitch.me',
        changeOrigin: true,
        secure: true
      }
    }
  }
})

