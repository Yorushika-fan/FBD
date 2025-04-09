'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { BaiduClient } from '@/lib/baidu/baiduClient';
import { useBaiduStore } from '@/store/baidu';
import path from 'path';
import axios from 'axios';
import { useTranslations } from 'next-intl';

interface RPCConfig {
  endpoint: string;
  downloadDir: string;
  userAgent: string;
  status?: {
    version?: string;
    connected: boolean;
  };
}

export const DownloadOptions = ({ files }: { files: { id: string; path: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('Download');
  const [rpcConfig, setRpcConfig] = useState<RPCConfig>({
    endpoint: 'http://127.0.0.1:16800/jsonrpc',
    downloadDir: '/Users/yorushika/Downloads',
    userAgent: 'netdisk;FBD;',
    status: {
      connected: false,
    },
  });
  const [dlinkFiles, setDlinkFiles] = useState<{ fileName: string; dlink: string; from: string }[]>([]);
  const { getDownloadLink } = BaiduClient;
  const { surl, shareInfo } = useBaiduStore();

  const handleDownloadLink = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const fsIds = files.map((file) => file.id);
      const res = await getDownloadLink({
        shareId: shareInfo.share_id,
        uk: shareInfo.uk,
        fsId: fsIds,
        randsk: shareInfo.seckey,
        shareUrl: surl,
      });
      setDlinkFiles(res as { fileName: string; dlink: string; from: string }[]);
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const testRPCConnection = async () => {
    try {
      const response = await axios.post(rpcConfig.endpoint, {
        jsonrpc: '2.0',
        id: 'test',
        method: 'aria2.getGlobalOption',
      });
      const { 'user-agent': userAgent, dir } = response.data.result;
      setRpcConfig({
        ...rpcConfig,
        downloadDir: dir,
        userAgent: userAgent,
        status: { connected: true, version: '1' },
      });
      toast.success(t('testRPCConnectionSuccess'));
    } catch (err) {
      console.log(err, 'err');
      setRpcConfig({ ...rpcConfig, status: { connected: false } });
      toast.error(t('testRPCConnectionFailed'));
    }
  };

  const rpcDownload = async () => {
    if (!dlinkFiles.length) {
      toast.error(t('noDownloadableFiles'));
      return;
    }
    const promises = dlinkFiles.map(async (file) => {
      const { fileName, dlink, from } = file;
      const dir = files.find((file) => file.id === from)?.path;
      await axios.post(rpcConfig.endpoint, {
        jsonrpc: '2.0',
        id: 'FBD',
        method: 'aria2.addUri',
        params: [
          [dlink],
          {
            dir: path.join(rpcConfig.downloadDir, dir || ''),
            out: fileName,
            userAgent: rpcConfig.userAgent,
          },
        ],
      });
      toast.success(file.fileName + ' ' + t('addedToRPCDownloadQueue'));
    });
    await Promise.all(promises);
    setIsOpen(false);
  };

  const selectedFilesCount = files.length;

  return (
    <>
      <Button onClick={handleDownloadLink} className="w-full" disabled={isLoading}>
        {isLoading
          ? t('gettingDownloadLink')
          : selectedFilesCount > 0
            ? t('downloadSelectedItems', { count: selectedFilesCount })
            : t('selectDownloadMethod')}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-base-200 border-base-300 sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-base-content min-h-[40px] min-w-[200px]">
              {t('selectDownloadMethod')}
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="api" className="w-full">
            <TabsList className="bg-base-100 grid w-full grid-cols-3">
              <TabsTrigger
                value="api"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {t('apiDownload')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="api">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base-content">{t('rpcAddress')}</Label>
                  <div className="flex gap-2">
                    <Input
                      value={rpcConfig.endpoint}
                      onChange={(e) => setRpcConfig({ ...rpcConfig, endpoint: e.target.value })}
                      className="bg-base-100 border-base-300"
                      placeholder="http://127.0.0.1:16800/jsonrpc"
                    />
                    <Button variant="outline" onClick={testRPCConnection}>
                      {t('testConnection')}
                    </Button>
                  </div>
                  {rpcConfig.status && (
                    <div className="flex items-center gap-2 text-sm">
                      <div
                        className={`h-2 w-2 rounded-full ${rpcConfig.status.connected ? 'bg-success' : 'bg-error'}`}
                      />
                      <span className="text-base-content/70">
                        {rpcConfig.status.connected
                          ? t('connected', { version: rpcConfig.status.version || '1' })
                          : t('notConnected')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-base-content">{t('downloadDirectory')}</Label>
                  <Input
                    value={rpcConfig.downloadDir}
                    onChange={(e) => setRpcConfig({ ...rpcConfig, downloadDir: e.target.value })}
                    className="bg-base-100 border-base-300"
                    placeholder="~/Downloads"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-base-content">User-Agent</Label>
                  <Input
                    value={rpcConfig.userAgent}
                    onChange={(e) => setRpcConfig({ ...rpcConfig, userAgent: e.target.value })}
                    className="bg-base-100 border-base-300"
                    placeholder="Mozilla/5.0 ..."
                  />
                </div>

                <Button className="w-full" onClick={rpcDownload} disabled={!rpcConfig.status?.connected}>
                  {t('startDownload')}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};
