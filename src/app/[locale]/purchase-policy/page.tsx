'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function PurchasePolicyPage() {
  const t = useTranslations('purchase_policy');

  return (
    <>
      <style jsx global>{`
        html {
          scroll-padding-top: 100px;
        }
        
        .highlight-section {
          animation: highlightPulse 2s ease-in-out;
          transform: scale(1.02);
          transition: all 0.3s ease;
        }

        @keyframes highlightPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
            background-color: rgba(59, 130, 246, 0.05);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0.3);
            background-color: rgba(59, 130, 246, 0.1);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
            background-color: rgba(59, 130, 246, 0.05);
          }
        }

        .section-link {
          transition: all 0.3s ease;
        }

        .section-link:hover {
          transform: translateX(5px);
          background-color: rgba(59, 130, 246, 0.1);
        }
      `}</style>
      <div className='min-h-screen bg-gray-50'>
        <div className='container mx-auto max-w-4xl px-4 py-8'>
        {/* Header */}
        <div className='mb-8 rounded-lg bg-white p-8 shadow-md'>
          <h1 className='mb-6 text-center text-3xl font-bold text-gray-900'>
            ĐIỀU KHOẢN & CHÍNH SÁCH MUA HÀNG – TRẢ HÀNG – BẢO HÀNH
          </h1>

          {/* Table of Contents */}
          <div className='mb-6 rounded-lg bg-gray-50 p-6'>
            <h2 className='mb-4 text-lg font-semibold text-gray-900'>Mục lục</h2>
                    <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                      <a
                        href='#pham-vi-ap-dung'
                        className='section-link block rounded-md bg-white p-3 text-sm text-blue-600 hover:bg-blue-50 hover:underline'
                      >
                        1. Phạm vi áp dụng
                      </a>
                      <a
                        href='#chinh-sach-mua-hang'
                        className='section-link block rounded-md bg-white p-3 text-sm text-blue-600 hover:bg-blue-50 hover:underline'
                      >
                        2. Chính sách mua hàng
                      </a>
                      <a
                        href='#chinh-sach-thanh-toan'
                        className='section-link block rounded-md bg-white p-3 text-sm text-blue-600 hover:bg-blue-50 hover:underline'
                      >
                        3. Chính sách thanh toán
                      </a>
                      <a
                        href='#chinh-sach-doi-tra-hang'
                        className='section-link block rounded-md bg-white p-3 text-sm text-blue-600 hover:bg-blue-50 hover:underline'
                      >
                        4. Chính sách đổi – trả hàng
                      </a>
                      <a
                        href='#chinh-sach-bao-hanh'
                        className='section-link block rounded-md bg-white p-3 text-sm text-blue-600 hover:bg-blue-50 hover:underline'
                      >
                        5. Chính sách bảo hành
                      </a>
                      <a
                        href='#cam-ket-trach-nhiem'
                        className='section-link block rounded-md bg-white p-3 text-sm text-blue-600 hover:bg-blue-50 hover:underline'
                      >
                        6. Cam kết & trách nhiệm
                      </a>
                    </div>
          </div>

          <div className='mb-6 border-l-4 border-blue-400 bg-blue-50 p-6'>
            <h2 className='mb-4 text-xl font-semibold text-blue-900'>
              Mê Xe Store thuộc CÔNG TY CỔ PHẦN THƯƠNG MẠI CARRIOR VIỆT NAM
            </h2>
            <div className='space-y-2 text-gray-700'>
              <p>
                <strong>Trụ sở chính:</strong> 68 đường Chùa Thầy, xã Quốc Oai,
                thành phố Hà Nội
              </p>
              <p>
                <strong>Hotline/Zalo:</strong>{' '}
                <a
                  href='tel:0986966520'
                  className='text-blue-600 hover:underline'
                >
                  0986 966 520
                </a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href='mailto:mexestore2025@gmail.com'
                  className='text-blue-600 hover:underline'
                >
                  mexestore2025@gmail.com
                </a>
              </p>
              <p>
                <strong>Website:</strong>{' '}
                <a
                  href='https://www.mexestore.vn'
                  className='text-blue-600 hover:underline'
                >
                  www.mexestore.vn
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className='space-y-8'>
          {/* Section 1 */}
          <div id='pham-vi-ap-dung' className='rounded-lg bg-white p-8 shadow-md'>
            <h2 className='mb-4 text-2xl font-bold text-gray-900'>
              1. Phạm vi áp dụng
            </h2>
            <p className='leading-relaxed text-gray-700'>
              Chính sách này áp dụng cho toàn bộ sản phẩm và dịch vụ được cung
              cấp bởi Mê Xe Store, bao gồm: phụ kiện, thiết bị lắp đặt, đồ chơi
              và giải pháp trong hệ sinh thái ô tô.
            </p>
          </div>

          {/* Section 2 */}
          <div id='chinh-sach-mua-hang' className='rounded-lg bg-white p-8 shadow-md'>
            <h2 className='mb-4 text-2xl font-bold text-gray-900'>
              2. Chính sách mua hàng
            </h2>
            <div className='space-y-4 text-gray-700'>
              <div>
                <h3 className='mb-2 font-semibold text-gray-900'>
                  - Hình thức mua hàng:
                </h3>
                <p>
                  Khách hàng có thể đặt mua qua website, fanpage, hotline, Zalo
                  hoặc trực tiếp tại cửa hàng/đại lý ủy quyền của Mê Xe Store.
                </p>
              </div>
              <div>
                <h3 className='mb-2 font-semibold text-gray-900'>
                  - Xác nhận đơn hàng:
                </h3>
                <p>
                  Đơn hàng được xác nhận sau khi khách hàng hoàn tất đặt cọc
                  hoặc thanh toán theo hướng dẫn.
                </p>
              </div>
              <div>
                <h3 className='mb-2 font-semibold text-gray-900'>
                  - Giá bán & thuế:
                </h3>
                <p>
                  Tất cả giá niêm yết đã bao gồm thuế VAT (nếu có). Giá có thể
                  thay đổi theo từng chương trình khuyến mãi hoặc biến động từ
                  nhà cung cấp.
                </p>
              </div>
              <div>
                <h3 className='mb-2 font-semibold text-gray-900'>
                  - Phí lắp đặt & vận chuyển:
                </h3>
                <p>
                  Tùy khu vực và loại sản phẩm, Mê Xe Store sẽ thông báo chi
                  tiết chi phí phát sinh (nếu có) trước khi chốt đơn.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div id='chinh-sach-thanh-toan' className='rounded-lg bg-white p-8 shadow-md'>
            <h2 className='mb-4 text-2xl font-bold text-gray-900'>
              3. Chính sách thanh toán
            </h2>
            <div className='space-y-4 text-gray-700'>
              <div>
                <h3 className='mb-2 font-semibold text-gray-900'>
                  - Hình thức thanh toán:
                </h3>
                <p>tiền mặt, chuyển khoản, quẹt thẻ, hoặc ví điện tử.</p>
              </div>
              <div>
                <h3 className='mb-2 font-semibold text-gray-900'>- Đặt cọc:</h3>
                <p>
                  với đơn hàng lắp đặt hoặc hàng đặt trước, khách hàng cần thanh
                  toán tối thiểu 30–50% giá trị đơn hàng để xác nhận.
                </p>
              </div>
              <div>
                <h3 className='mb-2 font-semibold text-gray-900'>
                  - Hoàn tất thanh toán:
                </h3>
                <p>
                  được xác nhận khi Mê Xe Store nhận đủ số tiền ghi trên hóa đơn
                  hoặc biên nhận.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div id='chinh-sach-doi-tra-hang' className='rounded-lg bg-white p-8 shadow-md'>
            <h2 className='mb-4 text-2xl font-bold text-gray-900'>
              4. Chính sách đổi – trả hàng
            </h2>

            <div className='space-y-6'>
              <div>
                <h3 className='mb-3 text-xl font-semibold text-gray-900'>
                  4.1. Điều kiện đổi/trả
                </h3>
                <p className='mb-4 text-gray-700'>
                  Khách hàng được đổi hoặc trả hàng trong 07 ngày kể từ ngày
                  nhận sản phẩm, nếu đáp ứng đầy đủ các điều kiện sau:
                </p>
                <ul className='ml-4 list-inside list-disc space-y-2 text-gray-700'>
                  <li>
                    Sản phẩm chưa qua sử dụng, còn nguyên bao bì, tem niêm phong
                    và phụ kiện đi kèm.
                  </li>
                  <li>Có hóa đơn mua hàng hoặc chứng từ hợp lệ.</li>
                  <li>
                    Lý do đổi/trả thuộc một trong các trường hợp: giao nhầm mẫu,
                    sai số lượng, sai chủng loại, sản phẩm bị lỗi kỹ thuật do
                    nhà sản xuất hoặc hư hại trong quá trình vận chuyển (có biên
                    bản xác nhận).
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='mb-3 text-xl font-semibold text-gray-900'>
                  4.2. Trường hợp không áp dụng đổi/trả
                </h3>
                <ul className='ml-4 list-inside list-disc space-y-2 text-gray-700'>
                  <li>
                    Sản phẩm đã lắp đặt, kích hoạt, hoặc có dấu hiệu sử dụng.
                  </li>
                  <li>
                    Sản phẩm đặt theo yêu cầu riêng (ví dụ: độ xe, bọc ghế, sơn
                    đổi màu, thiết kế riêng).
                  </li>
                  <li>
                    Hư hỏng do lỗi người dùng, tai nạn, hoặc can thiệp kỹ thuật
                    bên ngoài.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='mb-3 text-xl font-semibold text-gray-900'>
                  4.3. Quy trình đổi/trả
                </h3>
                <ol className='ml-4 list-inside list-decimal space-y-2 text-gray-700'>
                  <li>
                    Liên hệ bộ phận CSKH qua Hotline/Zalo:{' '}
                    <a
                      href='tel:0986966520'
                      className='text-blue-600 hover:underline'
                    >
                      0986 966 520
                    </a>{' '}
                    để gửi yêu cầu.
                  </li>
                  <li>
                    Cung cấp hình ảnh, video hoặc biên bản kiểm tra sản phẩm.
                  </li>
                  <li>
                    Sau khi xác minh, Mê Xe Store sẽ hỗ trợ đổi mới sản phẩm
                    hoặc hoàn tiền trong vòng 3–5 ngày làm việc.
                  </li>
                  <li>
                    Trường hợp hoàn tiền, giá trị hoàn sẽ khấu trừ phí vận
                    chuyển/lắp đặt (nếu có).
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div id='chinh-sach-bao-hanh' className='rounded-lg bg-white p-8 shadow-md'>
            <h2 className='mb-4 text-2xl font-bold text-gray-900'>
              5. Chính sách bảo hành
            </h2>

            <div className='space-y-6'>
              <div>
                <h3 className='mb-3 text-xl font-semibold text-gray-900'>
                  5.1. Thời hạn bảo hành
                </h3>
                <ul className='ml-4 list-inside list-disc space-y-2 text-gray-700'>
                  <li>Áp dụng từ 6–24 tháng tùy sản phẩm.</li>
                  <li>
                    Dịch vụ lắp đặt kỹ thuật được bảo hành từ 3–6 tháng kể từ
                    ngày nghiệm thu.
                  </li>
                  <li>
                    Chi tiết cụ thể sẽ được ghi rõ trên phiếu bảo hành hoặc hóa
                    đơn.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='mb-3 text-xl font-semibold text-gray-900'>
                  5.2. Phạm vi bảo hành
                </h3>
                <div className='space-y-3'>
                  <p className='text-gray-700'>
                    - Bảo hành đối với lỗi kỹ thuật, lỗi linh kiện hoặc lỗi lắp
                    đặt từ phía nhà sản xuất/kỹ thuật viên.
                  </p>
                  <p className='text-gray-700'>
                    - Không áp dụng cho các trường hợp: tự ý tháo mở, chỉnh sửa,
                    đấu nối sai quy chuẩn, hư hại do nguồn điện, nước, va đập,
                    cháy nổ hoặc ngập nước, hao mòn tự nhiên, linh kiện tiêu hao
                    (dây, keo, film, miếng dán...)
                  </p>
                </div>
              </div>

              <div>
                <h3 className='mb-3 text-xl font-semibold text-gray-900'>
                  5.3. Quy trình bảo hành
                </h3>
                <ol className='ml-4 list-inside list-decimal space-y-2 text-gray-700'>
                  <li>Khách hàng cung cấp phiếu bảo hành hoặc hóa đơn.</li>
                  <li>
                    Bộ phận kỹ thuật kiểm tra và xác định nguyên nhân lỗi.
                  </li>
                  <li>
                    Sản phẩm được sửa chữa, đổi mới hoặc hỗ trợ mua lại tùy theo
                    tình trạng thực tế.
                  </li>
                  <li>
                    Thời gian xử lý trung bình: 3–7 ngày làm việc kể từ ngày
                    tiếp nhận.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div id='cam-ket-trach-nhiem' className='rounded-lg bg-white p-8 shadow-md'>
            <h2 className='mb-4 text-2xl font-bold text-gray-900'>
              6. Cam kết & trách nhiệm
            </h2>
            <div className='space-y-4 text-gray-700'>
              <p>
                - Mê Xe Store cam kết cung cấp sản phẩm chính hãng, rõ nguồn gốc
                xuất xứ và được kiểm định chất lượng trước khi giao hàng.
              </p>
              <p>- Minh bạch thông tin, giá bán và chính sách hậu mãi.</p>
              <p>
                - Luôn đặt trải nghiệm và quyền lợi khách hàng lên hàng đầu, với
                phương châm:{' '}
                <strong className='text-blue-600'>
                  "An tâm chọn Mê Xe – Chuyên gia phụ kiện hệ sinh thái ô tô."
                </strong>
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className='mt-8 rounded-lg bg-blue-600 p-8 text-white shadow-md'>
          <h3 className='mb-4 text-xl font-bold'>Liên hệ hỗ trợ</h3>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <p>
                <strong>Hotline/Zalo:</strong>{' '}
                <a href='tel:0986966520' className='hover:underline'>
                  0986 966 520
                </a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href='mailto:mexestore2025@gmail.com'
                  className='hover:underline'
                >
                  mexestore2025@gmail.com
                </a>
              </p>
            </div>
            <div>
              <p>
                <strong>Website:</strong>{' '}
                <a href='https://www.mexestore.vn' className='hover:underline'>
                  www.mexestore.vn
                </a>
              </p>
              <p>
                <strong>Địa chỉ:</strong> 68 đường Chùa Thầy, xã Quốc Oai, thành
                phố Hà Nội
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
