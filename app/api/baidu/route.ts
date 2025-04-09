import { NextResponse } from 'next/server';
import { ErrorCode } from '@/enums/errorCodes';
import { ApiError } from '@/utils/errors';
import * as BaiduAPI from './baidu';
import { Redis } from '@upstash/redis';
import { Error } from './baidu';

const redis = Redis.fromEnv();

export async function POST(request: Request) {
  const body = await request.json();
  const headers = request.headers;
  const verify_code = headers.get('verify_code');
  const { type, params } = body;
  const verify_code_redis = await redis.get(`baidu_token_${verify_code}`);
  console.log(verify_code_redis, 'verify_code_redis');
  if (!verify_code_redis && type != 'verifyCode' && type != 'getFileList') {
    return NextResponse.json(Error('验证码错误或已过期', 10001));
  }
  let result;
  switch (type) {
    case 'getFileList':
      result = await BaiduAPI.getFileList(params);
      break;

    case 'getDownloadLink':
      result = await BaiduAPI.getDownloadLink(params);
      break;

    case 'verifyCode':
      result = await BaiduAPI.verifyCode(params);
      break;

    default:
      throw new ApiError(ErrorCode.NOT_FOUND, 'Unknown API type');
  }

  return NextResponse.json(result);
}
