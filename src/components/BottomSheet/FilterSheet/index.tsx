import { useEffect, useState } from 'react';
import BottomSheet from '@components/BottomSheet';
import TabNavigator from '@components/TabNavigator';
import MOCK_TABS from '@mocks/constants/mockTabs';
import MOCK_FILTERS from '@mocks/constants/mockFilters';
import ReloadIcon from '@assets/icons/reload.svg?react';
import CheckButton from '@components/CheckButton';
import SelectedFilterTags from '@components/ProductListInfo/SelectedFilterTags';
import useProductCount from '@hooks/useProductCount';
import { ProductItem } from '@mocks/constants/mockProductItems';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: Record<string, string[]>;
  onSelect: (filters: Record<string, string[]>) => void;
  products: ProductItem[];
}

const FilterSheet = ({
  isOpen,
  onClose,
  selectedFilters,
  onSelect,
  products,
}: FilterSheetProps) => {
  const [activeTab, setActiveTab] = useState(MOCK_TABS[0].key);
  const [selected, setSelected] =
    useState<Record<string, string[]>>(selectedFilters);

  useEffect(() => {
    if (isOpen) {
      setSelected(selectedFilters);
      setActiveTab(MOCK_TABS[0].key);
    }
  }, [isOpen]);

  const handleFilterSelect = (category: string, filter: string) => {
    setSelected((prev) => {
      const currentFilters = prev[category] || [];
      return {
        ...prev,
        [category]: currentFilters.includes(filter)
          ? currentFilters.filter((item) => item !== filter)
          : [...currentFilters, filter],
      };
    });
  };

  const handleResetFilters = () => {
    setSelected({});
  };

  const handleApplyFilters = () => {
    onSelect(selected);
    onClose();
  };

  const productCount = useProductCount({ products, filters: selected });

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="p-4 h-[65vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-brown-primary text-lg font-bold">필터</h2>
        </div>
        <TabNavigator
          tabs={MOCK_TABS}
          defaultColor="text-brown-tertiary"
          selectedColor="text-pink"
          fixedTextSize={16}
          onTabChange={(tab) => setActiveTab(tab)}
        />

        <div className="flex-grow overflow-y-auto mt-3 relative">
          <ul className="space-y-3 text-[14px]">
            {MOCK_FILTERS[activeTab]?.map((filter) => (
              <li
                key={filter.value}
                className="flex items-center justify-start gap-3 py-1.5 px-3 rounded-lg cursor-pointer"
              >
                <button
                  type="button"
                  onClick={() => handleFilterSelect(activeTab, filter.value)}
                  className="flex items-center gap-3 w-full text-left"
                >
                  <CheckButton
                    selected={selected[activeTab]?.includes(filter.value)}
                    size={14}
                  />
                  <span className="text-brown-primary">{filter.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <SelectedFilterTags
          selectedFilters={selected}
          onRemove={(category, filter) => handleFilterSelect(category, filter)}
        />

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-3 text-gray-300 rounded-lg"
            onClick={handleResetFilters}
          >
            <ReloadIcon className="w-5 h-5 mx-1" />
            초기화
          </button>
          <button
            type="button"
            className="flex-1 py-3 rounded-lg bg-pink text-white font-semibold"
            onClick={handleApplyFilters}
          >
            {productCount}개 상품 보기
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default FilterSheet;
