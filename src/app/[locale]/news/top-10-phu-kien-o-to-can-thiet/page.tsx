import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import RelatedArticlesSlider from '@/components/RelatedArticlesSlider';

export default async function Top10AutoAccessoriesArticle() {
  const t = await getTranslations('news');

  return (
    <div className='min-h-screen bg-white'>
      {/* Desktop Version */}
      <div className='hidden md:block'>
        {/* Breadcrumb Navigation */}
        <div className='border-b bg-white'>
          <div className='container mx-auto px-4 py-4'>
            <nav className='flex' aria-label='Breadcrumb'>
              <ol className='inline-flex items-center space-x-1 md:space-x-3'>
                <li className='inline-flex items-center'>
                  <Link
                    href='/'
                    className='text-sm text-gray-700 hover:text-blue-600'
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <div className='flex items-center'>
                    <span className='mx-2 text-gray-400'>/</span>
                    <Link
                      href='/news'
                      className='text-sm text-gray-700 hover:text-blue-600'
                    >
                      Phụ Kiện Ô Tô
                    </Link>
                  </div>
                </li>
                <li aria-current='page'>
                  <div className='flex items-center'>
                    <span className='mx-2 text-gray-400'>/</span>
                    <span className='text-sm text-gray-500'>
                      Top 10 phụ kiện ô tô cần thiết
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <div className='bg-gray-50 py-8'>
          <div className='container mx-auto px-4'>
            <h1 className='mb-4 text-center text-3xl font-bold text-gray-900'>
              Top 10 phụ kiện ô tô cần thiết cho xe mới
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className='container mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {/* Article Content */}
            <div className='lg:col-span-2'>
              <div className='prose prose-lg max-w-none'>
                {/* Hero Image */}
                <div className='mb-8 text-center'>
                  <div className='relative h-96 overflow-hidden rounded-lg'>
                    <Image
                      src='/images/demo-banner/banner-1.jpg'
                      alt='Top 10 phụ kiện ô tô cần thiết'
                      fill
                      className='object-cover'
                    />
                  </div>
                </div>

                {/* Article Content */}
                <div className='article-content'>
                  <h2 className='mb-6 text-2xl font-bold text-gray-900'>
                    <strong>Top 10 phụ kiện ô tô cần thiết cho xe mới</strong>
                  </h2>

                  <p className='mb-6 text-lg leading-relaxed text-gray-700'>
                    Khi mua xe mới, việc trang bị những phụ kiện phù hợp không
                    chỉ giúp bảo vệ xe mà còn nâng cao trải nghiệm lái xe và đảm
                    bảo an toàn cho gia đình. Dưới đây là danh sách những phụ
                    kiện quan trọng nhất mà mọi chủ xe mới nên trang bị.
                  </p>

                  <h3 className='mt-8 mb-4 text-xl font-bold text-gray-900'>
                    <strong>Tại sao cần trang bị phụ kiện cho xe mới?</strong>
                  </h3>
                  <p className='mb-4 text-gray-700'>
                    Phụ kiện ô tô mang lại nhiều lợi ích quan trọng:
                  </p>
                  <ul className='mb-6 list-disc pl-6 text-gray-700'>
                    <li>Bảo vệ xe khỏi hư hại và mài mòn</li>
                    <li>Tăng cường an toàn khi lái xe</li>
                    <li>Nâng cao tiện nghi và thoải mái</li>
                    <li>Duy trì giá trị xe theo thời gian</li>
                  </ul>

                  <h3 className='mt-8 mb-4 text-xl font-bold text-gray-900'>
                    <strong>Top 10 phụ kiện ô tô cần thiết</strong>
                  </h3>

                  <div className='mb-8 space-y-6'>
                    <div className='rounded-lg bg-gray-50 p-6'>
                      <h4 className='mb-3 text-lg font-semibold text-gray-900'>
                        1. Camera hành trình
                      </h4>
                      <p className='mb-3 text-gray-700'>
                        Camera hành trình giúp ghi lại mọi hoạt động trên đường,
                        bảo vệ quyền lợi khi xảy ra tai nạn hoặc tranh chấp giao
                        thông.
                      </p>
                      <div className='rounded-lg bg-blue-50 p-4'>
                        <p className='text-sm text-blue-800'>
                          <strong>Lợi ích:</strong> Bảo vệ quyền lợi, ghi lại
                          bằng chứng, giám sát xe
                        </p>
                      </div>
                    </div>

                    <div className='rounded-lg bg-gray-50 p-6'>
                      <h4 className='mb-3 text-lg font-semibold text-gray-900'>
                        2. Thảm sàn ô tô
                      </h4>
                      <p className='mb-3 text-gray-700'>
                        Thảm sàn giúp bảo vệ sàn xe khỏi bụi bẩn, nước và mài
                        mòn, đặc biệt quan trọng trong điều kiện thời tiết ẩm
                        ướt.
                      </p>
                      <div className='rounded-lg bg-green-50 p-4'>
                        <p className='text-sm text-green-800'>
                          <strong>Lợi ích:</strong> Bảo vệ sàn xe, dễ vệ sinh,
                          tăng thẩm mỹ
                        </p>
                      </div>
                    </div>

                    <div className='rounded-lg bg-gray-50 p-6'>
                      <h4 className='mb-3 text-lg font-semibold text-gray-900'>
                        3. Máy lọc không khí
                      </h4>
                      <p className='mb-3 text-gray-700'>
                        Máy lọc không khí giúp loại bỏ bụi bẩn, vi khuẩn và mùi
                        hôi trong xe, đảm bảo không khí sạch cho gia đình.
                      </p>
                      <div className='rounded-lg bg-purple-50 p-4'>
                        <p className='text-sm text-purple-800'>
                          <strong>Lợi ích:</strong> Bảo vệ sức khỏe, loại bỏ mùi
                          hôi, không khí sạch
                        </p>
                      </div>
                    </div>

                    <div className='rounded-lg bg-gray-50 p-6'>
                      <h4 className='mb-3 text-lg font-semibold text-gray-900'>
                        4. Ghế ngồi trẻ em
                      </h4>
                      <p className='mb-3 text-gray-700'>
                        Ghế ngồi trẻ em là phụ kiện bắt buộc khi có trẻ em, đảm
                        bảo an toàn cho bé khi di chuyển.
                      </p>
                      <div className='rounded-lg bg-orange-50 p-4'>
                        <p className='text-sm text-orange-800'>
                          <strong>Lợi ích:</strong> An toàn cho trẻ em, tuân thủ
                          luật giao thông
                        </p>
                      </div>
                    </div>

                    <div className='rounded-lg bg-gray-50 p-6'>
                      <h4 className='mb-3 text-lg font-semibold text-gray-900'>
                        5. Bọc ghế da
                      </h4>
                      <p className='mb-3 text-gray-700'>
                        Bọc ghế da giúp bảo vệ ghế xe khỏi bẩn và mài mòn, đồng
                        thời tăng tính thẩm mỹ cho nội thất xe.
                      </p>
                      <div className='rounded-lg bg-red-50 p-4'>
                        <p className='text-sm text-red-800'>
                          <strong>Lợi ích:</strong> Bảo vệ ghế xe, tăng thẩm mỹ,
                          dễ vệ sinh
                        </p>
                      </div>
                    </div>

                    <div className='rounded-lg bg-gray-50 p-6'>
                      <h4 className='mb-3 text-lg font-semibold text-gray-900'>
                        6. Sạc nhanh ô tô
                      </h4>
                      <p className='mb-3 text-gray-700'>
                        Sạc nhanh ô tô giúp sạc điện thoại và các thiết bị điện
                        tử nhanh chóng khi di chuyển.
                      </p>
                      <div className='rounded-lg bg-yellow-50 p-4'>
                        <p className='text-sm text-yellow-800'>
                          <strong>Lợi ích:</strong> Tiện lợi, sạc nhanh, nhiều
                          cổng sạc
                        </p>
                      </div>
                    </div>

                    <div className='rounded-lg bg-gray-50 p-6'>
                      <h4 className='mb-3 text-lg font-semibold text-gray-900'>
                        7. Cảm biến áp suất lốp
                      </h4>
                      <p className='mb-3 text-gray-700'>
                        Cảm biến áp suất lốp giúp theo dõi áp suất lốp liên tục,
                        đảm bảo an toàn và tiết kiệm nhiên liệu.
                      </p>
                      <div className='rounded-lg bg-indigo-50 p-4'>
                        <p className='text-sm text-indigo-800'>
                          <strong>Lợi ích:</strong> An toàn, tiết kiệm nhiên
                          liệu, bảo vệ lốp
                        </p>
                      </div>
                    </div>

                    <div className='rounded-lg bg-gray-50 p-6'>
                      <h4 className='mb-3 text-lg font-semibold text-gray-900'>
                        8. Nước thơm ô tô
                      </h4>
                      <p className='mb-3 text-gray-700'>
                        Nước thơm ô tô giúp tạo mùi hương dễ chịu trong xe, loại
                        bỏ mùi hôi và tạo cảm giác thoải mái.
                      </p>
                      <div className='rounded-lg bg-pink-50 p-4'>
                        <p className='text-sm text-pink-800'>
                          <strong>Lợi ích:</strong> Mùi hương dễ chịu, loại bỏ
                          mùi hôi
                        </p>
                      </div>
                    </div>

                    <div className='rounded-lg bg-gray-50 p-6'>
                      <h4 className='mb-3 text-lg font-semibold text-gray-900'>
                        9. Gối tựa đầu
                      </h4>
                      <p className='mb-3 text-gray-700'>
                        Gối tựa đầu giúp tăng sự thoải mái khi ngồi xe, đặc biệt
                        trong những chuyến đi dài.
                      </p>
                      <div className='rounded-lg bg-teal-50 p-4'>
                        <p className='text-sm text-teal-800'>
                          <strong>Lợi ích:</strong> Tăng thoải mái, giảm mệt mỏi
                        </p>
                      </div>
                    </div>

                    <div className='rounded-lg bg-gray-50 p-6'>
                      <h4 className='mb-3 text-lg font-semibold text-gray-900'>
                        10. Bọc vô lăng
                      </h4>
                      <p className='mb-3 text-gray-700'>
                        Bọc vô lăng giúp bảo vệ vô lăng khỏi mài mòn, tăng độ
                        bám và tạo cảm giác lái xe tốt hơn.
                      </p>
                      <div className='rounded-lg bg-cyan-50 p-4'>
                        <p className='text-sm text-cyan-800'>
                          <strong>Lợi ích:</strong> Bảo vệ vô lăng, tăng độ bám,
                          cảm giác lái tốt
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className='mt-8 mb-4 text-xl font-bold text-gray-900'>
                    <strong>Lưu ý khi chọn phụ kiện ô tô</strong>
                  </h3>
                  <div className='mb-6 border-l-4 border-blue-400 bg-blue-50 p-6'>
                    <ul className='list-disc pl-6 text-gray-700'>
                      <li>
                        <strong>Chất lượng:</strong> Ưu tiên sản phẩm chất lượng
                        cao, có thương hiệu uy tín
                      </li>
                      <li>
                        <strong>Phù hợp:</strong> Chọn phụ kiện phù hợp với loại
                        xe và nhu cầu sử dụng
                      </li>
                      <li>
                        <strong>An toàn:</strong> Đảm bảo phụ kiện không ảnh
                        hưởng đến an toàn lái xe
                      </li>
                      <li>
                        <strong>Bảo hành:</strong> Chọn sản phẩm có chế độ bảo
                        hành tốt
                      </li>
                    </ul>
                  </div>

                  <h3 className='mt-8 mb-4 text-xl font-bold text-gray-900'>
                    <strong>Kết luận</strong>
                  </h3>
                  <p className='mb-8 text-gray-700'>
                    Việc trang bị đầy đủ phụ kiện ô tô cần thiết không chỉ giúp
                    bảo vệ xe mà còn nâng cao trải nghiệm lái xe và đảm bảo an
                    toàn cho gia đình. Hãy đầu tư vào những phụ kiện chất lượng
                    để có được giá trị tốt nhất cho xe của bạn.
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className='lg:col-span-1'>
              <div className='sticky top-8'>
                <div className='rounded-lg bg-gray-50 p-6'>
                  <h3 className='mb-4 text-lg font-bold text-gray-900'>
                    BÀI VIẾT MỚI
                  </h3>
                  <div className='space-y-4'>
                    <div className='flex space-x-3'>
                      <div className='flex-shrink-0'>
                        <div className='relative h-16 w-16 overflow-hidden rounded-lg'>
                          <Image
                            src='/images/demo-banner/banner-2.jpg'
                            alt='Hướng dẫn chọn camera hành trình'
                            fill
                            className='object-cover'
                          />
                        </div>
                      </div>
                      <div className='min-w-0 flex-1'>
                        <Link
                          href='/news/huong-dan-chon-camera-hanh-trinh'
                          className='block'
                        >
                          <h4 className='line-clamp-2 text-sm font-semibold text-gray-900 hover:text-blue-600'>
                            Hướng dẫn chọn camera hành trình phù hợp
                          </h4>
                        </Link>
                      </div>
                    </div>

                    <div className='flex space-x-3'>
                      <div className='flex-shrink-0'>
                        <div className='relative h-16 w-16 overflow-hidden rounded-lg'>
                          <Image
                            src='/images/demo-combo/demo-combo-1.png'
                            alt='Thảm sàn ô tô'
                            fill
                            className='object-cover'
                          />
                        </div>
                      </div>
                      <div className='min-w-0 flex-1'>
                        <Link
                          href='/news/5-loai-tham-san-o-to-tot-nhat-2024'
                          className='block'
                        >
                          <h4 className='line-clamp-2 text-sm font-semibold text-gray-900 hover:text-blue-600'>
                            5 loại thảm sàn ô tô tốt nhất 2024
                          </h4>
                        </Link>
                      </div>
                    </div>

                    <div className='flex space-x-3'>
                      <div className='flex-shrink-0'>
                        <div className='relative h-16 w-16 overflow-hidden rounded-lg'>
                          <Image
                            src='/images/demo-combo/demo-combo-2.png'
                            alt='Bảo dưỡng nội thất'
                            fill
                            className='object-cover'
                          />
                        </div>
                      </div>
                      <div className='min-w-0 flex-1'>
                        <Link
                          href='/news/cach-bao-duong-va-ve-sinh-noi-that-o-to'
                          className='block'
                        >
                          <h4 className='line-clamp-2 text-sm font-semibold text-gray-900 hover:text-blue-600'>
                            Cách bảo dưỡng và vệ sinh nội thất ô tô
                          </h4>
                        </Link>
                      </div>
                    </div>

                    <div className='flex space-x-3'>
                      <div className='flex-shrink-0'>
                        <div className='relative h-16 w-16 overflow-hidden rounded-lg'>
                          <Image
                            src='/images/demo-combo/demo-combo-3.png'
                            alt='Phụ kiện an toàn'
                            fill
                            className='object-cover'
                          />
                        </div>
                      </div>
                      <div className='min-w-0 flex-1'>
                        <Link
                          href='/news/phu-kien-an-toan-can-thiet-cho-gia-dinh'
                          className='block'
                        >
                          <h4 className='line-clamp-2 text-sm font-semibold text-gray-900 hover:text-blue-600'>
                            Những phụ kiện an toàn cần thiết cho gia đình
                          </h4>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Slider */}
        <RelatedArticlesSlider
          title={t('related_articles')}
          articles={[
            {
              href: '/news/huong-dan-chon-camera-hanh-trinh',
              image: '/images/demo-banner/banner-2.jpg',
              alt: 'Hướng dẫn chọn camera hành trình',
              title: 'Hướng dẫn chọn camera hành trình phù hợp',
              description:
                'Khám phá cách chọn camera hành trình tốt nhất cho xe của bạn',
            },
            {
              href: '/news/5-loai-tham-san-o-to-tot-nhat-2024',
              image: '/images/demo-combo/demo-combo-1.png',
              alt: 'Thảm sàn ô tô',
              title: '5 loại thảm sàn ô tô tốt nhất 2024',
              description: 'So sánh các loại thảm sàn ô tô phổ biến hiện nay',
            },
            {
              href: '/news/cach-bao-duong-va-ve-sinh-noi-that-o-to',
              image: '/images/demo-combo/demo-combo-2.png',
              alt: 'Bảo dưỡng nội thất',
              title: 'Cách bảo dưỡng và vệ sinh nội thất ô tô',
              description: 'Hướng dẫn chi tiết cách chăm sóc nội thất xe',
            },
            {
              href: '/news/phu-kien-an-toan-can-thiet-cho-gia-dinh',
              image: '/images/demo-combo/demo-combo-3.png',
              alt: 'Phụ kiện an toàn',
              title: 'Những phụ kiện an toàn cần thiết cho gia đình',
              description: 'Đảm bảo an toàn cho cả gia đình khi di chuyển',
            },
            {
              href: '/news/camera-hanh-trinh-4k-cho-o-to',
              image: '/images/demo-combo/demo-combo-4.png',
              alt: 'Camera 4K',
              title: 'Camera hành trình 4K cho ô tô',
              description:
                'Trải nghiệm chất lượng hình ảnh siêu nét với camera 4K',
            },
          ]}
        />
      </div>

      {/* Mobile Version */}
      <div className='md:hidden'>
        {/* Mobile Breadcrumb */}
        <div className='border-b bg-white px-4 py-3'>
          <nav className='flex' aria-label='Breadcrumb'>
            <ol className='inline-flex items-center space-x-1'>
              <li className='inline-flex items-center'>
                <Link
                  href='/'
                  className='text-xs text-gray-700 hover:text-blue-600'
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <div className='flex items-center'>
                  <span className='mx-2 text-gray-400'>/</span>
                  <Link
                    href='/news'
                    className='text-xs text-gray-700 hover:text-blue-600'
                  >
                    Phụ Kiện Ô Tô
                  </Link>
                </div>
              </li>
              <li aria-current='page'>
                <div className='flex items-center'>
                  <span className='mx-2 text-gray-400'>/</span>
                  <span className='text-xs text-gray-500'>
                    Top 10 phụ kiện ô tô cần thiết
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Mobile Header */}
        <div className='bg-gray-50 py-6'>
          <div className='px-4'>
            <h1 className='text-2xl font-bold text-gray-900'>
              Top 10 phụ kiện ô tô cần thiết cho xe mới
            </h1>
          </div>
        </div>

        {/* Mobile Content */}
        <div className='px-4 py-6'>
          <div className='relative mb-6 h-48 overflow-hidden rounded-lg'>
            <Image
              src='/images/demo-banner/banner-1.jpg'
              alt='Top 10 phụ kiện ô tô cần thiết'
              fill
              className='object-cover'
            />
          </div>

          <article className='prose prose-sm max-w-none'>
            <p className='mb-4 leading-relaxed text-gray-700'>
              Khi mua xe mới, việc trang bị những phụ kiện phù hợp không chỉ
              giúp bảo vệ xe mà còn nâng cao trải nghiệm lái xe và đảm bảo an
              toàn cho gia đình.
            </p>

            <h2 className='mt-6 mb-3 text-xl font-bold text-gray-900'>
              Top 10 phụ kiện ô tô cần thiết
            </h2>
            <div className='mb-4 space-y-4'>
              <div className='rounded-lg bg-blue-50 p-3'>
                <h3 className='mb-1 font-semibold text-blue-900'>
                  1. Camera hành trình
                </h3>
                <p className='text-sm text-blue-800'>
                  Bảo vệ quyền lợi, ghi lại bằng chứng
                </p>
              </div>
              <div className='rounded-lg bg-green-50 p-3'>
                <h3 className='mb-1 font-semibold text-green-900'>
                  2. Thảm sàn ô tô
                </h3>
                <p className='text-sm text-green-800'>
                  Bảo vệ sàn xe, dễ vệ sinh
                </p>
              </div>
              <div className='rounded-lg bg-purple-50 p-3'>
                <h3 className='mb-1 font-semibold text-purple-900'>
                  3. Máy lọc không khí
                </h3>
                <p className='text-sm text-purple-800'>
                  Bảo vệ sức khỏe, không khí sạch
                </p>
              </div>
              <div className='rounded-lg bg-orange-50 p-3'>
                <h3 className='mb-1 font-semibold text-orange-900'>
                  4. Ghế ngồi trẻ em
                </h3>
                <p className='text-sm text-orange-800'>An toàn cho trẻ em</p>
              </div>
              <div className='rounded-lg bg-red-50 p-3'>
                <h3 className='mb-1 font-semibold text-red-900'>
                  5. Bọc ghế da
                </h3>
                <p className='text-sm text-red-800'>
                  Bảo vệ ghế xe, tăng thẩm mỹ
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Mobile Related Articles */}
        <RelatedArticlesSlider
          title={t('related_articles')}
          articles={[
            {
              href: '/news/huong-dan-chon-camera-hanh-trinh',
              image: '/images/demo-banner/banner-2.jpg',
              alt: 'Hướng dẫn chọn camera hành trình',
              title: 'Hướng dẫn chọn camera hành trình phù hợp',
              description:
                'Khám phá cách chọn camera hành trình tốt nhất cho xe của bạn',
            },
            {
              href: '/news/5-loai-tham-san-o-to-tot-nhat-2024',
              image: '/images/demo-combo/demo-combo-1.png',
              alt: 'Thảm sàn ô tô',
              title: '5 loại thảm sàn ô tô tốt nhất 2024',
              description: 'So sánh các loại thảm sàn ô tô phổ biến hiện nay',
            },
            {
              href: '/news/cach-bao-duong-va-ve-sinh-noi-that-o-to',
              image: '/images/demo-combo/demo-combo-2.png',
              alt: 'Bảo dưỡng nội thất',
              title: 'Cách bảo dưỡng và vệ sinh nội thất ô tô',
              description: 'Hướng dẫn chi tiết cách chăm sóc nội thất xe',
            },
            {
              href: '/news/phu-kien-an-toan-can-thiet-cho-gia-dinh',
              image: '/images/demo-combo/demo-combo-3.png',
              alt: 'Phụ kiện an toàn',
              title: 'Những phụ kiện an toàn cần thiết cho gia đình',
              description: 'Đảm bảo an toàn cho cả gia đình khi di chuyển',
            },
          ]}
          isMobile={true}
        />
      </div>
    </div>
  );
}
