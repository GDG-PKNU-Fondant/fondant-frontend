import MOCK_DELIVERY_ADDRESS from '@mocks/constants/mockDeliveryAddress';
import MOCK_ORDER_PRODUCTS from '@mocks/constants/mockOrderProducts';

const deliveryCost = 3000;

const MOCK_ORDER_RESPONSE = {
  orderId: '000001010100010',
  deliveryAddress: MOCK_DELIVERY_ADDRESS,
  orderProducts: MOCK_ORDER_PRODUCTS,
  deliveryCost,
  totalAmount: MOCK_ORDER_PRODUCTS.reduce((sum, item) => sum + item.price, 0) + deliveryCost,
  paymentMethod: '토스페이',
};

export default MOCK_ORDER_RESPONSE;
