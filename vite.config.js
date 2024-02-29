import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

const host = 'admin.bankrs.com';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host,
    strictPort: true,
    hmr: {
      host,
      clientPort: 5175,
    },
    port: 5175,
    https: {
      key: fs.readFileSync(`storage/ssl/server.key`),
      cert: fs.readFileSync(`storage/ssl/server.crt`),
    },
  },
});
