/** @format */
import axios from './http/axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js/worker';

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

window.Pusher = Pusher;

export default new Echo({
  broadcaster: process.env.WS_DRIVER,
  key: process.env.PUSHER_APP_KEY,
  cluster: process.env.PUSHER_APP_CLUSTER,
  wsHost: process.env.PUSHER_HOST,
  wsPort: '' ?? 80,
  wssPort: '' ?? 443,
  forceTLS: ('https' ?? 'https') === 'https',
  encrypted: true,
  enableStats: false,
  enabledTransports: ['ws', 'wss'],
  authorizer: (channel: any, _:any) => {
    return {
      authorize: (socketId: any, callback: any) => {
        axios
          .post('/broadcasting/auth', {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
});
