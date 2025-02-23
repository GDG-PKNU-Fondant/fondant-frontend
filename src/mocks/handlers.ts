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

const handlers = [
  http.get('/api/carousel', () => {
    return new Response(JSON.stringify(mockSlides), { status: 200 });
  }),
];

export default handlers;
