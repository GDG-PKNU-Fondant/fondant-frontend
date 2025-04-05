import { http } from 'msw';
import MOCK_PRODUCT_DETAILS from '@mocks/constants/mockProductDetails';
import MOCK_REVIEWS from '@mocks/constants/mockReviews';

const handlers = [
  http.get('/api/products/:productId', ({ params }) => {
    const { productId } = params;
    const product = MOCK_PRODUCT_DETAILS.find(
      (p) => p.id === parseInt(productId as string, 10),
    );

    if (!product) {
      return new Response(
        JSON.stringify({ message: '해당 상품을 찾을 수 없습니다.' }),
        {
          status: 404,
        },
      );
    }

    return new Response(JSON.stringify(product), { status: 200 });
  }),
  http.get('/api/products/:productId/reviews', ({ params }) => {
    const { productId } = params;
    const productReviewsData = MOCK_REVIEWS[parseInt(productId as string, 10)];

    if (!productReviewsData) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    return new Response(JSON.stringify(productReviewsData.reviews), {
      status: 200,
    });
  }),
];

export default handlers;
