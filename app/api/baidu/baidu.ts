import axios from 'axios';
import { Redis } from '@upstash/redis';
import { TransferParams, GetFileListParams } from '@/types/baidu';

interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}

interface TransferResponse {
  errno: number;
  extra: {
    list: Array<{
      to: string;
      from_fs_id: string;
    }>;
  };
  task_id?: string;
}

const Success = <T>(data: T, code = 0): ApiResponse<T> => {
  return {
    code,
    message: 'success',
    data,
  };
};

const Error = (message: string, code = 9999) => {
  return {
    code,
    message,
  };
};

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

// 获取文件列表
const getFileList = async (params: GetFileListParams) => {
  const Cookie = process.env.NEXT_PUBLIC_BAIDU_COOKIE;
  if (!Cookie) {
    return Error('BAIDU_COOKIE is not set');
  }
  //解析文件
  const { surl, password, isroot, dir } = params;
  console.log(surl, password, isroot, dir, 'params');
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
  console.log(response.data, 'response.data');
  const { errno, error_msg = '请求错误', data } = response.data;
  const { list, shareid, uk, seckey } = data;
  console.log(list, 'list');
  if (errno !== 0) {
    return Error(error_msg);
  }

  return Success({ list, shareid, uk, seckey });
};

// 传输文件
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

// 获取下载链接
const getDownloadLink = async (params: TransferParams) => {
  const Cookie = process.env.NEXT_PUBLIC_BAIDU_COOKIE;
  if (!Cookie) {
    return Error('BAIDU_COOKIE is not set');
  }
  const res = await transferFile(params, Cookie);
  const { errno, list } = res;
  if (errno !== 0) {
    return Error('转存失败');
  }
  console.log(list, 'list1111');
  const parsePath = process.env.BAIDU_PARSE_DIR || '';

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
    console.log(response.data, 'response.data');
    return {
      fileName: to.replace(parsePath, ''),
      from: from_fs_id,
      dlink,
    };
  });

  const results = await Promise.all(promises);

  return Success(results);
};

// 检查任务状态
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

//获取 token
const verifyCode = async (params: string) => {
  const redis = Redis.fromEnv();
  const token = await redis.get(`baidu_token_${params}`);
  if (token) {
    return Success(true);
  }
  return Error('验证码错误或已过期');
};

export { Success, Error, getFileList, transferFile, getDownloadLink, checkTaskStatus, verifyCode };
