import { MarketDetail } from '@type/Market';

interface MockMarketDetail {
  [key: number]: MarketDetail;
}

const MOCK_MARKET_DETAIL: MockMarketDetail = {
  1: {
    id: 1,
    name: '상윤이네 쿠키',
    description: '매일 직접 굽는 쿠키',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1618384836169-8471703f1eaf?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    backgroundUrl:
      'https://images.unsplash.com/photo-1598839949597-ea940df50596?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likeCount: 0,
    isTop10: true,
    hashtags: ['기념일맞춤', '수제간식'],
    subCategoryIds: [2, 12, 6, 24, 28, 32, 26],
    profile: {
      businessNumber: '051-123-4567',
      address: '부산광역시 남구 용소로 45',
      latitude: 35.134080249513474,
      longitude: 129.10317348438963,
    },
  },
};

export default MOCK_MARKET_DETAIL;
