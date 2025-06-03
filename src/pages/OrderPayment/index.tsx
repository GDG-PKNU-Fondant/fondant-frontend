import React, { useEffect, useState } from 'react';
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
import requestPayment from '@apis/requestPayment';

const OrderPayment: React.FC = () => {
  const setBottomTabVisibility = useSetAtom(bottomTabVisibilityAtom);

  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedOtherMethod, setSelectedOtherMethod] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    setBottomTabVisibility(false);
    return () => setBottomTabVisibility(true);
  }, [setBottomTabVisibility]);

  const productPrice = MOCK_ORDER_PRODUCTS.reduce(
    (sum, item) => sum + item.price,
    0,
  );
  const deliveryCost = 2500;
  const totalPrice = productPrice + deliveryCost;

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert('결제 수단을 선택해주세요.');
      return;
    }

    setIsPaying(true);

    try {
      const response = await requestPayment({
        method: selectedMethod,
        otherMethod: selectedOtherMethod,
        products: MOCK_ORDER_PRODUCTS,
        deliveryCost,
      });

      if (response?.code) {
        alert(`결제 실패: ${response.message}`);
      } else {
        alert('결제가 완료되었습니다!');
      }
    } catch {
      alert('결제 도중 오류가 발생했습니다.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF4ED] flex flex-col">
      <div className="flex flex-col px-[12px] pt-[20px] pb-[18px] gap-[18px]">
        <DeliveryAddress />
        <OrderProductList products={MOCK_ORDER_PRODUCTS} />
        <DiscountPoint />
        <PaymentMethods
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
          selectedOtherMethod={selectedOtherMethod}
          setSelectedOtherMethod={setSelectedOtherMethod}
        />
        <PaymentAmount />
        <AgreementList />
      </div>
      <div className="sticky bottom-0 bg-background rounded-t-[10px] p-[15px] shadow-[0px_-4px_10px_0px_rgba(156,108,79,0.10)]">
        <Button
          variant="submit"
          block
          onClick={handlePayment}
          disabled={isPaying}
        >
          {isPaying
            ? '결제 진행 중...'
            : `${totalPrice.toLocaleString()}원 구매하기`}
        </Button>
      </div>
    </div>
  );
};

export default OrderPayment;
