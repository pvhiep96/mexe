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
import { DefaultApi, ListProducts200Response } from '../../../api';
import { Configuration } from '../../../api';

const configuration = new Configuration({
  basePath: 'http://localhost:3005/api/v1',
});
const api = new DefaultApi(configuration);

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

export default async function Home() {
  const page = 1;
  const perPage = 10;

  const {
    products,
    total,
    page: currentPage,
    perPage: itemsPerPage,
  } = await fetchProducts(page, perPage);

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
