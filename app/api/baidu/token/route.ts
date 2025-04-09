import { NextRequest } from 'next/server';
import { apiHandler } from '@/middlewares/apiHandler';
import { ErrorCode } from '@/enums/errorCodes';
import { ApiError } from '@/utils/errors';
import { Redis } from '@upstash/redis';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { createSuccessResponse } from '@/utils/response';
import { v4 as uuidv4 } from 'uuid';

const verifyCodeSchema = z.object({
  verifyCode: z.string().min(1, '验证码不能为空'),
});

async function handler(request: NextRequest) {
  const body = await request.json();
  const { verifyCode } = verifyCodeSchema.parse(body);
  console.log(body, 'body');
  const redis = Redis.fromEnv();
  //生成一个uuid 放进 redis
  const token = await redis.get(`baidu_token_${verifyCode}`);

  if (!token) {
    throw new ApiError(ErrorCode.VERIFY_CODE_ERROR);
  }
  const uuid = uuidv4();
  await redis.set(`baidu_uuid_${uuid}`, 1, {
    ex: 60 * 60 * 2,
  });

  return NextResponse.json(createSuccessResponse({ uuid }, '验证码正确'), { status: 200 });
}

export const POST = apiHandler(handler);
