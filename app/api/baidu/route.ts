import { NextResponse } from 'next/server';
import * as BaiduAPI from './baidu';
import { AxiosError } from 'axios';

interface BaiduApiResponse {
  message?: string;
  [key: string]: any;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, params } = body;

    let result;
    switch (type) {
      case 'getFileList':
        result = await BaiduAPI.getFileList(params);
        break;

      // case 'transferFile':
      //   result = await BaiduAPI.transferFile(params);
      //   break;

      case 'getDownloadLink':
        result = await BaiduAPI.getDownloadLink(params);
        break;

      case 'checkFileStatus':
        result = await BaiduAPI.checkFileStatus(params.fsId);
        break;

      case 'getShareInfo':
        result = await BaiduAPI.getShareInfo(params.surl);
        break;

      default:
        return NextResponse.json({ error: 'Unknown API type' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('API Error:', error);
    const axiosError = error as AxiosError<BaiduApiResponse>;
    return NextResponse.json(
      { error: axiosError.response?.data?.message || 'API request failed' },
      { status: axiosError.response?.status || 500 },
    );
  }
}
