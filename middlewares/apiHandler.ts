import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/utils/errors';
import { ErrorCode } from '@/enums/errorCodes';

type ApiHandler = (request: NextRequest) => Promise<NextResponse>;

export function apiHandler(handler: ApiHandler) {
  return async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error) {
      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            code: error.code,
            message: error.message,
            data: error.data || null,
          },
          { status: 200 },
        );
      }

      // 处理其他未知错误
      return NextResponse.json(
        {
          code: ErrorCode.INTERNAL_SERVER_ERROR,
          message: '服务器内部错误',
          data: null,
        },
        { status: 500 },
      );
    }
  };
}
