import { reactEasierViteConfig as revc_ } from 'react-easier/vite-config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(revc_({
  plugins: [react()],
}))


// https://vitejs.dev/config/
/*export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/': {
        target: 'https://backend-ten-ruby.vercel.app',
        changeOrigin: true,
        secure: true
      }
    }
  }
})*/

