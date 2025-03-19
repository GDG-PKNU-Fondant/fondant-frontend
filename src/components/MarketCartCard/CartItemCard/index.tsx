import React from 'react';
import { CartItem, CartItemOption } from '@type/MarketCartCard';
import QuantityController from '@components/QuantityController';
import Button from '@components/Button';
import CheckButton from '@components/CheckButton';
import formatDate from '@utils/formatDate';
import { calculateItemTotal } from '@utils/cartCalculations';
import BottomSheet from '@components/BottomSheet';
import ProductOptionSheetContent from '@pages/Cart/components/ProductOptionSheetContent';
import useModal from '@hooks/useModal';

interface CartItemCardProps {
  item: CartItem;
  onSelect: (selected: boolean) => void;
  onQuantityChange: (quantity: number) => void;
  onOptionChange: (options: CartItemOption[]) => void;
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

const SelectedOption = ({
  selectedOption,
}: {
  selectedOption: CartItemOption;
}) => (
  <div className="flex items-center justify-between h-[40px] bg-beige-tertiary rounded-[5px] px-[15px] mb-[8px] leading-none">
    <div className="flex items-center gap-[4px]">
      <span className="text-[13px] text-brown-primary">
        {selectedOption.name}
      </span>
      {selectedOption.additionalPrice > 0 && (
        <span className="text-[11px] text-brown-secondary text-opacity-70">
          (+{selectedOption.additionalPrice.toLocaleString()}원)
        </span>
      )}
    </div>
    <span className="flex items-center justify-center w-[32px] h-[24px] bg-background border border-beige-primary text-[12px] text-brown-primary rounded-[5px]">
      {selectedOption.quantity}
    </span>
  </div>
);

const PriceInfo = ({ item }: { item: CartItem }) => (
  <div
    className={`flex items-center justify-between ${item.selectedOptions ? 'mt-[20px]' : 'mt-[12px]'} leading-none`}
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
  onOptionChangeClick,
}: {
  hasOptions: boolean;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onOptionChangeClick: () => void;
}) => (
  <div className="flex mt-[12px] gap-[7px]">
    <Button
      variant="secondary"
      disabled={!hasOptions}
      onClick={onOptionChangeClick}
      block
    >
      {hasOptions ? '옵션 변경' : '단일 옵션'}
    </Button>
    <QuantityController value={quantity} onChange={onQuantityChange} />
  </div>
);

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onSelect,
  onQuantityChange,
  onOptionChange,
}) => {
  const sheetKey = `product-option-sheet-${item.id}`;
  const { closeModal, openModal } = useModal();

  const handleOptionChange = (newSelectedOptions: CartItemOption[]) => {
    onOptionChange(newSelectedOptions);
    closeModal('product-option-sheet');
  };

  return (
    <div className="p-[16px] font-medium">
      <div className="flex items-start gap-4">
        <button type="button" onClick={() => onSelect(!item.selected)}>
          <CheckButton selected={item.selected} rounded />
        </button>
        <div className="flex-1">
          <div className="flex flex-row">
            <ItemImage url={item.thumbnailUrl} alt={item.name} />
            <ItemInfo name={item.name} arrivalDate={item.arrivalDate} />
          </div>
          {item.selectedOptions?.map((option) => (
            <SelectedOption key={option.id} selectedOption={option} />
          ))}
          <PriceInfo item={item} />
          <ActionButtons
            hasOptions={!!item.selectedOptions}
            quantity={item.quantity}
            onQuantityChange={onQuantityChange}
            onOptionChangeClick={() => {
              openModal(sheetKey);
            }}
          />
        </div>
      </div>
      <BottomSheet sheetKey={sheetKey}>
        <ProductOptionSheetContent
          onClose={() => closeModal(sheetKey)}
          item={item}
          totalPrice={calculateItemTotal(item)}
          onOptionChange={handleOptionChange}
        />
      </BottomSheet>
    </div>
  );
};

export default CartItemCard;
