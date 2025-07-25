'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'noti';

interface FlashTooltipContextType {
  message: string;
  isVisible: boolean;
  alertType: AlertType;
  showTooltip: (message: string, type?: AlertType) => void;
}

const FlashTooltipContext = createContext<FlashTooltipContextType | undefined>(
  undefined
);

export function FlashTooltipProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('success');

  const showTooltip = (newMessage: string, type: AlertType = 'success') => {
    setMessage(newMessage);
    setAlertType(type);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
      setMessage('');
      setAlertType('success');
    }, 300000);
  };

  return (
    <FlashTooltipContext.Provider
      value={{ message, isVisible, alertType, showTooltip }}
    >
      {children}
    </FlashTooltipContext.Provider>
  );
}

export function useFlashTooltip() {
  const context = useContext(FlashTooltipContext);
  if (!context) {
    throw new Error(
      'useFlashTooltip must be used within a FlashTooltipProvider'
    );
  }
  return context;
}
