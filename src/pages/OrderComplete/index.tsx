import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import OrderCompleteSummary from '@pages/OrderComplete/components/OrderCompleteSummary';
import ScrollableProduct from '@components/ScrollableProduct';
import PageHeader from '@components/PageHeader';
import { bottomTabVisibilityAtom } from '@stores/layoutState';

const OrderComplete: React.FC = () => {
  const setBottomTabVisibility = useSetAtom(bottomTabVisibilityAtom);

  useEffect(() => {
    setBottomTabVisibility(false);
    return () => setBottomTabVisibility(true);
  }, [setBottomTabVisibility]);

  return (
    <div className="flex flex-col min-h-dvh items-center bg-[#FDF4ED]">
      <div className="w-full">
        <PageHeader title="결제" />
      </div>
      <div className="px-[12px] py-[12px] pb-[18px]">
        <OrderCompleteSummary />
      </div>
      <div className="w-full pb-[18px]">
        <ScrollableProduct title="OO가게 인기상품 보러가기" />
      </div>
      <div className="w-full">
        <ScrollableProduct title="찜 항목 보러가기" />
      </div>
    </div>
  );
};

export default OrderComplete;
