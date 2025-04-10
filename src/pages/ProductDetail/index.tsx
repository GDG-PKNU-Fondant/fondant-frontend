import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import Carousel from '@components/Carousel';
import Button from '@components/Button';
import ReviewTabContent, {
  ReviewItem,
} from '@pages/ProductDetail/components/ReviewTabContent';
import ErrorPage from '@pages/ErrorPage';
import { bottomTabVisibilityAtom } from '@stores/layoutState';
import type { ProductDetail } from '@type/Product';
import Review from '@type/Review';
import calculateDiscountPercentage from '@utils/calculateDiscountPercentage';
import ArrowRightIcon from '@assets/icons/arrow-right.svg?react';
import RateIcon from '@assets/icons/rate.svg?react';
import InfoIcon from '@assets/icons/info.svg?react';

type ProductDetailTab = 'product' | 'review' | 'details' | 'inquiry';

interface PriceDisplayProps {
  basePrice: number;
  discountPrice?: number;
}

const PriceDisplay = ({ basePrice, discountPrice }: PriceDisplayProps) => {
  if (discountPrice) {
    return (
      <div>
        <div className="text-brown-tertiary text-[15px] font-semibold tracking-[-0.5px] mt-[8px] pl-[16px] line-through">
          {basePrice.toLocaleString()}원
        </div>
        <div className="flex flex-row mt-[4px] pl-[16px]">
          <div className="text-pink text-[18px] font-semibold tracking-[-0.5px] leading-[29px] mr-[4px]">
            {`${calculateDiscountPercentage(basePrice, discountPrice)}%`}
          </div>
          <div className="text-brown-primary text-[24px] font-bold tracking-[-0.5px] leading-[29px]">
            {discountPrice.toLocaleString()}원
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-brown-primary text-[24px] font-bold tracking-[-0.5px] leading-[29px] mt-[8px] pl-[16px]">
      {basePrice.toLocaleString()}원
    </div>
  );
};

interface DeliveryInfoProps {
  freeDeliveryLimit: number;
}

const DeliveryInfo = ({ freeDeliveryLimit }: DeliveryInfoProps) => (
  <div className="flex flex-row items-center mt-[16px] pl-[16px]">
    <div className="text-brown-tertiary text-[14px] font-medium tracking-[-0.5px] mr-[24px]">
      배송
    </div>
    <div className="text-brown-primary text-[14px] font-semibold tracking-[-0.5px] mr-[4px]">
      일반 배송
      <span className="text-brown-tertiary font-light mx-[4px]">|</span>
      <span className="font-light">
        {freeDeliveryLimit > 0 ? '2,500원' : '무료 배송'}
      </span>
      {freeDeliveryLimit > 0 && (
        <span className="text-brown-tertiary font-light">
          <span className="px-[8px]">·</span>
          <span>{`${freeDeliveryLimit.toLocaleString()}원 이상 무료`}</span>
        </span>
      )}
    </div>
    <InfoIcon />
  </div>
);

interface BasicInfoCardProps {
  product: ProductDetail;
}

const BasicInfoCard = ({ product }: BasicInfoCardProps) => (
  <div className="p-[16px]">
    <div className="flex flex-row items-center pb-[12px] mt-[-2px]">
      <div className="text-brown-tertiary text-[14px] font-semibold tracking-[-0.5px] mr-[8px]">
        {product.marketName}
      </div>
      <ArrowRightIcon />
    </div>
    <div className="border-y border-y-beige-tertiary pb-[12px] mx-[-16px]">
      <div className="text-brown-primary font-medium tracking-[-0.5px] mt-[16px] pl-[16px]">
        {product.name}
      </div>
      <div className="flex flex-row items-center mt-[4px] pl-[16px]">
        <RateIcon className="mr-[2px]" />
        <div className="text-brown-tertiary text-[12px] font-medium tracking-[-0.5px]">
          {product.rating} ({product.reviewer})
        </div>
      </div>
      <PriceDisplay
        basePrice={product.basePrice}
        discountPrice={product.discountPrice}
      />
    </div>
    <div className="mx-[-16px]">
      <DeliveryInfo freeDeliveryLimit={product.freeDeliveryLimit} />
    </div>
  </div>
);

interface TabItem {
  key: ProductDetailTab;
  label: string;
}

const TABS: TabItem[] = [
  { key: 'product', label: '상품 정보' },
  { key: 'review', label: '리뷰' },
  { key: 'details', label: '상세 정보' },
  { key: 'inquiry', label: '문의' },
];

interface DetailTabNavigatorProps {
  activeTab: ProductDetailTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ProductDetailTab>>;
}

const DetailTabNavigator = ({
  activeTab,
  setActiveTab,
}: DetailTabNavigatorProps) => {
  return (
    <div className="sticky top-0 z-0 bg-background">
      <div
        className="flex flex-row bg-background text-brown-secondary text-center
        font-medium tracking-[-0.5px] border-b border-b-beige-tertiary"
      >
        {TABS.map(({ key, label }) => (
          <div
            key={key}
            onClick={() => setActiveTab(key)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveTab(key);
              }
            }}
            role="button"
            tabIndex={0}
            className={`flex-1 p-[12px] cursor-pointer ${
              activeTab === key
                ? 'text-brown-primary font-semibold border-b-[2px] border-b-brown-primary'
                : ''
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

interface TabContentProps {
  activeTab: ProductDetailTab;
  product: ProductDetail;
  reviews: Review[];
}

const TabContent = ({ activeTab, product, reviews }: TabContentProps) => {
  switch (activeTab) {
    case 'product':
      return (
        <div className="flex flex-wrap">
          {product.detailImages?.map((image) => (
            <img
              key={image.id}
              src={image.imageUrl}
              alt="상품 상세 이미지"
              className="w-full"
            />
          ))}
        </div>
      );
    case 'review':
      return (
        <ReviewTabContent>
          <div className="flex flex-col gap-[24px]">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))
            ) : (
              <div className="p-[16px] text-center text-brown-secondary">
                작성된 리뷰가 없습니다.
              </div>
            )}
          </div>
        </ReviewTabContent>
      );
    case 'details':
      return (
        <div className="p-[16px]">
          <div className="text-brown-secondary text-[14px] leading-[1.5]">
            {product.description}
          </div>
        </div>
      );
    case 'inquiry':
      return <div className="p-[16px]" />;
    default:
      return null;
  }
};

const SkeletonCarousel = () => (
  <div className="aspect-13/14 bg-beige-secondary animate-pulse" />
);

const SkeletonInfoCard = () => (
  <div className="p-[16px]">
    <div className="flex flex-row items-center pb-[12px] mt-[-2px]">
      <div className="bg-beige-tertiary animate-pulse h-[20px] w-[96px] rounded" />
      <div className="ml-[8px] bg-beige-tertiary animate-pulse h-[16px] w-[16px] rounded" />
    </div>
    <div className="border-y border-y-beige-tertiary pb-[12px] mx-[-16px]">
      <div className="mt-[16px] pl-[16px]">
        <div className="bg-beige-tertiary animate-pulse h-[24px] w-3/4 rounded" />
      </div>
      <div className="flex flex-row items-center mt-[8px] pl-[16px]">
        <div className="bg-beige-tertiary animate-pulse h-[16px] w-[16px] rounded mr-[2px]" />
        <div className="bg-beige-tertiary animate-pulse h-[16px] w-[96px] rounded" />
      </div>
      <div className="mt-[12px] pl-[16px]">
        <div className="bg-beige-tertiary animate-pulse h-[29px] w-[180px] rounded" />
      </div>
    </div>
    <div className="mx-[-16px] mt-[16px] pl-[16px]">
      <div className="flex items-center">
        <div className="bg-beige-tertiary animate-pulse h-[21px] w-[40px] rounded mr-[24px]" />
        <div className="bg-beige-tertiary animate-pulse h-[21px] w-[180px] rounded" />
      </div>
    </div>
  </div>
);

const SkeletonTabNavigator = () => (
  <div className="flex flex-row bg-background border-b border-b-beige-tertiary">
    {TABS.map((_, index) => (
      // eslint-disable-next-line
      <div key={index} className="flex-1 p-[12px] flex justify-center">
        <div className="bg-beige-tertiary animate-pulse h-[20px] w-[64px] rounded" />
      </div>
    ))}
  </div>
);

const SkeletonTabContent = () => (
  <div className="p-[16px]">
    <div className="flex flex-col space-y-[24px]">
      <div className="bg-beige-tertiary animate-pulse h-[160px] w-full rounded" />
      <div className="bg-beige-tertiary animate-pulse h-[160px] w-full rounded" />
      <div className="bg-beige-tertiary animate-pulse h-[160px] w-full rounded" />
    </div>
  </div>
);

const ProductDetailSkeleton = () => (
  <div className="bg-background">
    <SkeletonCarousel />
    <SkeletonInfoCard />
    <SkeletonTabNavigator />
    <div className="min-h-dvh">
      <SkeletonTabContent />
    </div>
  </div>
);

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<ProductDetailTab>('product');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const setBottomTabVisibility = useSetAtom(bottomTabVisibilityAtom);

  useEffect(() => {
    setBottomTabVisibility(false);
    return () => setBottomTabVisibility(true);
  }, [setBottomTabVisibility]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const [productData, productReviews] = await Promise.all([
          fetch(`/api/products/${productId}`).then(async (res) => {
            if (!res.ok) throw new Error('존재하지 않는 상품입니다');
            const data = await res.json();
            if (!data) throw new Error('상품 정보를 불러올 수 없습니다');
            return data as ProductDetail;
          }),
          fetch(`/api/products/${productId}/reviews`).then(async (res) => {
            if (!res.ok) throw new Error('리뷰 정보를 불러올 수 없습니다');
            return res.json() as Promise<Review[]>;
          }),
        ]);

        setProduct(productData);
        setReviews(productReviews);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  if (isLoading || !product) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <div className="flex-none">
        <Carousel slides={product.thumbnailImages} type="product" />
        <BasicInfoCard product={product} />
      </div>
      <DetailTabNavigator activeTab={activeTab} setActiveTab={setActiveTab} />
      <div ref={contentRef} className="flex-grow overflow-auto">
        <TabContent activeTab={activeTab} product={product} reviews={reviews} />
      </div>
      <div className="flex-none sticky bottom-0 z-0 bg-background rounded-t-[10px] p-[15px] shadow-[0px_-4px_10px_0px_rgba(156,108,79,0.10)]">
        <Button variant="submit">구매하기</Button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
