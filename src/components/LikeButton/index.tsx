import { useState } from 'react';
import HeartIcon from '@assets/icons/heart.svg?react';
import formatPeopleCount from '@utils/formatPeopleCount';

const LikeButton = ({
  liked = false,
  count,
  countDisplay = true,
}: {
  liked?: boolean;
  count: number;
  countDisplay?: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(count);

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="flex items-center justify-end max-w-[48px]">
      {countDisplay && (
        <div className="text-[9px] font-medium text-pink tracking-[-0.5px] mr-[4px]">
          {formatPeopleCount(likeCount)}
        </div>
      )}
      <button type="button" onClick={handleLikeToggle}>
        <HeartIcon
          fill={isLiked ? '#FF80A6' : 'none'}
          stroke={isLiked ? '#FF80A6' : '#EBD8CB'}
        />
      </button>
    </div>
  );
};
export default LikeButton;
