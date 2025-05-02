import { http } from 'msw';
import MOCK_PRODUCT_OPTION from '@mocks/constants/mockProductOption';

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
];

export default handlers;
