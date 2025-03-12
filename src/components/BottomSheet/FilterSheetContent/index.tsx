import { useEffect, useState } from 'react';
import TabNavigator from '@components/TabNavigator';
import MOCK_TABS from '@mocks/constants/mockTabs';
import MOCK_FILTERS from '@mocks/constants/mockFilters';
import ReloadIcon from '@assets/icons/reload.svg?react';
import CheckButton from '@components/CheckButton';
import SelectedFilterTags from '@components/ProductListInfo/SelectedFilterTags';
import useProductCount from '@hooks/useProductCount';
import { ProductItem } from '@mocks/constants/mockProductItems';

interface FilterSheetContentProps {
  selectedFilters: Record<string, string[]>;
  onSelect: (filters: Record<string, string[]>) => void;
  products: ProductItem[];
  onClose: () => void;
}

const FilterSheetContent = ({
  selectedFilters,
  onSelect,
  products,
  onClose,
}: FilterSheetContentProps) => {
  const [activeTab, setActiveTab] = useState(MOCK_TABS[0].key);
  const [selected, setSelected] =
    useState<Record<string, string[]>>(selectedFilters);

  useEffect(() => {
    setSelected(selectedFilters);
    setActiveTab(MOCK_TABS[0].key);
  }, [selectedFilters]);

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
    <div className="py-[14px] h-[60vh] flex flex-col">
      <div className="pl-[18px] pb-[12px] flex justify-between items-center">
        <div className="text-brown-primary text-[19px] font-bold">필터</div>
      </div>

      <TabNavigator
        tabs={MOCK_TABS}
        defaultColor="text-brown-secondary"
        selectedColor="text-pink"
        fixedTextSize={17}
        onTabChange={(tab) => setActiveTab(tab)}
        bottomBorder
      />

      <div className="pl-[20px] flex-grow overflow-y-auto mt-[12px] relative">
        <ul className="space-y-[12px] text-[16px]">
          {MOCK_FILTERS[activeTab]?.map((filter) => (
            <li
              key={filter.value}
              className="flex items-center justify-start gap-[20px] cursor-pointer"
            >
              <button
                type="button"
                onClick={() => handleFilterSelect(activeTab, filter.value)}
                className="flex items-center gap-[10px] w-full text-left"
              >
                <CheckButton
                  selected={selected[activeTab]?.includes(filter.value)}
                  size={20}
                  rounded
                />
                <span className="text-brown-primary text-base">
                  {filter.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <SelectedFilterTags
        selectedFilters={selected}
        onRemove={handleFilterSelect}
      />

      <div className="mt-[16px] flex gap-[12px] px-[18px]">
        <button
          type="button"
          className="flex items-center justify-center px-[16px] py-[12px] text-beige-primary"
          onClick={handleResetFilters}
        >
          <ReloadIcon className="w-[20px] h-[20px] mx-[4px] fill-beige-primary" />
          <div className="relative top-[1px]">초기화</div>
        </button>
        <button
          type="button"
          className="flex-1 py-3 rounded-[10px] bg-pink text-white font-semibold"
          onClick={handleApplyFilters}
        >
          {productCount}개 상품 보기
        </button>
      </div>
    </div>
  );
};

export default FilterSheetContent;
