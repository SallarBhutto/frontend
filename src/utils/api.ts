import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // Replace with your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// apiClient.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token'); // Or wherever you store your token
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

interface ApiResponse<T = any> {
  data: T;
  status: number;
}

export const get = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get<T>(url, config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    // Handle error accordingly
    throw error;
  }
};

export const post = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    // Handle error accordingly
    throw error;
  }
};
