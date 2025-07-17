export default function Footer() {
  return (
    <div className="block">
      <footer
        className="w-full pt-6 pb-4 text-sm relative lg:pt-10"
        style={{
          backgroundImage: `url('/footer-background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
            {/* Hỗ trợ khách hàng */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-bold mb-2 text-white text-xs md:text-sm">Hỗ trợ khách hàng</h3>
              <ul className="space-y-1 text-white text-xs md:text-sm">
                <li><a href="#">Quy định, chính sách</a></li>
                <li><a href="#">Điều khoản hoạt động salon</a></li>
                <li><a href="#">Câu hỏi thường gặp</a></li>
                <li><a href="#">Liên hệ</a></li>
              </ul>
            </div>
            {/* Về chúng tôi */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-bold mb-2 text-white text-xs md:text-sm">Về chúng tôi</h3>
              <ul className="space-y-1 text-white text-xs md:text-sm">
                <li><a href="#">Giới thiệu</a></li>
                <li><a href="#">Quy chế hoạt động</a></li>
                <li><a href="#">Tuyển dụng</a></li>
                <li><a href="#">Sitemap</a></li>
              </ul>
            </div>
            {/* Tin tức bán xe hơi */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-bold mb-2 text-white text-xs md:text-sm">Tin tức bán xe hơi</h3>
              <ul className="space-y-1 text-white text-xs md:text-sm">
                <li><a href="#">Báo giá dịch vụ</a></li>
                <li><a href="#">Học viện ô tô</a></li>
              </ul>
            </div>
            {/* Mạng xã hội & app */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-2 items-start md:items-end">
              <div className="flex gap-3 mb-2">
                <a href="#"><img src="/icon-fb.webp" alt="Facebook" className="h-6 w-6 md:h-7" /></a>
                <a href="#"><img src="/icon-youtube.webp" alt="Youtube" className="h-6 w-6 md:h-7" /></a>
                <a href="#"><img src="/icon-instagram.webp" alt="Instagram" className="h-6 w-6 md:h-7" /></a>
              </div>
            </div>
          </div>
          {/* Thông tin công ty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="font-bold mb-1 text-white text-xs md:text-sm">CÔNG TY CỔ PHẦN NEXTGEN VIỆT NAM</div>
              <div className="mb-1 text-white text-xs md:text-sm">Copyright © 2015 - 2025 mexe - mexe.com</div>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-white text-xs md:text-sm">
                <span>📞 123.456.789</span>
                <span>✉️ hotro@mexe</span>
              </div>
              <div className="mb-1 text-white text-xs md:text-sm">Thời gian làm việc: 8:30 - 17:15 (thứ 2 - thứ 6)</div>
              <div className="flex items-center gap-2 mb-2">
                <img src="/bct-dadangky.png" alt="Đã đăng ký Bộ Công Thương" className="h-6 md:h-8 bg-white rounded p-1" />
                <span className="text-white text-xs md:text-sm">Giấy phép ICP số 978/GP-TTĐT</span>
              </div>
            </div>
            <div className="md:text-right text-white">
              <div className="mb-1"><b>Chịu trách nhiệm nội dung:</b> Ông ABC</div>
              <div className="mb-1 text-xs md:text-sm">Toàn bộ quy chế, quy định giao dịch chung được đăng tải trên website áp dụng từ ngày 11/5/2015.<br />MEXE không bán xe trực tiếp, quý khách mua xe xin vui lòng liên hệ trực tiếp người đăng tin.</div>
            </div>
          </div>
          {/* Địa chỉ, giấy phép */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 border-t border-white/20 pt-4">
            <div>
              <div className="font-bold mb-1 text-white text-xs md:text-sm">Địa chỉ</div>
              <div className="mb-1 text-white text-xs md:text-sm">Trụ sở chính: TP. Hà Nội.</div>
              <div className="mb-1 text-white text-xs md:text-sm">Địa điểm kinh doanh tại Hà Nội: TP. Hà Nội.</div>
              <div className="mb-1 text-white text-xs md:text-sm">☎️ Hotline trong giờ làm việc: 012.3456.7890 | 012.3456</div>
              <div className="font-bold mt-2 text-white text-xs md:text-sm">Văn phòng TP. Hồ Chí Minh</div>
              <div className="mb-1 text-white text-xs md:text-sm">TP. Hồ Chí Minh.</div>
              <div className="mb-1 text-white text-xs md:text-sm">☎️ Hotline trong giờ làm việc: 012.3456.7890 | 012.3456</div>
            </div>
            <div className="text-white">
              <div className="mb-1 text-xs md:text-sm">Giấy chứng nhận ĐKDN số 123456789 cấp bởi Phòng ĐKKD Hà Nội ngày 11/02/2015</div>
              <div className="mb-1 text-xs md:text-sm">Giấy phép ICP số 978/GP-TTĐT do Sở Thông tin và Truyền thông Hà Nội cấp ngày 14/4/2015</div>
              <div className="mb-1 text-xs md:text-sm">Giấy phép sửa đổi, bổ sung Giấy phép ICP Số 4362/GP-TTĐT do Sở Thông tin và Truyền thông Hà Nội cấp ngày 20/10/2017</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
