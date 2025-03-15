import { render, screen, fireEvent } from '@testing-library/react';
import SortSheet from '@components/BottomSheet/SortSheet';
import MOCK_SORT_OPTIONS from '@mocks/constants/mockSortList';

describe('SortSheet Component', () => {
  test('모달이 열리고 정렬 옵션이 표시되는지 확인', () => {
    render(
      <SortSheet
        isOpen
        onClose={vi.fn()}
        onSelect={vi.fn()}
        selectedOption="혜택순"
      />,
    );

    MOCK_SORT_OPTIONS.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test('정렬 옵션을 클릭하면 onSelect가 호출되는지 확인', () => {
    const onSelectMock = vi.fn();
    render(
      <SortSheet
        isOpen
        onClose={vi.fn()}
        onSelect={onSelectMock}
        selectedOption="혜택순"
      />,
    );

    fireEvent.click(screen.getByText('리뷰 많은 순'));
    expect(onSelectMock).toHaveBeenCalledWith('리뷰 많은 순');
  });

  test('RadioButton이 올바르게 선택되었는지 확인', () => {
    render(
      <SortSheet
        isOpen
        onClose={vi.fn()}
        onSelect={vi.fn()}
        selectedOption="낮은 가격순"
      />,
    );

    const selectedOptionItem = screen.getByText('낮은 가격순').closest('li');
    const selectedRadio = selectedOptionItem?.querySelector('[role="radio"]');
    expect(selectedRadio).toHaveAttribute('aria-checked', 'true');
  });
});
