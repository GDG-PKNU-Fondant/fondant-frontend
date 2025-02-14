import { http } from 'msw';

export const mockSlides = [
  {
    id: 0,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1452968011964-24f8831c43c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 1,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1541781550486-81b7a2328578?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1581343659198-abab39bb36aa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1713274783669-631543642a61?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1566760375903-061dfd31c175?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const mockProducts = [
  {
    id: 0,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=2718&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    marketName: '세찬 베이커리',
    productName: '알록달록 마카롱',
    price: 18000,
    rate: 4.8,
    reviewer: 196,
  },
  {
    id: 1,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1618384836169-8471703f1eaf?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    marketName: '상윤이네 쿠키',
    productName: '바삭바삭 쿠키 (6개입)',
    price: 20000,
    rate: 4.9,
    reviewer: 214,
  },
  {
    id: 2,
    thumbnailUrl:
      'https://img.freepik.com/premium-photo/close-up-food-plate-table_1048944-17640647.jpg?w=900',
    marketName: '강지원 명인 한과',
    productName: '쫀득 수제 약과',
    price: 11900,
    rate: 4.8,
    reviewer: 59,
  },
  {
    id: 3,
    thumbnailUrl:
      'https://img.freepik.com/free-photo/delicious-candy-with-orange-background_23-2149722452.jpg?t=st=1738280652~exp=1738284252~hmac=b5de424639239a506bf2a7cda6d33560e098d6a8f3f0a8bb8cc723680c3d49e4&w=900',
    marketName: '지젤 (지훈이가 만든 젤리)',
    productName: '폭신폭신 젤리',
    price: 8900,
    discountPrice: 7900,
    rate: 4.7,
    reviewer: 43,
  },
];

export const mockMarkets = [
  {
    id: 0,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    marketName: '세찬 베이커리',
    rate: 4.9,
    reviewer: 196,
  },
  {
    id: 1,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1696189271615-4d484e3fe674?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    marketName: '상윤이네 쿠키',
    rate: 4.8,
    reviewer: 214,
  },
  {
    id: 2,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1647168587041-ee346e60ad43?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    marketName: '강지원 명인 한과',
    rate: 5.0,
    reviewer: 59,
  },
];

const handlers = [
  http.get('/api/carousel', () => {
    return new Response(JSON.stringify(mockSlides), { status: 200 });
  }),
];

export default handlers;
