import React from 'react';
import { NotifyProvider } from '@/hooks/useNotify';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NotifyProvider>
      {children}
    </NotifyProvider>
  );
}
