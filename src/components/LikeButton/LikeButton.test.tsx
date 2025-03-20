import { render, screen, fireEvent } from '@testing-library/react';
import LikeButton from '@components/LikeButton';

describe('LikeButton Component', () => {
  test('좋아요가 비활성화된 상태 확인', () => {
    render(<LikeButton count={100} liked={false} />);

    expect(screen.getByText('100')).toBeInTheDocument();

    const button = screen.getByRole('button');
    const heartIconSvg = button.querySelector('svg');
    expect(heartIconSvg).toHaveAttribute('fill', 'none');
  });

  test('좋아요가 활성화된 상태 확인', () => {
    render(<LikeButton count={100} liked />);

    expect(screen.getByText('100')).toBeInTheDocument();

    const button = screen.getByRole('button');
    const heartIconSvg = button.querySelector('svg');
    expect(heartIconSvg).toHaveAttribute('fill', '#FF80A6');
  });

  test('좋아요 수 증가 확인', () => {
    render(<LikeButton count={100} liked={false} />);

    const button = screen.getByRole('button');
    const heartIconSvg = button.querySelector('svg');

    expect(screen.getByText('100')).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText('101')).toBeInTheDocument();
    expect(heartIconSvg).toHaveAttribute('fill', '#FF80A6');
  });

  test('좋아요 수 감소 확인', () => {
    render(<LikeButton count={100} liked />);

    const button = screen.getByRole('button');
    const heartIconSvg = button.querySelector('svg');

    expect(screen.getByText('100')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText('99')).toBeInTheDocument();
    expect(heartIconSvg).toHaveAttribute('fill', 'none');
  });

  test('countDisplay=false 일 때 좋아요 개수가 표시되지 않음 확인', () => {
    render(<LikeButton count={100} liked={false} countDisplay={false} />);

    expect(screen.queryByText('100')).not.toBeInTheDocument();
  });
});
