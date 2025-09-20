import { FC } from 'react';
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

    const products = (data.products || []).map((product) => {
      // Get primary image or first image
      const primaryImage = product.images?.find((img) => img.is_primary);
      const imageUrl =
        primaryImage?.image_url || product.images?.[0]?.image_url || '';

      return {
        id: product.id,
        name: product.name,
        url: product.slug,
        image: imageUrl,
        description: product.short_description || product.description || '',
        price: product.price ? parseFloat(product.price) : undefined,
        originalPrice: product.original_price
          ? parseFloat(product.original_price)
          : undefined,
        discount: product.discount_percent
          ? parseInt(product.discount_percent)
          : undefined,
        ordered: product.preorder_quantity || 0,
        total: 50, // This might need to be adjusted based on your data
        endDate: product.preorder_end_date || '',
        isNew: product.is_new,
        isHot: product.is_hot,
        isPreorder: product.is_preorder,
        full_payment_transfer: product.full_payment_transfer,
        full_payment_discount_percentage: product.full_payment_discount_percentage,
        partial_advance_payment: product.partial_advance_payment,
        advance_payment_percentage: product.advance_payment_percentage,
        advance_payment_discount_percentage: product.advance_payment_discount_percentage,
      };
    });
    return {
      products: products,
      total: data.meta?.total || 0,
      page: data.meta?.page || 1,
      perPage: data.meta?.per_page || perPage,
    };
  } catch (error) {
    console.error('Error fetching products:', {
      name: (error as any)?.name,
      message: (error as any)?.message,
      stack: (error as any)?.stack,
    });
    return { products: [], total: 0, page: 1, perPage };
  }
}

interface PageProps {
  params: {
    page: number;
    perPage: number;
  };
}

const ProductsPage: FC<PageProps> = async ({ params }) => {
  const { page, perPage } = await params;

  const {
    products,
    total,
    page: currentPage,
    perPage: itemsPerPage,
  } = await fetchProducts(page, perPage);

  return <ProductListPage allProducts={products} />;
};

export default ProductsPage;
