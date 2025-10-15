import { FC } from 'react';
import ProductListPage from '@/components/Products';
import { api } from '@/config/api';
import { ListProducts200Response } from '../../../../api';
import { Product } from '@/services/api';

// Tất cả sản phẩm

async function fetchProducts(
  page: number = 1, 
  perPage: number = 100,
  categoryId?: number,
  brandId?: number
) {
  try {
    const response = await api.listProducts(
      page,
      perPage,
      categoryId,
      brandId,
      true
    );
    const data: ListProducts200Response = response.data;
    console.log('data', JSON.stringify(data));

    const products = (data.products || []).map((product) => {
      // Get primary image or first image
      const primaryImage = product.images?.find((img) => img.is_primary);
      const imageUrl =
        primaryImage?.image_url || product.images?.[0]?.image_url || '';

      return {
        id: product.id,
        name: product.name,
        url: product.slug,
        images: product.images || (imageUrl ? [imageUrl] : ['/images/placeholder-product.png']),
        description: product.short_description || product.description || '',
        price: product.price ? parseFloat(product.price.toString()) : undefined,
        originalPrice: product.original_price
          ? parseFloat(product.original_price)
          : undefined,
        discount: product.discount_percent
          ? parseInt(product.discount_percent.toString())
          : undefined,
        ordered: product.preorder_quantity || 0,
        total: 50, // This might need to be adjusted based on your data
        endDate: product.preorder_end_date || '',
        isNew: product.is_new,
        isHot: product.is_hot,
        isPreorder: product.is_preorder,
        full_payment_transfer: product.full_payment_transfer,
        full_payment_discount_percentage:
          product.full_payment_discount_percentage,
        partial_advance_payment: product.partial_advance_payment,
        advance_payment_percentage: product.advance_payment_percentage,
        advance_payment_discount_percentage:
          product.advance_payment_discount_percentage,
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

// Fetch categories to map slug -> ID
async function fetchCategories() {
  try {
    const response = await api.listcategory();
    return response.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch brands to map slug -> ID
async function fetchBrands() {
  try {
    const response = await api.listbrands();
    return response.data || [];
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    category?: string;
    brand?: string;
    preorder?: string;
    page?: string;
    perPage?: string;
  }>;
}

const ProductsPage: FC<PageProps> = async ({ params, searchParams }) => {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  
  const page = parseInt(awaitedSearchParams.page || '1');
  const perPage = parseInt(awaitedSearchParams.perPage || '100');
  
  // Fetch categories and brands to map slug -> ID
  const [categories, brands] = await Promise.all([
    fetchCategories(),
    fetchBrands()
  ]);

  // Find category ID from slug
  let categoryId: number | undefined;
  let categoryName: string | undefined;
  if (awaitedSearchParams.category) {
    const flatCategories: any[] = [];
    (categories as any[]).forEach((cat: any) => {
      flatCategories.push(cat);
      if (cat.subcategories) {
        flatCategories.push(...cat.subcategories);
      }
    });
    const category = flatCategories.find((cat: any) => cat.slug === awaitedSearchParams.category);
    if (category) {
      categoryId = category.id;
      categoryName = category.name;
    }
  }

  // Find brand ID from slug (support partial match for flexibility)
  let brandId: number | undefined;
  let brandName: string | undefined;
  if (awaitedSearchParams.brand) {
    // Try exact match first
    let brand = (brands as any[]).find((b: any) => b.slug === awaitedSearchParams.brand);
    
    // If no exact match, try partial match (e.g., 'toyota' matches 'toyota-genuine-parts')
    if (!brand) {
      brand = (brands as any[]).find((b: any) => 
        b.slug?.toLowerCase().includes(awaitedSearchParams.brand?.toLowerCase())
      );
    }
    
    if (brand) {
      brandId = brand.id;
      brandName = brand.name;
    }
  }

  // Fetch products with filters
  const {
    products,
    total,
    page: currentPage,
    perPage: itemsPerPage,
  } = await fetchProducts(page, perPage, categoryId, brandId);

  // Pass filter info to component
  return (
    <ProductListPage 
      allProducts={products as unknown as Product[]}
      filterInfo={{
        category: categoryName,
        brand: brandName,
        isPreorder: awaitedSearchParams.preorder === 'true'
      }}
    />
  );
};

export default ProductsPage;
