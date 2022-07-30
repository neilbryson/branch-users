import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

export function api<T = Record<string, unknown>>(options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    ...options,
  };
  return axios.request(axiosConfig);
}
