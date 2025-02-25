import { useEffect, useState } from 'react';
import BottomSheet from '@components/BottomSheet';
import TabNavigator from '@components/TabNavigator';
import MOCK_TABS from '@mocks/constants/mockTabs';
import MOCK_FILTERS from '@mocks/constants/mockFilters';

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
    console.log('isOpen 변경됨:', isOpen);
    console.log('부모에서 전달된 selectedFilters:', selectedFilters);

    if (isOpen) {
      console.log('모달이 열림, selectedFilters로 초기화');
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

  const handleApplyFilters = () => {
    onSelect(selected);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <TabNavigator
          tabs={MOCK_TABS}
          defaultColor="text-gray-400"
          selectedColor="text-brown-primary"
          fixedTextSize={18}
          type="inner"
          onTabChange={(tab) => setActiveTab(tab)}
        />

        <ul className="space-y-3 mt-3">
          {MOCK_FILTERS[activeTab]?.map((filter) => (
            <li
              key={filter.value}
              className="flex items-center justify-between p-3 rounded-lg cursor-pointer"
              onClick={() => handleFilterSelect(filter.value)}
            >
              <span className="text-gray-800">{filter.label}</span>
              <div
                className={`w-5 h-5 flex justify-center items-center rounded-full border-2 ${
                  selected.includes(filter.value)
                    ? 'border-brown-primary bg-brown-primary text-white'
                    : 'border-gray-400 bg-white'
                }`}
              >
                {selected.includes(filter.value) && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            className="w-full bg-brown-primary text-white py-3 rounded-lg font-semibold"
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
