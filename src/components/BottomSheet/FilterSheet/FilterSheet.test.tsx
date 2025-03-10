import { render, screen, fireEvent, within } from '@testing-library/react';
import FilterSheet from '@components/BottomSheet/FilterSheet';
import MOCK_FILTERS from '@mocks/constants/mockFilters';
import MOCK_TABS from '@mocks/constants/mockTabs';
import MOCK_PRODUCT_ITEMS from '@mocks/constants/mockProductItems';
import { vi } from 'vitest';

describe('FilterSheet Component', () => {
  test('모달이 열리고 필터 탭, 목록 등이 렌더링되는지 확인', () => {
    render(
      <FilterSheet
        isOpen
        onClose={vi.fn()}
        selectedFilters={{}}
        onSelect={vi.fn()}
        products={MOCK_PRODUCT_ITEMS}
      />,
    );

    expect(screen.getByText('필터')).toBeInTheDocument();
    expect(screen.getByText(MOCK_TABS[0].label)).toBeInTheDocument();
    expect(screen.getByText('젤리')).toBeInTheDocument();
  });

  test('필터를 선택하면 onSelect가 올바르게 호출되는지 확인', () => {
    const onSelectMock = vi.fn();
    render(
      <FilterSheet
        isOpen
        onClose={vi.fn()}
        selectedFilters={{}}
        onSelect={onSelectMock}
        products={MOCK_PRODUCT_ITEMS}
      />,
    );

    const filterToSelect = MOCK_FILTERS.category[1].label;
    fireEvent.click(screen.getByText(filterToSelect));

    fireEvent.click(screen.getByText(/\d+개 상품 보기/));

    expect(onSelectMock).toHaveBeenCalled();
    expect(onSelectMock).toHaveBeenCalledWith({ category: ['쿠키'] });
  });

  test('초기화 버튼을 클릭하면 필터가 비워지는지 확인', () => {
    render(
      <FilterSheet
        isOpen
        onClose={vi.fn()}
        selectedFilters={{ category: ['빵'] }}
        onSelect={vi.fn()}
        products={MOCK_PRODUCT_ITEMS}
      />,
    );

    const categoryFilterList = screen.getByRole('list', { name: '' });
    const selectedOptionItem = within(categoryFilterList)
      .getByText('빵')
      .closest('li');
    const selectedCheckButton = selectedOptionItem?.querySelector(
      '[aria-checked="true"]',
    );
    expect(selectedCheckButton).toBeInTheDocument();

    fireEvent.click(screen.getByText('초기화'));

    expect(
      selectedOptionItem?.querySelector('[aria-checked="true"]'),
    ).toBeNull();
  });

  test('필터를 선택하면 productCount가 올바르게 업데이트되는지 확인', () => {
    render(
      <FilterSheet
        isOpen
        onClose={vi.fn()}
        selectedFilters={{ category: ['빵'] }}
        onSelect={vi.fn()}
        products={MOCK_PRODUCT_ITEMS}
      />,
    );

    expect(screen.getByText('5개 상품 보기')).toBeInTheDocument();
  });
});
