
// https://vitejs.dev/config/
/*export default defineConfig(revc_({
  plugins: [react()],
}))*/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-ten-ruby.vercel.app',
        changeOrigin: true,
        secure: true
      }
    }
  }
})

