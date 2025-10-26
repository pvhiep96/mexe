import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '../globals.css';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SPHeader from '@/components/SP/Header';
// import SPFooter from '@/components/SP/Footer';
const locales = ['en', 'vi'];
import { routing } from '@/i18n/routing';
import { CartProvider } from '@/context/CartContext';
import { FlashTooltipProvider } from '@/context/FlashTooltipContext';
import { AuthProvider } from '@/context/AuthContext';
import Alert from '@/components/Alert';
import ScrollToTop from '@/components/ScrollToTop';
import GlobalScrollHandler from '@/components/GlobalScrollHandler';
// Import auth debugger in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  import('@/utils/authDebugger');
  import('@/utils/reloadFix');
  import('@/utils/testReloadFix');
}

// Fetch categories for headers
async function fetchCategories() {
  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3005/api/v1';
    const response = await fetch(`${apiUrl}/categories`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    const categories = await response.json();
    // Transform to match component interface
    return categories.map((category: any) => ({
      id: category.id,
      name: category.name,
      slug: category.slug || category.name.toLowerCase().replace(/\s+/g, '-'),
      image: category.image_url || '/images/icon-more.webp',
      subcategories: category.subcategories || [],
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  // Fetch categories for headers
  const categories = await fetchCategories();

  return (
    <html lang={locale}>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/images/logo-mexe.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href='/images/logo-mexe.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='144x144'
          href='/images/logo-mexe.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='120x120'
          href='/images/logo-mexe.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='114x114'
          href='/images/logo-mexe.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='76x76'
          href='/images/logo-mexe.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='72x72'
          href='/images/logo-mexe.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='60x60'
          href='/images/logo-mexe.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='57x57'
          href='/images/logo-mexe.png'
        />
      </head>

      <body className='font-sans'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CartProvider>
            <FlashTooltipProvider>
              <AuthProvider>
                {/* Desktop Header */}
                <div className='sticky top-0 z-50 hidden bg-white lg:block'>
                  <Header />
                </div>
                {/* Mobile Header */}
                <div className='sticky top-0 z-50 bg-white lg:hidden'>
                  <SPHeader categories={categories} />
                </div>
                <Alert />
                <GlobalScrollHandler />
                {children}
                <Footer />
                <ScrollToTop />
              </AuthProvider>
            </FlashTooltipProvider>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
