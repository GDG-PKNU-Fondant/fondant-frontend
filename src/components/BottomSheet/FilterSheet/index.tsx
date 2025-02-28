import { useEffect, useState } from 'react';
import BottomSheet from '@components/BottomSheet';
import TabNavigator from '@components/TabNavigator';
import MOCK_TABS from '@mocks/constants/mockTabs';
import MOCK_FILTERS from '@mocks/constants/mockFilters';
import ReloadIcon from '@assets/icons/reload.svg?react';
import CheckButton from '@components/CheckButton';
import SelectedFilterTags from '@components/ProductListInfo/SelectedFilterTags';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: string[];
  onSelect: (filters: string[]) => void;
}

const FilterSheet = ({
  isOpen,
  onClose,
  selectedFilters,
  onSelect,
}: FilterSheetProps) => {
  const [activeTab, setActiveTab] = useState(MOCK_TABS[0].key);
  const [selected, setSelected] = useState<string[]>(selectedFilters);

  useEffect(() => {
    if (isOpen) {
      setSelected(selectedFilters);
      setActiveTab(MOCK_TABS[0].key);
    }
  }, [isOpen]);

  const handleFilterSelect = (filter: string) => {
    setSelected((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter],
    );
  };

  const handleResetFilters = () => {
    setSelected([]);
  };

  const handleApplyFilters = () => {
    onSelect(selected);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="p-4 h-[60vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-brown-primary text-lg font-bold">필터</h2>
        </div>
        <TabNavigator
          tabs={MOCK_TABS}
          defaultColor="text-brown-tertiary"
          selectedColor="text-pink"
          fixedTextSize={18}
          type="inner"
          onTabChange={(tab) => setActiveTab(tab)}
        />

        <div
          className={`flex-grow overflow-y-auto mt-3 relative z-0 ${selected.length > 0 ? 'pb-16' : ''}`}
        >
          <ul className="space-y-3">
            {MOCK_FILTERS[activeTab]?.map((filter) => (
              <li
                key={filter.value}
                className="flex items-center justify-start gap-3 py-1 px-3 rounded-lg cursor-pointer"
                onClick={() => handleFilterSelect(filter.value)}
              >
                <CheckButton selected={selected.includes(filter.value)} />
                <span className="text-brown-primary">{filter.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <SelectedFilterTags
          selectedFilters={selected}
          onRemove={handleFilterSelect}
        />

        <div className="mt-4 flex gap-2">
          <button
            className="flex items-center justify-center px-4 py-3 text-gray-300 rounded-lg"
            onClick={handleResetFilters}
          >
            <ReloadIcon className="w-5 h-5 fill-gray-300 mx-1" />
            초기화
          </button>
          <button
            className="flex-1 py-3 rounded-lg bg-pink text-white font-semibold"
            onClick={handleApplyFilters}
          >
            {selected.length}개 상품 보기
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default FilterSheet;
