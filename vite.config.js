import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://solar-energy-serv.onrender.com',
    },
  },
});
