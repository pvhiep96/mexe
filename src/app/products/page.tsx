'use client';

import { useState, useEffect } from 'react';
import Products from '@/components/Products';
import { apiClient } from '@/services/api';
import type { Product } from '@/services/api';

// Force client-side rendering
export const dynamic = 'force-dynamic';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getProducts();
        setProducts(response.products);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Có lỗi xảy ra khi tải danh sách sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main className='min-h-screen bg-gray-50 py-8'>
        <div className='container mx-auto px-4'>
          <h1 className='mb-8 text-center text-3xl font-bold'>Products</h1>
          <div className='flex justify-center'>
            <div className='text-lg text-gray-600'>Đang tải sản phẩm...</div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className='min-h-screen bg-gray-50 py-8'>
        <div className='container mx-auto px-4'>
          <h1 className='mb-8 text-center text-3xl font-bold'>Products</h1>
          <div className='text-center'>
            <div className='text-lg text-red-600 mb-4'>{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className='rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700'
            >
              Thử lại
            </button>
          </div>
        </div>
      </main>
    );
  }

  return <Products allProducts={products} />;
}
