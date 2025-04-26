import React from 'react';
import { OrderItemProps, OrderItemOption } from '@type/OrderDetail';
import formatDate from '@utils/formatDate';
import Button from '@components/Button';

interface OrderItemCardProps {
  item: OrderItemProps;
}

const ItemImage = ({ url, alt }: { url: string; alt: string }) => (
  <div className="w-[75px] h-[75px] bg-beige-secondary rounded-[5px] overflow-hidden shrink-0">
    <img src={url} alt={alt} className="w-full h-full object-cover" />
  </div>
);

const ItemInfo = ({
  name,
  arrivalDate,
  price,
}: {
  name: string;
  arrivalDate?: Date;
  price: number;
}) => (
  <div className="leading-tight">
    <div className="text-[13px] text-brown-primary my-[6px]">{name}</div>
    {arrivalDate && (
      <div className="text-[12px] text-brown-secondary mb-[14px]">
        {formatDate(arrivalDate)} 이내 발송 예정
      </div>
    )}
    <div className="text-[16px] font-bold text-brown-primary">
      {price.toLocaleString()}원
    </div>
  </div>
);

const AdditionalOption = ({ option }: { option: OrderItemOption }) => (
  <div className="flex items-center justify-between h-[40px] bg-beige-tertiary rounded-[5px] px-[15px] mb-[8px] leading-none">
    <div className="flex items-center gap-[4px]">
      <span className="text-[13px] text-brown-primary">{option.name}</span>
      {option.additionalPrice > 0 && (
        <span className="text-[11px] text-brown-secondary text-opacity-70">
          (+{option.additionalPrice.toLocaleString()}원)
        </span>
      )}
    </div>
  </div>
);

const OrderItemCard: React.FC<OrderItemCardProps> = ({ item }) => {
  const additionalTotal = item.additionalOptions.reduce(
    (sum, option) => sum + option.additionalPrice,
    0,
  );

  const totalPrice = item.price + item.deliveryCost + additionalTotal;

  return (
    <div className="bg-background rounded-[10px] shadow-[0px_0px_10px_0px_rgba(156,108,79,0.15)] mb-[12px]">
      <div className="flex justify-between items-center text-[14px] font-semibold text-brown-primary leading-[15px] tracking-[-0.5px] px-[14px] pt-[14px]">
        <div>{item.storeName}</div>
        <div className="text-[12px] font-medium leading-[16px] text-brown-secondary">
          배송비{' '}
          <span className="text-brown-primary font-semibold">
            {item.deliveryCost === 0
              ? '무료'
              : `${item.deliveryCost.toLocaleString()}원`}
          </span>
        </div>
      </div>
      <div className="w-full border-b border-beige-tertiary mt-[14px]" />
      <div className="px-[14px] pt-[12px] pb-[10px]">
        <div className="flex gap-[16px]">
          <ItemImage url={item.thumbnailUrl} alt={item.productName} />
          <ItemInfo
            name={item.productName}
            arrivalDate={item.arrivalDate}
            price={totalPrice}
          />
        </div>
        {item.additionalOptions.length > 0 && (
          <div className="mt-[16px]">
            {item.additionalOptions.map((option) => (
              <AdditionalOption key={option.id} option={option} />
            ))}
          </div>
        )}
        <div className="flex gap-[6px] pt-[16px] pb-[16px]">
          <Button variant="secondary" size="medium" block>
            취소하기
          </Button>
          <Button variant="secondary" size="medium" block>
            문의하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
