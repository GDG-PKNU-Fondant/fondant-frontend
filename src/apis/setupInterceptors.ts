import {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

export const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken && config.headers) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;
      const responseData = error.response?.data as {
        errorCode?: string;
        message?: string;
      };

      const errorCode = responseData?.errorCode;

      if (errorCode === 'ACCESS_INVALID' || errorCode === 'ACCESS_EXPIRED') {
        try {
          const refreshResponse = await instance.post(
            '/api/user/reissue',
            null,
            {
              withCredentials: true,
            },
          );
          const newAccessToken = refreshResponse.data.content.accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          if (originalRequest?.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return await instance(originalRequest);
          }
        } catch (refreshError) {
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      if (errorCode === 'REFRESH_INVALID' || errorCode === 'REFRESH_EXPIRED') {
        window.location.href = '/login';
      }

      return Promise.reject(error);
    },
  );
};

export default setupInterceptors;
