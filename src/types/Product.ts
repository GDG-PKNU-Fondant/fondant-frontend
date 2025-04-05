export interface ProductOption {
  id: number;
  name: string;
  additionalPrice: number;
}

export default interface Product {
  id: number;
  name: string;
  marketId: number;
  marketName: string;
  thumbnailUrl: string;
}

export interface ProductDetail extends Product {
  rating: number;
  reviewer: number;
  basePrice: number;
  discountPrice?: number;
  additionalOptions?: ProductOption[];
  description: string;
  thumbnailImages: { id: number; imageUrl: string }[];
  detailImages: { id: number; imageUrl: string }[];
}
