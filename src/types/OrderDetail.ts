export interface OrderItemOption {
  id: number;
  name: string;
  additionalPrice: number;
}

export interface OrderItemProps {
  id: number;
  storeName: string;
  productName: string;
  arrivalDate?: Date;
  thumbnailUrl: string;
  deliveryCost: number;
  additionalOptions: OrderItemOption[];
  price: number;
}

export interface OrderDetailProps {
  orderId: string;
  orderedDate: Date;
  orderedItems: OrderItemProps[];
}
