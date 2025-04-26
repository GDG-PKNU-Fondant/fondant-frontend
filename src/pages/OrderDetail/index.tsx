import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import OrderItemCard from '@pages/OrderDetail/OrderItemCard';
import ScrollableProduct from '@components/ScrollableProduct';
import PageHeader from '@components/PageHeader';
import Button from '@components/Button';
import MOCK_ORDER_DETAIL from '@mocks/constants/mockOrderDetail';
import { bottomTabVisibilityAtom } from '@stores/layoutState';

const OrderDetail: React.FC = () => {
  const setBottomTabVisibility = useSetAtom(bottomTabVisibilityAtom);

  useEffect(() => {
    setBottomTabVisibility(false);
    return () => setBottomTabVisibility(true);
  }, [setBottomTabVisibility]);

  const { orderId, orderedItems } = MOCK_ORDER_DETAIL;

  return (
    <div className="min-h-dvh bg-[#FDF4ED] pb-[40px]">
      <div className="w-full">
        <PageHeader title="결제 내역" />
      </div>
      <div className="w-full border-b border-beige-tertiary" />
      <div className="px-[16px] pt-[8px] pb-[8px] mb-[12px] bg-background">
        <div className="flex justify-between items-center">
          <div className="text-[14px] text-brown-secondary">
            주문번호 : {orderId}
          </div>
          <Button variant="tertiary" size="small">
            내역삭제
          </Button>
        </div>
      </div>
      <div className="px-[12px] mb-[14px]">
        {orderedItems.map((item) => (
          <OrderItemCard key={item.id} item={item} />
        ))}
      </div>
      <div className="w-full pt-[4px] pb-[18px]">
        <ScrollableProduct title="찜 항목 보러가기" />
      </div>
      <div className="w-full">
        <ScrollableProduct title="쿠키류 추천 상품" />
      </div>
    </div>
  );
};

export default OrderDetail;
