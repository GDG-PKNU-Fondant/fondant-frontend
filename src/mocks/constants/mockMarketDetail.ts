import { MarketDetail } from '@type/Market';

interface MockMarketDetail {
  [key: number]: MarketDetail;
}

const MOCK_MARKET_DETAIL: MockMarketDetail = {
  1: {
    id: 1,
    name: '상윤이네 쿠키',
    description: '매일 직접 굽는 쿠키',
    thumbnailUrl: '',
    backgroundUrl: '',
    likeCount: 0,
    isTop10: false,
    hashtags: ['기념일맞춤', '수제간식'],
    subCategoryIds: [1, 2, 3],
    profile: {
      businessNumber: '051-123-4567',
      address: '',
      latitude: 0,
      longitude: 0,
    },
  },
};

export default MOCK_MARKET_DETAIL;
