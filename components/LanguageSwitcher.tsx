'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useState } from 'react';
import * as Flags from 'country-flag-icons/react/3x2';

// Language options with their metadata
const languages = [
  { code: 'en', name: 'English', flag: 'GB' },
  { code: 'zh-CN', name: '简体中文', flag: 'CN' },
  { code: 'zh-TW', name: '繁體中文', flag: 'TW' },
  { code: 'id', name: 'Indonesia', flag: 'ID' },
  { code: 'ja', name: '日本語', flag: 'JP' },
  { code: 'ko', name: '한국어', flag: 'KR' },
  { code: 'es', name: 'Español', flag: 'ES' },
  { code: 'fr', name: 'Français', flag: 'FR' },
  { code: 'de', name: 'Deutsch', flag: 'DE' },
  { code: 'ru', name: 'Русский', flag: 'RU' },
  { code: 'pt', name: 'Português', flag: 'PT' },
  { code: 'it', name: 'Italiano', flag: 'IT' },
  { code: 'ar', name: 'العربية', flag: 'SA' },
  { code: 'hi', name: 'हिन्दी', flag: 'IN' },
];

const LanguageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M14 18h6" />
  </svg>
);

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Common');

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    router.replace(pathname, { locale: languageCode });
    setIsOpen(false);
  };

  return (
    <div className="group relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-base-200 rounded-full p-2 transition-all duration-200 hover:scale-110"
        aria-label={t('switchLanguage')}
      >
        <LanguageIcon />
      </button>

      <div
        className={`absolute top-full right-0 z-50 mt-2 w-48 origin-top-right rounded-lg shadow-xl transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'} bg-base-100`}
      >
        <ul className="menu rounded-box py-2">
          {languages.map((language) => {
            const FlagIcon = Flags[language.flag as keyof typeof Flags];
            return (
              <li key={language.code}>
                <button
                  onClick={() => handleLanguageChange(language.code)}
                  className={`hover:bg-base-200 flex items-center gap-2 px-4 py-2 text-sm transition-colors ${locale === language.code ? 'bg-primary/10' : ''} `}
                >
                  <FlagIcon className="h-4 w-4" />
                  <span>{language.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
