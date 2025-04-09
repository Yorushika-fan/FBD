'use client';

import { cn } from '@/lib/utils';
import ParseCard from '@/components/ParseCard';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useBaiduStore } from '@/store/baidu';
import baiduClient from '@/lib/baidu/baiduClient';
import useCommonStore from '@/store/common';
import GlobalLoading from '@/components/GlobalLoading';
const Download = () => {
  const t = useTranslations('parse');
  const { getToken } = baiduClient;
  const { updateCurrentStep, isInitialized, currentStep, setVerifyCode, verifyCode, setUuid } = useCommonStore();
  const { setSurl, setPassword } = useBaiduStore();

  if (!isInitialized) {
    return <GlobalLoading />;
  }

  const handleParseSuccess = (surl: string, password: string) => {
    updateCurrentStep(2);
    setSurl(surl);
    setPassword(password);
  };

  const handlePasswordSubmit = async () => {
    if (!verifyCode || verifyCode.length !== 6) {
      return;
    }

    try {
      const { uuid } = (await getToken(verifyCode)) as { uuid: string };
      setUuid(uuid);
      updateCurrentStep(3);
    } catch (error) {
      updateCurrentStep(2);
      console.error(error);
    }
  };

  const handleReset = () => {
    updateCurrentStep(1);
    setVerifyCode('');
    setSurl('');
    setPassword('');
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <ul className="steps steps-vertical lg:steps-horizontal mb-8 w-full">
        <li className={cn('step', currentStep >= 1 && 'step-primary')}>{t('step1')}</li>
        <li className={cn('step', currentStep >= 2 && 'step-primary')}>{t('step2')}</li>
        <li className={cn('step', currentStep >= 3 && 'step-primary')}>{t('step3')}</li>
      </ul>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {currentStep === 1 && <ParseCard onParseSuccess={handleParseSuccess} />}

          {currentStep === 2 && (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="card-title">{t('verifyPassword')}</h2>
                <div className="flex gap-2">
                  <Link href="/get-password" className="btn btn-sm btn-outline btn-primary">
                    {t('getPassword')}
                  </Link>
                  <button className="btn btn-sm btn-outline btn-error" onClick={handleReset}>
                    {t('reset')}
                  </button>
                </div>
              </div>
              <div className="form-control">
                <div className="mb-2">{t('verifyPassword')}</div>
                <div className="relative">
                  <input
                    type="text"
                    className="absolute z-10 h-full w-full opacity-0"
                    maxLength={6}
                    value={verifyCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length <= 6) {
                        setVerifyCode(value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && verifyCode.length > 0) {
                        setVerifyCode(verifyCode.slice(0, -1));
                      }
                    }}
                    autoFocus
                  />
                  <div className="grid grid-cols-6 gap-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          'input input-bordered flex h-12 w-full items-center justify-center text-center text-lg font-medium',
                          verifyCode.length === index && 'input-primary',
                        )}
                      >
                        {verifyCode[index] || ''}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card-actions mt-6 justify-end">
                <button
                  className={cn('btn btn-primary')}
                  onClick={handlePasswordSubmit}
                  disabled={verifyCode.length !== 6}
                >
                  {t('verify')}
                </button>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="card-title">{t('download')}</h2>
                <button className="btn btn-sm btn-outline btn-error" onClick={handleReset}>
                  {t('reset')}
                </button>
              </div>
              <div className="alert alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{t('success')}</span>
              </div>
              <div className="card-actions mt-6 justify-end">
                <Link href="/download" className="btn btn-primary">
                  {t('download')}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Download;
