import React, { useEffect, useState } from 'react';
import Button from '@components/Button';
import { OrderResponseType } from '@type/Order';

const OrderCompleteSummary: React.FC = () => {
  const [orderData, setOrderData] = useState<OrderResponseType | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setOrderData(data);
    };

    fetchOrder();
  }, []);

  if (!orderData) return null;

  const { deliveryAddress, orderProducts, totalAmount, paymentMethod } =
    orderData;

  return (
    <div className="bg-background rounded-[10px] shadow-[0px_0px_10px_0px_rgba(156,108,79,0.15)]">
      <div className="px-[20px] pt-[24px] pb-[20px]">
        <div className="text-center text-[22px] font-semibold text-pink leading-[20px] tracking-[-0.5px]">
          주문이 완료되었습니다!
        </div>
      </div>
      <div className="w-full border-b border-beige-tertiary" />
      <div className="px-[20px] pb-[20px] flex flex-col text-[14px] leading-[16px]">
        <div className="flex gap-[8px] pt-[14px]">
          <div className="font-normal text-brown-secondary w-[70px] shrink-0">
            배송 정보
          </div>
          <div className="font-medium text-brown-primary">
            {deliveryAddress.name} / {deliveryAddress.phone}
            <br />
            {deliveryAddress.postalCode} {deliveryAddress.address}{' '}
            {deliveryAddress.detailAddress}
          </div>
        </div>
        <div className="flex gap-[8px] mt-[60px]">
          <div className="font-normal text-brown-secondary w-[70px] shrink-0">
            주문 상품
          </div>
          <div className="font-medium text-brown-primary">
            {orderProducts.map((item) => item.productName).join(', ')}
          </div>
        </div>
        <div className="flex gap-[8px] mt-[30px]">
          <div className="font-normal text-brown-secondary w-[70px]">
            결제 금액
          </div>
          <div className="font-medium text-brown-primary">
            <span className="font-bold text-brown-primary">
              {totalAmount.toLocaleString()}원
            </span>{' '}
            / {paymentMethod}
          </div>
        </div>
      </div>
      <div className="px-[20px] pb-[20px] flex gap-[8px]">
        <Button variant="secondary" size="medium" block="false">
          결제 내역보기
        </Button>
        <Button variant="primary" size="medium" block="false">
          쇼핑 계속하기
        </Button>
      </div>
    </div>
  );
};

export default OrderCompleteSummary;
