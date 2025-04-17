import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Badge from '@components/Badge';

describe('Badge Component', () => {
  it('자식 컴포넌트가 정상적으로 렌더링 된다.', () => {
    render(
      <Badge type="alert">
        <button type="button">Cart</button>
      </Badge>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('count type 배지의 숫자가 99를 넘으면 99+로 적용된다.', () => {
    render(
      <Badge type="count" count={120}>
        <button type="button">Cart</button>
      </Badge>,
    );
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('배지가 올바른 위치에 렌더링 된다.', () => {
    render(
      <Badge type="count" count={10} position="bottom-right">
        <button type="button">Cart</button>
      </Badge>,
    );

    const badge = screen.getByText('10');
    expect(badge).toBeInTheDocument();

    const badgeElement = screen.getByTestId('badge');
    expect(badgeElement).toHaveClass(
      'bottom-0 right-0 translate-y-1/3 translate-x-1/3',
    );
  });

  it('count가 0일 때 배지가 렌더링 되지 않는다.', () => {
    render(
      <Badge type="count" count={0}>
        <button type="button">Cart</button>
      </Badge>,
    );
    expect(screen.getByRole('button', { name: 'Cart' })).toBeInTheDocument();
    expect(screen.queryByTestId('badge')).not.toBeInTheDocument();
  });
});
