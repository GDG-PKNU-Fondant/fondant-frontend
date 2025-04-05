export type CardType = 'market' | 'product';

export type CardSize = 'small' | 'medium' | 'large';

export default interface PreviewCardProps {
  id: number;
  marketName?: string;
  rating: number;
  reviewer: number;
  productName?: string;
  price?: number;
  discountPrice?: number;
  thumbnailUrl: string;
  type: CardType;
  size?: CardSize;
}
