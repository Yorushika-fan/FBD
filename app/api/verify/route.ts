import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

const POST = async (request: Request) => {
  const { password } = await request.json();
  const verifyPassword = process.env.VERIFY_PASSWORD;
  if (password == verifyPassword) {
    const code = Math.floor(Math.random() * 900000 + 100000).toString();
    await redis.set(`baidu_token_${code}`, code, { ex: 60 * 5 });
    return NextResponse.json({
      code: 0,
      message: 'success',
      data: code,
    });
  } else {
    return NextResponse.json({
      code: 1,
      message: 'error',
    });
  }
};

export { POST };
