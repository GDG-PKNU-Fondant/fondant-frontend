import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import OrderCompleteSummary from '@pages/OrderComplete/components/OrderCompleteSummary';
import ScrollableProduct from '@components/ScrollableProduct';
import { bottomTabVisibilityAtom } from '@stores/layoutState';

const OrderComplete: React.FC = () => {
  const setBottomTabVisibility = useSetAtom(bottomTabVisibilityAtom);

  useEffect(() => {
    setBottomTabVisibility(false);
    return () => setBottomTabVisibility(true);
  }, [setBottomTabVisibility]);

  return (
    <div className="flex flex-col min-h-dvh items-center gap-[18px] bg-[#FDF4ED]">
      <div className="px-[12px] py-[12px]">
        <OrderCompleteSummary />
      </div>
      <div className="w-full">
        <ScrollableProduct title="OO가게 인기상품 보러가기" />
      </div>
      <div className="w-full">
        <ScrollableProduct title="찜 항목 보러가기" />
      </div>
    </div>
  );
};

export default OrderComplete;
