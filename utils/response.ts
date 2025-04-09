interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/**
 * 创建成功响应
 * @param data 响应数据
 * @param message 成功消息
 * @returns ApiResponse
 */
export const createSuccessResponse = <T>(data: T, message: string = 'success'): ApiResponse<T> => {
  return {
    code: 0,
    message,
    data,
  };
};

/**
 * 创建错误响应
 * @param message 错误消息
 * @param code 错误码
 * @returns ApiResponse
 */
export const createErrorResponse = (message: string, code: number = 1): ApiResponse<null> => {
  return {
    code,
    message,
    data: null,
  };
};
