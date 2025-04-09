export enum ErrorCode {
  // HTTP 标准错误 (400-500)
  BAD_REQUEST = 'BAD_REQUEST', // 400
  UNAUTHORIZED = 'UNAUTHORIZED', // 401
  FORBIDDEN = 'FORBIDDEN', // 403
  NOT_FOUND = 'NOT_FOUND', // 404
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED', // 405
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR', // 500

  // 业务错误 (1000+)
  INVALID_PARAMS = 'INVALID_PARAMS', // 1001
  VERIFY_CODE_ERROR = 'VERIFY_CODE_ERROR', // 1002
  BAIDU_COOKIE_NOT_FOUND = 'BAIDU_COOKIE_NOT_FOUND', // 1003
  BAIDU_PARSE_DIR_NOT_FOUND = 'BAIDU_PARSE_DIR_NOT_FOUND', // 1004
  BAIDU_FILE_PARSE_FAILED = 'BAIDU_FILE_PARSE_FAILED', // 1005
  TRANSFER_FILE_FAILED = 'TRANSFER_FILE_FAILED', // 1006
}

// 错误码对应的错误消息
export const ErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.BAD_REQUEST]: '请求参数错误',
  [ErrorCode.UNAUTHORIZED]: '未授权访问',
  [ErrorCode.FORBIDDEN]: '禁止访问',
  [ErrorCode.NOT_FOUND]: '资源未找到',
  [ErrorCode.METHOD_NOT_ALLOWED]: '请求方法不允许',
  [ErrorCode.INTERNAL_SERVER_ERROR]: '服务器内部错误',
  [ErrorCode.INVALID_PARAMS]: '参数验证失败',
  [ErrorCode.VERIFY_CODE_ERROR]: '验证码错误',
  [ErrorCode.BAIDU_COOKIE_NOT_FOUND]: '百度网盘 Cookie 未配置',
  [ErrorCode.BAIDU_PARSE_DIR_NOT_FOUND]: '百度网盘解析目录未配置',
  [ErrorCode.BAIDU_FILE_PARSE_FAILED]: '百度网盘文件解析失败',
  [ErrorCode.TRANSFER_FILE_FAILED]: '文件转存失败',
};
