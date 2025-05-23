export type CardType = 'market' | 'product';

export type CardLayout = 'grid' | 'slider';

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
  layout?: CardLayout;
}
