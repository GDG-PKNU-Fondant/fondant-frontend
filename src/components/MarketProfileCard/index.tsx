import React from 'react';
import MarketProfileCardProps from '@type/MarketProfileCard';
import RateIcon from '@assets/icons/rate.svg?react';
import LikeButton from '@components/LikeButton';

const ThumbnailList = ({
  thumbnailUrls,
  marketName,
}: {
  thumbnailUrls: string[];
  marketName: string;
}) => (
  <div className="flex w-full aspect-[7/2] mt-[10px] overflow-hidden">
    {thumbnailUrls.length === 3 ? (
      <div className="flex w-full">
        <div className="w-1/2">
          <img
            src={thumbnailUrls[0]}
            alt={marketName}
            className="object-cover w-full h-full rounded-l-[10px]"
          />
        </div>
        <div className="w-1/4">
          <img
            src={thumbnailUrls[1]}
            alt={marketName}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/4">
          <img
            src={thumbnailUrls[2]}
            alt={marketName}
            className="object-cover w-full h-full rounded-r-[10px]"
          />
        </div>
      </div>
    ) : (
      <div className="flex w-full">
        <div className="w-1/2">
          <img
            src={thumbnailUrls[0]}
            alt={marketName}
            className="object-cover w-full h-full rounded-l-[10px]"
          />
        </div>
        <div className="w-1/4">
          <img
            src={thumbnailUrls[1]}
            alt={marketName}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/4 flex flex-col">
          <img
            src={thumbnailUrls[2]}
            alt={marketName}
            className="object-cover w-full h-1/2 rounded-tr-[10px]"
          />
          <img
            src={thumbnailUrls[3]}
            alt={marketName}
            className="object-cover w-full h-1/2 rounded-br-[10px]"
          />
        </div>
      </div>
    )}
  </div>
);

const ProfileInfo = ({
  profileImageUrl,
  marketName,
  description,
  rating,
}: Omit<MarketProfileCardProps, 'likes' | 'thumbnailUrls' | 'id'>) => (
  <div className="flex items-center">
    <img
      src={profileImageUrl}
      alt={marketName}
      className="w-[48px] h-[48px] rounded-full"
    />
    <div className="ml-[10px]">
      <div className="flex items-center leading-tight">
        <div className="text-[15px] font-semibold text-brown-primary tracking-[-0.5px]">
          {marketName}
        </div>
        <RateIcon className="ml-[8px]" />
        <div className="text-[10px] font-medium text-brown-tertiary tracking-[-0.5px] ml-[2px]">
          {rating.toFixed(1)}
        </div>
      </div>
      <div className="text-[12px] font-medium text-brown-secondary tracking-[-0.5px] mt-[4px]">
        {description}
      </div>
    </div>
  </div>
);

const MarketProfileCard: React.FC<MarketProfileCardProps> = ({
  profileImageUrl,
  marketName,
  description,
  thumbnailUrls,
  rating,
  liked,
  likes,
}) => {
  return (
    <div className="flex flex-col w-full border-b border-beige-secondary px-[24px] py-[16px] leading-none">
      <div className="flex justify-between">
        <ProfileInfo
          profileImageUrl={profileImageUrl}
          marketName={marketName}
          description={description}
          rating={rating}
        />
        <LikeButton liked={liked} count={likes} />
      </div>
      <ThumbnailList thumbnailUrls={thumbnailUrls} marketName={marketName} />
    </div>
  );
};

export default MarketProfileCard;
