export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Vài Thứ Hay</h3>
            <p>Khám phá các sản phẩm công nghệ độc đáo để nâng tầm không gian làm việc.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:underline">Về Chúng Tôi</a></li>
              <li><a href="/policies" className="hover:underline">Chính Sách</a></li>
              <li><a href="/contact" className="hover:underline">Liên Hệ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên Hệ</h3>
            <p>Email: support@vaithuhay.com</p>
            <p>Hotline: 0890983784</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
