import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from '@components/Card/ProductCard';

const mockProduct = {
  thumbnailUrl: '',
  marketName: '테스트 마켓',
  productName: '테스트 상품',
  price: 10000,
  discountPrice: 8000,
  rate: 4.5,
  reviewer: 100,
};

describe('ProductCard', () => {
  it('기본 상품 정보가 올바르게 렌더링된다.', () => {
    render(<ProductCard {...mockProduct} />);

    expect(screen.getByAltText('테스트 상품')).toBeInTheDocument();
    expect(screen.getByText('테스트 마켓')).toBeInTheDocument();
    expect(screen.getByText('테스트 상품')).toBeInTheDocument();
    expect(screen.getByText('8,000')).toBeInTheDocument();
    expect(screen.getByText('4.5 (100)')).toBeInTheDocument();
  });

  it('할인율이 올바르게 계산되어 표시된다.', () => {
    render(<ProductCard {...mockProduct} />);

    expect(screen.getByText('20%')).toBeInTheDocument();
  });

  it('할인가가 없을 경우 원래 가격만 표시된다.', () => {
    const productWithoutDiscount = {
      ...mockProduct,
      discountPrice: undefined,
    };

    render(<ProductCard {...productWithoutDiscount} />);

    expect(screen.getByText('10,000')).toBeInTheDocument();
    expect(screen.queryByText('%')).not.toBeInTheDocument();
  });

  it('size prop에 따라 적절한 크기 클래스가 적용된다.', () => {
    const { rerender } = render(<ProductCard {...mockProduct} size="small" />);
    expect(screen.getByRole('img').parentElement).toHaveClass(
      'w-[116px]',
      'h-[156px]',
    );

    rerender(<ProductCard {...mockProduct} size="medium" />);
    expect(screen.getByRole('img').parentElement).toHaveClass(
      'w-[144px]',
      'h-[168px]',
    );

    rerender(<ProductCard {...mockProduct} size="large" />);
    expect(screen.getByRole('img').parentElement).toHaveClass(
      'w-[179px]',
      'h-[234px]',
    );
  });

  it('size prop이 주어지지 않으면 medium 크기가 기본값으로 적용된다.', () => {
    render(<ProductCard {...mockProduct} />);

    expect(screen.getByRole('img').parentElement).toHaveClass(
      'w-[144px]',
      'h-[168px]',
    );
  });

  it('가격이 천 단위 구분자와 함께 올바르게 포맷팅된다.', () => {
    const expensiveProduct = {
      ...mockProduct,
      price: 1000000,
      discountPrice: undefined,
    };

    render(<ProductCard {...expensiveProduct} />);

    expect(screen.getByText('1,000,000')).toBeInTheDocument();
  });
});
