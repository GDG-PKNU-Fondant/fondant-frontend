import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import apiClient from '@apis/apiClient';
import { rawCategoriesAtom } from '@stores/categoryState';
import { Category } from '@type/Category';

const fetchCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get('/api/category/all');
  return response.data.content.categories;
};

const useCategoryQuery = () => {
  const setRawCategories = useSetAtom(rawCategoriesAtom);

  const query = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.data) {
      setRawCategories(query.data);
    }
  }, [query.data, setRawCategories]);

  return query;
};

export default useCategoryQuery;
