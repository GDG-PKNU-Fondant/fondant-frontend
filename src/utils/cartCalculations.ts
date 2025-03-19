import { CartItem, MarketCart } from '@type/MarketCartCard';

export const calculateItemTotal = (item: CartItem): number => {
  return (
    item.selectedOptions?.reduce(
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
  return markets.reduce((sum, market) => {
    const totalPrice = calculateMarketTotal(market);
    const deliveryCost =
      totalPrice > 0 && market.freeDeliveryLimit > totalPrice ? 2500 : 0;

    return sum + totalPrice + deliveryCost;
  }, 0);
};
