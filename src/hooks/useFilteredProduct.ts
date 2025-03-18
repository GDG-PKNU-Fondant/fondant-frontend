import { useMemo } from 'react';
import { ProductItem } from '@mocks/constants/mockProductItems';

interface FilteredProductsProps {
  products: ProductItem[];
  filters: Record<string, string[]>;
}

const useFilteredProducts = ({ products, filters }: FilteredProductsProps) => {
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    return products.filter((product) => {
      if (
        filters.category &&
        filters.category.length > 0 &&
        !filters.category.includes(product.category)
      ) {
        return false;
      }
      if (
        filters.shipping &&
        filters.shipping.length > 0 &&
        !filters.shipping.includes(product.shipping)
      ) {
        return false;
      }
      if (
        filters.packaging &&
        filters.packaging.length > 0 &&
        !filters.packaging.includes(product.packaging)
      ) {
        return false;
      }

      if (
        filters.brand &&
        filters.brand.length > 0 &&
        !filters.brand.includes(product.brand)
      ) {
        return false;
      }

      if (
        filters.benefit &&
        filters.benefit.length > 0 &&
        !filters.benefit.some((benefit) => product.benefit.includes(benefit))
      ) {
        return false;
      }

      if (filters.price && filters.price.length > 0) {
        const productPrice = product.discountPrice ?? product.price;
        const priceFilters = filters.price;

        const isPriceMatch = priceFilters.some((filter) => {
          return (
            (filter === '~3000원' && productPrice <= 3000) ||
            (filter === '~5000원' && productPrice <= 5000) ||
            (filter === '1만원 이하' && productPrice <= 10000) ||
            (filter === '3만원 이하' && productPrice <= 30000) ||
            (filter === '3만원 이상' && productPrice > 30000)
          );
        });

        if (!isPriceMatch) return false;
      }

      return true;
    });
  }, [products, filters]);

  return filteredProducts;
};

export default useFilteredProducts;
