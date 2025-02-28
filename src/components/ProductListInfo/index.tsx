import { useState } from 'react';
import SortSheet from '@components/BottomSheet/SortSheet';
import FilterSheet from '@components/BottomSheet/FilterSheet';
import { useAtom } from 'jotai';
import {
  selectedFiltersAtom,
  sortOptionAtom,
} from '@stores/selectedSortFilter';
import FilterIcon from '@assets/icons/filter.svg?react';
import ArrowDownIcon from '@assets/icons/arrow-down.svg?react';
import SelectedFilterTags from '@components/ProductListInfo/SelectedFilterTags';

interface ProductListInfoProps {
  totalCount: number;
}

const ProductListInfo = ({ totalCount }: ProductListInfoProps) => {
  const [sortOption, setSortOption] = useAtom(sortOptionAtom);
  const [selectedFilters, setSelectedFilters] = useAtom(selectedFiltersAtom);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="w-full flex-col items-start justify-center">
      <div className="flex justify-between items-center text-brown-secondary px-4 py-2 text-sm">
        <span>총 {totalCount}개</span>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSortOpen(true)}
            className="flex items-center"
          >
            {sortOption}
            <ArrowDownIcon className="w-3 h-3 fill-brown-secondary mx-1" />
          </button>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center"
          >
            필터
            <FilterIcon className="w-4 h-4 stroke-none mx-1" />
          </button>
        </div>
      </div>

      <SelectedFilterTags
        selectedFilters={selectedFilters}
        onRemove={(filter) =>
          setSelectedFilters((prev) => prev.filter((f) => f !== filter))
        }
      />

      <SortSheet
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        onSelect={setSortOption}
        selectedOption={sortOption}
      />
      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedFilters={selectedFilters}
        onSelect={(filters) => setSelectedFilters(filters)}
      />
    </div>
  );
};

export default ProductListInfo;
