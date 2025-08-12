'use client';

import { useState } from 'react';
import Link from 'next/link';

// Force client-side rendering
export const dynamic = 'force-dynamic';

const sampleProducts = [
  {
    id: 1,
    name: 'Product 1',
    price: 100000,
    image: '/images/demo-item.webp'
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200000,
    image: '/images/demo-item.webp'
  }
];

export default function ProductsPage() {
  const [products] = useState(sampleProducts);

  return (
    <main className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold text-center mb-8'>Products</h1>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map((product) => (
            <div key={product.id} className='bg-white rounded-lg shadow-md p-4'>
              <h3 className='text-lg font-semibold mb-2'>{product.name}</h3>
              <p className='text-xl font-bold text-blue-600 mb-4'>
                {product.price.toLocaleString()}đ
              </p>
              <Link
                href={`/products/${product.id}`}
                className='inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors'
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div className='text-center mt-8'>
          <Link 
            href="/" 
            className='inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors'
          >
            Back to Home
          </Link>
        </div>
        </div>
      </main>
  );
}