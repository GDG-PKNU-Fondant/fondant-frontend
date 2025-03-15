import { useAtom } from 'jotai';
import {
  selectedFiltersAtom,
  sortOptionAtom,
} from '@stores/selectedSortFilter';
import FilterIcon from '@assets/icons/filter.svg?react';
import ArrowDownIcon from '@assets/icons/arrow-down.svg?react';
import SelectedFilterTags from '@components/ProductListInfo/SelectedFilterTags';
import { ProductItem } from '@mocks/constants/mockProductItems';
import useProductCount from '@hooks/useProductCount';
import useModal from '@hooks/useModal';
import SortSheetContent from '@components/BottomSheet/SortSheetContent';
import BottomSheet from '@components/BottomSheet';
import FilterSheetContent from '@components/BottomSheet/FilterSheetContent';

interface ProductListInfoProps {
  products: ProductItem[];
}

const ProductListInfo = ({ products }: ProductListInfoProps) => {
  const [sortOption, setSortOption] = useAtom(sortOptionAtom);
  const [selectedFilters, setSelectedFilters] = useAtom(selectedFiltersAtom);

  const { openModal, closeModal } = useModal();

  const productCount = useProductCount({ products, filters: selectedFilters });

  return (
    <div className="w-full flex-col items-start justify-center">
      <div className="flex justify-between items-center text-brown-secondary px-4 py-2 text-sm">
        <span>총 {productCount}개</span>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => openModal('sort-sheet')}
            className="flex items-center"
          >
            {sortOption}
            <ArrowDownIcon className="w-3 h-3 fill-brown-secondary mx-1" />
          </button>
          <button
            type="button"
            onClick={() => openModal('filter-sheet')}
            className="flex items-center"
          >
            필터
            <FilterIcon className="w-4 h-4 stroke-none mx-1" />
          </button>
        </div>
      </div>

      <SelectedFilterTags
        data-testid="product-list-selected-tags"
        selectedFilters={selectedFilters}
        onRemove={(category, filter) => {
          setSelectedFilters((prev) => {
            const updatedFilters = { ...prev };

            updatedFilters[category] = updatedFilters[category].filter(
              (item) => item !== filter,
            );

            if (updatedFilters[category].length === 0) {
              delete updatedFilters[category];
            }

            return { ...updatedFilters };
          });
        }}
      />
      <BottomSheet sheetKey="sort-sheet">
        <SortSheetContent
          onSelect={setSortOption}
          selectedOption={sortOption}
        />
      </BottomSheet>
      <BottomSheet sheetKey="filter-sheet">
        <FilterSheetContent
          selectedFilters={selectedFilters}
          onSelect={(filters) => setSelectedFilters(filters)}
          products={products}
          onClose={() => closeModal('filter-sheet')}
        />
      </BottomSheet>
    </div>
  );
};

export default ProductListInfo;
