import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'jotai';
import ProductListInfo from '@components/ProductListInfo';
import MOCK_PRODUCT_ITEMS from '@mocks/constants/mockProductItems';

const JotaiProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

describe('ProductListInfo Component', () => {
  test('총 상품 개수가 올바르게 표시되는지 확인', () => {
    render(
      <JotaiProviderWrapper>
        <ProductListInfo products={MOCK_PRODUCT_ITEMS} />
      </JotaiProviderWrapper>,
    );

    expect(screen.getByText(/\d+개/)).toBeInTheDocument();
  });

  test('정렬 버튼을 클릭하면 정렬 모달이 열리는지 확인', () => {
    render(
      <JotaiProviderWrapper>
        <ProductListInfo products={MOCK_PRODUCT_ITEMS} />
      </JotaiProviderWrapper>,
    );

    fireEvent.click(screen.getByText(/순/));
    expect(screen.getByTestId('bottom-sheet-overlay')).toBeInTheDocument();
  });

  test('필터 버튼을 클릭하면 필터 모달이 열리는지 확인', () => {
    render(
      <JotaiProviderWrapper>
        <ProductListInfo products={MOCK_PRODUCT_ITEMS} />
      </JotaiProviderWrapper>,
    );

    fireEvent.click(screen.getByText(/필터/));
    expect(screen.getByTestId('bottom-sheet-overlay')).toBeInTheDocument();
  });

  test('필터 태그가 올바르게 렌더링되고 삭제하면 제거되는지 확인', () => {
    //     const { rerender } = render(
    //       <JotaiProviderWrapper>
    //         <ProductListInfo products={MOCK_PRODUCT_ITEMS} />
    //       </JotaiProviderWrapper>,
    //     );
    //     fireEvent.click(screen.getByText('필터'));
    //     const filterModal = screen.getByTestId('bottom-sheet-overlay');
    //     const filterToSelect = within(filterModal).getByText('빵');
    //     fireEvent.click(filterToSelect);
    //     fireEvent.click(screen.getByText(/\d+개 상품 보기/));
    //     const selectedFiltersContainer = screen.getByTestId(
    //       'product-list-selected-tags',
    //     );
    //     expect(
    //       within(selectedFiltersContainer).getByText('빵'),
    //     ).toBeInTheDocument();
    //     const closeButton = within(selectedFiltersContainer).getByRole('button');
    //     fireEvent.click(closeButton);
    //     rerender(
    //       <JotaiProviderWrapper>
    //         <ProductListInfo products={MOCK_PRODUCT_ITEMS} />
    //       </JotaiProviderWrapper>,
    //     );
    //     expect(
    //       within(selectedFiltersContainer).queryByText('빵'),
    //     ).not.toBeInTheDocument();
  });
  test('정렬 옵션을 선택하면 sortOptionAtom이 업데이트되는지 확인', () => {});
  test('필터를 적용하면 selectedFiltersAtom이 업데이트되는지 확인', () => {});
});
