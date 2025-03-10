import { ProductItem } from '@mocks/constants/mockProductItems';
import useFilteredProducts from '@hooks/useFilteredProduct';

interface ProductCountProps {
  products: ProductItem[];
  filters: Record<string, string[]>;
}

const useProductCount = ({ products, filters }: ProductCountProps) => {
  const filteredProducts = useFilteredProducts({ products, filters });
  return filteredProducts.length;
};

export default useProductCount;
