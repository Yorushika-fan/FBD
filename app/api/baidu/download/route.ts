import { NextRequest } from 'next/server';
import { apiHandler } from '@/middlewares/apiHandler';
import { ApiError } from '@/utils/errors';
import { ErrorCode } from '@/enums/errorCodes';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { createSuccessResponse } from '@/utils/response';
import { TransferParams, TransferResponse } from '@/types/baidu';

const realLinkHeader = {
  'User-Agent': 'netdisk;FBD;',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'Accept-Encoding': 'gzip, deflate, br, zstd',
  'Cache-Control': 'max-age=0',
  'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'Upgrade-Insecure-Requests': '1',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-User': '?1',
  'Sec-Fetch-Dest': 'document',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
};

const checkTaskStatus = async (taskId: string, bdstoken: string, Cookie: string) => {
  const taskUrl = `https://pan.baidu.com/share/taskquery?taskid=${taskId}&channel=chunlei&web=1&app_id=250528&bdstoken=${bdstoken}&logid=MDVDMTBCQUI2MTg1NjQwMEREMURENTM2NEQwRUM2RUQ6Rkc9MQ==&clienttype=0&dp-logid=33402200798524440066`;
  const taskResponse = await axios.get(taskUrl, {
    headers: {
      ...realLinkHeader,
      Cookie,
    },
  });
  return taskResponse.data;
};

const transferFile = async (
  params: TransferParams,
  Cookie: string,
): Promise<{ errno: number; list: Array<{ to: string; from_fs_id: string }> }> => {
  const { shareId, uk, fsId, randsk, shareUrl } = params;

  const tokenResponse = await axios.get('https://pan.baidu.com/api/gettemplatevariable', {
    params: {
      clienttype: 0,
      app_id: 250528,
      web: 1,
      fields: '["bdstoken","token","uk","isdocuser","servertime"]',
    },
    headers: {
      Cookie,
    },
  });
  const bdstoken = tokenResponse.data.result.bdstoken;
  const encodedRandsk = encodeURIComponent(randsk);
  const parsePath = process.env.BAIDU_PARSE_DIR || '/';
  const data = new URLSearchParams();
  data.append('fsidlist', `[${fsId}]`);
  data.append('path', parsePath);
  console.log(data, 'data');
  const myHeaders = {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    referer: shareUrl,
    Cookie,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };
  const url = `https://pan.baidu.com/share/transfer?shareid=${shareId}&from=${uk}&channel=chunlei&sekey=${encodedRandsk}&ondup=newcopy&web=1&app_id=250528&bdstoken=${bdstoken}&logid=QTU4NjczRTM3OEFDNkI1NUQ0QzExQ0VFOEY5M0VGREQ6Rkc9MQ==&clienttype=0`;
  const response = await axios.post<TransferResponse>(url, data, {
    headers: myHeaders,
  });
  console.log(response.data, 'response.data');
  const { errno, extra, task_id = '' } = response.data;
  console.log(extra, 'extra');
  if (task_id) {
    let taskResponse = {
      errno: 130,
      status: '',
      list: [],
    };
    while (true) {
      taskResponse = await checkTaskStatus(task_id, bdstoken, Cookie);
      const { status } = taskResponse;
      if (status === 'success') {
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
    const { errno, list } = taskResponse;

    return {
      errno,
      list,
    };
  } else {
    return {
      errno,
      list: extra.list,
    };
  }
};

async function handler(request: NextRequest) {
  const params = await request.json();

  if (!params) {
    throw new ApiError(ErrorCode.BAD_REQUEST);
  }

  const Cookie = process.env.NEXT_PUBLIC_BAIDU_COOKIE;

  if (!Cookie) {
    throw new ApiError(ErrorCode.BAIDU_COOKIE_NOT_FOUND);
  }

  const fileInfo = await transferFile(params, Cookie);
  const { errno, list } = fileInfo;

  if (errno !== 0) {
    throw new ApiError(ErrorCode.TRANSFER_FILE_FAILED);
  }

  const parsePath = process.env.BAIDU_PARSE_DIR;
  if (!parsePath) {
    throw new ApiError(ErrorCode.BAIDU_PARSE_DIR_NOT_FOUND);
  }

  const promises = list.map(async (item: { to: string; from_fs_id: string }) => {
    const { to, from_fs_id } = item;
    const encodedPath = encodeURIComponent(to);

    const url = `https://pcs.baidu.com/rest/2.0/pcs/file?method=locatedownload&app_id=250528&path=${encodedPath}&ver=2&time=1676908121&rand=df142c666096ad54f9a9f2de21b02d37d9205722&devuid=O%7C0D9FD9F4941FF7A591BB2A8682D18629&version=7.44.6.1`;
    const response = await axios.get(url, {
      headers: {
        ...realLinkHeader,
        Cookie,
      },
    });

    const dlink = response.data.urls[0].url;
    return {
      fileName: to.replace(parsePath, ''),
      from: from_fs_id,
      dlink,
    };
  });

  const results = await Promise.all(promises);
  return NextResponse.json(createSuccessResponse(results, '获取下载链接成功'), { status: 200 });
}

export const POST = apiHandler(handler);
