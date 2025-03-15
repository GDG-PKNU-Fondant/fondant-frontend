import MOCK_SORT_OPTIONS from '@mocks/constants/mockSortList';
import RadioButton from '@components/RadioButton';

interface SortSheetContentProps {
  onSelect: (sortOption: string) => void;
  selectedOption: string;
}

const SortSheetContent = ({
  onSelect,
  selectedOption,
}: SortSheetContentProps) => {
  return (
    <div className="p-[18px]">
      <div className="flex justify-between items-center mb-[20px]">
        <div className="text-brown-primary text-[19px] font-bold">정렬</div>
      </div>
      <div className="border-t border-beige-secondary mb-[22px]" />

      <ul className="space-y-[25px]">
        {MOCK_SORT_OPTIONS.map((option) => (
          <li
            key={option.value}
            className="flex items-center rounded-[8px] cursor-pointer"
          >
            <button
              type="button"
              className="flex items-center gap-[10px] w-full text-left rounded-[8px] cursor-pointer"
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
  );
};

export default SortSheetContent;
