import NewProducts from '@/components/NewProducts';

export default function TestNewProducts() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto py-8'>
        <h1 className='mb-8 text-center text-3xl font-bold'>
          Test NewProducts Component
        </h1>
        <div className='mb-8'>
          <h2 className='mb-4 text-xl font-semibold'>
            Desktop Version (lg:block)
          </h2>
          <div className='hidden lg:block'>
            <NewProducts />
          </div>
        </div>
        <div>
          <h2 className='mb-4 text-xl font-semibold'>
            Mobile Version (sm:hidden)
          </h2>
          <div className='block lg:hidden'>
            <NewProducts />
          </div>
        </div>
      </div>
    </div>
  );
}
