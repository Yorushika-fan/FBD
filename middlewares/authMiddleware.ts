// middleware/authMiddleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/utils/errors';
import { ErrorCode } from '@/enums/errorCodes';
import { Redis } from '@upstash/redis';
// 用于验证 JWT 的中间件
export function authMiddleware(handler: (request: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    console.log('authMiddleware');
    const uuid = request.headers.get('uuid');
    console.log(uuid, 'uuid');

    if (!uuid) {
      throw new ApiError(ErrorCode.UNAUTHORIZED, { message: 'Token is missing' });
    }
    const redis = Redis.fromEnv();
    const token = await redis.get(`baidu_uuid_${uuid}`);
    if (!token) {
      throw new ApiError(ErrorCode.UNAUTHORIZED, { message: 'Token is missing' });
    }
    return handler(request);
  };
}
