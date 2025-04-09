// store/loading.ts
import { create } from 'zustand';

interface LoadingStore {
  isLoading: boolean;
  setLoading: (val: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setLoading: (val) => set({ isLoading: val }),
}));
