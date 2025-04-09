import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLoadingStore } from '@/store/loading';
/**
 * 合并 className，使用 tailwind-merge 处理冲突
 */
const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

// 添加文件大小格式化函数
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${units[i]}`;
};

const getBaiduUrl = (value: string) => {
  const result: {
    pwd: string;
    surl: string;
  } = {
    pwd: '',
    surl: '',
  };
  const regex = /https?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(),]|%[0-9a-fA-F][0-9a-fA-F])+/;
  const codeRegex = /提取码([:：])\s*(([a-zA-Z]|[0-9]){4})/;
  // 数据验证
  if (!regex.test(value)) return result;
  const baiduUrl = regex.exec(value)?.[0];
  if (baiduUrl === undefined) return result;
  const uri = new URL(baiduUrl);
  // 来源验证
  if (uri.host !== 'pan.baidu.com') return result;
  // 提取码
  result.pwd = uri.searchParams.get('pwd') || codeRegex.exec(value)?.[2] || '';
  // 短链接
  result.surl = uri.searchParams.has('surl') ? `1${uri.searchParams.get('surl')!}` : uri.pathname.substring(3);
  return result;
};

const withLoading = async (fn: () => Promise<unknown>) => {
  const { setLoading } = useLoadingStore.getState();
  setLoading(true);
  try {
    return await fn();
  } finally {
    setLoading(false);
  }
};

export { cn, formatFileSize, getBaiduUrl, withLoading };
