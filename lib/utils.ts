import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
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

/**
 * 判断路径是否为文件（通过检查是否包含文件扩展名）
 * @param path 需要判断的路径
 * @returns boolean - 如果是文件返回 true，否则返回 false
 */
const isFile = (path: string): boolean => {
  // Remove trailing slashes for consistency
  const cleanPath = path.replace(/\/+$/, '');

  // Get the last segment of the path
  const fileName = cleanPath.split('/').pop() || '';

  // Common file extensions regex (can be expanded as needed)
  const fileExtRegex = /\.(pdf|txt|doc|docx|xls|xlsx|jpg|jpeg|png|gif|mp4|mp3|zip|rar|exe|json|js|ts|jsx|tsx)$/i;

  // Check if the last segment has a valid file extension
  // and doesn't start with a dot (hidden files)
  return fileExtRegex.test(fileName) && !fileName.startsWith('.');
};

/**
 * Opens a URI using a hidden iframe and returns a promise that resolves to whether the URI was handled
 * @param uri The URI to open (e.g. motrix:// protocol)
 * @returns Promise<boolean> - true if the URI was handled, false if it timed out
 */
export function openUri(uri: string): Promise<boolean> {
  return new Promise((resolve) => {
    // Create hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = uri;
    document.body.appendChild(iframe);

    // Set up timeout check
    const startTime = Date.now();
    const task = setInterval(() => {
      const endTime = Date.now();
      if (endTime - startTime > 30) {
        document.body.removeChild(iframe);
        iframe.remove();
        clearInterval(task);
        resolve(false);
        window.removeEventListener('blur', onBlur);
      }
    }, 50);

    // Handle successful protocol activation
    const onBlur = () => {
      iframe.remove();
      clearInterval(task);
      resolve(true);
    };

    window.addEventListener('blur', onBlur, {
      once: true,
    });
  });
}

/**
 * Sends a download task directly to Motrix via JSON-RPC
 * @param url The download URL
 * @param filename The name to save the file as
 * @param dir Optional subdirectory within the base download directory
 * @param userAgent Optional user agent string
 * @returns Promise<boolean> - true if the task was added successfully
 */

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

export { cn, formatFileSize, isFile, getBaiduUrl };
