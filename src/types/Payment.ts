export type PayMethod =
  | 'CARD'
  | 'VIRTUAL_ACCOUNT'
  | 'TRANSFER'
  | 'MOBILE'
  | 'GIFT_CERTIFICATE'
  | 'EASY_PAY'
  | 'PAYPAL'
  | 'ALIPAY'
  | 'CONVENIENCE_STORE';

export interface OrderProduct {
  id: number;
  productName: string;
  price: number;
}

export interface RequestPaymentParams {
  method: string;
  otherMethod: string;
  products: OrderProduct[];
  deliveryCost?: number;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
}
