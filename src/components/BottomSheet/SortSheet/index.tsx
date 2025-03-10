import MOCK_SORT_OPTIONS from '@mocks/constants/mockSortList';
import BottomSheet from '@components/BottomSheet';
import RadioButton from '@components/RadioButton';

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
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer"
            >
              <button
                type="button"
                className="flex items-center gap-3 p-2 w-full text-left rounded-lg cursor-pointer"
                onClick={() => onSelect(option.value)}
              >
                <RadioButton
                  selected={selectedOption === option.value}
                  onClick={() => onSelect(option.value)}
                />
                <span className="text-brown-primary">{option.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </BottomSheet>
  );
};

export default SortSheet;
