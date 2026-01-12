import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { env } from '../../schemas/common/envSchema.ts';
import { AuthError } from '../../errors/customErrors.ts';
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const authenticatedClient = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

authenticatedClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const original = error.config as CustomInternalAxiosRequestConfig;

    if (error.response?.status === 401 && original.url?.includes('/auth/token')) {
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      throw new AuthError(
        error.response?.data?.message ?? '인증에 실패했습니다.',
        error.response?.status ?? 401
      );
    }

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        await authenticatedClient.post('/auth/token');
        return authenticatedClient(original);
      } catch (err) {
        throw new AuthError(
          err instanceof AxiosError
            ? (err.response?.data?.message ?? '인증에 실패했습니다.')
            : '인증에 실패했습니다.',
          err instanceof AxiosError ? (err.response?.status ?? 401) : 401
        );
      }
    }

    return Promise.reject(error);
  }
);
