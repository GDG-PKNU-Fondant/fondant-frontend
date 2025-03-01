import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { selectedFiltersAtom } from '@stores/selectedSortFilter';
import { ProductItem } from '@mocks/constants/mockProductItems';

const useFilteredProducts = (products: ProductItem[]) => {
  const [selectedFilters] = useAtom(selectedFiltersAtom);

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    return products.filter((product) => {
      if (
        selectedFilters.category &&
        selectedFilters.category.length > 0 &&
        !selectedFilters.category.includes(product.category)
      ) {
        return false;
      }
      if (
        selectedFilters.shipping &&
        selectedFilters.shipping.length > 0 &&
        !selectedFilters.shipping.includes(product.shipping)
      ) {
        return false;
      }
      if (
        selectedFilters.packaging &&
        selectedFilters.packaging.length > 0 &&
        !selectedFilters.packaging.includes(product.packaging)
      ) {
        return false;
      }

      if (
        selectedFilters.brand &&
        selectedFilters.brand.length > 0 &&
        !selectedFilters.brand.includes(product.brand)
      ) {
        return false;
      }

      if (
        selectedFilters.benefit &&
        selectedFilters.benefit.length > 0 &&
        !selectedFilters.benefit.some((benefit) =>
          product.benefit.includes(benefit),
        )
      ) {
        return false;
      }

      if (selectedFilters.price && selectedFilters.price.length > 0) {
        const productPrice = product.discountPrice ?? product.price;
        const priceFilters = selectedFilters.price;

        let isPriceMatch = false;

        for (const filter of priceFilters) {
          if (filter === '~3000원' && productPrice <= 3000) isPriceMatch = true;
          if (filter === '~5000원' && productPrice <= 5000) isPriceMatch = true;
          if (filter === '1만원 이하' && productPrice <= 10000)
            isPriceMatch = true;
          if (filter === '3만원 이하' && productPrice <= 30000)
            isPriceMatch = true;
          if (filter === '3만원 이상' && productPrice > 30000)
            isPriceMatch = true;
        }

        if (!isPriceMatch) return false;
      }

      return true;
    });
  }, [products, selectedFilters]);

  return filteredProducts;
};

export default useFilteredProducts;
