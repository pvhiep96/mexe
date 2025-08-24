import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mexe',
  description: 'Cửa hàng thiết bị công nghệ hàng đầu',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
