export interface Market {
  id: number;
  name: string;
  thumbnailUrl: string;
}

export interface MarketDetail extends Market {
  description: string;
  backgroundUrl: string;
  likeCount: number;
  isTop10: boolean;
  hashtags: string[];
  subCategoryIds: number[];
  profile: {
    businessNumber: string;
    address: string;
    latitude: number;
    longitude: number;
  };
}
