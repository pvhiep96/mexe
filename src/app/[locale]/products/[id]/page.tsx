import { FC } from 'react';
import ProductDetail from '@/components/Product';
import { api } from '@/config/api';
// import { ProductType } from '@/components/Product/types';

async function fetchProduct(id: number | string) {
  try {
    const response = await api.getProduct(String(id));

    const product = response.data;
    console.log('Product payment options:', {
      full_payment_transfer: product.full_payment_transfer,
      partial_advance_payment: product.partial_advance_payment,
    });

    // Check if product data is valid
    if (!product || !product.id) {
      return { product: null, relatedProducts: [] };
    }

    // Check if required fields exist
    if (!product.name || !product.price) {
      return { product: null, relatedProducts: [] };
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
        shortDescription: product.short_description || '',
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
        descriptions: (product.descriptions || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
        videos: (product.videos || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
        quantity: product.stock_quantity || 1,
        // Include payment options from API response
        full_payment_transfer: product.full_payment_transfer || false,
        full_payment_discount_percentage: product.full_payment_discount_percentage || 0,
        partial_advance_payment: product.partial_advance_payment || false,
        advance_payment_percentage: product.advance_payment_percentage || 0,
        advance_payment_discount_percentage: product.advance_payment_discount_percentage || 0,
      },
      relatedProducts: product.related_products || []
    };
  } catch (error) {
    if (error instanceof Error) {
    }
    return { product: null, relatedProducts: [] };
  }
}

interface ProductParamsProps {
  params: { id: string };
}

const ProductPage: FC<ProductParamsProps> = async ({ params }) => {
  const { id } = await params;
  const { product, relatedProducts } = await fetchProduct(id);

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

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
};

export default ProductPage;