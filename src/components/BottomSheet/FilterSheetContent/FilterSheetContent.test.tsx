import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from '@testing-library/react';
import FilterSheetContent from '@components/BottomSheet/FilterSheetContent';
import MOCK_TABS from '@mocks/constants/mockTabs';
import MOCK_FILTERS from '@mocks/constants/mockFilters';
import { ProductItem } from '@mocks/constants/mockProductItems';
import { vi } from 'vitest';

describe('FilterSheetContent Component', () => {
  const mockOnSelect = vi.fn();
  const mockOnClose = vi.fn();
  const mockProducts: ProductItem[] = [];

  test('필터 시트가 올바르게 렌더링되는지 확인', () => {
    render(
      <FilterSheetContent
        selectedFilters={{}}
        onSelect={mockOnSelect}
        products={mockProducts}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText('필터')).toBeInTheDocument();

    MOCK_FILTERS[MOCK_TABS[0].key].forEach((filter) => {
      expect(screen.getByText(filter.label)).toBeInTheDocument();
    });
  });

  test('탭을 변경하면 필터 목록이 바뀌는지 확인', () => {
    render(
      <FilterSheetContent
        selectedFilters={{}}
        onSelect={mockOnSelect}
        products={mockProducts}
        onClose={mockOnClose}
      />,
    );

    const secondTab = screen.getByText(MOCK_TABS[1].label);
    fireEvent.click(secondTab);

    MOCK_FILTERS[MOCK_TABS[1].key].forEach((filter) => {
      expect(screen.getByText(filter.label)).toBeInTheDocument();
    });
  });

  test('필터 목록을 선택하면 SelectedFilterTags에 반영되는지 확인', async () => {
    render(
      <FilterSheetContent
        selectedFilters={{}}
        onSelect={mockOnSelect}
        products={mockProducts}
        onClose={mockOnClose}
      />,
    );

    const filterTagsContainer = screen.getByTestId('Tags');
    expect(filterTagsContainer).toBeInTheDocument();
    expect(filterTagsContainer).toBeEmptyDOMElement();

    const filterList = screen.getByRole('list');
    const firstFilterLabel = MOCK_FILTERS[MOCK_TABS[0].key][0].label;
    const firstFilter = within(filterList).getByText(firstFilterLabel);

    fireEvent.click(firstFilter);

    await waitFor(() => {
      expect(filterTagsContainer).not.toBeEmptyDOMElement();
    });
    expect(
      within(filterTagsContainer).getByText(firstFilterLabel),
    ).toBeInTheDocument();
  });

  test('초기화 버튼을 클릭하면 필터가 리셋되는지 확인', () => {
    render(
      <FilterSheetContent
        selectedFilters={{
          [MOCK_TABS[0].key]: ['filter1', 'filter2'],
        }}
        onSelect={mockOnSelect}
        products={mockProducts}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText('filter1')).toBeInTheDocument();
    expect(screen.getByText('filter2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('초기화'));

    expect(screen.queryByText('filter1')).not.toBeInTheDocument();
    expect(screen.queryByText('filter2')).not.toBeInTheDocument();
  });

  test('적용 버튼을 클릭하면 onSelect와 onClose가 호출되는지 확인', () => {
    render(
      <FilterSheetContent
        selectedFilters={{}}
        onSelect={mockOnSelect}
        products={mockProducts}
        onClose={mockOnClose}
      />,
    );

    fireEvent.click(screen.getByText(/개 상품 보기/));

    expect(mockOnSelect).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
// 이후 상품 카테고리별 갯수를 확인하는 커스텀 훅으로 분리 후 테스트 코드 작성 예정.
