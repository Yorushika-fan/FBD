// components/GlobalLoading.tsx
'use client';
import { useLoadingStore } from '@/store/loading';
import { RingLoader } from 'react-spinners';
import useCommonStore from '@/store/common';
// 修改 GlobalLoading.tsx
const GlobalLoading = () => {
  const isLoading = useLoadingStore((s) => s.isLoading);
  const isInitialized = useCommonStore((s) => s.isInitialized);
  
  if (!isLoading && isInitialized) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <RingLoader color="#44c44d" size={100} />
    </div>
  );
};

export default GlobalLoading;
