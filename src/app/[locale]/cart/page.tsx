import { FC } from 'react';
import Cart from '@/components/Cart';

const CartPage: FC = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='grow'>
        <Cart />
      </main>
    </div>
  );
};

export default CartPage;
