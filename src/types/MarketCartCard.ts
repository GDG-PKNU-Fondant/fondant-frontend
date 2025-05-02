import { ProductDetail, ProductOption } from '@type/Product';

export interface CartItemOption extends ProductOption {
  quantity: number;
}

export interface CartItem
  extends Omit<
    ProductDetail,
    | 'marketId'
    | 'marketName'
    | 'description'
    | 'detailImageUrl'
    | 'thumbnailImages'
    | 'detailImages'
  > {
  selected: boolean;
  quantity: number;
  arrivalDate: Date;
  selectedOptions?: CartItemOption[];
}

export interface MarketCart {
  id: number;
  name: string;
  items: CartItem[];
  freeDeliveryLimit: number;
  selected: boolean;
}
