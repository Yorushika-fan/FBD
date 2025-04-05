import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [
    'en',
    'de',
    'ru',
    'pt',
    'it',
    'ar',
    'hi',
    'ja',
    'ko',
    'es',
    'fr',
    'nl',
    'pl',
    'ro',
    'sv',
    'tr',
    'vi',
    'id',
    'zh-CN',
    'zh-TW',
  ],

  // Used when no locale matches
  defaultLocale: 'zh-CN',
});
