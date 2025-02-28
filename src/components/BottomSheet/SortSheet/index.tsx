import MOCK_SORT_OPTIONS from '@mocks/constants/mockSortList';
import BottomSheet from '..';

interface SortSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (sortOption: string) => void;
  selectedOption: string;
}

const SortSheet = ({
  isOpen,
  onClose,
  onSelect,
  selectedOption,
}: SortSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-brown-primary text-lg font-bold">정렬</h2>
        </div>

        <ul className="space-y-3">
          {MOCK_SORT_OPTIONS.map((option) => (
            <li
              key={option.value}
              className="flex items-center gap-3 p-3 rounded-lg cursor-pointer"
              onClick={() => onSelect(option.value)}
            >
              <div
                className={`w-5 h-5 flex justify-center items-center rounded-full border-2 ${
                  selectedOption === option.value
                    ? 'border-pink bg-pink text-white'
                    : 'border-beige-primary bg-white'
                }`}
              >
                {selectedOption === option.value && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-brown-primary">{option.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </BottomSheet>
  );
};

export default SortSheet;
