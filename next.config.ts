import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  requestConfig: './i18n/request.ts',
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ['fbd.vivo50.tech'],
  },
  // 启用静态页面生成
  output: 'standalone' as const,
  // 启用压缩
  compress: true,
  // 启用生产环境下的源映射
  productionBrowserSourceMaps: true,
  // 启用 HTTP/2
  http2: true,
  // 启用预加载
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react'],
  },
};

export default withNextIntl(nextConfig);
