import EarlyOrder from '@/components/EarlyOrder';

export default function TestEarlyOrder() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto py-8'>
        <h1 className='mb-8 text-center text-3xl font-bold'>
          Test EarlyOrder Component
        </h1>
        <EarlyOrder />
      </div>
    </div>
  );
}
