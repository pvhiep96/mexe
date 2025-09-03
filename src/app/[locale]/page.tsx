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
      featured_products: [],
      new_brands: [],
      essential_accessories: [],
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
    return data;
  } catch (error) {
    console.error('Failed to fetch brands:', error);
    return [];
  }
};

const fetchCategories = async () => {
  try {
    const response = await api.listcategory();
    const data: Listcategory200Response = response.data;
    return data;
  } catch (error) {
    console.error('Failed to fetch brands:', error);
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
      <NewProducts products={products} />
      <EarlyOrder featuredProducts={homeData.featured_products} />
      <NewBrands newBrands={homeData.new_brands} />
      <ComboWorkspace />
      <BannerSale />
      <Videos />
      <ServiceCommitment />
      <Brands brands={brands} />
      <Contact />
    </main>
  );
}
