interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
}

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md" key={id}>
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{price}</p>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
