import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/restcountries': {
        target: 'https://restcountries.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});