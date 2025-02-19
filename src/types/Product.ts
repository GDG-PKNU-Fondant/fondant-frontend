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
  basePrice: number;
  additionalOptions?: ProductOption[];
  thumbnailUrl: string;
  description: string;
  detailImageUrl: string[];
}
