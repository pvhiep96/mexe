export default function PrivacyPolicyPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto max-w-4xl px-4 py-8'>
        {/* Header */}
        <div className='mb-8 rounded-lg bg-white p-8 shadow-md'>
          <h1 className='mb-2 text-center text-3xl font-bold text-gray-900'>
            CHÍNH SÁCH BẢO MẬT
          </h1>
          <h2 className='text-center text-xl font-semibold text-gray-800'>
            THÔNG TIN KHÁCH HÀNG
          </h2>
        </div>

        <div className='space-y-8'>
          {/* 1. Mục đích và phạm vi thu thập */}
          <section
            id='muc-dich-va-pham-vi-thu-thap'
            className='rounded-lg bg-white p-8 shadow-md'
          >
            <h3 className='mb-4 text-2xl font-bold text-gray-900'>
              1. Mục đích và phạm vi thu thập
            </h3>
            <div className='space-y-4 leading-relaxed text-gray-700'>
              <p>
                Việc thu thập dữ liệu tại website <strong>mexestore.vn</strong>{' '}
                bao gồm: email, số điện thoại, tên đăng nhập, mật khẩu (nếu có),
                địa chỉ của Khách hàng. Đây là các thông tin mà Mê Xe Store yêu
                cầu khi Khách hàng đăng ký sử dụng dịch vụ, đặt hàng hoặc tham
                gia các chương trình khuyến mại nhằm xác nhận và đảm bảo quyền
                lợi cho Khách hàng.
              </p>
              <p>
                Khách hàng tự chịu trách nhiệm về việc bảo mật và lưu giữ mọi
                hoạt động sử dụng dịch vụ dưới tên đăng ký, mật khẩu và hộp thư
                điện tử của mình. Ngoài ra, Khách hàng có trách nhiệm thông báo
                kịp thời cho Mê Xe Store về những hành vi sử dụng trái phép, lạm
                dụng, vi phạm bảo mật, để có biện pháp xử lý phù hợp.
              </p>
            </div>
          </section>

          {/* 2. Phạm vi sử dụng thông tin */}
          <section
            id='pham-vi-su-dung-thong-tin'
            className='rounded-lg bg-white p-8 shadow-md'
          >
            <h3 className='mb-4 text-2xl font-bold text-gray-900'>
              2. Phạm vi sử dụng thông tin
            </h3>
            <div className='space-y-2 text-gray-700'>
              <p>Mê Xe Store sử dụng thông tin Khách hàng để:</p>
              <ul className='ml-4 list-disc space-y-2'>
                <li>
                  Cung cấp dịch vụ, sản phẩm mà Khách hàng đã đăng ký hoặc đặt
                  mua.
                </li>
                <li>
                  Gửi các thông báo về hoạt động trao đổi thông tin giữa Khách
                  hàng và Mê Xe Store (ví dụ: xác nhận đơn hàng, thông tin
                  khuyến mại, bảo hành).
                </li>
                <li>
                  Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của Khách
                  hàng hoặc các hoạt động giả mạo Khách hàng.
                </li>
                <li>
                  Liên lạc và giải quyết với Khách hàng trong những trường hợp
                  đặc biệt.
                </li>
                <li>
                  Không sử dụng thông tin cá nhân của Khách hàng ngoài mục đích
                  xác nhận và liên hệ có liên quan đến giao dịch tại Mê Xe
                  Store.
                </li>
                <li>
                  Mê Xe Store có trách nhiệm hợp tác cung cấp thông tin cá nhân
                  Khách hàng khi có yêu cầu từ cơ quan nhà nước có thẩm quyền.
                </li>
              </ul>
            </div>
          </section>

          {/* 3. Thời gian lưu trữ thông tin */}
          <section
            id='thoi-gian-luu-tru-thong-tin'
            className='rounded-lg bg-white p-8 shadow-md'
          >
            <h3 className='mb-4 text-2xl font-bold text-gray-900'>
              3. Thời gian lưu trữ thông tin
            </h3>
            <p className='leading-relaxed text-gray-700'>
              Dữ liệu cá nhân của Khách hàng sẽ được lưu trữ cho đến khi Khách
              hàng có yêu cầu hủy bỏ hoặc tự Khách hàng đăng nhập và thực hiện
              hủy bỏ. Trong mọi trường hợp khác, thông tin cá nhân của Khách
              hàng sẽ được bảo mật và lưu trên hệ thống máy chủ của Mê Xe Store.
            </p>
          </section>

          {/* 4. Địa chỉ đơn vị thu thập */}
          <section
            id='dia-chi-don-vi'
            className='rounded-lg bg-white p-8 shadow-md'
          >
            <h3 className='mb-4 text-2xl font-bold text-gray-900'>
              4. Địa chỉ của đơn vị thu thập, quản lý thông tin và hỗ trợ khách
              hàng
            </h3>
            <div className='space-y-1 text-gray-700'>
              <p>
                <strong>CÔNG TY CỔ PHẦN THƯƠNG MẠI CARRIOR VIỆT NAM</strong>
              </p>
              <p>
                Địa chỉ: 68 đường Chùa Thầy, xã Quốc Oai, TP Hồ Chí Minh, Việt
                Nam
              </p>
              <p>
                Hotline:{' '}
                <a
                  href='tel:0986966520'
                  className='text-blue-600 hover:underline'
                >
                  0986966520
                </a>
              </p>
              <p>
                Email hỗ trợ:{' '}
                <a
                  href='mailto:mexestore2025@gmail.com'
                  className='text-blue-600 hover:underline'
                >
                  mexestore2025@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* 5. Công cụ chỉnh sửa dữ liệu */}
          <section
            id='cong-cu-chinh-sua'
            className='rounded-lg bg-white p-8 shadow-md'
          >
            <h3 className='mb-4 text-2xl font-bold text-gray-900'>
              5. Phương tiện và công cụ để khách hàng tiếp cận, chỉnh sửa dữ
              liệu của mình
            </h3>
            <div className='space-y-4 leading-relaxed text-gray-700'>
              <p>
                Khách hàng có quyền tự kiểm tra, cập nhật, điều chỉnh thông tin
                cá nhân của mình bằng cách đăng nhập vào tài khoản và chỉnh sửa
                thông tin cá nhân. Khách hàng cũng có quyền gửi khiếu nại về
                việc lộ thông tin cá nhân cho bên thứ ba đến Ban quản trị Mê Xe
                Store. Khi tiếp nhận phản hồi, Mê Xe Store sẽ xác nhận lại thông
                tin, có trách nhiệm trả lời lý do nếu có và hướng dẫn Khách hàng
                khôi phục và bảo mật lại thông tin.
              </p>
            </div>
          </section>

          {/* 6. Cam kết bảo mật */}
          <section
            id='cam-ket-bao-mat'
            className='rounded-lg bg-white p-8 shadow-md'
          >
            <h3 className='mb-4 text-2xl font-bold text-gray-900'>
              6. Cam kết bảo mật thông tin cá nhân khách hàng
            </h3>
            <div className='space-y-4 leading-relaxed text-gray-700'>
              <p>
                Mê Xe Store cam kết bảo mật tuyệt đối thông tin cá nhân của
                Khách hàng theo chính sách này. Việc thu thập và sử dụng thông
                tin chỉ được thực hiện khi có sự đồng ý của Khách hàng, trừ
                những trường hợp pháp luật có quy định khác.
              </p>
              <ul className='ml-4 list-disc space-y-2'>
                <li>
                  Mê Xe Store không sử dụng, không chuyển giao, không cung cấp
                  hay tiết lộ cho bên thứ ba nào về thông tin cá nhân của Khách
                  hàng khi không có sự cho phép hoặc đồng ý từ Khách hàng, trừ
                  các trường hợp pháp luật có quy định.
                </li>
                <li>
                  Trong trường hợp hệ thống lưu trữ bị tấn công dẫn đến mất mát
                  dữ liệu cá nhân Khách hàng, Mê Xe Store sẽ có trách nhiệm
                  thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp
                  thời, và thông báo cho Khách hàng được biết.
                </li>
                <li>
                  Mê Xe Store cam kết bảo mật thông tin giao dịch trực tuyến của
                  Khách hàng, bao gồm thông tin hóa đơn, chứng từ kế toán số hóa
                  tại khu vực dữ liệu an toàn, có quy định bảo mật phù hợp.
                </li>
              </ul>
              <p>
                <strong>Ngày hiệu lực:</strong> Cập nhật sau
              </p>
            </div>
          </section>

          {/* Contact box */}
          <section className='rounded-lg bg-blue-600 p-8 text-white shadow-md'>
            <h4 className='mb-3 text-xl font-bold'>Liên hệ hỗ trợ</h4>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <p>
                <strong>Hotline/Zalo:</strong>{' '}
                <a className='hover:underline' href='tel:0986966520'>
                  0986966520
                </a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  className='hover:underline'
                  href='mailto:mexestore2025@gmail.com'
                >
                  mexestore2025@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
