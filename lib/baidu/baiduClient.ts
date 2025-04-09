import { request } from '@/utils/axios';
import { GetFileListParams, TransferParams, GetFileListResponse } from '@/types/baidu';
import { Baidu } from '@/enums/apiUrls';

/**
 * 百度网盘解析相关工具方法
 */
export const BaiduClient = {
  /**
   * 获取文件列表
   */
  getFileList(params: GetFileListParams) {
    return request.post<GetFileListResponse>(Baidu.GetFileList, params);
  },

  /**
   * 获取下载链接
   */
  getDownloadLink(params: TransferParams) {
    return request.post(Baidu.GetDownloadLink, params);
  },

  getToken(verifyCode: string) {
    return request.post(Baidu.GetToken, {
      verifyCode,
    });
  },
};

export default BaiduClient;
