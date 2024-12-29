import axios from 'axios';
import { parseCookies } from 'nookies';

const BASE_URL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com';

export type ApiResponse<T = any> = {
  success: boolean;
  data: T;
  message?: string;
};

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const token = cookies.accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error): Promise<never> => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error): Promise<never> => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
