import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    domains: ['api.dicebear.com'],
  },
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: './i18n/request.ts',
});

export default withNextIntl(nextConfig);
