import { http } from 'msw';
import MOCK_CAROUSEL_SLIDES from '@mocks/constants/mockCarouselSlides';
import MOCK_ORDER_RESPONSE from '@mocks/constants/mockOrderResponse';

const handlers = [
  http.get('/api/carousel', () => {
    return new Response(JSON.stringify(MOCK_CAROUSEL_SLIDES), { status: 200 });
  }),
  http.post('/api/orders', () => {
    return new Response(JSON.stringify(MOCK_ORDER_RESPONSE), { status: 200 });
  }),
];

export default handlers;
