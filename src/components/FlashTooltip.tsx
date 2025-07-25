'use client';

import { useFlashTooltip } from '@/context/FlashTooltipContext';
import { ReactNode } from 'react';

interface FlashTooltipProps {
  children: ReactNode;
}

export default function FlashTooltip({ children }: FlashTooltipProps) {
  const { message, isVisible } = useFlashTooltip();

  return (
    <div className='relative inline-block'>
      {children}
      {isVisible && (
        <div className='animate-fade-in absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform rounded-lg bg-green-600 px-4 py-2 text-sm text-white opacity-0 shadow-lg'>
          {message}
        </div>
      )}
    </div>
  );
}
