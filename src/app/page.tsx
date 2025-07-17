import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ComboSection from '@/components/ComboSection';
import ComingSoonSection from '@/components/ComingSoonSection';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const products = [
    {
      id: 1,
      name: 'Chuột không dây Gaming Gravastar Mercury Pro M1 & M2',
      price: '2,550,000₫',
      image: '/images/product1.jpg',
    },
    {
      id: 2,
      name: 'Đèn RGBIC hiệu ứng NID Glide dạng ống',
      price: '940,500₫',
      image: '/images/product2.jpg',
    },
    // Add more products as needed
  ];

  const combos = [
    {
      id: 21,
      title: 'Combo sản phẩm 21',
      originalPrice: '9,419,000₫',
      comboPrice: '7,535,200₫',
      discount: '20%',
      items: [
        {
          name: '9SPACE - Deskpad Thảm Nỉ Trải Bàn Làm Việc',
          price: '180,000₫',
        },
        {
          name: 'DeltaHub - Kê Cổ Tay Công Thái Học Carpio 2.0',
          price: '859,000₫',
        },
        {
          name: 'Đèn cảm ứng âm thanh gỗ cao cấp - NID B-Light gỗ',
          price: '1,090,000₫',
        },
        {
          name: 'Đồng hồ để bàn RGB LED Clock Rainbow Time',
          price: '1,790,000₫',
        },
        { name: 'Loa Bluetooth Gravastar Mars Pro', price: '5,500,000₫' },
      ],
      description:
        'Phong cách tối giản luôn là một điểm nhấn sáng trong các cách setup góc làm việc...',
    },
    // Add more combos as needed
  ];

  const comingSoonProducts = [
    {
      id: 101,
      name: 'Đèn Nikolatoy Resin RGB Dragon Ball Z Kakarot',
      pioneerPrice: '3,043,800₫',
      discountPrice: '3,804,750₫',
      preorderPrice: '4,312,050₫',
      originalPrice: '5,073,000₫',
      launchDate: '01/10/2025',
      description:
        'Đèn Resin RGB Dragon Ball Z Kakarot là món decor độc đáo tái hiện hình ảnh Goku cực ngầu...',
    },
    // Add more coming soon products as needed
  ];

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <Sidebar />
      <main className='grow'>
        {/* Coming Soon Section */}
        <section className='mb-12'>
          {comingSoonProducts.map((product) => (
            <ComingSoonSection key={product.id} {...product} />
          ))}
        </section>
        {/* Hero Section */}
        <section className='mb-12'>
          <h1 className='mb-4 text-center text-4xl font-bold'>
            Khám phá Vài Thứ Hay
          </h1>
          <p className='text-center text-gray-600'>
            Nâng tầm không gian làm việc với những sản phẩm công nghệ độc đáo
          </p>
        </section>

        {/* Categories */}
        <section className='mb-12'>
          <h2 className='mb-4 text-2xl font-semibold'>Khám phá theo chủ đề</h2>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            <a
              href='/products/setup'
              className='rounded-lg bg-gray-100 p-4 text-center hover:bg-gray-200'
            >
              Setup Góc Làm Việc
            </a>
            <a
              href='/products/keyboards'
              className='rounded-lg bg-gray-100 p-4 text-center hover:bg-gray-200'
            >
              Bàn Phím Hay
            </a>
            <a
              href='/products/new'
              className='rounded-lg bg-gray-100 p-4 text-center hover:bg-gray-200'
            >
              Sản Phẩm Mới
            </a>
            <a
              href='/products/steampunk'
              className='rounded-lg bg-gray-100 p-4 text-center hover:bg-gray-200'
            >
              Sản Phẩm DIY Steampunk
            </a>
          </div>
        </section>

        {/* Featured Products */}
        <section className='mb-12'>
          <h2 className='mb-4 text-2xl font-semibold'>Sản phẩm nổi bật</h2>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* Combo Section */}
        <section className='mb-12'>
          <h2 className='mb-4 text-2xl font-semibold'>Combo sản phẩm</h2>
          {combos.map((combo) => (
            <ComboSection key={combo.id} {...combo} />
          ))}
        </section>

      </main>
      <Footer />
    </div>
  );
}
