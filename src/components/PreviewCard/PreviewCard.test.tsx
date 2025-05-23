import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PreviewCard from '@components/PreviewCard';
import MOCK_PRODUCTS from '@mocks/constants/mockProducts';

describe('PreviewCard', () => {
  it('기본 정보가 올바르게 렌더링된다.', () => {
    render(<PreviewCard {...MOCK_PRODUCTS[4]} type="product" />);
    expect(screen.getByAltText('테스트 상품')).toBeInTheDocument();
    expect(screen.getByText('테스트 마켓')).toBeInTheDocument();
    expect(screen.getByText('테스트 상품')).toBeInTheDocument();
    expect(screen.getByText('8,000')).toBeInTheDocument();
    expect(screen.getByText('4.5 (100)')).toBeInTheDocument();
  });

  it('할인율이 올바르게 계산되어 표시된다.', () => {
    render(<PreviewCard {...MOCK_PRODUCTS[4]} type="product" />);
    expect(screen.getByText('20%')).toBeInTheDocument();
  });

  it('할인가가 없을 경우 원래 가격만 표시된다.', () => {
    const productWithoutDiscount = {
      ...MOCK_PRODUCTS[4],
      discountPrice: undefined,
    };

    render(<PreviewCard {...productWithoutDiscount} type="product" />);
    expect(screen.getByText('10,000')).toBeInTheDocument();
    expect(screen.queryByText('%')).not.toBeInTheDocument();
  });

  it('layout prop이 주어지지 않으면 grid가 기본값으로 적용된다.', () => {
    render(<PreviewCard {...MOCK_PRODUCTS[4]} type="product" />);
    expect(screen.getByRole('img').parentElement).toHaveClass(
      'w-full',
      'aspect-[116/156]',
    );
  });

  it('가격이 천 단위 구분자와 함께 올바르게 포매팅된다.', () => {
    const expensiveProduct = {
      ...MOCK_PRODUCTS[4],
      price: 1000000,
      discountPrice: undefined,
    };

    render(<PreviewCard {...expensiveProduct} type="product" />);
    expect(screen.getByText('1,000,000')).toBeInTheDocument();
  });

  it('리뷰어 수에 따라 올바르게 포매팅된다.', () => {
    const reviewerCounts = [
      { count: 1000, expected: /1,000/ },
      { count: 25000, expected: /2\.5만/ },
      { count: 100000, expected: /10만/ },
    ];

    const { rerender } = render(
      <PreviewCard
        {...MOCK_PRODUCTS[4]}
        reviewer={reviewerCounts[0].count}
        type="product"
      />,
    );

    reviewerCounts.forEach(({ count, expected }) => {
      rerender(
        <PreviewCard {...MOCK_PRODUCTS[4]} reviewer={count} type="product" />,
      );
      expect(screen.getByText(expected)).toBeInTheDocument();
    });
  });
});
