import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'FBD - 百度网盘加速下载工具',
    template: '%s | FBD百度网盘加速器',
  },
  description: '免费高速下载百度网盘文件，突破限速，支持批量下载，无需登录账号，安全无广告',
  keywords: ['百度网盘加速', '网盘下载', '百度网盘不限速', '网盘加速器', '文件下载工具'],
  authors: [{ name: 'FBD团队', url: 'https://fbd.vivo50.tech' }],
  creator: 'FBD团队',
  publisher: 'FBD团队',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/zh-CN',
      'en-US': '/en-US',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'FBD百度网盘加速器',
    title: 'FBD - 百度网盘免费高速下载工具',
    description: '免费高速下载百度网盘文件，突破限速，支持批量下载，无需登录账号，安全无广告',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FBD百度网盘加速器',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FBD - 百度网盘免费高速下载工具',
    description: '免费高速下载百度网盘文件，突破限速，支持批量下载，无需登录账号，安全无广告',
    images: ['/images/og-image.jpg'],
    creator: '@FBD_official',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'mhS5kpy-6woo4136jxZ0ceOKPbufeJymhO-Zg0BxmsI',
  },
  appLinks: {
    web: {
      url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },
};
