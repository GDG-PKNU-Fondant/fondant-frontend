import { http } from 'msw';

export const mockSlides = [
  {
    id: 0,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1452968011964-24f8831c43c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    redirectUrl: '',
  },
  {
    id: 1,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1541781550486-81b7a2328578?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    redirectUrl: '',
  },
  {
    id: 2,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1581343659198-abab39bb36aa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    redirectUrl: '',
  },
  {
    id: 3,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1713274783669-631543642a61?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    redirectUrl: '',
  },
  {
    id: 4,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1566760375903-061dfd31c175?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    redirectUrl: '',
  },
];

export const mockDynamicCategories = [
  {
    id: 1,
    categoryName: '퐁당 PICK',
    iconUrl:
      'https://images.unsplash.com/photo-1629478899173-601eba237d6f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    primary: true,
  },
  {
    id: 2,
    categoryName: 'SNS 인기',
    iconUrl:
      'https://images.unsplash.com/photo-1674038136010-1071072bcddf?q=80&w=1898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    primary: false,
  },
  {
    id: 3,
    categoryName: '어르신 취향',
    iconUrl:
      'https://images.unsplash.com/photo-1559837957-bab8edc53c85?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    primary: false,
  },
  {
    id: 4,
    categoryName: '캘린더',
    iconUrl:
      'https://images.unsplash.com/photo-1674069686288-071c6e4ef838?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    primary: false,
  },
  {
    id: 5,
    categoryName: '매거진',
    iconUrl:
      'https://images.unsplash.com/photo-1675284737540-4c88488a58b7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    primary: false,
  },
];

const handlers = [
  http.get('/api/carousel', () => {
    return new Response(JSON.stringify(mockSlides), { status: 200 });
  }),

  http.get('/api/categories', () => {
    return new Response(JSON.stringify(mockDynamicCategories), { status: 200 });
  }),
];

export default handlers;
