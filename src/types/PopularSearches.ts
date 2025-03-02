export interface SearchItem {
  rank: number;
  keyword: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface PopularSearchesProps {
  searches: SearchItem[];
}