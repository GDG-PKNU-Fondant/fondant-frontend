import React from 'react';
import PreviewCardProps from '@type/PreviewCard';
import RateIcon from '@assets/icons/rate.svg?react';
import formatPeopleCount from '@utils/formatPeopleCount';

const LAYOUT_STYLES = {
  grid: 'w-full aspect-[116/156]',
  slider: 'w-[144px] h-[168px]',
} as const;

const CONTAINER_STYLES = {
  grid: 'w-full',
  slider: 'w-[144px] flex-shrink-0',
} as const;

const TEXT_STYLES = {
  marketName: 'text-[12px] text-brown-primary font-semibold truncate',
  productName: 'text-[12px] text-brown-secondary truncate',
  discountPercent: 'text-[13px] text-pink font-semibold',
  price: 'text-[15px] text-brown-primary font-semibold',
  rating: 'text-[10px] text-brown-tertiary font-medium',
} as const;

const formatPrice = (price: number): string => price.toLocaleString();

const calculateDiscountPercentage = (
  originalPrice: number,
  discountPrice: number,
): number =>
  Math.floor(((originalPrice - discountPrice) / originalPrice) * 100);

interface PriceDisplayProps {
  price: number;
  discountPrice?: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  discountPrice,
}) => {
  if (!price) return null;

  if (discountPrice) {
    const discountPercent = calculateDiscountPercentage(price, discountPrice);
    return (
      <div className="flex flex-row items-center gap-[3px]">
        <span className={TEXT_STYLES.discountPercent}>{discountPercent}%</span>
        <span className={TEXT_STYLES.price}>{formatPrice(discountPrice)}</span>
      </div>
    );
  }

  return <div className={TEXT_STYLES.price}>{formatPrice(price)}</div>;
};

interface RatingDisplayProps {
  rating: number;
  reviewer: number;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({ rating, reviewer }) => (
  <div className="flex flex-row items-center gap-[2px]">
    <RateIcon />
    <span className={TEXT_STYLES.rating}>
      {rating.toFixed(1)} ({formatPeopleCount(reviewer)})
    </span>
  </div>
);

interface CardImageProps {
  thumbnailUrl: string;
  alt: string;
  layout: keyof typeof LAYOUT_STYLES;
}

const CardImage: React.FC<CardImageProps> = ({ thumbnailUrl, alt, layout }) => (
  <div
    className={`w-full ${LAYOUT_STYLES[layout]} bg-beige-secondary rounded-[10px]`}
  >
    <img
      src={thumbnailUrl}
      alt={alt}
      className="w-full h-full object-cover rounded-[10px]"
    />
  </div>
);

interface CardContentProps {
  marketName?: string;
  productName?: string;
  price?: number;
  discountPrice?: number;
  rating: number;
  reviewer: number;
  type: 'product' | 'market';
}

const CardContent: React.FC<CardContentProps> = ({
  marketName,
  productName,
  price,
  discountPrice,
  rating,
  reviewer,
  type,
}) => (
  <div className="flex flex-col mt-[8px] mx-[9px] tracking-[-0.5px] gap-[4px] leading-none min-w-0">
    {marketName && <div className={TEXT_STYLES.marketName}>{marketName}</div>}

    {type === 'product' && productName && (
      <div className={TEXT_STYLES.productName}>{productName}</div>
    )}

    {type === 'product' && price !== undefined && (
      <PriceDisplay price={price} discountPrice={discountPrice} />
    )}

    <RatingDisplay rating={rating} reviewer={reviewer} />
  </div>
);

const PreviewCard: React.FC<PreviewCardProps> = ({
  marketName,
  productName,
  price,
  discountPrice,
  rating,
  reviewer,
  thumbnailUrl,
  layout = 'grid',
  type,
}) => {
  const imageAlt =
    type === 'product' ? productName || '상품' : marketName || '마켓';

  return (
    <div className={CONTAINER_STYLES[layout]}>
      <CardImage thumbnailUrl={thumbnailUrl} alt={imageAlt} layout={layout} />
      <CardContent
        marketName={marketName}
        productName={productName}
        price={price}
        discountPrice={discountPrice}
        rating={rating}
        reviewer={reviewer}
        type={type}
      />
    </div>
  );
};

export default PreviewCard;
