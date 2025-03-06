import React from 'react';
import { PopularSearchesProps } from '@type/PopularSearches';
import UpIcon from '@assets/icons/up.svg?react';
import DownIcon from '@assets/icons/down.svg?react';
import NeutralIcon from '@assets/icons/neutral.svg?react';

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === 'up') return <UpIcon className="ml-[2px]" />;
  if (trend === 'down') return <DownIcon className="ml-[2px]" />;
  return <NeutralIcon className="ml-[2px]" />;
};

const getUpdateTime = () => {
  const hours = String(new Date().getHours()).padStart(2, '0');
  return `${hours}시 업데이트`;
};

const PopularSearches: React.FC<PopularSearchesProps> = ({ searches }) => {
  const updateTime = getUpdateTime();

  return (
    <div className="w-full px-[24px] py-[16px]">
      <div className="flex justify-between text-brown-tertiary text-[13px] font-semibold tracking-[0.2px] mb-[16px]">
        <div>인기 검색어</div>
        <div>{updateTime}</div>
      </div>
      <div className="flex w-full gap-[20px]">
        <div className="flex-1 flex flex-col gap-[22px]">
          {searches.slice(0, 3).map(({ rank, keyword, trend }) => (
            <div
              key={rank}
              className="flex items-center text-brown-primary text-[14px]"
            >
              <div className="w-[20px] font-semibold text-center">{rank}</div>
              <div className="ml-[8px] font-medium flex-1">{keyword}</div>
              <div className="ml-auto">
                <TrendIcon trend={trend || 'neutral'} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-[22px]">
          {searches.slice(3, 6).map(({ rank, keyword, trend }) => (
            <div
              key={rank}
              className="flex items-center text-brown-primary text-[14px] font-medium"
            >
              <div className="w-[20px] font-semibold text-center">{rank}</div>
              <div className="ml-[8px] font-medium flex-1">{keyword}</div>
              <div className="ml-auto">
                <TrendIcon trend={trend || 'neutral'} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularSearches;
