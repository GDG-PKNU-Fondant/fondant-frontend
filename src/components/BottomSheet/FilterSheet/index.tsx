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

  const handleResetFilters = () => {
    setSelected([]);
  };

  const handleApplyFilters = () => {
    onSelect(selected);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="p-4 h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">필터</h2>
        </div>
        <TabNavigator
          tabs={MOCK_TABS}
          defaultColor="text-gray-400"
          selectedColor="text-brown-primary"
          fixedTextSize={18}
          type="inner"
          onTabChange={(tab) => setActiveTab(tab)}
        />

        <div className="flex-grow overflow-y-auto mt-3">
          <ul className="space-y-3">
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
        </div>

        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 py-2 border-t mt-3">
            {selected.map((filter) => (
              <span
                key={filter}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm flex items-center gap-2"
              >
                {filter}
                <button onClick={() => handleFilterSelect(filter)}>✕</button>
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            className="flex-1 py-3 rounded-lg border border-gray-400 text-gray-600"
            onClick={handleResetFilters}
          >
            초기화
          </button>
          <button
            className="flex-1 py-3 rounded-lg bg-brown-primary text-white font-semibold"
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
