import Checkout from '@/components/Checkout';

const sampleOrder = {
  items: [
    {
      name: 'Chicco Car Seat',
      price: 1300000,
      image: '/store-1.jpg',
      discount: 325000,
      quantity: 1,
    },
    {
      name: 'Car Air Freshener',
      price: 1080000,
      image: '/product-1.jpg',
      quantity: 2,
    },
  ],
  total: 3055000, // Adjusted for discounts
};

export default function CheckoutPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='grow'>
        <Checkout order={sampleOrder} />
      </main>
    </div>
  );
}
