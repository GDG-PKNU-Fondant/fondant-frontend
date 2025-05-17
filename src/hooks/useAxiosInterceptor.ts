import { useEffect, useCallback } from 'react';
import {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useNavigate } from 'react-router-dom';

interface AuthorizationErrorResponse {
  errorCode: string;
  message: string;
}

interface AuthorizationError extends AxiosError {
  response?: AxiosResponse<AuthorizationErrorResponse>;
}

const useAxiosInterceptor = (instance: AxiosInstance) => {
  const navigate = useNavigate();

  const handleRequest = useCallback(
    async (config: InternalAxiosRequestConfig) => {
      const accessToken = localStorage.getItem('accessToken');
      const newConfig = { ...config };

      if (accessToken && newConfig.headers) {
        newConfig.headers.Authorization = `Bearer ${accessToken}`;
      }

      return newConfig;
    },
    [],
  );

  const handleResponse = useCallback((response: AxiosResponse) => {
    return response;
  }, []);

  const handleError = useCallback(
    async (error: AuthorizationError) => {
      const { response } = error;

      if (response && response.data) {
        const { errorCode } = response.data;
        if (
          errorCode === 'REFRESH_INVALID' ||
          errorCode === 'REFRESH_EXPIRED'
        ) {
          navigate('/login');
          return Promise.reject(error);
        }

        if (errorCode === 'ACCESS_INVALID' || errorCode === 'ACCESS_EXPIRED') {
          try {
            const refreshResponse = await instance.post(
              '/api/user/reissue',
              null,
              {
                withCredentials: true,
              },
            );
            const newAccessToken = refreshResponse.data.accessToken;
            console.log(newAccessToken);
            localStorage.setItem('accessToken', newAccessToken);

            if (error.config) {
              const newConfig = { ...error.config };
              newConfig.headers = newConfig.headers || {};
              newConfig.headers.Authorization = `Bearer ${newAccessToken}`;
              return instance(newConfig);
            }
          } catch (refreshError) {
            navigate('/login');
            return Promise.reject(refreshError);
          }
        }
      }

      return Promise.reject(error);
    },
    [navigate, instance],
  );

  const setupInterceptors = useCallback(() => {
    const requestInterceptor = instance.interceptors.request.use(
      handleRequest,
      handleError,
    );
    const responseInterceptor = instance.interceptors.response.use(
      handleResponse,
      handleError,
    );

    return { requestInterceptor, responseInterceptor };
  }, [instance, handleRequest, handleResponse, handleError]);

  const ejectInterceptors = useCallback(
    (requestInterceptor: number, responseInterceptor: number) => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    },
    [instance],
  );

  useEffect(() => {
    const { requestInterceptor, responseInterceptor } = setupInterceptors();

    return () => {
      ejectInterceptors(requestInterceptor, responseInterceptor);
    };
  }, [setupInterceptors, ejectInterceptors]);
};

export default useAxiosInterceptor;
