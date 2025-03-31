export interface DeliveryAddress {
  addressAlias: string;
  name: string;
  phone: string;
  address: string;
  detailAddress: string;
  postalCode: string;
}

export interface OrderProduct {
  name: string;
  price: number;
}

export interface OrderResponseType {
  orderId: string;
  deliveryAddress: DeliveryAddress;
  orderProducts: OrderProduct[];
  deliveryCost: number;
  totalAmount: number;
  paymentMethod: string;
}
