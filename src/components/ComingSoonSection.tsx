interface ComingSoonSectionProps {
  id: number;
  name: string;
  pioneerPrice: string;
  discountPrice: string;
  preorderPrice: string;
  originalPrice: string;
  launchDate: string;
  description: string;
}

export default function ComingSoonSection({
  name,
  pioneerPrice,
  discountPrice,
  preorderPrice,
  originalPrice,
  launchDate,
  description,
}: ComingSoonSectionProps) {
  return (
    <div className='mb-6 rounded-lg border p-6'>
      <h3 className='mb-2 text-xl font-semibold'>{name}</h3>
      <p className='mb-4 text-gray-600'>{description}</p>
      <p className='mb-2'>Dự kiến ra mắt: {launchDate}</p>
      <div className='mb-4'>
        <p>
          Giá Tiên Phong: <span className='text-green-600'>{pioneerPrice}</span>{' '}
          (Tiết kiệm 40%)
        </p>
        <p>
          Giá Ưu đãi: <span>{discountPrice}</span> (Tiết kiệm 25%)
        </p>
        <p>
          Giá Đặt trước: <span>{preorderPrice}</span> (Tiết kiệm 15%)
        </p>
        <p>
          Giá dự kiến: <span className='line-through'>{originalPrice}</span>
        </p>
      </div>
      <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
        Đăng ký đặt trước
      </button>
    </div>
  );
}
