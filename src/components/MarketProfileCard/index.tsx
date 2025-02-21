import React, { useState } from 'react';
import MarketProfileCardProps from '@type/MarketProfileCard';
import RateIcon from '@assets/icons/rate.svg?react';
import HeartIcon from '@assets/icons/heart.svg?react';

const formatLikes = (likes: number): string => {
  if (likes >= 10000) {
    return `${Math.floor(likes / 10000)}만`;
  }
  if (likes >= 1000) {
    return `${Math.floor(likes / 100) / 10}천`;
  }
  return new Intl.NumberFormat().format(likes);
};

const MarketProfileCard: React.FC<MarketProfileCardProps> = ({
  profileImageUrl,
  marketName,
  description,
  thumbnailUrls,
  rating,
  likes,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="flex flex-col p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={profileImageUrl}
            alt={marketName}
            className="w-12 h-12 rounded-full border border-brown-primary flex-shrink-0"
          />
          <div>
            <div className="flex items-center space-x-1">
              <h2 className="text-[15px] font-semibold text-brown-primary tracking-[-0.5px]">
                {marketName}
              </h2>
              <RateIcon className="w-[10px] h-[10px]" />
              <span className="text-[10px] font-medium text-brown-tertiary tracking-[-0.5px]">
                {rating.toFixed(1)}
              </span>
            </div>
            <p className="text-[12px] font-medium text-brown-secondary tracking-[-0.5px] mt-[2px]">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-[2px]">
          <span className="text-[9px] font-medium text-pink tracking-[-0.5px]">
            {formatLikes(likes)}
          </span>
          <button
            type="button"
            onClick={handleLikeToggle}
            className="focus:outline-none"
          >
            <HeartIcon
              fill={isLiked ? '#FF80A6' : 'none'}
              stroke="#EBD8CB"
              strokeWidth="2"
            />
          </button>
        </div>
      </div>
      <div className="mt-2 flex space-x-[2px]">
        {thumbnailUrls.slice(0, 4).map((url, index) => {
          let imageSize = '';
          if (index === 0) {
            imageSize = 'w-[160px] h-[85px]';
          } else if (thumbnailUrls.length === 2) {
            imageSize = 'w-[160px] h-[85px]';
          } else if (thumbnailUrls.length === 3 && index >= 1) {
            imageSize = 'w-[91px] h-[85px]';
          } else if (thumbnailUrls.length === 4 && index === 1) {
            imageSize = 'w-[91px] h-[85px]';
          } else {
            imageSize = 'w-[95px] h-[42px]';
          }
          return (
            <img
              key={url}
              src={url}
              alt={marketName}
              className={`rounded-md object-cover ${imageSize}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MarketProfileCard;
