import { render, screen, fireEvent, within } from '@testing-library/react';
import SelectedFilterTags from '@components/ProductListInfo/SelectedFilterTags';
import { vi } from 'vitest';

describe('SelectedFilterTags Component', () => {
  test('선택된 필터가 없을 때 렌더링되지 않는지 확인', () => {
    render(<SelectedFilterTags selectedFilters={{}} onRemove={vi.fn()} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('선택된 필터가 있을 때 올바르게 렌더링되는지 확인', () => {
    const selectedFilters = { category: ['빵'] };
    render(
      <SelectedFilterTags
        selectedFilters={selectedFilters}
        onRemove={vi.fn()}
      />,
    );

    expect(screen.getByText('빵')).toBeInTheDocument();
  });

  test('필터 닫기 버튼을 클릭하면 onRemove가 호출되는지 확인', () => {
    const onRemoveMock = vi.fn();
    const selectedFilters = { category: ['빵'] };

    render(
      <SelectedFilterTags
        selectedFilters={selectedFilters}
        onRemove={onRemoveMock}
      />,
    );

    const filterTag = screen.getByText('빵').closest('span');
    const closeButton = within(filterTag!).getByRole('button');

    fireEvent.click(closeButton);

    expect(onRemoveMock).toHaveBeenCalledTimes(1);
    expect(onRemoveMock).toHaveBeenCalledWith('category', '빵');
  });

  test('여러 개의 필터가 있을 때 모두 렌더링되는지 확인', () => {
    const selectedFilters = {
      category: ['빵', '쿠키'],
      brand: ['fondant Only'],
    };

    render(
      <SelectedFilterTags
        selectedFilters={selectedFilters}
        onRemove={vi.fn()}
      />,
    );

    expect(screen.getByText('빵')).toBeInTheDocument();
    expect(screen.getByText('쿠키')).toBeInTheDocument();
    expect(screen.getByText('fondant Only')).toBeInTheDocument();
  });
});
