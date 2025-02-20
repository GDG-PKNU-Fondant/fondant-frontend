import React from 'react';
import { CartItem, CartItemOption } from '@type/MarketCartCard';
import QuantityController from '@components/QuantityController';
import CheckButton from '@components/CheckButton';
import formatDate from '@utils/formatDate';
import { calculateItemTotal } from '@utils/cartCalculations';

interface CartItemCardProps {
  item: CartItem;
  onSelect: (selected: boolean) => void;
  onQuantityChange: (quantity: number) => void;
}

const ItemImage = ({ url, alt }: { url: string; alt: string }) => (
  <div className="w-[75px] h-[75px] overflow-hidden bg-beige-secondary rounded-[5px] mb-[10px] mr-[12px]">
    <img src={url} alt={alt} className="w-full h-full object-cover" />
  </div>
);

const ItemInfo = ({
  name,
  arrivalDate,
}: {
  name: string;
  arrivalDate?: Date;
}) => (
  <div className="leading-tight">
    <div className="text-[13px] text-brown-primary my-[6px]">{name}</div>
    {arrivalDate && (
      <div className="text-[12px] text-brown-secondary">
        {formatDate(arrivalDate)} 이내 발송 예정
      </div>
    )}
  </div>
);

const AdditionalOption = ({ option }: { option: CartItemOption }) => (
  <div className="flex items-center justify-between h-[40px] bg-beige-tertiary rounded-[5px] px-[15px] mb-[8px] leading-none">
    <div className="flex items-center gap-[4px]">
      <span className="text-[13px] text-brown-primary">{option.name}</span>
      {option.additionalPrice > 0 && (
        <span className="text-[11px] text-brown-secondary text-opacity-70">
          (+{option.additionalPrice.toLocaleString()}원)
        </span>
      )}
    </div>
    <span className="justify-self-end text-[11px] text-brown-secondary text-opacity-70">
      × {option.quantity}
    </span>
  </div>
);

const PriceInfo = ({ item }: { item: CartItem }) => (
  <div
    className={`flex items-center justify-between ${item.additionalOptions ? 'mt-[20px]' : 'mt-[12px]'} leading-none`}
  >
    <div className="text-[12px] text-brown-secondary">상품 금액</div>
    <div className="text-[15px] text-brown-primary">
      {calculateItemTotal(item).toLocaleString()}원
    </div>
  </div>
);

const ActionButtons = ({
  hasOptions,
  quantity,
  onQuantityChange,
}: {
  hasOptions: boolean;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}) => (
  <div className="flex mt-[12px] gap-[7px]">
    <button
      type="button"
      disabled={!hasOptions}
      className={`flex flex-1 items-center justify-center border border-beige-secondary text-[13px] font-medium rounded-[5px] p-[10px] ${
        !hasOptions
          ? 'text-brown-tertiary text-opacity-50'
          : 'text-brown-secondary'
      }`}
    >
      옵션 변경
    </button>
    <QuantityController value={quantity} onChange={onQuantityChange} />
  </div>
);

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onSelect,
  onQuantityChange,
}) => {
  return (
    <div className="p-[16px] font-medium">
      <div className="flex items-start gap-4">
        <button type="button" onClick={() => onSelect(!item.selected)}>
          <CheckButton selected={item.selected} />
        </button>
        <div className="flex-1">
          <div className="flex flex-row">
            <ItemImage url={item.thumbnailUrl} alt={item.name} />
            <ItemInfo name={item.name} arrivalDate={item.arrivalDate} />
          </div>
          {item.additionalOptions?.map((option) => (
            <AdditionalOption key={option.id} option={option} />
          ))}
          <PriceInfo item={item} />
          <ActionButtons
            hasOptions={!!item.additionalOptions}
            quantity={item.quantity}
            onQuantityChange={onQuantityChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
