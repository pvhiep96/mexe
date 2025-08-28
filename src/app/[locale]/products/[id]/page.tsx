import { FC } from 'react';
import ProductDetail from '@/components/Product';
import { api } from '@/config/api';
// import { ProductType } from '@/components/Product/types';

async function fetchProduct(id: number | string) {
  try {
    const response = await api.getProduct(String(id));

    const product = response.data;
    // const { attributes } = product;
    console.log(product);
    return {
      product: {
        id: product.id,
        name: product.name,
        nameKey: product.slug,
        price: product.price,
        image: product.images[0].image_url,
        images: (product.images || []).map((e) => String(e.image_url)),
        colors: (product.variants || []).map((v) => ({
          name: v.variant_name,
          value: v.variant_value,
        })),
        description: product.description,
        brand: product.brand?.name,
        brandDescription: product.brand?.name,
        services: [
          { icon: '🚚', text: 'Miễn phí vận chuyển' },
          { icon: '🔧', text: 'Lắp đặt miễn phí' },
          { icon: '🛡️', text: 'Bảo hành 2 năm' },
          { icon: '📞', text: 'Hỗ trợ 24/7' },
        ],
        specs: (product.variants || []).reduce((acc: any, item: any) => {
          acc[item.spec_name] = item.spec_value;
          return acc;
        }, {}),
        quantity: product.stock_quantity,
      },
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: {} };
  }
}

interface ProductParamsProps {
  params: { id: string };
}

const ProductPage: FC<ProductParamsProps> = async ({ params }) => {
  // const ProductPage: NextPage<ProductParamsProps> = async ({ id }) => {
  const { id } = await params;
  const { product } = await fetchProduct(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetail product={product} />;
};

export default ProductPage;
