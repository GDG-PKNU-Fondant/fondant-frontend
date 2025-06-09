import PortOne from '@portone/browser-sdk/v2';
import { PayMethod, RequestPaymentParams } from '@type/Payment';

const requestPayment = async ({
  method,
  otherMethod,
  products,
  deliveryCost = 0,
  email,
  fullName,
  phoneNumber,
}: RequestPaymentParams) => {
  const orderName =
    products.length === 1
      ? products[0].productName
      : `${products[0].productName} 외 ${products.length - 1}개`;

  const totalAmount =
    products.reduce((sum, item) => sum + item.price, 0) + deliveryCost;

  const CHANNEL_KEY_MAP: Record<string, string> = {
    toss: import.meta.env.VITE_PORTONE_CHANNELKEY_TOSS,
    kakao: import.meta.env.VITE_PORTONE_CHANNELKEY_KAKAO,
    account: import.meta.env.VITE_PORTONE_CHANNELKEY_INICIS,
    mobile: import.meta.env.VITE_PORTONE_CHANNELKEY_INICIS,
    card: import.meta.env.VITE_PORTONE_CHANNELKEY_INICIS,
    bank: import.meta.env.VITE_PORTONE_CHANNELKEY_INICIS,
  };

  const payMethodKey = method === 'other' ? otherMethod : method;
  const channelKey = CHANNEL_KEY_MAP[payMethodKey];

  const PAY_METHOD_MAP: Record<string, PayMethod> = {
    toss: 'EASY_PAY',
    kakao: 'EASY_PAY',
    account: 'TRANSFER',
    mobile: 'MOBILE',
    card: 'CARD',
    bank: 'VIRTUAL_ACCOUNT',
  };

  const methodKey = method === 'other' ? otherMethod : method;
  const mappedMethod = PAY_METHOD_MAP[methodKey];

  const customer =
    ['account', 'card', 'mobile', 'bank'].includes(methodKey) &&
    email &&
    phoneNumber &&
    fullName
      ? {
          fullName,
          email,
          phoneNumber,
        }
      : undefined;

  const productType = methodKey === 'mobile' ? 'PRODUCT_TYPE_REAL' : undefined;

  return PortOne.requestPayment({
    storeId: import.meta.env.VITE_PORTONE_STORE_ID,
    channelKey,
    paymentId: crypto.randomUUID(),
    orderName,
    totalAmount,
    currency: 'CURRENCY_KRW',
    payMethod: mappedMethod,
    ...(customer && { customer }),
    ...(productType && { productType }),
    customData: {
      productIds: products.map((p) => p.id),
    },
  });
};

export default requestPayment;
