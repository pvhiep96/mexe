import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '../globals.css';
import Head from 'next/head';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SPHeader from '@/components/SP/Header';
import SPFooter from '@/components/SP/Footer';
const locales = ['en', 'es'];
import {routing} from '@/i18n/routing';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {

    // Ensure that the incoming `locale` is valid
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
      notFound();
    }
  setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo-mexe.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/images/logo-mexe.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/images/logo-mexe.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/images/logo-mexe.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/images/logo-mexe.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/images/logo-mexe.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/images/logo-mexe.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/images/logo-mexe.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/images/logo-mexe.png" />
      </Head>

      <body className="font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Desktop Header */}
          <div className="hidden lg:block">
            <Header/>
          </div>
          {/* Mobile Header */}
          <div className="lg:hidden">
            <SPHeader/>
          </div>
          {children}
          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
