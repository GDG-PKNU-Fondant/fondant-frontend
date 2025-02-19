import React from 'react';
import PreviewCardProps from '@type/PreviewCard';
import RateIcon from '@assets/icons/rate.svg?react';

const sizeClasses = {
  small: 'w-[116px] h-[156px]',
  medium: 'w-[144px] h-[168px]',
  large: 'w-[179px] h-[234px]',
};

const formatPrice = (price: number): string => price.toLocaleString();

const calculateDiscountPercentage = (
  price: number,
  discountPrice: number,
): number => Math.floor(((price - discountPrice) / price) * 100);

const renderPrice = (price: number, discountPrice: number | undefined) => {
  if (!price) return null;

  if (discountPrice) {
    return (
      <div className="flex flex-row items-center gap-[3px]">
        <div className="text-[13px] text-pink font-semibold">
          {`${calculateDiscountPercentage(price, discountPrice)}%`}
        </div>
        <div className="text-[15px] text-brown-primary font-semibold">
          {formatPrice(discountPrice)}
        </div>
      </div>
    );
  }
  return (
    <div className="text-[15px] text-brown-primary font-semibold">
      {formatPrice(price)}
    </div>
  );
};

const formatReviewer = (reviewer: number) => {
  if (reviewer >= 10000) {
    const formattedReviewer =
      reviewer >= 100000
        ? Math.floor(reviewer / 10000)
        : Math.floor(reviewer / 1000) / 10;
    return `${formattedReviewer}만`;
  }
  return new Intl.NumberFormat().format(reviewer);
};

const PreviewCard: React.FC<PreviewCardProps> = ({
  marketName,
  productName,
  price,
  discountPrice,
  rate,
  reviewer,
  thumbnailUrl,
  size = 'medium',
  type,
}) => {
  const sizeWidthClass = sizeClasses[size].split(' ')[0];

  return (
    <div className={`${sizeWidthClass} max-w-full`}>
      <div className={`${sizeClasses[size]} bg-beige-secondary rounded-[10px]`}>
        <img
          src={thumbnailUrl}
          alt={type === 'product' ? productName : marketName}
          className="w-full h-full object-cover rounded-[10px]"
        />
      </div>
      <div className="flex flex-col mt-[8px] mx-[9px] tracking-[-0.5px] gap-[4px]">
        {marketName && (
          <div className="text-[12px] text-brown-primary font-semibold truncate">
            {marketName}
          </div>
        )}
        {type === 'product' && productName && (
          <div className="text-[12px] text-brown-secondary truncate">
            {productName}
          </div>
        )}
        {type === 'product' &&
          price !== undefined &&
          renderPrice(price, discountPrice)}
        <div className="flex flex-row items-center gap-[2px]">
          <RateIcon />
          <div className="text-[10px] text-brown-tertiary font-medium">
            {`${rate.toFixed(1)} (${formatReviewer(reviewer)})`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
