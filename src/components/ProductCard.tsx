import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { BellAlertIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

interface Product {
  id: number;
  title: string;
  slug: string;
  images: string[];
  releaseDate: string;
  prices: {
    type: string;
    name: string;
    price: string;
    discount: string;
    active?: boolean;
  }[];
}

interface ProductCardProps {
  product: Product;
  handleMouseOver: (e: React.MouseEvent, content: string) => void;
  handleMouseOut: () => void;
}

export default function ProductCard({
  product,
  handleMouseOver,
  handleMouseOut,
}: ProductCardProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!mounted) return;
    
    const targetDate = new Date('2025-07-25T00:00:00').getTime();
    const updateTime = () => {
      setTimeLeft(Math.max(0, targetDate - Date.now()));
    };
    
    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [mounted]);


  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className='grid cursor-pointer grid-cols-2 gap-4 rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg'>
      <div className='m-auto ml-4'>
        <Link href={`/products/2`} className='cursor-pointer'>
          <div className='grid grid-cols-2 place-content-center place-items-center gap-2 justify-self-center'>
            <Image
              src={product.images[0]}
              alt={product.title}
              width={100}
              height={100}
              className=''
            />
            <Image
              src={product.images[1]}
              alt={product.title}
              width={100}
              height={100}
              className=''
            />
            <Image
              src={product.images[2]}
              alt={product.title}
              width={100}
              height={100}
              className='h-24 w-full object-cover'
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </Link>
        <div
          className='absolute top-0 right-0 flex items-center gap-2 rounded border border-dashed bg-green-700 px-2 py-1 text-white'
          onMouseOver={(e) =>
            handleMouseOver(
              e,
              'Comming soon là trạng thái một sản phẩm mới đã sẵn sàng ra mắt người dùng, tuy nhiên chúng tôi cần thời gian chuẩn bị một số khâu cuối cùng để đưa sản phẩm ra mắt chỉnh chu nhất đến các khách hàng của Mexe. Ngày ra mắt của sản phẩm là ngày mà khách hàng có thể chính thức đặt hàng được, tuy nhiên bạn cũng có thể đăng ký sớm các slot giá tốt ở thời điểm hiện tại để được ưu tiên giữ các slot khuyến mãi này.'
            )
          }
          onMouseOut={handleMouseOut}
        >
          <span className='text-sm'>
            Coming
            <br />
            Soon
          </span>
          <Image
            src='https://file.hstatic.net/1000269366/file/div.accordion__toggle_19ccc6ffc4464ae7b11fecc7d634eaab.png'
            alt='Mexe'
            width={16}
            height={16}
            className='absolute top-0 right-0 translate-x-1/2 translate-y-1/2'
          />
        </div>
      </div>

      <div className='p-4'>
        <Link
          href={`/products/${product.slug}`}
          className='inline-block w-[200px] cursor-pointer truncate text-lg font-semibold transition-colors hover:text-blue-600'
        >
          {product.title}
        </Link>
        <div className='mt-2'>
          <div className='flex items-center justify-center gap-2'>
            <CalendarDaysIcon className='size-5 text-gray-500' />
            <span>Dự kiến ra mắt:</span>
          </div>
          <p className='text-center text-sm'>0 giờ sáng</p>
          <time className='m-1 flex w-full justify-center rounded-lg bg-green-700 p-2 text-center text-sm font-semibold text-white'>
            {product.releaseDate}
          </time>
          {mounted && (
            <div className='mt-1 grid grid-cols-4 gap-2 text-center text-sm'>
              <div className='rounded p-2'>
                <span className='font-semibold'>{days}</span> ngày
              </div>
              <div className='rounded p-2'>
                <span className='font-semibold'>{hours}</span> giờ
              </div>
              <div className='rounded p-2'>
                <span className='font-semibold'>{minutes}</span> phút
              </div>
              <div className='rounded p-2'>
                <span className='font-semibold'>{seconds}</span> giây
              </div>
            </div>
          )}
        </div>
        <div className='mt-4'>
          <Link
            href='#'
            className='inline-flex cursor-pointer items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700'
            onClick={(e) => e.preventDefault()}
          >
            <b className='text-sm'>Đăng ký đặt trước</b>
            <BellAlertIcon className='size-5' />
          </Link>
        </div>
        <div className='mt-4 hidden'>
          {product.prices.map((price) => (
            <div
              key={price.type}
              className={`p-2 ${price.active ? 'bg-gray-100' : ''}`}
            >
              <div className='font-semibold'>
                {price.name}: <ins>{price.price}</ins>
              </div>
              <div>{price.name}</div>
              {price.discount && (
                <span className='text-green-600'>Saving {price.discount}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
