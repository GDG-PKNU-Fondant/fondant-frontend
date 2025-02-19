import Product, { ProductOption } from '@type/Product';

export interface CartItemOption extends ProductOption {
  quantity: number;
}

export interface CartItem
  extends Omit<
    Product,
    'marketId' | 'marketName' | 'description' | 'detailImageUrl'
  > {
  selected: boolean;
  quantity: number;
  arrivalDate: Date;
  additionalOptions?: CartItemOption[];
}

export interface MarketCart {
  id: number;
  name: string;
  items: CartItem[];
  freeDeliveryLimit: number;
  selected: boolean;
}
