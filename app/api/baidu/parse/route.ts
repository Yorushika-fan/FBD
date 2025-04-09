import { NextRequest, NextResponse } from 'next/server';
import { ErrorCode } from '@/enums/errorCodes';
import { ApiError } from '@/utils/errors';
import { apiHandler } from '@/middlewares/apiHandler';
import axios from 'axios';
import { z } from 'zod';
import { createSuccessResponse } from '@/utils/response';
// 定义请求参数的 Schema
const GetFileListParamsSchema = z.object({
  surl: z.string().min(1, '分享链接不能为空'),
  password: z.string().min(1, '提取码不能为空'),
  isroot: z.boolean(),
  dir: z.string().default('/'),
});

async function handler(request: NextRequest) {
  try {
    // 获取请求体
    const body = await request.json();
    // 验证参数
    const validatedParams = GetFileListParamsSchema.parse(body);
    const { surl, password, isroot, dir } = validatedParams;

    const Cookie = process.env.NEXT_PUBLIC_BAIDU_COOKIE;
    if (!Cookie) {
      throw new ApiError(ErrorCode.BAIDU_COOKIE_NOT_FOUND);
    }

    const formData = new URLSearchParams({
      shorturl: surl,
      dir,
      root: isroot ? '1' : '0',
      pwd: password,
      page: '1',
      num: '1000',
      order: 'time',
    });

    const response = await axios.post('https://pan.baidu.com/share/wxlist', formData, {
      params: {
        channel: 'weixin',
        version: '2.2.2',
        clienttype: '25',
        web: '1',
      },
      headers: {
        UserAgent: 'netdisk',
        Cookie,
        Referer: 'https://pan.baidu.com/disk/home',
      },
    });

    const { errno, error_msg = '请求错误', data } = response.data;
    const { list, shareid, uk, seckey } = data;

    if (errno !== 0) {
      throw new ApiError(ErrorCode.BAIDU_FILE_PARSE_FAILED, { message: error_msg });
    }

    return NextResponse.json(createSuccessResponse({ list, shareid, uk, seckey }, '解析成功'), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError(ErrorCode.INVALID_PARAMS, { message: error.errors.map((e) => e.message).join(', ') });
    }

    // 其他错误处理
    throw new ApiError(ErrorCode.INTERNAL_SERVER_ERROR);
  }
}

export const POST = apiHandler(handler);
