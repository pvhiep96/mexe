export type ProductType = {
  id: string | number | undefined;
  name: string | undefined;
  nameKey: string | undefined;
  price: number | undefined;
  image: string | undefined;
  images: string[] | undefined;
  colors: { name: string | undefined; value: string | undefined }[] | undefined;
  description: string | undefined;
  brand: string | undefined;
  brandDescription: string | undefined;
  services: { icon: string; text: string }[] | undefined;
  specs: Record<string, string> | undefined;
  quantity: number | undefined;
};
