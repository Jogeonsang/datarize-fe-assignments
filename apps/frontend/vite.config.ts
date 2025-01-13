import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' })],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '~lib': path.resolve(__dirname, 'src/lib'),
      '~components': path.resolve(__dirname, 'src/components'),
      '~pages': path.resolve(__dirname, 'src/pages'),
      '~hooks': path.resolve(__dirname, 'src/hooks'),
      '~types': path.resolve(__dirname, 'src/types'),
      '~utils': path.resolve(__dirname, 'src/utils'),
      '~assets': path.resolve(__dirname, 'src/assets'),
    },
  },
})
