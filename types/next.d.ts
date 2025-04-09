// types/next.d.ts

import { DecodedToken } from '@/middlewares/authMiddleware';

declare global {
  namespace NodeJS {
    interface Global {
      req: NextApiRequest;
    }
  }

  // 扩展 NextApiRequest 类型
  interface NextApiRequest {
    user?: DecodedToken; // 添加 user 字段来保存解码后的 JWT 数据
  }
}
