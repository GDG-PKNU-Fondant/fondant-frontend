import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import PreviewCardProps from '@type/PreviewCard';

const fetchProductList = async (
  marketId: string,
  categoryId: string,
): Promise<PreviewCardProps[]> => {
  const response = await axios.get(`/api/product/${marketId}/${categoryId}`);
  return response.data;
};

const useProductListQuery = (
  marketId: string | undefined,
  categoryId: string,
  options?: { enabled?: boolean },
) => {
  return useQuery<PreviewCardProps[], AxiosError>({
    queryKey: ['products', marketId, categoryId],
    queryFn: () => fetchProductList(marketId!, categoryId),
    enabled: !!marketId && !!categoryId && (options?.enabled ?? true),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export default useProductListQuery;
