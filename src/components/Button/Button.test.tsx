import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ButtonProps from '@type/Button';
import Button from '@components/Button';

describe('Button Component', () => {
  const setup = (props?: Partial<ButtonProps>) => {
    return render(<Button {...props}>테스트 버튼</Button>);
  };

  it('버튼이 정상적으로 렌더링되는지 확인', () => {
    setup();
    expect(
      screen.getByRole('button', { name: /테스트 버튼/i }),
    ).toBeInTheDocument();
  });

  it('variant prop이 올바르게 반영되는지 확인', () => {
    setup({ variant: 'primary' });
    expect(screen.getByRole('button')).toHaveClass(
      'bg-pink text-white font-bold',
    );

    cleanup();

    setup({ variant: 'secondary' });
    expect(screen.getByRole('button')).toHaveClass(
      'border border-bg-brown-tertiary text-brown-tertiary font-medium',
    );

    cleanup();

    setup({ variant: 'submit' });
    expect(screen.getByRole('button')).toHaveClass(
      'bg-pink text-white font-semibold',
    );
  });

  it('size prop이 올바르게 반영되는지 확인', () => {
    setup({ size: 'small' });
    expect(screen.getByRole('button')).toHaveClass(
      'w-[150px] h-[35px] text-[13px]',
    );

    cleanup();

    setup({ size: 'medium' });
    expect(screen.getByRole('button')).toHaveClass(
      'w-[165px] h-[35px] text-[13px]',
    );

    cleanup();

    setup({ size: 'large' });
    expect(screen.getByRole('button')).toHaveClass(
      'w-[180px] h-[46px] text-[18px]',
    );
  });

  it('block prop이 올바르게 반영되는지 확인', () => {
    setup({ block: true });
    expect(screen.getByRole('button')).toHaveClass('w-full');

    cleanup();

    setup({ block: false });
    expect(screen.getByRole('button')).toHaveClass('inline-block');
  });

  it('align prop이 올바르게 반영되는지 확인', () => {
    setup({ align: 'left' });
    expect(screen.getByRole('button')).toHaveClass('text-left');

    cleanup();

    setup({ align: 'center' });
    expect(screen.getByRole('button')).toHaveClass('text-center');

    cleanup();

    setup({ align: 'right' });
    expect(screen.getByRole('button')).toHaveClass('text-right');
  });

  it('onClick 이벤트가 정상적으로 호출되는지 확인', () => {
    const handleClick = vi.fn();
    setup({ onClick: handleClick });

    const button = screen.getByRole('button', { name: /테스트 버튼/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
