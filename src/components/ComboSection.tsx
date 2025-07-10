interface ComboSectionProps {
  id: number;
  title: string;
  originalPrice: string;
  comboPrice: string;
  discount: string;
  items: { name: string; price: string }[];
  description: string;
}

export default function ComboSection({ title, originalPrice, comboPrice, discount, items, description }: ComboSectionProps) {
  return (
    <div className="border rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <p>Giá gốc: <span className="line-through">{originalPrice}</span></p>
        <p>Giá combo: <span className="text-green-600">{comboPrice}</span> (Tiết kiệm {discount})</p>
      </div>
      <h4 className="font-semibold mb-2">Sản phẩm trong combo:</h4>
      <ul className="list-disc pl-5 mb-4">
        {items.map((item, index) => (
          <li key={index}>{item.name} - {item.price}</li>
        ))}
      </ul>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Nhận tư vấn setup
      </button>
    </div>
  );
}
