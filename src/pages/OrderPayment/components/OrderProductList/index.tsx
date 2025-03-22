import React from 'react';
import { OrderProductListProps } from '@type/OrderProductList';

const OrderProductList: React.FC<OrderProductListProps> = ({ products }) => {
  return (
    <div className="flex flex-col bg-background rounded-[10px] shadow-lg">
      <div className="w-full">
        <div className="p-[16px]">
          <div className="text-[16px] font-semibold text-brown-primary tracking-[-0.5px]">
            주문 상품 {products.length}개
          </div>
        </div>
        <div className="w-full border-b border-beige-tertiary" />
      </div>
      <div className="flex flex-col">
        {products.map(({ id, productName, option, price, imageUrl }) => (
          <div
            key={id}
            className="p-[12px_16px] flex gap-[12px] border-b border-beige-tertiary last:border-none"
          >
            <div className="w-[73px] h-[73px] bg-beige-primary rounded-[5px] flex-shrink-0">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={productName}
                  className="w-full h-full object-cover rounded-[5px]"
                />
              )}
            </div>
            <div className="flex flex-col justify-between py-[2px]">
              <div className="flex flex-col gap-[2px]">
                <div className="text-[13px] font-medium text-brown-primary leading-[16px] tracking-[-0.5px]">
                  {productName}
                </div>
                <div className="text-[12px] font-medium text-brown-secondary tracking-[0.2px] leading-[16px]">
                  {option}
                </div>
              </div>
              <div className="text-[13px] font-medium text-brown-primary leading-[16px]">
                {price.toLocaleString()}원
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProductList;
