import type { Metadata } from 'next';
import { FlashTooltipProvider } from '@/context/FlashTooltipContext';
import { AuthProvider } from '@/context/AuthContext';
import Alert from '@/components/Alert';

export const metadata: Metadata = {
  title: 'Mexe',
  description: 'Cửa hàng thiết bị công nghệ hàng đầu',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <FlashTooltipProvider>
          <AuthProvider>
            <Alert />
            {children}
          </AuthProvider>
        </FlashTooltipProvider>
      </body>
    </html>
  );
}
