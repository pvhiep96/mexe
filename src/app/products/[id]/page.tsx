import { useRouter } from 'next/router';

export default function ProductPage({ params }: { params: { id: string } }) {
  return <div>Product ID: {params.id}</div>;
}
