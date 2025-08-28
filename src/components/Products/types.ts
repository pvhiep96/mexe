// {
//   id: 12,
//   name: 'Bàn phím cơ NuPhy Air75 V2',
//   url: '#',
//   image:
//     'https://file.hstatic.net/1000069970/collection/nuphy_air75v2_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
//   description: 'Bàn phím cơ không dây, siêu mỏng, pin trâu.',
//   ordered: 14,
//   total: 60,
//   endDate: '22/08/2025',
// },
export type ProductType = {
  id: number | undefined;
  name: string | undefined;
  url: string | undefined;
  image: string | undefined;
  description: string | undefined;
  ordered: number | undefined;
  total: number | undefined;
  endDate: string | undefined;
};

export type ProductList = ProductType[];
