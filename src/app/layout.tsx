import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { FlashTooltipProvider } from '@/context/FlashTooltipContext';

export const metadata: Metadata = {
  title: 'Mexe',
  description: 'Cửa hàng thiết bị công nghệ hàng đầu',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <CartProvider>
          <FlashTooltipProvider>
            {children}
          </FlashTooltipProvider>
        </CartProvider>
      </body>
    </html>
  );
}
