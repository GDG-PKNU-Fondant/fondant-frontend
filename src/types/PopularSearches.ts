export interface SearchItem {
  rank: number;
  keyword: string;
  trend?: string;
}

export interface PopularSearchesProps {
  searches: SearchItem[];
}
