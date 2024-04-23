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
      'process.env.PUSHER_APP_KEY': JSON.stringify(env.PUSHER_APP_KEY),
      'process.env.PUSHER_HOST': JSON.stringify(env.PUSHER_HOST),
      'process.env.PUSHER_APP_CLUSTER': JSON.stringify(env.PUSHER_APP_CLUSTER),
      'process.env.PUSHER_APP_ID': JSON.stringify(env.PUSHER_APP_ID),
      'process.env.PUSHER_APP_SECRET': JSON.stringify(env.PUSHER_APP_SECRET),
      'process.env.WS_DRIVER': JSON.stringify(env.WS_DRIVER),
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