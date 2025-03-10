import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://api:8000', // Changed from backend to api
        changeOrigin: true,
        secure: false,
      },
    },
  },
});