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
    image: '/images/demo-item.webp',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200000,
    image: '/images/demo-item.webp',
  },
];

export default function ProductsPage() {
  const [products] = useState(sampleProducts);

  return (
    <main className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='mb-8 text-center text-3xl font-bold'>Products</h1>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {products.map((product) => (
            <div key={product.id} className='rounded-lg bg-white p-4 shadow-md'>
              <h3 className='mb-2 text-lg font-semibold'>{product.name}</h3>
              <p className='mb-4 text-xl font-bold text-blue-600'>
                {product.price.toLocaleString()}đ
              </p>
              <Link
                href={`/products/${product.id}`}
                className='inline-block rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div className='mt-8 text-center'>
          <Link
            href='/'
            className='inline-block rounded-lg bg-gray-600 px-6 py-3 text-white transition-colors hover:bg-gray-700'
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
