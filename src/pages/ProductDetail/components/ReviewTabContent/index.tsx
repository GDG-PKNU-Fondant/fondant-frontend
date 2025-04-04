import React from 'react';
import Review from '@type/Review';
import FilledStarIcon from '@assets/icons/star-filled.svg?react';
import EmptyStarIcon from '@assets/icons/star-empty.svg?react';

interface ReviewTabContentProps {
  children: React.ReactNode;
}

interface ReviewItemProps {
  review: Review;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-[2px]">
      {[...Array(5)].map((_, i) =>
        i < rating ? (
          // eslint-disable-next-line
          <FilledStarIcon key={`star-${i}-filled`} />
        ) : (
          // eslint-disable-next-line
          <EmptyStarIcon key={`star-${i}-empty`} />
        ),
      )}
    </div>
  );
};

const ImageGrid: React.FC<{ images: { id: number; imageUrl: string }[] }> = ({
  images,
}) => {
  return (
    <div className="grid grid-cols-3 gap-[4px]">
      {images.map((image) => (
        <div
          key={image.id}
          className="aspect-square overflow-hidden rounded-[10px]"
        >
          <img
            src={image.imageUrl}
            alt={`review-${image.id}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-[16px]">
        <div className="flex items-center">
          <div className="w-[36px] h-[36px] rounded-full mr-[8px] overflow-hidden">
            <img
              src={review.profileImageUrl}
              alt={review.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center">
              <div className="text-[14px] text-brown-primary font-semibold tracking-[-0.5px]">
                {review.username}
              </div>
              <div className="text-[12px] text-brown-secondary tracking-[-0.5px]">
                <span className="text-brown-tertiary ml-[8px]">리뷰 </span>
                {review.reviews}
                <span className="text-brown-tertiary ml-[4px]">평균별점 </span>
                {review.averageRating.toFixed(1)}
              </div>
            </div>
            <StarRating rating={review.rating} />
          </div>
        </div>
      </div>
      <div className="text-[14px] text-brown-primary font-medium tracking-[-0.5px] mb-[16px]">
        {review.comment}
      </div>
      {review.images.length > 0 && <ImageGrid images={review.images} />}
    </div>
  );
};

const ReviewTabContent: React.FC<ReviewTabContentProps> = ({ children }) => {
  return (
    <div className="p-[20px]">
      <div>{children}</div>
    </div>
  );
};

export default ReviewTabContent;
