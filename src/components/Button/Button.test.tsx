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
      'rounded-[5px] bg-pink text-white font-bold',
    );

    cleanup();

    setup({ variant: 'secondary' });
    expect(screen.getByRole('button')).toHaveClass(
      'rounded-[5px] border border-beige-primary text-brown-tertiary font-medium',
    );
    cleanup();

    setup({ variant: 'tertiary' });
    expect(screen.getByRole('button')).toHaveClass(
      'rounded-[5px] bg-beige-tertiary text-brown-secondary font-medium',
    );

    cleanup();

    setup({ variant: 'submit' });
    expect(screen.getByRole('button')).toHaveClass(
      'w-full rounded-full bg-pink text-white font-semibold text-[18px] p-[18px]',
    );
  });

  it('size prop이 올바르게 반영되는지 확인', () => {
    setup({ size: 'small' });
    expect(screen.getByRole('button')).toHaveClass('p-[5px] text-[12px]');

    cleanup();

    setup({ size: 'medium' });
    expect(screen.getByRole('button')).toHaveClass('p-[9px] text-[13px]');

    cleanup();

    setup({ size: 'large' });
    expect(screen.getByRole('button')).toHaveClass('p-[15px] text-[18px]');
  });

  it('onClick 이벤트가 정상적으로 호출되는지 확인', () => {
    const handleClick = vi.fn();
    setup({ onClick: handleClick });

    const button = screen.getByRole('button', { name: /테스트 버튼/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('type prop이 올바르게 설정되는지 확인', () => {
    setup();
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');

    cleanup();

    setup({ variant: 'submit' });
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
