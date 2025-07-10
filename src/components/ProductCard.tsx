interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  return (
    <div className='overflow-hidden rounded-lg border shadow-md' key={id}>
      <img src={image} alt={name} className='h-48 w-full object-cover' />
      <div className='p-4'>
        <h3 className='text-lg font-semibold'>{name}</h3>
        <p className='text-gray-600'>{price}</p>
        <button className='mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
