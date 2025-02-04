import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MarketCard from '@components/Card/MarketCard';

const mockMarket = {
  thumbnailUrl: '',
  marketName: '테스트 마켓',
  rate: 4.5,
  reviewer: 100,
};

describe('MarketCard', () => {
  it('기본 마켓 정보가 올바르게 렌더링된다.', () => {
    render(<MarketCard {...mockMarket} />);

    expect(screen.getByAltText('테스트 마켓')).toBeInTheDocument();
    expect(screen.getByText('테스트 마켓')).toBeInTheDocument();
    expect(screen.getByText('4.5 (100)')).toBeInTheDocument();
  });

  it('size prop에 따라 적절한 크기 클래스가 적용된다.', () => {
    const { rerender } = render(<MarketCard {...mockMarket} size="small" />);
    expect(screen.getByRole('img').parentElement).toHaveClass(
      'w-[116px]',
      'h-[156px]',
    );

    rerender(<MarketCard {...mockMarket} size="medium" />);
    expect(screen.getByRole('img').parentElement).toHaveClass(
      'w-[144px]',
      'h-[168px]',
    );

    rerender(<MarketCard {...mockMarket} size="large" />);
    expect(screen.getByRole('img').parentElement).toHaveClass(
      'w-[179px]',
      'h-[234px]',
    );
  });

  it('size prop이 주어지지 않으면 medium 크기가 기본값으로 적용된다.', () => {
    render(<MarketCard {...mockMarket} />);
    expect(screen.getByRole('img').parentElement).toHaveClass(
      'w-[144px]',
      'h-[168px]',
    );
  });
});
