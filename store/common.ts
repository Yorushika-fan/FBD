import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CommonStore {
  verifyCode: string;
  theme: string;
  uuid: string;
  currentStep: number;
  isInitialized: boolean;
  locale: string;
  setVerifyCode: (verifyCode: string) => void;
  setTheme: (theme: string) => void;
  updateCurrentStep: (currentStep: number) => void;
  setInitialized: (isInitialized: boolean) => void;
  setUuid: (uuid: string) => void;
  setLocale: (locale: string) => void;
  reset: () => void;
}

const useCommonStore = create<CommonStore>()(
  persist(
    (set) => ({
      verifyCode: '',
      theme: 'cupcake',
      uuid: '',
      isInitialized: false,
      currentStep: 1,
      locale: 'zh',
      setVerifyCode: (verifyCode: string) => set({ verifyCode }),
      setTheme: (theme: string) => set({ theme }),
      updateCurrentStep: (currentStep: number) => set({ currentStep }),
      setInitialized: (isInitialized: boolean) => set({ isInitialized }),
      setUuid: (uuid: string) => set({ uuid }),
      setLocale: (locale: string) => set({ locale }),
      reset: () => set({ verifyCode: '', uuid: '', currentStep: 1 }),
    }),
    {
      name: 'common-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setInitialized(true);
        }
      },
    },
  ),
);

export default useCommonStore;
