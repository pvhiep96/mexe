import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function CameraGuideArticle() {
  const t = useTranslations('News');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Version */}
      <div className="hidden md:block">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-700 hover:text-blue-600">
                  Trang chủ
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/news" className="text-gray-700 hover:text-blue-600">
                    Tin tức
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">Hướng dẫn chọn camera hành trình</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                Công Nghệ
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Hướng dẫn chọn camera hành trình phù hợp
            </h1>
            <div className="flex items-center text-gray-600 mb-6">
              <span>Bởi Mexe Team</span>
              <span className="mx-2">•</span>
              <span>25.05.2024</span>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/demo-banner/banner-2.jpg"
                alt="Hướng dẫn chọn camera hành trình"
                fill
                className="object-cover"
              />
            </div>
          </header>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Camera hành trình đã trở thành phụ kiện không thể thiếu cho mọi chủ xe. 
              Việc chọn đúng camera hành trình phù hợp sẽ giúp bảo vệ quyền lợi và an toàn 
              khi tham gia giao thông.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Tại sao cần camera hành trình?
            </h2>
            <p className="text-gray-700 mb-4">
              Camera hành trình mang lại nhiều lợi ích quan trọng:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Ghi lại bằng chứng khi xảy ra tai nạn</li>
              <li>Bảo vệ quyền lợi trong tranh chấp giao thông</li>
              <li>Giám sát xe khi đỗ ở nơi công cộng</li>
              <li>Ghi lại những khoảnh khắc đẹp trên đường</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Các tiêu chí chọn camera hành trình
            </h2>
            
            <div className="space-y-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Độ phân giải</h3>
                <p className="text-gray-700 mb-3">
                  Độ phân giải càng cao thì hình ảnh càng rõ nét. Nên chọn camera có độ phân giải 
                  tối thiểu 1080p (Full HD) để đảm bảo chất lượng hình ảnh tốt.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Khuyến nghị:</strong> 1080p trở lên, 4K cho chất lượng cao nhất
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Góc quay</h3>
                <p className="text-gray-700 mb-3">
                  Góc quay rộng giúp ghi lại được nhiều thông tin hơn. Camera có góc quay 
                  120-170 độ là lý tưởng cho việc ghi lại toàn bộ khung cảnh phía trước.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 text-sm">
                    <strong>Khuyến nghị:</strong> 120-170 độ, tránh góc quá rộng gây méo hình
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Khả năng ghi đêm</h3>
                <p className="text-gray-700 mb-3">
                  Camera có khả năng ghi đêm tốt sẽ giúp ghi lại hình ảnh rõ nét ngay cả 
                  trong điều kiện ánh sáng yếu hoặc ban đêm.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-purple-800 text-sm">
                    <strong>Khuyến nghị:</strong> Có đèn hồng ngoại, cảm biến ánh sáng tốt
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Dung lượng lưu trữ</h3>
                <p className="text-gray-700 mb-3">
                  Dung lượng thẻ nhớ càng lớn thì thời gian ghi hình càng lâu. Nên chọn 
                  thẻ nhớ có dung lượng từ 32GB trở lên.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-orange-800 text-sm">
                    <strong>Khuyến nghị:</strong> 32GB-128GB, thẻ nhớ Class 10 trở lên
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Tính năng bổ sung</h3>
                <p className="text-gray-700 mb-3">
                  Các tính năng như GPS, WiFi, cảm biến va chạm, màn hình LCD sẽ tăng 
                  tính tiện dụng và chức năng của camera.
                </p>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Khuyến nghị:</strong> GPS để ghi lại vị trí, WiFi để xem video
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Các loại camera hành trình phổ biến
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Camera đơn</h3>
                <p className="text-blue-800 mb-3">
                  Camera ghi hình phía trước xe, phù hợp cho nhu cầu cơ bản và ngân sách hạn chế.
                </p>
                <ul className="text-blue-800 text-sm">
                  <li>✓ Giá rẻ</li>
                  <li>✓ Dễ lắp đặt</li>
                  <li>✓ Tiết kiệm pin</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Camera kép</h3>
                <p className="text-green-800 mb-3">
                  Ghi hình cả phía trước và sau xe, bảo vệ toàn diện cho xe của bạn.
                </p>
                <ul className="text-green-800 text-sm">
                  <li>✓ Bảo vệ toàn diện</li>
                  <li>✓ Ghi lại mọi góc</li>
                  <li>✓ Chất lượng cao</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Lưu ý khi lắp đặt camera hành trình
            </h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Vị trí lắp đặt</h3>
              <p className="text-yellow-800">
                Đặt camera ở vị trí không che khuất tầm nhìn, thường là phía sau gương chiếu hậu. 
                Đảm bảo camera không bị che khuất bởi cần gạt nước hoặc các vật cản khác.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Kết luận
            </h2>
            <p className="text-gray-700 mb-8">
              Việc chọn camera hành trình phù hợp không chỉ phụ thuộc vào ngân sách mà còn 
              cần cân nhắc đến nhu cầu sử dụng và tính năng cần thiết. Hãy đầu tư vào một 
              camera chất lượng để có được sự bảo vệ tốt nhất cho xe và gia đình của bạn.
            </p>
          </article>

          {/* Related Articles */}
          <section className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('related_articles')}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/news/top-10-phu-kien-o-to-can-thiet" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src="/images/demo-banner/banner-1.jpg"
                      alt="Top 10 phụ kiện ô tô"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Top 10 phụ kiện ô tô cần thiết cho xe mới
                    </h4>
                  </div>
                </div>
              </Link>
              <Link href="/news/5-loai-tham-san-o-to-tot-nhat-2024" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src="/images/demo-combo/demo-combo-1.png"
                      alt="Thảm sàn ô tô"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      5 loại thảm sàn ô tô tốt nhất 2024
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden">
        <div className="bg-white shadow-sm">
          <div className="px-4 py-4">
            <Link href="/news" className="text-blue-600 text-sm flex items-center">
              {t('back_to_news')}
            </Link>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="mb-4">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              Công Nghệ
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Hướng dẫn chọn camera hành trình phù hợp
          </h1>
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span>Bởi Mexe Team</span>
            <span className="mx-2">•</span>
            <span>25.05.2024</span>
          </div>
          <div className="relative h-48 rounded-lg overflow-hidden mb-6">
            <Image
              src="/images/demo-banner/banner-2.jpg"
              alt="Hướng dẫn chọn camera hành trình"
              fill
              className="object-cover"
            />
          </div>

          <article className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Camera hành trình đã trở thành phụ kiện không thể thiếu cho mọi chủ xe. 
              Việc chọn đúng camera hành trình phù hợp sẽ giúp bảo vệ quyền lợi và an toàn.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Các tiêu chí chọn camera hành trình
            </h2>
            <div className="space-y-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-1">1. Độ phân giải</h3>
                <p className="text-blue-800 text-sm">1080p trở lên, 4K cho chất lượng cao nhất</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-1">2. Góc quay</h3>
                <p className="text-green-800 text-sm">120-170 độ, tránh góc quá rộng</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-1">3. Khả năng ghi đêm</h3>
                <p className="text-purple-800 text-sm">Có đèn hồng ngoại, cảm biến ánh sáng tốt</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <h3 className="font-semibold text-orange-900 mb-1">4. Dung lượng lưu trữ</h3>
                <p className="text-orange-800 text-sm">32GB-128GB, thẻ nhớ Class 10 trở lên</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
} 