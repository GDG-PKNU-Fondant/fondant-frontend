import type { Meta, StoryObj } from '@storybook/react';
import { Provider, useAtom } from 'jotai';
import ProductListInfo from '@components/ProductListInfo';
import {
  sortOptionAtom,
  selectedFiltersAtom,
} from '@stores/selectedSortFilter';
import MOCK_PRODUCT_ITEMS from '@mocks/constants/mockProductItems';
import useFilteredProducts from '@hooks/useFilteredProduct';
import useSortedProducts from '@hooks/useSortedProduct';
import '@styles/tailwind.css';

const JotaiProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

const ProductListInfoWithProducts = () => {
  const [sortOption] = useAtom(sortOptionAtom);
  const [selectedFilters] = useAtom(selectedFiltersAtom);

  const filteredProducts = useFilteredProducts({
    products: MOCK_PRODUCT_ITEMS,
    filters: selectedFilters,
  });
  const sortedProducts = useSortedProducts(filteredProducts);

  return (
    <div className="w-full">
      <ProductListInfo products={MOCK_PRODUCT_ITEMS} />

      <div className="mt-4 p-4 border rounded-md">
        <h3 className="text-lg font-bold">상품 목록 ({sortOption})</h3>
        <div className="text-sm text-gray-500">
          현재 필터:{' '}
          {Object.entries(selectedFilters)
            .flatMap(([category, filters]) =>
              filters.map((f) => `${category}: ${f}`),
            )
            .join(', ') || '없음'}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {sortedProducts.map((product) => (
            <div
              key={product.productName}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <h4 className="font-bold text-lg">{product.productName}</h4>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm text-gray-600">브랜드: {product.brand}</p>
              <p className="text-sm">
                가격:{' '}
                <span className="text-red-500 font-bold">
                  {product.discountPrice ?? product.price}원
                </span>{' '}
                {product.discountPrice && (
                  <span className="line-through text-gray-500 ml-2">
                    {product.price}원
                  </span>
                )}
              </p>
              <p className="text-sm">
                {product.rate} ({product.reviewer}개 리뷰)
              </p>
              <p className="text-sm">판매량: {product.sales}개</p>
              <p className="text-sm">배송: {product.shipping}</p>
              <p className="text-sm">포장: {product.packaging}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.benefit.map((b) => (
                  <span
                    key={b}
                    className="px-2 py-1 text-xs bg-pink-200 rounded-md"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof ProductListInfo> = {
  title: 'Components/ProductListInfo',
  component: ProductListInfo,
  decorators: [
    (Story) => (
      <JotaiProviderWrapper>
        <Story />
      </JotaiProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    products: {
      description: '상품 리스트를 Props으로 받게 만들었으나 이후 리팩토링 예정',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '상품 리스트 상단에서 정렬, 필터링 옵션을 선택할 수 있는 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductListInfo>;

export const Default: Story = {
  render: () => {
    return <ProductListInfo products={MOCK_PRODUCT_ITEMS} />;
  },
};

export const ProductListInfoWithItems: Story = {
  render: () => {
    return <ProductListInfoWithProducts />;
  },
};
