import { FC } from 'react';
import ProductDetail from '@/components/Product';
import { api } from '@/config/api';
// import { ProductType } from '@/components/Product/types';

async function fetchRelatedProducts(categoryId: number | string, excludeProductId: number | string, limit: number = 3) {
  try {
    console.log('Fetching related products for category:', categoryId, 'excluding product:', excludeProductId);
    
    // Use API filter to get products by category directly
    // Request more products than needed to account for excluding current product
    let pageSize = Math.max(limit + 5, 10); // Get extra products to ensure we have enough after filtering
    const response = await api.listProducts(1, pageSize, Number(categoryId));
    
    if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
      console.log('No products data found in API response');
      return [];
    }

    console.log('Total products fetched from category', categoryId, ':', response.data.data.length);

    // Only need to exclude current product since API already filtered by category
    const filteredProducts = response.data.data.filter((product: any) => {
      // Check if product has valid data
      if (!product || !product.id || !product.name) {
        return false;
      }
      
      // Exclude current product
      if (product.id === excludeProductId || String(product.id) === String(excludeProductId)) {
        return false;
      }
      
      return true;
    });

    console.log('Products after excluding current product:', filteredProducts.length);

    // Map to our expected structure
    const relatedProducts = filteredProducts
      .slice(0, limit) // Take only the required number
      .map((product: any) => ({
        id: product.id,
        name: product.name || 'Unnamed Product',
        price: product.price || 0,
        image: (product.images && product.images[0]) 
          ? product.images[0].image_url 
          : '/images/placeholder-product.png',
        slug: product.slug || product.id
      }));

    console.log('Final related products:', relatedProducts.length);
    return relatedProducts;
  } catch (error) {
    console.error('Failed to fetch related products:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return [];
  }
}

async function fetchProduct(id: number | string) {
  try {
    console.log('Fetching product with ID:', id);
    const response = await api.getProduct(String(id));

    const product = response.data;
    console.log('API Response:', product);

    // Check if product data is valid
    if (!product || !product.id) {
      console.error('Invalid product data:', product);
      return { product: null };
    }

    // Check if required fields exist
    if (!product.name || !product.price) {
      console.error('Missing required product fields:', product);
      return { product: null };
    }

    return {
      product: {
        id: product.id,
        name: product.name,
        nameKey: product.slug || product.name.toLowerCase().replace(/\s+/g, '-'),
        price: product.price,
        image: (product.images && product.images[0]) ? product.images[0].image_url : '/images/placeholder-product.png',
        images: (product.images || []).map((e) => String(e.image_url || '/images/placeholder-product.png')),
        colors: (product.variants || []).map((v) => ({
          name: v.variant_name || 'Default',
          value: v.variant_value || 'default',
        })),
        description: product.description || 'No description available',
        brand: product.brand?.name || 'Unknown Brand',
        brandDescription: product.brand?.description || product.brand?.name || 'No brand description available',
        category: product.category || (product.category_id ? { id: product.category_id, name: 'Unknown Category' } : null),
        services: [
          { icon: '🚚', text: 'Miễn phí vận chuyển' },
          { icon: '🔧', text: 'Lắp đặt miễn phí' },
          { icon: '🛡️', text: 'Bảo hành 2 năm' },
          { icon: '📞', text: 'Hỗ trợ 24/7' },
        ],
        specs: (product.specifications || []).reduce((acc: any, spec: any) => {
          if (spec.spec_name && spec.spec_value) {
            acc[spec.spec_name] = spec.spec_value;
          }
          return acc;
        }, {}),
        specifications: product.specifications || [],
        quantity: product.stock_quantity || 1,
      },
    };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    return { product: null };
  }
}

interface ProductParamsProps {
  params: { id: string };
}

const ProductPage: FC<ProductParamsProps> = async ({ params }) => {
  const { id } = await params;
  const { product } = await fetchProduct(id);

  if (!product || product === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist or has been removed.</p>
          <a 
            href="/products" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </a>
        </div>
      </div>
    );
  }

  // Fetch related products if category exists
  let relatedProducts = [];
  if (product.category?.id) {
    relatedProducts = await fetchRelatedProducts(product.category.id, product.id, 3);
  }

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
};

export default ProductPage;
