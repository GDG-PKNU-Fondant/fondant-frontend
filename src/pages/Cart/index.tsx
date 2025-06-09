import React, { useState, useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { MarketCart, CartItemOption } from '@type/MarketCartCard';
import PageHeader from '@components/PageHeader';
import MarketCartCard from '@pages/Cart/components/MarketCartCard';
import Button from '@components/Button';
import CheckButton from '@components/CheckButton';
import MOCK_CART from '@mocks/constants/mockCart';
import { calculateCartTotal } from '@utils/cartCalculations';
import { bottomTabVisibilityAtom } from '@stores/layoutState';

const Cart: React.FC = () => {
  const setBottomTabVisibility = useSetAtom(bottomTabVisibilityAtom);
  const [markets, setMarkets] = useState<MarketCart[]>(MOCK_CART.markets);

  const isAllSelected = markets.every((market) => market.selected);
  const hasAnyItems = markets.some((market) => market.items.length > 0);

  useEffect(() => {
    setBottomTabVisibility(false);
    return () => setBottomTabVisibility(true);
  }, [setBottomTabVisibility]);

  const handleSelectAll = () => {
    const newSelectState = !isAllSelected;
    setMarkets((prevMarkets) =>
      prevMarkets.map((market) => ({
        ...market,
        selected: newSelectState,
        items: market.items.map((item) => ({
          ...item,
          selected: newSelectState,
        })),
      })),
    );
  };

  const handleMarketSelect = (marketId: number, selected: boolean) => {
    setMarkets((prevMarkets) =>
      prevMarkets.map((market) =>
        market.id === marketId
          ? {
              ...market,
              selected,
              items: market.items.map((item) => ({ ...item, selected })),
            }
          : market,
      ),
    );
  };

  const handleItemSelect = (
    marketId: number,
    itemId: number,
    selected: boolean,
  ) => {
    setMarkets((prevMarkets) =>
      prevMarkets.map((market) =>
        market.id === marketId
          ? {
              ...market,
              selected:
                selected &&
                market.items.every((item) =>
                  item.id === itemId ? selected : item.selected,
                ),
              items: market.items.map((item) =>
                item.id === itemId ? { ...item, selected } : item,
              ),
            }
          : market,
      ),
    );
  };

  const handleQuantityChange = (
    marketId: number,
    itemId: number,
    quantity: number,
  ) => {
    setMarkets((prevMarkets) =>
      prevMarkets.map((market) =>
        market.id === marketId
          ? {
              ...market,
              items: market.items.map((item) =>
                item.id === itemId ? { ...item, quantity } : item,
              ),
            }
          : market,
      ),
    );
  };

  const handleOptionChange = (
    marketId: number,
    itemId: number,
    options: CartItemOption[],
  ) => {
    setMarkets((prevMarkets) =>
      prevMarkets.map((market) =>
        market.id === marketId
          ? {
              ...market,
              items: market.items.map((item) =>
                item.id === itemId
                  ? { ...item, selectedOptions: options }
                  : item,
              ),
            }
          : market,
      ),
    );
  };

  const selectedMarkets = markets
    .map((market) => ({
      ...market,
      items: market.items.filter((item) => item.selected),
    }))
    .filter((market) => market.items.length > 0);

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (selectedMarkets.length === 0) return;

    navigate('/orderpayment', {
      state: {
        markets: selectedMarkets,
      },
    });
  };

  const hasSelectedItems = markets.some(
    (market) => market.selected || market.items.some((item) => item.selected),
  );

  const totalItemsCount = markets.reduce(
    (total, market) => total + market.items.length,
    0,
  );

  const selectedItemsCount = markets.reduce(
    (total, market) =>
      total + market.items.filter((item) => item.selected).length,
    0,
  );

  return (
    <div className="min-h-dvh bg-[#FDF4ED] flex flex-col">
      <PageHeader title="장바구니" />
      <div className="sticky top-[60px] left-0 right-0 w-full">
        <div className="flex items-center bg-background border-t border-beige-tertiary px-[18px] py-[10px]">
          <CheckButton
            selected={hasAnyItems && isAllSelected}
            onClick={handleSelectAll}
            rounded
          />
          <span className="text-brown-primary text-[14px] tracking-[-0.5px] leading-none ml-[8px]">
            전체선택
          </span>
          <span className="text-brown-secondary text-[13px] tracking-[-0.5px] leading-none ml-[3px]">
            {`(${selectedItemsCount}/${totalItemsCount})`}
          </span>
        </div>
      </div>
      <div className="flex flex-col px-[12px] py-[20px] gap-[12px] flex-grow">
        {markets.map((market) => (
          <MarketCartCard
            key={market.id}
            market={market}
            onMarketSelect={(selected) =>
              handleMarketSelect(market.id, selected)
            }
            onItemSelect={(itemId, selected) =>
              handleItemSelect(market.id, itemId, selected)
            }
            onQuantityChange={(itemId, quantity) =>
              handleQuantityChange(market.id, itemId, quantity)
            }
            onOptionChange={(itemId, options) =>
              handleOptionChange(market.id, itemId, options)
            }
          />
        ))}
      </div>
      <div className="sticky bottom-0 bg-background rounded-t-[10px] p-[15px] shadow-[0px_-4px_10px_0px_rgba(156,108,79,0.10)]">
        <Button
          variant="submit"
          disabled={!hasSelectedItems}
          onClick={handleCheckout}
        >
          {calculateCartTotal(markets).toLocaleString()}원 구매하기
        </Button>
      </div>
    </div>
  );
};

export default Cart;
