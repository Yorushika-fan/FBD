'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { BaiduClient } from '@/lib/baidu/baiduClient';
import { useBaiduStore } from '@/store/baidu';
import path from 'path';
import axios from 'axios';

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
  const [rpcConfig, setRpcConfig] = useState<RPCConfig>({
    endpoint: 'http://127.0.0.1:16800/jsonrpc',
    downloadDir: '/Users/yorushika/Downloads',
    userAgent: 'netdisk;f4pan;',
    status: {
      connected: false,
    },
  });
  const [dlinkFiles, setDlinkFiles] = useState<{ fileName: string; dlink: string; from: string }[]>([]);
  const { getDownloadLink } = BaiduClient;
  const { surl, shareInfo } = useBaiduStore();

  // 在组件内添加状态来控制命令的显示
  // const [cmdCommands, setCmdCommands] = useState<string[]>([]);
  // const [bashCommands, setBashCommands] = useState<string[]>([]);

  // // 在组件内添加状态来控制当前选择的命令类型
  // const [commandType, setCommandType] = useState<'cmd' | 'bash'>('cmd');

  // 复制到剪贴板的通用函数
  // const copyToClipboard = async (text: string, message: string) => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     toast.success(message);
  //   } catch (err) {
  //     toast.error('复制失败，请手动复制');
  //   }
  // };

  const handleDownloadLink = async () => {
    console.log('handleDownload', files);
    const fsIds = files.map((file) => file.id);
    const res = await getDownloadLink({
      shareId: shareInfo.share_id,
      uk: shareInfo.uk,
      fsId: fsIds,
      randsk: shareInfo.seckey,
      shareUrl: surl,
    });
    setDlinkFiles(res.data);
    // 自动生成命令
    // handleGenerateCommands(commandType);
  };

  // 测试 RPC 连接
  const testRPCConnection = async () => {
    try {
      const response = await axios.post(rpcConfig.endpoint, {
        jsonrpc: '2.0',
        id: 'test',
        method: 'aria2.getGlobalOption',
      });
      // console.log(response.data.result['user-agent'], 'response');
      const { 'user-agent': userAgent, dir } = response.data.result;
      console.log(userAgent, dir, 'response');
      console.log(response.data, 'response');
      setRpcConfig({
        ...rpcConfig,
        downloadDir: dir,
        userAgent: userAgent,
        status: { connected: true, version: '1' },
      });
      toast.success('测试 RPC 连接成功');
    } catch (err) {
      console.log(err, 'err');
      setRpcConfig({ ...rpcConfig, status: { connected: false } });
      toast.error('测试 RPC 连接失败');
    }
  };

  //rpc 下载
  const rpcDownload = async () => {
    if (!dlinkFiles.length) {
      toast.error('没有可下载的文件');
      return;
    }
    console.log(dlinkFiles, 'dlinkFiles');
    const promises = dlinkFiles.map(async (file) => {
      const { fileName, dlink, from } = file;
      const dir = files.find((file) => file.id === from)?.path;
      await axios.post(rpcConfig.endpoint, {
        jsonrpc: '2.0',
        id: 'f4pan',
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
      toast.success(file.fileName + ' 已添加到 RPC 下载队列');
    });
    Promise.all(promises);
  };

  // 修改生成命令的函数
  // const generateCurlCommand = (type: 'cmd' | 'bash' = 'bash') => {
  //   if (!dlinkFiles.length) return [];

  //   return dlinkFiles.map((file) => {
  //     const outputPath = `${rpcConfig.downloadDir}/${file.dir}/${file.fileName}`;

  //     if (type === 'cmd') {
  //       // Windows CMD 格式
  //       const dirPath = `${rpcConfig.downloadDir}\\${file.dir}`.replace(/\//g, '\\');
  //       return `if not exist "${dirPath}" mkdir "${dirPath}" && curl -A "${rpcConfig.userAgent}" -o "${outputPath.replace(/\//g, '\\')}" "${file.dlink}"`;
  //     } else {
  //       // Unix/Mac bash 格式
  //       return `mkdir -p "${rpcConfig.downloadDir}/${file.dir}" && curl -A "${rpcConfig.userAgent}" -o "${outputPath}" "${file.dlink}"`;
  //     }
  //   });
  // };

  // 处理生成命令的函数
  // const handleGenerateCommands = (type: 'cmd' | 'bash') => {
  //   const commands = generateCurlCommand(type);
  //   if (type === 'cmd') {
  //     setCmdCommands(commands);
  //   } else {
  //     setBashCommands(commands);
  //   }
  // };

  // 计算选中的文件数量
  const selectedFilesCount = files.length;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button onClick={handleDownloadLink} className="btn btn-primary w-full">
          {selectedFilesCount > 0 ? `下载选中项目 (${selectedFilesCount})` : '选择下载方式'}
        </button>
      </DialogTrigger>
      <DialogContent className="bg-base-200 border-base-300 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-base-content min-h-[40px] min-w-[200px]">选择下载方式</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="direct" className="w-full">
          <TabsList className="bg-base-100 grid w-full grid-cols-3">
            {/* <TabsTrigger
              value="direct"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              直接下载
            </TabsTrigger> */}
            {/* <TabsTrigger
              value="command"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Curl 下载
            </TabsTrigger> */}
            <TabsTrigger
              value="api"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              API下载
            </TabsTrigger>
          </TabsList>

          {/* 直接下载选项 */}
          <TabsContent value="direct">
            <div className="space-y-4">
              <Button className="w-full" disabled>
                开始下载
              </Button>
            </div>
          </TabsContent>

          {/* 命令行下载选项 */}
          {/* <TabsContent value="command">
            <div className="w-[400px] space-y-4">
              <div className="flex items-center gap-4">
                <Select
                  value={commandType}
                  onValueChange={(value: 'cmd' | 'bash') => {
                    setCommandType(value);
                    handleGenerateCommands(value);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="选择命令类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cmd">Windows CMD</SelectItem>
                    <SelectItem value="bash">Mac/Linux bash</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex w-full flex-col gap-2">
                {(commandType === 'cmd' ? cmdCommands : bashCommands).map((command, index) => (
                  <div key={index} className="mockup-code bg-primary text-primary-content w-full">
                    <pre>{command}</pre>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent> */}

          {/* API下载选项 */}
          <TabsContent value="api">
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base-content">RPC 地址</Label>
                  <div className="flex gap-2">
                    <Input
                      value={rpcConfig.endpoint}
                      onChange={(e) => setRpcConfig({ ...rpcConfig, endpoint: e.target.value })}
                      className="bg-base-100 border-base-300"
                      placeholder="http://127.0.0.1:16800/jsonrpc"
                    />
                    <Button variant="outline" onClick={testRPCConnection}>
                      测试连接
                    </Button>
                  </div>
                  {rpcConfig.status && (
                    <div className="flex items-center gap-2 text-sm">
                      <div
                        className={`h-2 w-2 rounded-full ${rpcConfig.status.connected ? 'bg-success' : 'bg-error'}`}
                      />
                      <span className="text-base-content/70">
                        {rpcConfig.status.connected ? `已连接 (Aria2 ${rpcConfig.status.version})` : '未连接'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-base-content">下载目录</Label>
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
                  开始下载
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
