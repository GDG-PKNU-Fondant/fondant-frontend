import React from 'react';
import { MarketCart } from '@type/MarketCartCard';
import CartItemCard from '@components/MarketCartCard/CartItemCard';
import CheckButton from '@components/CheckButton';
import { calculateMarketTotal } from '@utils/cartCalculations';

interface MarketCartCardProps {
  market: MarketCart;
  onMarketSelect: (selected: boolean) => void;
  onItemSelect: (itemId: number, selected: boolean) => void;
  onQuantityChange: (itemId: number, quantity: number) => void;
}

const MarketHeader = ({
  name,
  selected,
  onMarketSelect,
}: {
  name: string;
  selected: boolean;
  onMarketSelect: (selected: boolean) => void;
}) => (
  <div className="p-4 border-b border-beige-secondary border-opacity-80">
    <button
      type="button"
      onClick={() => onMarketSelect(!selected)}
      className="flex items-center gap-[10px]"
    >
      <CheckButton selected={selected} rounded />
      <span className="text-brown-primary font-semibold tracking-[-0.5px]">
        {name}
      </span>
    </button>
  </div>
);

const ItemsList = ({
  items,
  onItemSelect,
  onQuantityChange,
}: {
  items: MarketCart['items'];
  onItemSelect: (itemId: number, selected: boolean) => void;
  onQuantityChange: (itemId: number, quantity: number) => void;
}) => (
  <div className="divide-y divide-beige-secondary divide-opacity-80">
    {items.map((item) => (
      <CartItemCard
        key={item.id}
        item={item}
        onSelect={(selected) => onItemSelect(item.id, selected)}
        onQuantityChange={(quantity) => onQuantityChange(item.id, quantity)}
      />
    ))}
  </div>
);

const PriceSummary = ({
  totalPrice,
  deliveryCost,
}: {
  totalPrice: number;
  deliveryCost: number;
}) => {
  const finalPrice = totalPrice + deliveryCost;

  return (
    <div className="flex justify-center border-t border-beige-secondary border-opacity-80 py-[15px]">
      <div>
        <span className="text-[13px] text-brown-secondary font-medium">
          상품 {totalPrice.toLocaleString()}원 + 배송비{' '}
          {deliveryCost.toLocaleString()}원
        </span>
        <span className="text-[12px] text-brown-primary font-semibold">
          {' = '}
          {finalPrice.toLocaleString()}원
        </span>
      </div>
    </div>
  );
};

const MarketCartCard: React.FC<MarketCartCardProps> = ({
  market,
  onMarketSelect,
  onItemSelect,
  onQuantityChange,
}) => {
  const totalPrice = calculateMarketTotal(market);
  const deliveryCost = market.freeDeliveryLimit > totalPrice ? 2500 : 0;

  return (
    <div className="bg-background rounded-[10px] shadow-[0px_0px_10px_0px_rgba(156,108,79,0.15)]">
      <MarketHeader
        name={market.name}
        selected={market.selected}
        onMarketSelect={onMarketSelect}
      />
      <ItemsList
        items={market.items}
        onItemSelect={onItemSelect}
        onQuantityChange={onQuantityChange}
      />
      <PriceSummary totalPrice={totalPrice} deliveryCost={deliveryCost} />
    </div>
  );
};

export default MarketCartCard;
