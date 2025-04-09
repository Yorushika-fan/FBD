import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { useLoadingStore } from '@/store/loading';
import useCommonStore from '@/store/common';
import { ErrorCode } from '@/enums/errorCodes';
import { ApiError } from '@/utils/errors';
import { redirect } from 'next/navigation';
// 响应数据的基础接口
export interface BaseResponse<T = unknown> {
  code: ErrorCode;
  message: string;
  data: T;
}

// 扩展 AxiosRequestConfig 类型
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retry?: number;
  retryDelay?: number;
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseURL) {
  toast.error('NEXT_PUBLIC_API_BASE_URL is not defined');
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}
// 创建请求配置
const config = {
  // 基础URL，可以通过环境变量配置
  baseURL,
  // 超时时间
  timeout: 300000,
  // 请求重试次数
  retry: 3,
  // 请求重试延迟
  retryDelay: 1000,
};

// 创建 axios 实例
const instance: AxiosInstance = axios.create(config);

// 请求拦截器
instance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    useLoadingStore.getState().setLoading(true);
    const uuid = useCommonStore.getState().uuid;
    if (uuid) {
      config.headers['uuid'] = uuid;
    }
    return config;
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    useLoadingStore.getState().setLoading(false);
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    useLoadingStore.getState().setLoading(false);
    const { data } = response;
    const { code, message, data: responseData } = data;

    switch (code) {
      case 0:
        toast.success(message);
        return responseData;
      case ErrorCode.VERIFY_CODE_ERROR:
        toast.error(message);
        return Promise.reject(data);
      case ErrorCode.BAD_REQUEST:
        toast.error(message);
        return Promise.reject(data);
      case ErrorCode.UNAUTHORIZED:
        toast.error(message);
        useCommonStore.getState().reset();
        setTimeout(() => {
          redirect('/parse');
        }, 3000);
        return Promise.reject(data);
      case ErrorCode.FORBIDDEN:
        return Promise.reject(data);
    }
  },
  async (error: AxiosError) => {
    useLoadingStore.getState().setLoading(false);

    // 处理 HTTP 错误
    if (error.response) {
      const status = error.response.status;
      let errorCode: ErrorCode;

      switch (status) {
        case 400:
          errorCode = ErrorCode.BAD_REQUEST;
          break;
        case 401:
          errorCode = ErrorCode.UNAUTHORIZED;
          break;
        case 403:
          errorCode = ErrorCode.FORBIDDEN;
          break;
        case 404:
          errorCode = ErrorCode.NOT_FOUND;
          break;
        case 405:
          errorCode = ErrorCode.METHOD_NOT_ALLOWED;
          break;
        default:
          errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
      }

      const apiError = new ApiError(errorCode);
      toast.error(apiError.message);
      return Promise.reject(apiError);
    }

    // 处理网络错误
    const apiError = new ApiError(ErrorCode.INTERNAL_SERVER_ERROR);
    toast.error(apiError.message);
    return Promise.reject(apiError);
  },
);

// 封装请求方法
export const request = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, config);
  },

  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return instance.post(url, data, config);
  },

  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return instance.put(url, data, config);
  },

  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.delete(url, config);
  },

  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return instance.patch(url, data, config);
  },
};

// 导出实例和请求方法
export default instance;
