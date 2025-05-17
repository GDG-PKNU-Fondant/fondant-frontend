import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
