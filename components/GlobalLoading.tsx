// components/GlobalLoading.tsx
'use client';
import { useLoadingStore } from '@/store/loading';
import { RingLoader } from 'react-spinners';

const GlobalLoading = () => {
  const isLoading = useLoadingStore((s) => s.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <RingLoader color="#44c44d" size={100} />
    </div>
  );
};

export default GlobalLoading;
