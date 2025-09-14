import Banner from '@/components/Banner';
import NewProducts from '@/components/NewProducts';
import EarlyOrder from '@/components/EarlyOrder';
import NewBrands from '@/components/NewBrands';
import ComboWorkspace from '@/components/ComboWorkspace';
import BannerSale from '@/components/BannerSale';
import Videos from '@/components/Videos';
import ServiceCommitment from '@/components/ServiceCommitment';
import Brands from '@/components/Brands';
import Contact from '@/components/Contact';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  ListProducts200Response,
  Listbrands200Response,
  Listcategory200Response,
} from '../../../api';

import { api } from '@/config/api';
import { apiClient } from '@/services/api';

async function fetchHomeData() {
  try {
    const homeData = await apiClient.getHomeData();
    return homeData;
  } catch (error) {
    console.error('Failed to fetch home data:', error);
    return {
      categories: [],
      best_sellers: [],
      early_order_products: {
        trending_products: [],
        new_products: [],
        ending_soon_products: [],
        arriving_soon_products: [],
      },
      new_brands: [],
      essential_accessories: [],
      hot_special_offer: [],
    };
  }
}

// Keep old functions for backward compatibility (can be removed later)
async function fetchProducts(page: number = 1, perPage: number = 10) {
  try {
    const response = await api.listProducts(
      page,
      perPage,
      undefined,
      undefined,
      true
    );
    const data: ListProducts200Response = response.data;
    return {
      products: data.products || [],
      total: data.meta?.total || 0,
      page: data.meta?.page || 1,
      perPage: data.meta?.per_page || perPage,
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: [], total: 0, page: 1, perPage };
  }
}

const fetchbrands = async () => {
  try {
    const response = await api.listbrands();
    const data: Listbrands200Response = response.data;
    return data.stores || [];
  } catch (error) {
    console.error('Failed to fetch brands:', error);
    return [];
  }
};

const fetchCategories = async () => {
  try {
    const response = await fetch('http://localhost:3005/api/v1/categories');
    const categories = await response.json();

    // Transform to match Banner component interface
    return categories.map((category: any) => ({
      id: category.id,
      name: category.name,
      slug: category.slug || category.name.toLowerCase().replace(/\s+/g, '-'),
      image: category.image_url || '/images/icon-more.webp',
      subcategories: category.subcategories || []
    }));
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

export default async function Home() {
  // Fetch home data from API
  const homeData = await fetchHomeData();
  
  // Keep backward compatibility for existing components
  const page = 1;
  const perPage = 10;
  const {
    products,
    total,
    page: currentPage,
    perPage: itemsPerPage,
  } = await fetchProducts(page, perPage);
  const brands = await fetchbrands();
  const legacyCategories = await fetchCategories();
  
  return (
    <main className='flex min-h-screen flex-col'>
      <Banner categories={legacyCategories} />
      <NewProducts products={products as any} />
      <EarlyOrder earlyOrderProducts={homeData.early_order_products} />
      <NewBrands hotSpecialOffer={homeData.hot_special_offer} />
      <ComboWorkspace essentialAccessories={homeData.essential_accessories} />
      <BannerSale />
      <Videos />
      <ServiceCommitment />
      <Brands brands={brands as any} />
      <Contact />
    </main>
  );
}
