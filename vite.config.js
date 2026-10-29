import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const countriesProxy = {
    '/api/countries': {
      target: 'https://api.restcountries.com',
      changeOrigin: true,
      secure: true,
      headers: {
        Authorization: `Bearer ${env.REST_COUNTRIES_API_KEY || 'rc_live_demo'}`,
      },
      rewrite: (path) => path.replace(/^\/api\/countries/, '/countries/v5'),
    },
  };

  return {
    plugins: [react()],
    server: { proxy: countriesProxy },
    preview: { proxy: countriesProxy },
  };
});