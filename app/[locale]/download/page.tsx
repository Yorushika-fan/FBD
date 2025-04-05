'use client';

import { getFileIcon } from '@/utils/fileIcons';
import type { BaiduFile } from '@/types/baidu';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useBaiduStore } from '@/store/baidu';
import { BaiduClient } from '@/lib/baidu/baiduClient';
import { DownloadOptions } from '@/components/DownloadOptions';
import { formatFileSize } from '@/lib/utils';
import { Tree, TreeCheckboxSelectionKeys } from 'primereact/tree';
import { TreeNode } from 'primereact/treenode';
import { toast } from 'sonner';

const Download = () => {
  const [selectedKeys, setSelectedKeys] = useState<TreeCheckboxSelectionKeys | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { getFileList } = BaiduClient;
  const [nodeLoading, setNodeLoading] = useState(false);
  const router = useRouter();
  const { node, isInitialized, surl, password, setNodeChildren } = useBaiduStore();
  const [selectedFiles, setSelectedFiles] = useState<{ id: string; path: string }[]>([]);

  useEffect(() => {
    if (selectedKeys) {
      const paths = Object.keys(selectedKeys);
      const fsIds = paths
        .map((path) => findNodeByKey(treeNodes, path))
        .filter((node) => node?.leaf)
        .map((node) => {
          return {
            id: node?.data.id,
            path: node?.data.path,
          };
        });

      setSelectedFiles(fsIds);
      console.log(fsIds, 'fsIds');
      console.log(selectedFiles, 'selectedFiles');
    }
  }, [selectedKeys]);

  // 将 BaiduFile[] 转换为 Tree 所需的数据结构
  const convertToTreeNodes = (nodes: BaiduFile[]): any[] => {
    return nodes.map((file) => {
      const isFile = file.isdir == 0;
      const Icon = getFileIcon(file.server_filename, isFile);

      // 递归检查目录下的所有子节点是否都已加载
      const areAllChildrenLoaded = (node: BaiduFile): boolean => {
        if (node.isdir === 0) return true; // 文件节点总是视为已加载
        if (!node.children) return false; // 目录没有children说明未加载
        return node.children.every((child) => areAllChildrenLoaded(child));
      };

      const hasAllChildrenLoaded = isFile ? true : areAllChildrenLoaded(file);

      return {
        key: file.path,
        label: (
          <div className="flex w-full items-center justify-between gap-4">
            <span className="truncate">{file.server_filename}</span>
            {isFile && (
              <span className="text-base-content/60 text-sm whitespace-nowrap">{formatFileSize(file.size)}</span>
            )}
          </div>
        ),
        data: {
          id: file.fs_id,
          fileName: file.server_filename,
          path: file.path,
        },
        icon: () => <Icon className="text-base-content/70 h-6 w-6" />,
        children: file.isdir == 1 && file.children ? convertToTreeNodes(file.children) : undefined,
        leaf: isFile,
        selectable: isFile || hasAllChildrenLoaded,
      };
    });
  };

  // 转换文件树数据
  const treeNodes = useMemo(() => {
    if (!node || node.length === 0) return [];
    return convertToTreeNodes(node);
  }, [node]);
  useEffect(() => {
    console.log(node, '刷新了');
    const checkAndLoadFiles = async () => {
      try {
        // // 等待 store 初始化完成
        if (!isInitialized) return;

        // store 已初始化，但没有数据，说明确实是没有文件
        if (!node || node.length === 0) {
          console.log('没有找到文件，重定向到解析页面');
          router.push('/parse');
          return;
        }
      } catch (error) {
        router.push('/parse');
      } finally {
        if (isInitialized) {
          setLoading(false);
        }
      }
    };

    checkAndLoadFiles();
  }, [router, node, isInitialized]);

  const handleNodeExpand = async (e: any) => {
    const path = e.node.key;
    const leaf = e.node.leaf;
    // 如果是目录且没有子节点或子节点为空数组，则加载子目录
    if (!leaf && !e.node.children) {
      // console.log(e.node, 'e.node');
      try {
        toast.loading('加载中...');
        setNodeLoading(true);
        console.log(' 未加载的目录', path);
        console.log(surl, 'surl');
        console.log(password, 'password');
        const res = await getFileList({
          surl,
          password,
          isroot: false,
          dir: path,
        });
        console.log(res.data.list, 'res.data.list');
        await setNodeChildren(path, res.data.list);
      } catch (error) {
        toast.error('加载目录失败');
        console.error('加载目录失败:', error);
      } finally {
        setNodeLoading(false);
        toast.dismiss();
      }
    }
    // 更新展开状态
    setExpandedKeys({
      ...expandedKeys,
      [path]: true,
    });
  };

  const findNodeByKey = (nodes: TreeNode[], key: string): TreeNode | null => {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }
      if (node.children) {
        const found = findNodeByKey(node.children, key);
        if (found) return found;
      }
    }
    return null;
  };

  const handleNodeCollapse = (e: any) => {
    const path = e.node.key;
    const newExpandedKeys = { ...expandedKeys };
    delete newExpandedKeys[path];
    setExpandedKeys(newExpandedKeys);
  };

  const handleSelectChange = (e: any) => {
    console.log(e.value, 'e.value');
    setSelectedKeys(e.value);
  };

  const handleSelectAll = () => {};

  if (loading || !isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-base-content text-2xl font-bold">云解析下载</h1>
        <div className="flex items-center gap-2">
          <button className="btn btn-primary btn-sm" onClick={handleSelectAll}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 9l5 5 10-10" />
            </svg>
            {selectedKeys ? '全选' : '取消全选'}
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setSelectedKeys({})}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            清除选择
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setExpandedKeys({})}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            全部折叠
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              const allKeys = treeNodes.reduce((acc: any, node: any) => {
                acc[node.key] = true;
                return acc;
              }, {});
              setExpandedKeys(allKeys);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            全部展开
          </button>
          {/* {selectedFilesCount > 0 && (
            <button className="btn btn-primary btn-sm" onClick={handleDownload} disabled={transferLoading}>
              {transferLoading ? '下载中...' : '批量下载'}
            </button>
          )} */}
        </div>
      </div>
      <div className="card bg-base-200 shadow-xl">
        <div className="h-[calc(100vh-200px)] overflow-y-auto p-4">
          <div className="bg-base-100 rounded-lg p-4">
            <Tree
              value={treeNodes}
              selectionMode="checkbox"
              selectionKeys={selectedKeys}
              onSelectionChange={handleSelectChange}
              expandedKeys={expandedKeys}
              onExpand={handleNodeExpand}
              onCollapse={handleNodeCollapse}
              // onSelect={handleNodeSelect}
              loading={nodeLoading}
              propagateSelectionUp={true}
              propagateSelectionDown={true}
              className="[&_*]:!border-base-content/10 [&_.p-treenode]:!text-base-content [&_.p-treenode-content.p-highlight]:!bg-primary/10 [&_.p-treenode-content.p-highlight]:!text-primary [&_.p-treenode-content]:hover:!bg-base-200 [&_.p-treenode-label]:!text-base-content [&_.p-checkbox]:!border-base-content/20 [&_.p-checkbox-box]:!bg-base-200 [&_.p-checkbox-box.p-highlight]:!bg-primary [&_.p-checkbox-box.p-highlight]:!border-primary [&_.p-tree-toggler]:!text-base-content [&_.p-tree-toggler]:hover:!bg-base-200 [&_.p-tree-toggler-icon]:!text-base-content [&_.p-checkbox-box.p-indeterminate]:!bg-primary/50 w-full [&]:!bg-transparent [&_.p-tree]:!bg-transparent [&_.p-tree-container]:!bg-transparent [&_.p-treenode-content]:!bg-transparent"
            />
          </div>
        </div>
        {selectedKeys && Object.keys(selectedKeys).length > 0 && (
          <div className="border-base-300 border-t p-4">
            <DownloadOptions files={selectedFiles} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Download;
