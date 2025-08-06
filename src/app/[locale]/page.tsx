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
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col'>
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
    </main>
  );
}
