import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import DeliveryAddress from '@pages/OrderPayment/components/DeliveryAddress';
import OrderProductList from '@pages/OrderPayment/components/OrderProductList';
import DiscountPoint from '@pages/OrderPayment/components/DiscountPoint';
import PaymentMethods from '@pages/OrderPayment/components/PaymentMethods';
import PaymentAmount from '@pages/OrderPayment/components/PaymentAmount';
import AgreementList from '@pages/OrderPayment/components/AgreementList';
import Button from '@components/Button';
import MOCK_ORDER_PRODUCTS from '@mocks/constants/mockOrderProducts';
import { bottomTabVisibilityAtom } from '@stores/layoutState';

const OrderPayment: React.FC = () => {
  const setBottomTabVisibility = useSetAtom(bottomTabVisibilityAtom);

  useEffect(() => {
    setBottomTabVisibility(false);
    return () => setBottomTabVisibility(true);
  }, [setBottomTabVisibility]);

  const productPrice = MOCK_ORDER_PRODUCTS.reduce(
    (sum, item) => sum + item.price,
    0,
  );
  const shippingFee = 3000;
  const totalPrice = productPrice + shippingFee;

  return (
    <div className="min-h-dvh bg-[#FDF4ED] flex flex-col">
      <div className="flex flex-col px-[12px] pt-[20px] pb-[18px] gap-[18px]">
        <DeliveryAddress />
        <OrderProductList products={MOCK_ORDER_PRODUCTS} />
        <DiscountPoint />
        <PaymentMethods />
        <PaymentAmount />
        <AgreementList />
      </div>
      <div className="sticky bottom-0 bg-background rounded-t-[10px] p-[15px] shadow-[0px_-4px_10px_0px_rgba(156,108,79,0.10)]">
        <Button variant="submit" block>
          {totalPrice.toLocaleString()}원 구매하기
        </Button>
      </div>
    </div>
  );
};

export default OrderPayment;
