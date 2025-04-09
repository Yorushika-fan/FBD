// 百度网盘文件类型
export interface BaiduFile {
  // 基础信息
  fs_id: number; // 文件 ID
  path: string; // 文件路径
  server_filename: string; // 服务器上的文件名
  isdir: number; // 是否为目录：0 - 文件，1 - 目录
  size: number; // 文件大小（字节）
  // 文件属性
  category?: number; // 文件分类
  md5?: string; // 文件 MD5 值
  // 链接信息
  dlink?: string; // 下载链接

  // 递归结构用于目录
  children?: BaiduFile[];
}

export interface GetFileListResponse {
  list: BaiduFile[];
  shareid: string;
  uk: string;
  seckey: string;
}

// 分享信息接口
export interface ShareInfo {
  share_id: string;
  uk: string;
  seckey: string;
}
// 文件树组件属性
export interface FileTreeProps {
  node: BaiduFile[];
  shareInfo: ShareInfo;
  surl: string;
  password: string;
  setSurl: (surl: string) => void;
  setPassword: (password: string) => void;
  onFileClick?: (file: BaiduFile) => void;
  selectedFiles?: Set<string>;
  setNode: (node: BaiduFile[]) => void;
  clearStore: () => void;
  setShareInfo: (shareInfo: ShareInfo) => void;
  setNodeChildren: (path: string, data: BaiduFile[]) => Promise<void>;
  onSelectionChange?: (selectedFiles: Set<string>) => void;
  updateNodeLoading: (path: string, isLoading: boolean) => void;
  isInitialized?: boolean;
}

// 请求参数接口
export interface GetFileListParams {
  surl: string;
  password: string;
  isroot: boolean;
  dir: string;
}

export interface TransferParams {
  shareId: string;
  uk: string;
  fsId: string[];
  randsk: string;
  shareUrl: string;
}

// API 响应接口
export interface ApiResponse<T> {
  code: number;
  msg: string;
  data?: T;
}

export interface ParseFileParams {
  fs_id: number;
  randsk: string;
  share_id: string;
  uk: string;
  surl: string;
  short?: boolean;
}

export interface ParseFileResult {
  filename: string;
  filectime: number;
  filemd5: string;
  filefsid: number;
  filesize: number;
  dlink: string;
  ua: string;
  use_cache: boolean;
}

export interface TransferResult {
  to_path: string | null;
  to_fs_id: string | null;
  cookie: [string, number];
}

export interface SvipInfo {
  id: number;
  cookie: string;
  state: number;
}

export interface TransferResponse {
  errno: number;
  extra: {
    list: Array<{
      to: string;
      from_fs_id: string;
    }>;
  };
  task_id?: string;
}
