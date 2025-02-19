import { CartItem, MarketCart } from '@type/MarketCartCard';

export const calculateItemTotal = (item: CartItem): number => {
  return (
    item.additionalOptions?.reduce(
      (sum, opt) =>
        sum +
        (item.basePrice + opt.additionalPrice) * opt.quantity * item.quantity,
      0,
    ) || item.basePrice * item.quantity
  );
};

export const calculateMarketTotal = (market: MarketCart): number => {
  return market.items.reduce((sum, item) => {
    if (!item.selected) return sum;
    return sum + calculateItemTotal(item);
  }, 0);
};

export const calculateCartTotal = (markets: MarketCart[]): number => {
  return markets.reduce((sum, market) => sum + calculateMarketTotal(market), 0);
};
