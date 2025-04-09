// utils/errors.ts

import { ErrorCode, ErrorMessages } from '../enums/errorCodes';

// 定义 ApiError 类
export class ApiError extends Error {
  code: ErrorCode;
  data?: unknown;

  constructor(code: ErrorCode, data?: unknown) {
    super(ErrorMessages[code]);
    this.code = code;
    this.data = data;
  }
}
