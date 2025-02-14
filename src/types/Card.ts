export type CardSize = 'small' | 'medium' | 'large';

export type CardType = 'market' | 'product';

export interface BaseCardProps {
  thumbnailUrl: string;
  marketName: string;
  rate: number;
  reviewer: number;
  productName?: string;
  price?: number;
  discountPrice?: number;
  size?: CardSize;
  type: CardType;
}

export interface ProductCardProps {
  thumbnailUrl: string;
  marketName?: string;
  productName: string;
  price: number;
  discountPrice?: number;
  rate: number;
  reviewer: number;
  size?: CardSize;
}

export interface MarketCardProps {
  thumbnailUrl: string;
  marketName: string;
  rate: number;
  reviewer: number;
  size?: CardSize;
}
