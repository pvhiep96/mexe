'use client';

import { useFlashTooltip } from '@/context/FlashTooltipContext';

export default function Alert() {
  const { message, isVisible, alertType } = useFlashTooltip();

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    noti: 'bg-blue-600 text-white',
  };

  return (
    <div className='fixed right-10 bottom-10 z-50'>
      <div
        className={`animate-fade-in rounded-lg px-6 py-3 text-sm font-semibold shadow-lg ${typeStyles[alertType]}`}
      >
        {message}
      </div>
    </div>
  );
}
