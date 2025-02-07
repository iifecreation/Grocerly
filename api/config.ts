import axios from 'axios';
import {appState, useAuthStore} from '@/store/store';

// axios configuration
const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    Authorization: `Bearer ${appState}`,
  },
});

// axios request interceptor to handle request customization
axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  function (error) {
    console.log('🚀 ~ error:', error);
    // return Promise.reject(error);
  },
);

// axios response interceptor to handle response customization
axiosInstance.interceptors.response.use(
  config => {
    return config;
  },
  function (error) {
    // console.log('🚀 ~ error:', error.response?.data);
    return Promise.reject(error.response?.data);
  },
);

export default axiosInstance;
