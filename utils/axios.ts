import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 响应数据的基础接口
export interface BaseResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 扩展 AxiosRequestConfig 类型
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retry?: number;
  retryDelay?: number;
}

// 创建请求配置
const config = {
  // 基础URL，可以通过环境变量配置
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
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
    // 在发送请求之前做些什么
    // 例如：添加 token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 2xx 范围内的状态码都会触发该函数
    const { data } = response;

    // Check if this is an error response from your API
    if (data.code !== 0) {
      return Promise.reject(new Error(data.message));
    }

    return data;
  },
  async (error: AxiosError) => {
    const { config, response } = error;
    const customConfig = config as CustomAxiosRequestConfig;

    // 处理请求重试
    if (customConfig && customConfig.retry) {
      const backoff = new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, customConfig.retryDelay || 1000);
      });

      customConfig.retry -= 1;
      await backoff;
      return instance(customConfig);
    }

    // 处理特定的错误状态码
    if (response) {
      switch (response.status) {
        case 401:
          // 未授权，可以在这里处理登出逻辑
          break;
        case 403:
          // 禁止访问
          break;
        case 404:
          // 未找到
          break;
        case 500:
          // 服务器错误
          break;
        default:
          break;
      }
    }

    return Promise.reject(error);
  },
);

// 封装请求方法
export const request = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, config);
  },

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<BaseResponse<T>> {
    return instance.post(url, data, config);
  },

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<BaseResponse<T>> {
    return instance.put(url, data, config);
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<BaseResponse<T>> {
    return instance.delete(url, config);
  },

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<BaseResponse<T>> {
    return instance.patch(url, data, config);
  },
};

// 导出实例和请求方法
export default instance;
