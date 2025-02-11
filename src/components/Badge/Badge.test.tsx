import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Badge from '@components/Badge';

describe('Badge Component', () => {
  it('Badge 렌더링 하고 자식 컴포넌트인 button이 있는지 확인', () => {
    render(
      <Badge type="alert">
        <button>Cart</button>
      </Badge>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('alert Badge의 올바른 렌더링 확인', () => {
    render(
      <Badge type="alert" count={1}>
        <button>Cart</button>
      </Badge>,
    );
    const alertBadge = screen.getByTestId('badge');
    expect(alertBadge).toBeInTheDocument();
    expect(alertBadge).toHaveClass('bg-pink');
  });

  it('count Badge의 올바른 렌더링 확인,', () => {
    render(
      <Badge type="count" count={5}>
        <button>Cart</button>
      </Badge>,
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('Count Badge의 숫자가 99를 넘으면 99+로 적용', () => {
    render(
      <Badge type="count" count={120}>
        <button>Cart</button>
      </Badge>,
    );
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('Badge가 올바른 Position으로 렌더링 됨을 확인', () => {
    render(
      <Badge
        type="count"
        count={10}
        position={{ bottom: '10px', right: '10px' }}
      >
        <button>Cart</button>
      </Badge>,
    );

    const badge = screen.getByText('10');
    expect(badge).toHaveStyle('bottom: 10px');
    expect(badge).toHaveStyle('right: 10px');
  });

  it('count 값이 0일 때 Badge가 렌더링되지 않음을 확인', () => {
    render(
      <Badge type="count" count={0}>
        <button>Cart</button>
      </Badge>,
    );
    expect(screen.getByRole('button', { name: 'Cart' })).toBeInTheDocument();
    expect(screen.queryByTestId('badge')).not.toBeInTheDocument();
  });
});
