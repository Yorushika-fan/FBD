'use client';

import { useState } from 'react';
import { cn, getBaiduUrl } from '@/lib/utils';
import { BaiduClient } from '@/lib/baidu/baiduClient';
import { useBaiduStore } from '@/store/baidu';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface ParseCardProps {
  onParseSuccess: (surl: string, password: string) => void;
}

const ParseCard = ({ onParseSuccess }: ParseCardProps) => {
  const [surl, setSurl] = useState('');
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setNode, setShareInfo } = useBaiduStore();
  const { getFileList } = BaiduClient;
  const t = useTranslations('parse');

  useEffect(() => {
    const { surl, pwd } = getBaiduUrl(url);
    if (pwd) {
      setPassword(pwd);
      toast.success(t('pasteSuccess'));
    }
    if (surl) {
      setSurl(surl);
    }
  }, [url, setPassword, setSurl, t]);

  const handleParse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await getFileList({
        surl,
        password,
        isroot: true,
        dir: '/',
      });
      const { list, shareid, uk, seckey } = res.data;
      setNode(list);
      setShareInfo({
        share_id: shareid,
        uk,
        seckey: seckey.replace(/-/g, '+').replace(/~/g, '=').replace(/_/g, '/'),
      });

      onParseSuccess(surl, password);
      setIsLoading(false);
    } catch (error) {
      console.log(error, 'error');
      toast.error(t('parseError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="card-title mb-4">{t('title')}</h2>

      <form onSubmit={handleParse}>
        <div className="form-control">
          <div className="mb-2">{t('inputUrl')}</div>
          <input
            type="text"
            placeholder="请输入百度网盘链接"
            className="input validator"
            pattern="^https:\/\/pan\.baidu\.com.*"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="validator-hint">请输入正确的百度网盘链接</div>
        </div>
        <div className="form-control mt-4">
          <div className="mb-2">{t('inputPassword')}</div>
          <input
            type="text"
            placeholder="请输入提取码"
            className="input validator"
            value={password}
            pattern="[a-zA-Z0-9]{4}"
            required
            onChange={(e) => setPassword(e.target.value)}
            maxLength={4}
          />
          <div className="validator-hint">{t('inputPasswordHint')}</div>
        </div>
        <div className="card-actions mt-6 justify-end">
          <button type="submit" className={cn('btn btn-primary', isLoading && 'loading')} disabled={isLoading}>
            {t('parse')}
          </button>
        </div>
      </form>
    </>
  );
};

export default ParseCard;
