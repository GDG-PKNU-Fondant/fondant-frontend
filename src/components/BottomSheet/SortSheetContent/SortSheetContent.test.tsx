import { render, screen, fireEvent } from '@testing-library/react';
import SortSheetContent from '@components/BottomSheet/SortSheetContent';
import MOCK_SORT_OPTIONS from '@mocks/constants/mockSortList';

describe('SortSheetContent Component', () => {
  const mockOnSelect = vi.fn();

  test('정렬 옵션이 올바르게 렌더링되는지 확인', () => {
    render(<SortSheetContent onSelect={mockOnSelect} selectedOption="" />);

    MOCK_SORT_OPTIONS.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test('정렬 옵션을 클릭하면 onSelect가 호출되는지 확인', () => {
    render(<SortSheetContent onSelect={mockOnSelect} selectedOption="" />);

    const firstOption = screen.getByText(MOCK_SORT_OPTIONS[0].label);
    fireEvent.click(firstOption);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(MOCK_SORT_OPTIONS[0].value);
  });

  test('선택된 옵션이 올바르게 반영되는지 확인', () => {
    render(
      <SortSheetContent
        onSelect={mockOnSelect}
        selectedOption={MOCK_SORT_OPTIONS[1].value}
      />,
    );

    const selectedRadio = screen.getAllByRole('radio')[1];
    expect(selectedRadio).toBeChecked();
  });
});
