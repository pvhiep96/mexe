'use client';

import Banner from '@/components/Banner';
import NewProducts from '@/components/NewProducts';
import EarlyOrder from '@/components/EarlyOrder';
import NewBrands from '@/components/NewBrands';
import ComboWorkspace from '@/components/ComboWorkspace';
import BannerSale from '@/components/BannerSale';
import Workspace from '@/components/Workspace';
import Videos from '@/components/Videos';
import ServiceCommitment from '@/components/ServiceCommitment';
import Brands from '@/components/Brands';
import Contact from '@/components/Contact';
import SPBanner from '@/components/SP/Banner';
import SPNewProductsMobile from '@/components/SP/NewProducts';
import SPEarlyOrder from '@/components/SP/EarlyOrder';
import SPNewBrands from '@/components/SP/NewBrands';
import SPComboWorkspace from '@/components/SP/ComboWorkspace';
import SPBannerSale from '@/components/SP/BannerSale';
import SPWorkspace from '@/components/SP/Workspace';
import SPVideos from '@/components/SP/Videos';
import SPServiceCommitment from '@/components/SP/ServiceCommitment';
import SPBrands from '@/components/SP/Brands';
import SPContact from '@/components/SP/Contact';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export default function Home() {
  return (
    <main className='flex min-h-screen flex-col'>
      {/* Desktop Sections */}
      <Banner />
      <NewProducts />
      <EarlyOrder />
      <NewBrands />
      <ComboWorkspace />
      <BannerSale />
      <Workspace />
      <Videos />
      <ServiceCommitment />
      <Brands />
      <Contact />

      {/* Mobile Sections (SP) */}
    </main>
  );
}
