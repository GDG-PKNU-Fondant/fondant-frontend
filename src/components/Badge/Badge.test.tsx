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
      <Badge type="alert">
        <button>Cart</button>
      </Badge>,
    );
    const badge = document.querySelector('.bg-pink.rounded-full');
    expect(badge).not.toBeNull();
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
});
