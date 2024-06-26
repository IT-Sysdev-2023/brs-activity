import axios, { AxiosInstance, AxiosError } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.APP_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Redirect to another URL when unauthorized (status code 401)
      window.location.href = process.env.APP_URL; // Replace '/login' with your desired redirect URL
    }

    // You can add more error handling logic as needed

    return Promise.reject(error);
  },
);

export default instance;
