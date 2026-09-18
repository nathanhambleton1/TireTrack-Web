import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Served from https://<user>.github.io/TireTrack-Web/, so every asset URL has to
  // carry that prefix. Change this if the repo is renamed or moved to a domain root.
  base: '/TireTrack-Web/',
  server: { port: 3000 },
  build: {
    rollupOptions: {
      output: {
        // Recharts and React change far less often than app code, so splitting
        // them out keeps repeat visits on a warm cache.
        manualChunks: {
          charts: ['recharts'],
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
