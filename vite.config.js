import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  resolve: {
    alias: {
      'crypto': 'crypto-browserify',
    },
  },
  define: {
    "process.env": process.env,
    "process.browser": true,
    global: {},
  },
  css: {
    preprocessorOptions: {
      scss: {
        // api: "modern-compiler" // or 'modern'
        silenceDeprecations: ['legacy-js-api'],
      }
    }
  }
})
