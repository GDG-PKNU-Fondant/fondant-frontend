import React from 'react';
import MOCK_ORDER_PRODUCTS from '@mocks/constants/mockOrderProducts';

const PaymentAmount: React.FC = () => {
  const productPrice = MOCK_ORDER_PRODUCTS.reduce(
    (sum, item) => sum + item.price,
    0,
  );
  const shippingFee = 3000;
  const totalPrice = productPrice + shippingFee;

  return (
    <div className="bg-background rounded-[10px] shadow-lg">
      <div className="px-[16px] pt-[16px]">
        <div className="flex justify-between items-center pb-[12px]">
          <div className="text-[16px] font-semibold text-brown-primary tracking-[-0.5px]">
            결제 금액
          </div>
          <div className="text-[16px] font-semibold text-pink text-right tracking-[-0.5px]">
            {totalPrice.toLocaleString()}원
          </div>
        </div>
      </div>
      <div className="px-[16px] pt-[12px] pb-[16px] flex flex-col gap-[4px]">
        <div className="flex justify-between items-center">
          <div className="text-[12px] font-medium text-brown-secondary tracking-[0.2px] leading-[16px]">
            상품 금액
          </div>
          <div className="text-[12px] font-medium text-brown-secondary tracking-[0.2px] leading-[16px]">
            {productPrice.toLocaleString()}원
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[12px] font-medium text-brown-secondary tracking-[0.2px] leading-[16px]">
            배송비
          </div>
          <div className="text-[12px] font-medium text-brown-secondary tracking-[0.2px] leading-[16px]">
            {shippingFee.toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAmount;
