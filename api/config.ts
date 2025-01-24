import axios from 'axios';
// axios configuration
const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 1500,
  headers: {},
});

// axios request interceptor to handle request customization
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// axios response interceptor to handle response customization
axios.interceptors.response.use(
  (config) => {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
