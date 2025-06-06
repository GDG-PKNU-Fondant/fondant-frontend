import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { AxiosError } from 'axios';
import { MarketDetail } from '@type/Market';
import { allCategoriesAtom } from '@stores/categoryState';
import useMarketDetailQuery from '@hooks/queries/useMarketDetailQuery';
import useProductListQuery from '@hooks/queries/useProductListQuery';
import ErrorPage from '@pages/ErrorPage';
import TabNavigator from '@components/TabNavigator';
import ProductList from '@components/ProductList';
import ScrollToTopButton from '@components/ScrollToTopButton';
import BackIcon from '@assets/icons/back.svg?react';
import HeartIcon from '@assets/icons/heart.svg?react';

interface MarketBannerProps {
  backgroundUrl?: string;
  marketName: string;
}

const MarketBanner: React.FC<MarketBannerProps> = ({
  backgroundUrl,
  marketName,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[200px] bg-brown-tertiary overflow-hidden">
      {backgroundUrl && (
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundUrl}
          alt={marketName}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent" />
      <div className="relative h-full flex items-start justify-between p-[20px]">
        <button
          className="cursor-pointer"
          type="button"
          onClick={() => navigate(-1)}
        >
          <BackIcon stroke="white" />
        </button>
        <button
          className="bg-[#D9D9D9]/40 text-white text-[12px] font-light rounded-full border-[0.5px] border-white/30 px-[8px] py-[3px] cursor-pointer"
          type="button"
        >
          가게 정보
        </button>
      </div>
    </div>
  );
};

interface MarketInfoProps {
  marketDetail: MarketDetail;
}

const MarketInfo: React.FC<MarketInfoProps> = ({ marketDetail }) => {
  const { name, thumbnailUrl, isTop10, description, hashtags } = marketDetail;

  return (
    <div className="px-[24px] py-[20px] bg-white">
      <div className="flex items-center gap-[20px]">
        <div className="w-[80px] h-[80px] rounded-full bg-brown-secondary flex-shrink-0">
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-[8px] mb-[8px]">
            <div className="text-[20px] text-brown-primary font-extrabold leading-[22px]">
              {name}
            </div>
            {isTop10 && (
              <>
                <div className="w-[1px] h-[20px] bg-beige-secondary" />
                <span className="text-[11px] text-pink font-semibold">
                  🏆 인기 TOP 10
                </span>
              </>
            )}
            <div className="ml-auto">
              <HeartIcon />
            </div>
          </div>
          <div className="text-[12px] text-brown-secondary font-medium leading-[16px] mb-[8px]">
            {description}
          </div>
          {hashtags?.length > 0 && (
            <div className="flex flex-wrap gap-[4px]">
              {hashtags.map((hashtag) => (
                <span
                  key={hashtag}
                  className="bg-pink/20 text-[12px] text-pink rounded-full px-[8px] py-[2px]"
                >
                  #{hashtag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const useCategoryTabs = (marketDetail: MarketDetail | undefined) => {
  const categories = useAtomValue(allCategoriesAtom);

  return useMemo(() => {
    if (!marketDetail?.subCategoryIds || !categories) return [];

    return marketDetail.subCategoryIds
      .map((categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category
          ? {
              label: category.name,
              key: category.id.toString(),
            }
          : null;
      })
      .filter((tab): tab is NonNullable<typeof tab> => tab !== null);
  }, [marketDetail?.subCategoryIds, categories]);
};

const Market = () => {
  const { marketId } = useParams<{ marketId: string }>();
  const [activeTab, setActiveTab] = useState('');

  const {
    data: marketDetail,
    error: marketError,
    isLoading: isMarketLoading,
  } = useMarketDetailQuery(marketId);

  const { data: productList = [] } = useProductListQuery(marketId, activeTab, {
    enabled: !!marketId && !!activeTab,
  });

  const categoryTabs = useCategoryTabs(marketDetail);

  useEffect(() => {
    if (categoryTabs.length > 0 && !activeTab) {
      setActiveTab(categoryTabs[0].key);
    }
  }, [categoryTabs, activeTab]);

  if (marketError) {
    const errorMessage =
      (marketError as AxiosError)?.response?.status === 404
        ? '존재하지 않는 마켓입니다'
        : '마켓 정보를 불러올 수 없습니다';
    return <ErrorPage errorMessage={errorMessage} />;
  }

  if (isMarketLoading || !marketDetail) {
    return null;
  }

  return (
    <div className="min-h-dvh pb-[90px]">
      <MarketBanner
        backgroundUrl={marketDetail.backgroundUrl}
        marketName={marketDetail.name}
      />
      <MarketInfo marketDetail={marketDetail} />
      <div className="relative mb-[16px]">
        <div className="absolute bottom-[4px] left-0 right-0">
          <div className="h-[1px] bg-beige-secondary w-full" />
        </div>
        <TabNavigator
          tabs={categoryTabs}
          onTabChange={setActiveTab}
          autoLayout
        />
      </div>
      <div className="px-[16px]">
        <ProductList products={productList} />
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Market;
