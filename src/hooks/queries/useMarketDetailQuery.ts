import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { MarketDetail } from '@type/Market';

const fetchMarketDetail = async (marketId: string): Promise<MarketDetail> => {
  const response = await axios.get(`/api/markets/${marketId}`);
  return response.data;
};

const useMarketDetailQuery = (marketId: string | undefined) => {
  return useQuery<MarketDetail, AxiosError>({
    queryKey: ['market', marketId],
    queryFn: () => fetchMarketDetail(marketId!),
    enabled: !!marketId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export default useMarketDetailQuery;
