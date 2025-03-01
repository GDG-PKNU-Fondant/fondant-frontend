import { ProductItem } from '@mocks/constants/mockProductItems';
import useFilteredProducts from './useFilteredProduct';

const useProductCount = (products: ProductItem[]) => {
  const filteredProducts = useFilteredProducts(products);
  return filteredProducts.length;
};

export default useProductCount;
