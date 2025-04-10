import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('HomePage');

  return {
    title: t('title'),
    description: t('description'),
    keywords: [t('keywords')],
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.png'],
    },
  };
}
