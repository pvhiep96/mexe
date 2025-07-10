export default function Footer() {
  return (
    <footer className='bg-gray-800 py-8 text-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Vài Thứ Hay</h3>
            <p>
              Khám phá các sản phẩm công nghệ độc đáo để nâng tầm không gian làm
              việc.
            </p>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Liên Kết Nhanh</h3>
            <ul className='space-y-2'>
              <li>
                <a href='/about' className='hover:underline'>
                  Về Chúng Tôi
                </a>
              </li>
              <li>
                <a href='/policies' className='hover:underline'>
                  Chính Sách
                </a>
              </li>
              <li>
                <a href='/contact' className='hover:underline'>
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Liên Hệ</h3>
            <p>Email: support@vaithuhay.com</p>
            <p>Hotline: 0890983784</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
