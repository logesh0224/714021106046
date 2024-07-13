import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/fetch-products': {
        target: 'http://localhost:3000', // Backend server URL
        changeOrigin: true,
        secure: false
      }
    }
  }
});
