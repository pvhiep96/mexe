interface ComboSectionProps {
  id: number;
  title: string;
  originalPrice: string;
  comboPrice: string;
  discount: string;
  items: { name: string; price: string }[];
  description: string;
}

export default function ComboSection({
  title,
  originalPrice,
  comboPrice,
  discount,
  items,
  description,
}: ComboSectionProps) {
  return (
    <div className='mb-6 rounded-lg border p-6'>
      <h3 className='mb-4 text-xl font-semibold'>{title}</h3>
      <p className='mb-4 text-gray-600'>{description}</p>
      <div className='mb-4'>
        <p>
          Giá gốc: <span className='line-through'>{originalPrice}</span>
        </p>
        <p>
          Giá combo: <span className='text-green-600'>{comboPrice}</span> (Tiết
          kiệm {discount})
        </p>
      </div>
      <h4 className='mb-2 font-semibold'>Sản phẩm trong combo:</h4>
      <ul className='mb-4 list-disc pl-5'>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
      <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
        Nhận tư vấn setup
      </button>
    </div>
  );
}
