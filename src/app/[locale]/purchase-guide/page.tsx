export default function PurchaseGuidePage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto max-w-4xl px-4 py-8'>
        {/* Header */}
        <div className='mb-8 rounded-lg bg-white p-8 shadow-md'>
          <h1 className='mb-2 text-center text-3xl font-bold text-gray-900'>
            HƯỚNG DẪN MUA HÀNG VÀ
          </h1>
          <h2 className='text-center text-xl font-semibold text-gray-800'>
            THANH TOÁN - MÊ XE STORE
          </h2>
        </div>

        <div className='space-y-8'>
          {/* 1. Chọn sản phẩm */}
          <section
            id='chon-san-pham'
            className='rounded-lg bg-white p-8 shadow-md'
          >
            <h3 className='mb-4 text-2xl font-bold text-gray-900'>
              1. Chọn sản phẩm
            </h3>
            <ul className='ml-4 list-disc space-y-2 text-gray-700'>
              <li>
                Truy cập website{' '}
                <a
                  href='https://www.mexestore.vn'
                  className='text-blue-600 hover:underline'
                >
                  mexestore.vn
                </a>{' '}
                và vào danh mục sản phẩm.
              </li>
              <li>
                Xem chi tiết sản phẩm: hình ảnh, giá, thông số kỹ thuật...
              </li>
              <li>Chọn số lượng và nhấn “Thêm vào giỏ hàng”.</li>
            </ul>
          </section>

          {/* 2. Kiểm tra giỏ hàng */}
          <section
            id='kiem-tra-gio-hang'
            className='rounded-lg bg-white p-8 shadow-md'
          >
            <h3 className='mb-4 text-2xl font-bold text-gray-900'>
              2. Kiểm tra giỏ hàng
            </h3>
            <ul className='ml-4 list-disc space-y-2 text-gray-700'>
              <li>Truy cập giỏ hàng để xem lại sản phẩm đã chọn.</li>
              <li>
                Điều chỉnh số lượng, xóa sản phẩm hoặc nhập mã giảm giá (nếu
                có).
              </li>
              <li>Nhấn “Thanh toán” để tiếp tục.</li>
            </ul>
          </section>

          {/* 3. Đặt hàng & điền thông tin */}
          <section
            id='dat-hang-va-thong-tin'
            className='rounded-lg bg-white p-8 shadow-md'
          >
            <h3 className='mb-4 text-2xl font-bold text-gray-900'>
              3. Đặt hàng & điền thông tin khách hàng
            </h3>
            <ul className='ml-4 list-disc space-y-2 text-gray-700'>
              <li>Đăng nhập hoặc tiến hành đặt hàng với tư cách khách.</li>
              <li>Nhập chính xác họ tên, số điện thoại, địa chỉ giao hàng.</li>
              <li>Chọn hình thức giao hàng và phương thức thanh toán.</li>
              <li>Kiểm tra và xác nhận đơn hàng.</li>
            </ul>
          </section>

          {/* 4. Hình thức thanh toán */}
          <section
            id='hinh-thuc-thanh-toan'
            className='rounded-lg bg-white p-8 shadow-md'
          >
            <h3 className='mb-4 text-2xl font-bold text-gray-900'>
              4. Hình thức thanh toán
            </h3>
            <p className='mb-3 text-gray-700'>
              Mê Xe Store hỗ trợ nhiều phương thức thanh toán:
            </p>
            <ul className='ml-4 list-disc space-y-2 text-gray-700'>
              <li>Chuyển khoản ngân hàng</li>
              <li>Thanh toán khi nhận hàng (COD) – nếu có hỗ trợ</li>
              <li>Thẻ ATM/Thẻ tín dụng – nếu tích hợp cổng thanh toán</li>
            </ul>
            <div className='mt-4 space-y-2 rounded-md bg-blue-50 p-4 text-sm text-gray-800'>
              <p className='font-semibold'>Lưu ý:</p>
              <ul className='ml-4 list-disc space-y-1'>
                <li>Ghi rõ nội dung chuyển khoản: Mã đơn hàng + Họ tên.</li>
                <li>
                  Đơn hàng sẽ được xử lý ngay sau khi thanh toán xác nhận.
                </li>
              </ul>
            </div>
          </section>

          {/* 5. Giao hàng và nhận hàng */}
          <section
            id='giao-hang-va-nhan-hang'
            className='rounded-lg bg-white p-8 shadow-md'
          >
            <h3 className='mb-4 text-2xl font-bold text-gray-900'>
              5. Giao hàng và nhận hàng
            </h3>
            <ul className='ml-4 list-disc space-y-2 text-gray-700'>
              <li>Đơn hàng sẽ được đóng gói và giao bởi đơn vị vận chuyển.</li>
              <li>
                Khách hàng kiểm tra tình trạng và số lượng sản phẩm khi nhận
                hàng.
              </li>
              <li>Nếu có vấn đề, liên hệ ngay để được hỗ trợ đổi trả.</li>
            </ul>
          </section>

          {/* 6. Chính sách đổi trả và bảo hành */}
          <section
            id='chinh-sach-doi-tra-bao-hanh'
            className='rounded-lg bg-white p-8 shadow-md'
          >
            <h3 className='mb-4 text-2xl font-bold text-gray-900'>
              6. Chính sách đổi trả và bảo hành
            </h3>
            <ul className='ml-4 list-disc space-y-2 text-gray-700'>
              <li>
                Đổi trả trong thời gian quy định nếu còn nguyên trạng sản phẩm.
              </li>
              <li>
                Sản phẩm lỗi nhà sản xuất hoặc lỗi vận chuyển được đổi mới.
              </li>
              <li>Chính sách bảo hành theo quy định của từng sản phẩm.</li>
            </ul>
          </section>

          {/* 7. Hỗ trợ khách hàng */}
          <section
            id='ho-tro-khach-hang'
            className='rounded-lg bg-white p-8 shadow-md'
          >
            <h3 className='mb-4 text-2xl font-bold text-gray-900'>
              7. Hỗ trợ khách hàng
            </h3>
            <div className='grid grid-cols-1 gap-3 text-gray-700 md:grid-cols-2'>
              <p>
                <strong>Hotline:</strong>{' '}
                <a
                  href='tel:0986966520'
                  className='text-blue-600 hover:underline'
                >
                  0986966520
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
              <p className='md:col-span-2'>
                <strong>Địa chỉ:</strong> 68 đường Chùa Thầy, xã Quốc Oai, TP Hồ
                Chí Minh, Việt Nam
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
