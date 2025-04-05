import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BaiduFile, FileTreeProps, ShareInfo } from '@/types/baidu';

const useBaiduStore = create<FileTreeProps>()(
  persist(
    (set, get) => ({
      node: [],
      isInitialized: false,
      surl: '',
      password: '',
      shareInfo: {
        share_id: '',
        uk: '',
        seckey: '',
      },

      setNodeChildren: async (path: string, data: BaiduFile[]) => {
        // 先设置 loading 状态
        const updateNodeLoading = (nodes: BaiduFile[]): BaiduFile[] => {
          return nodes.map((node) => {
            if (node.path === path) {
              return { ...node, isLoading: true };
            }
            if (node.children) {
              return { ...node, children: updateNodeLoading(node.children) };
            }
            return node;
          });
        };
        set((state) => ({
          node: updateNodeLoading(state.node),
        }));

        // 更新子节点
        const updateNodeChildren = (nodes: BaiduFile[]): BaiduFile[] => {
          return nodes.map((node) => {
            if (node.path === path) {
              return { ...node, children: data, isLoading: false };
            }
            if (node.children) {
              return { ...node, children: updateNodeChildren(node.children) };
            }
            return node;
          });
        };

        // 使用函数式更新确保获取最新的状态
        set((state) => {
          const updatedNode = updateNodeChildren(state.node);
          return { node: updatedNode };
        });
      },
      // 初始化完成的回调
      onHydrationEnd: () => {
        set({ isInitialized: true });
      },
      // 更新节点加载状态的方法
      updateNodeLoading: (path: string, isLoading: boolean) => {
        const updateNodeLoadingState = (nodes: BaiduFile[]): BaiduFile[] => {
          return nodes.map((node) => {
            if (node.path === path) {
              return { ...node, isLoading };
            }
            if (node.children) {
              return { ...node, children: updateNodeLoadingState(node.children) };
            }
            return node;
          });
        };

        set((state) => ({
          node: updateNodeLoadingState(state.node),
        }));
      },
      // 设置分享链接
      setSurl: (surl: string) => {
        set({ surl });
      },
      // 设置分享信息
      setShareInfo: (shareInfo: ShareInfo) => {
        set({ shareInfo });
      },
      // 设置密码
      setPassword: (password: string) => {
        set({ password });
      },
      // 设置文件列表
      setNode: (node: BaiduFile[]) => {
        set({ node });
      },
    }),
    {
      name: 'baidu-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isInitialized = true;
        }
      },
    },
  ),
);

export { useBaiduStore };
