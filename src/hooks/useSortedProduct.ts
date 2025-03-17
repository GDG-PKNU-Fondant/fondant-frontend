import { ProductItem } from '@mocks/constants/mockProductItems';
import { sortOptionAtom } from '@stores/selectedSortFilter';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

const useSortedProducts = (Items: ProductItem[]) => {
  const [sortOption] = useAtom(sortOptionAtom);

  const sortedProducts = useMemo(() => {
    if (!Items || Items.length === 0) return [];

    return [...Items].sort((a, b) => {
      switch (sortOption) {
        case '할인순': {
          const discountRateA = a.discountPrice
            ? (a.price - a.discountPrice) / a.price
            : 0;
          const discountRateB = b.discountPrice
            ? (b.price - b.discountPrice) / b.price
            : 0;
          return discountRateB - discountRateA;
        }
        case '리뷰 많은 순':
          return b.reviewer - a.reviewer;
        case '판매량순':
          return b.sales - a.sales;
        case '낮은 가격순':
          return (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price);
        case '높은 가격순':
          return (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price);
        default:
          return 0;
      }
    });
  }, [Items, sortOption]);

  return sortedProducts;
};

export default useSortedProducts;
