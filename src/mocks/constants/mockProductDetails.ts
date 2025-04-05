import { ProductDetail } from '@type/Product';

const MOCK_PRODUCT_DETAILS: ProductDetail[] = [
  {
    id: 1,
    name: '바삭바삭 쿠키 (6개입)',
    marketId: 1,
    marketName: '상윤이네 쿠키',
    thumbnailUrl: 'https://via.placeholder.com/400x300?text=Product+2+Image+1',
    rating: 4.9,
    reviewer: 214,
    basePrice: 20000,
    freeDeliveryLimit: 30000,
    description: '',
    thumbnailImages: [
      {
        id: 0,
        imageUrl:
          'https://images.unsplash.com/photo-1618384836169-8471703f1eaf?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 1,
        imageUrl:
          'https://images.unsplash.com/photo-1598839950984-034f6dc7b495?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 2,
        imageUrl:
          'https://images.unsplash.com/photo-1609501886186-d4de01248beb?q=80&w=2536&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    detailImages: [
      {
        id: 0,
        imageUrl:
          'https://images.unsplash.com/photo-1622467827417-bbe2237067a9?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 1,
        imageUrl:
          'https://images.unsplash.com/photo-1608070734668-e74dc3dda037?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
];

export default MOCK_PRODUCT_DETAILS;
