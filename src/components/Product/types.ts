export type ProductVideoType = {
  id: number;
  url: string;
  title: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
  embed_url: string;
  thumbnail_url: string;
  youtube_video_id: string;
};

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
  category?: { id: string | number; name: string } | null;
  services: { icon: string; text: string }[] | undefined;
  specs: Record<string, string> | undefined;
  specifications: { spec_name: string; spec_value: string; sort_order?: number }[] | undefined;
  descriptions: { id: number; title: string; content: string; sort_order: number }[] | undefined;
  videos: ProductVideoType[] | undefined;
  quantity: number | undefined;
};

export type RelatedProductType = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  slug: string | number;
};
