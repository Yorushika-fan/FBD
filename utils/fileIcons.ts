import {
  FcFolder,
  FcFile,
  FcImageFile,
  FcVideoFile,
  FcMusic,
  FcDocument,
  FcFlashAuto,
  FcViewDetails,
} from 'react-icons/fc';

export type IconType = typeof FcFolder;

export const getFileIcon = (filename: string, isFile: boolean): IconType => {
  if (!isFile) return FcFolder;

  const extension = filename.split('.').pop()?.toLowerCase();

  switch (extension) {
    // 图片文件
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
    case 'webp':
      return FcImageFile;

    // 视频文件
    case 'mp4':
    case 'mov':
    case 'avi':
    case 'mkv':
      return FcVideoFile;

    // 音频文件
    case 'mp3':
    case 'wav':
    case 'ogg':
    case 'flac':
      return FcMusic;

    // 代码文件
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
    case 'html':
    case 'css':
    case 'py':
    case 'java':
      return FcFlashAuto;

    // 文档文件
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'txt':
    case 'md':
      return FcDocument;

    // 压缩文件
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
      return FcViewDetails;

    default:
      return FcFile;
  }
};
