'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslations, useLocale } from 'next-intl';
import useCommonStore from '@/store/common';


const Header = () => {
  const { theme, setTheme } = useCommonStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const t = useTranslations('Menu');
  const locale = useLocale();


  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('download'), href: '/download' },
    // { name: t('contact'), href: '/' },
    { name: t('howToUse'), href: '/how-to-use' },
  ];

  const handleThemeChange = () => {
    const newTheme = theme === 'cupcake' ? 'dark' : 'cupcake';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);


  return (
    <div className="navbar bg-base-100">
      {/* Mobile drawer button */}
      <div className="navbar-start">
        <button className="btn btn-square btn-ghost lg:hidden" onClick={() => setIsDrawerOpen(true)} aria-label="打开菜单">
          <Menu className="h-6 w-6" />
        </button>
        {/* Logo and site name */}
        <Link href="/" className="btn btn-ghost text-xl">
          <span className="font-bold">FBD</span>
        </Link>
      </div>

      {/* Desktop navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navigation.map((item) => (
            <li key={`${item.name}-${locale}`}>
              <Link href={item.href} className="hover:bg-base-200">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side items */}
      <div className="navbar-end">
        <LanguageSwitcher />
        <label className="swap swap-rotate btn btn-ghost btn-circle">
          <input
            type="checkbox"
            className="theme-controller"
            value="dark"
            checked={theme === 'dark'}
            onChange={handleThemeChange}
          />
          <svg className="swap-on h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg className="swap-off h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>

      {/* Mobile drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="fixed right-0 top-0 h-full w-80 bg-base-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <Link href="/" className="btn btn-ghost text-xl">
                <span className="font-bold">FBD</span>
              </Link>
              <button className="btn btn-square btn-ghost" onClick={() => setIsDrawerOpen(false)} aria-label="关闭菜单">
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="menu gap-2">
              {navigation.map((item) => (
                <li key={`${item.name}-${locale}`}>
                  <Link href={item.href} className="hover:bg-base-300" onClick={() => setIsDrawerOpen(false)}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
