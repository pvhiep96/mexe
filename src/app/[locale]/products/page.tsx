import ProductListPage from '@/components/Products';
import { api } from '@/config/api';
import { ListProducts200Response } from '../../../../api';

// Tất cả sản phẩm

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

    const products = (data.products || []).map((product) => ({
      id: product.id,
      name: product.name,
      url: product.slug,
      image:
        'https://file.hstatic.net/1000069970/collection/20250711-son08030_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
      description:
        'Màn hình 5K, 120Hz, 40 inch, ngàm VESA, chuyên nghiệp cho thiết kế.',
      ordered: 12,
      total: 50,
      endDate: '30/07/2025',
    }));
    return {
      products: products,
      total: data.meta?.total || 0,
      page: data.meta?.page || 1,
      perPage: data.meta?.per_page || perPage,
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: [], total: 0, page: 1, perPage };
  }
}
export default async function Products() {
  const page = 1;
  const perPage = 10;

  const {
    products,
    total,
    page: currentPage,
    perPage: itemsPerPage,
  } = await fetchProducts(page, perPage);

  return <ProductListPage allProducts={products} />;
}
