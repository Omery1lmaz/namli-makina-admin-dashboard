import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000, // burada Vite'in çalıştığı port'u değiştirebilirsiniz
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react({
      // Add this line
      include: '**/*.tsx',
    }),
  ],
});
