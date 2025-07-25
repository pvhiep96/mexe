'use client';

import Image from 'next/image';

const commitmentsDesktop = [
  {
    title: (
      <>
        HỖ TRỢ
        <br />
        24/7
      </>
    ),
    icon: '/images/demo-icon-delivery.png',
    alt: 'Hỗ trợ 24/7',
  },
  {
    title: (
      <>
        ĐẢM BẢO
        <br />
        UY TÍN CHẤT
        <br />
        LƯỢNG
      </>
    ),
    icon: '/images/demo-icon-delivery.png',
    alt: 'Đảm bảo uy tín chất lượng',
  },
  {
    title: (
      <>
        GIAO HÀNG
        <br />
        NHANH CHÓNG
      </>
    ),
    icon: '/images/demo-icon-delivery.png',
    alt: 'Giao hàng nhanh chóng',
  },
  {
    title: (
      <>
        MUA HÀNG CỰC KÌ
        <br />
        DỄ DÀNG
      </>
    ),
    icon: '/images/demo-icon-delivery.png',
    alt: 'Mua hàng cực kì dễ dàng',
  },
];

const commitmentsMobile = [
  {
    title: (
      <>
        HỖ TRỢ
        <br />
        24/7
      </>
    ),
    icon: '/images/demo-icon-delivery.png',
    alt: 'Hỗ trợ 24/7',
  },
  {
    title: (
      <>
        ĐẢM BẢO
        <br />
        UY TÍN
      </>
    ),
    icon: '/images/demo-icon-delivery.png',
    alt: 'Đảm bảo uy tín',
  },
  {
    title: (
      <>
        GIAO HÀNG
        <br />
        NHANH
      </>
    ),
    icon: '/images/demo-icon-delivery.png',
    alt: 'Giao hàng nhanh',
  },
  {
    title: (
      <>
        MUA HÀNG
        <br />
        DỄ DÀNG
      </>
    ),
    icon: '/images/demo-icon-delivery.png',
    alt: 'Mua hàng dễ dàng',
  },
];

export default function ServiceCommitment() {
  return (
    <div>
      {/* Desktop version */}
      <div className='hidden lg:block'>
        <section className='w-full bg-gray-100 py-8'>
          <div className='mx-auto max-w-7xl px-4'>
            <h2 className='mb-8 text-center text-4xl font-extrabold tracking-wide'>
              CAM KẾT DỊCH VỤ
            </h2>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
              {commitmentsDesktop.map((commitment, idx) => (
                <div className='flex flex-col items-center' key={idx}>
                  <Image
                    src={commitment.icon}
                    alt={commitment.alt}
                    width={160}
                    height={160}
                    className='mb-4 h-40 w-40 object-contain'
                  />
                  <div className='mt-2 text-center text-xl leading-tight font-extrabold'>
                    {commitment.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* Mobile version */}
      <div className='block lg:hidden'>
        <section className='w-full bg-gray-100 py-4'>
          <div className='mx-auto max-w-xs px-2'>
            <h2 className='mb-4 text-center text-lg font-extrabold'>
              CAM KẾT DỊCH VỤ
            </h2>
            <div className='grid grid-cols-2 gap-2'>
              {commitmentsMobile.map((commitment, idx) => (
                <div className='flex flex-col items-center' key={idx}>
                  <Image
                    src={commitment.icon}
                    alt={commitment.alt}
                    width={64}
                    height={64}
                    className='mb-2 h-16 w-16 object-contain'
                  />
                  <div className='mt-1 text-center text-xs leading-tight font-bold'>
                    {commitment.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
