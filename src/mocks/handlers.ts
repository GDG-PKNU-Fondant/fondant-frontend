import { http } from 'msw';
import MOCK_CAROUSEL_SLIDES from '@mocks/constants/mockCarouselSlides';

const handlers = [
  http.get('/api/carousel', () => {
    return new Response(JSON.stringify(MOCK_CAROUSEL_SLIDES), { status: 200 });
  }),
];

export default handlers;
