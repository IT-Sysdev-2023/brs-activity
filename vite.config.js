import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

const host = 'blog.bankrs.com';
// https://vitejs.dev/config/

//https://dev.to/boostup/uncaught-referenceerror-process-is-not-defined-12kg

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.PUSHER_APP_KEY': JSON.stringify(env.PUSHER_APP_KEY)
    },
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
  }
})