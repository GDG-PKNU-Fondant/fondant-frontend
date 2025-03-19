import { LikeButton } from '@components/MarketProfileCard';
import MarketInfoProps from '@type/MarketInfo';
import BackIcon from '@assets/icons/back.svg?react';
const MarketInfo = ({
  backgroundImage,
  thumbnail,
  marketName,
  title,
  description,
  tags,
  likes,
}: MarketInfoProps) => {
  return (
    <div className="relative w-full">
      <div
        className="relative w-full h-[208px] bg-cover bg-center before:absolute before:top-0 before:left-0 before:w-full before:h-[208px] before:bg-gradient-to-b before:from-[#3c3c3c]/30 before:via-[#3c3c3c]/10 before:to-transparent before:z-1"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <button className="absolute top-[54px] left-[19px] z-2">
          <BackIcon></BackIcon>
        </button>
        <button className="absolute top-[54px] right-[16px] px-[8px] py-[4px] bg-beige-tertiary/10 backdrop-blur-[2px] text-beige-tertiary text-[12px] rounded-full flex items-center hover:bg-beige-tertiary/30 transition z-2">
          가게정보
        </button>
      </div>
      <div className="relative px-[24px]">
        <div className="absolute top-[5px] right-[16px]">
          <LikeButton likes={likes} />
        </div>
        <div className="mt-[20px]">
          <div className="flex">
            <div className="w-[78px] h-[78px]  bg-gray-300 rounded-full outline-background overflow-hidden">
              <img
                src={thumbnail}
                alt="Market Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-col ml-[20px]">
              <div className="flex items-center space-x-[8px]  leading-none">
                <h2 className="text-[22px] text-brown-primary font-extrabold">
                  {marketName}
                </h2>
                {/* {title && (
                  <span className="text-[11px] text-pink font-semibold flex items-center before:content-[''] before:w-[1px] before:h-[20px] before:bg-beige-secondary before:mr-[8px]">
                    {title}
                  </span>
                )} */}
              </div>
              <p className="text-brown-secondary text-[12px] mt-[10px]  leading-none">
                {description}
              </p>

              <div className="mt-[10px] flex space-x-[4px]">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-[8px] py-[2px] text-[12px] bg-pink/20 text-pink rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInfo;
