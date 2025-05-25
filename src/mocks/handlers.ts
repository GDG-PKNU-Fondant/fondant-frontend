import { http } from 'msw';
import MOCK_PRODUCT_OPTION from '@mocks/constants/mockProductOption';
import MOCK_MARKET_PRODUCT_LIST from '@mocks/constants/mockMarketProductList';

const handlers = [
  http.get('/api/products/:productId/options', (req) => {
    const { productId } = req.params;

    const id = parseInt(productId as string, 10);

    const options = MOCK_PRODUCT_OPTION[id];

    if (!options) {
      return new Response(
        JSON.stringify({
          message: '해당 상품 ID에 대한 옵션을 찾을 수 없습니다.',
        }),
        { status: 404 },
      );
    }

    return new Response(JSON.stringify({ availableOptions: options }), {
      status: 200,
    });
  }),

  http.get('/api/product/:marketId', ({ params }) => {
    const { marketId } = params;
    const parsedMarketId = parseInt(marketId as string, 10);

    const market = MOCK_MARKET_PRODUCT_LIST.find(
      (m) => m.marketId === parsedMarketId,
    );

    if (!market) {
      return new Response(
        JSON.stringify({ message: '해당 마켓의 상품을 찾을 수 없습니다.' }),
        { status: 404 },
      );
    }

    return new Response(JSON.stringify(market.products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
];

export default handlers;
