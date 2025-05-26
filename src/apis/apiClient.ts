import axios from 'axios';
import setupInterceptors from '@apis/setupInterceptors';

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

setupInterceptors(apiClient);

export default apiClient;
