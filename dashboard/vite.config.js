import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // Proxy API requests to avoid CORS issues in the browser
    proxy: {
      '/api': {
        target: 'http://20.207.122.201',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/evaluation-service')
      }
    }
  }
});
