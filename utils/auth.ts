// utils/auth.ts
import jwt from 'jsonwebtoken';

// JWT 密钥（在实际项目中应保存在环境变量中）
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

/**
 * 用于生成 JWT Token
 * @param userId - 用户的 ID
 * @param username - 用户名
 * @returns 生成的 JWT Token
 */
export const generateJwtToken = (userId: string, username: string): string => {
  const token = jwt.sign({ userId, username }, JWT_SECRET_KEY, {
    expiresIn: '1h', // 设置过期时间，例如 1 小时
  });
  return token;
};
