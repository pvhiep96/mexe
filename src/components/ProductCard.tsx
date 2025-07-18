import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

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


export default function ProductCard({ product, handleMouseOver, handleMouseOut }: ProductCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const updateTimer = () => {
      const distance = formatDistanceToNow(new Date(product.releaseDate));
      setTimeLeft(distance);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [product.releaseDate]);

  return (
    <div className="bg-white rounded-lg shadow-md grid grid-cols-2 gap-4">
      <div className="m-auto ml-4">
        <Link href={`/products/${product.slug}`} className="" >
          <div className="grid grid-cols-2 gap-2 justify-center justify-items-center justify-self-center content-center items-center">
            <Image
              src={product.images[0]}
              alt={product.title}
              width={100}
              height={100}
              className=""
            />
            <Image
              src={product.images[1]}
              alt={product.title}
              width={100}
              height={100}
              className=""
            />
            <Image
              src={product.images[2]}
              alt={product.title}
              width={100}
              height={100}
              className="w-full h-24 object-cover"
            />
          </div>
        </Link>
        <div
          className="absolute top-0 right-0 flex items-center gap-2 bg-green-700 text-white px-2 py-1 rounded border border-dashed"
          onMouseOver={(e) =>
            handleMouseOver(
              e,
              'Comming soon là trạng thái một sản phẩm mới đã sẵn sàng ra mắt người dùng, tuy nhiên chúng tôi cần thời gian chuẩn bị một số khâu cuối cùng để đưa sản phẩm ra mắt chỉnh chu nhất đến các khách hàng của Vaithuhay. Ngày ra mắt của sản phẩm là ngày mà khách hàng có thể chính thức đặt hàng được, tuy nhiên bạn cũng có thể đăng ký sớm các slot giá tốt ở thời điểm hiện tại để được ưu tiên giữ các slot khuyến mãi này.'
            )
          }
          onMouseOut={handleMouseOut}
        >
          <span className="text-sm">Coming<br />Soon</span>
          <Image
            src="https://file.hstatic.net/1000269366/file/div.accordion__toggle_19ccc6ffc4464ae7b11fecc7d634eaab.png"
            alt="Vài Thứ Hay"
            width={16}
            height={16}
            className="absolute top-0 right-0 transform translate-x-1/2 translate-y-1/2"
          />
        </div>
      </div>
      <div className="p-4">
        <Link href={`/products/${product.slug}`} className="text-lg font-semibold hover:text-blue-600 truncate w-64">
          {product.title}
        </Link>
        <div className="mt-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <Image
              src="https://file.hstatic.net/1000269366/file/___icon__calendar__a7b57c81100b4e4aad6001a644a3f03c.png"
              alt="Dự kiến ra mắt"
              width={16}
              height={16}
            />
            <span>Dự kiến ra mắt:</span>
          </div>
          <p className="text-sm">0 giờ sáng</p>
          <time>{new Date(product.releaseDate).toLocaleDateString('vi-VN')}</time>
          <p className="text-sm mt-1">{timeLeft}</p>
        </div>
        <div className="mt-4">
          <Link
            href="#"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full "
            onClick={(e) => e.preventDefault()}
          >
            <b>Đăng ký đặt trước</b>
            <Image
              src="https://file.hstatic.net/1000269366/file/icon__bell_c75991a1f91f4820bcd15d4d5621da82.svg"
              alt="Vài Thứ Hay"
              width={30}
              height={30}
              className="bg-white rounded-full"
            />
          </Link>
        </div>
        <div className="hidden mt-4">
          {product.prices.map((price) => (
            <div
              key={price.type}
              className={`p-2 ${price.active ? 'bg-gray-100' : ''}`}
            >
              <div className="font-semibold">{price.name}: <ins>{price.price}</ins></div>
              <div>{price.name}</div>
              {price.discount && <span className="text-green-600">Saving {price.discount}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
