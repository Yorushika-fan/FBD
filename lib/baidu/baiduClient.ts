import { request } from '@/utils/axios';
import { BaiduApiUrl, BaiduApiType, GetFileListParams, BaiduFile, TransferParams } from '@/types/baidu';

/**
 * 百度网盘解析相关工具方法
 */
export const BaiduClient = {
  /**
   * 获取文件列表
   */
  getFileList(params: GetFileListParams) {
    return request.post(BaiduApiUrl, {
      type: BaiduApiType.GetFileList,
      params,
    });
  },

  /**
   * 获取下载链接
   */
  getDownloadLink(params: TransferParams) {
    return request.post(BaiduApiUrl, {
      type: BaiduApiType.GetDownloadLink,
      params,
    });
  },
  /**
   * 获取签名信息
   */
  async getSign(shareId: string, uk: string) {
    const url = `https://pan.baidu.com/share/tplconfig?shareid=${shareId}&uk=${uk}&fields=sign,timestamp&channel=chunlei&web=1&app_id=250528&clienttype=0`;
    return await request.get(url);
  },

  /**
   * 转移文件
   */
  // transferFile(params: TransferParams) {
  //   return request.post(BaiduApiUrl, {
  //     type: BaiduApiType.TransferFile,
  //     params,
  //   });
  // },

  /**
   * 检查目录是否存在
   */
  async checkDir(cookie: string): Promise<boolean> {
    try {
      const response = await request.get('https://pan.baidu.com/api/list', {
        params: {
          channel: 'chunlei',
          app_id: 250528,
          dir: '/',
          order: 'name',
          desc: 0,
          start: 0,
          limit: 500,
          web: 1,
          clienttype: 0,
        },
        headers: {
          Cookie: cookie,
        },
      });

      return response.list.some((item: BaiduFile) => item.path === '/parse_file' && item.isdir === 1);
    } catch {
      return false;
    }
  },

  /**
   * 创建短链接
   */
  async createShortUrl(url: string, surl: string, fsid: number, domain: string): Promise<string> {
    const shortCode = `${surl}:${fsid}`;
    return `${domain}/api/v1/s/${shortCode}`;
  },
};

export default BaiduClient;
