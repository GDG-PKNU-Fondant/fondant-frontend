import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckButton from '@components/CheckButton';

describe('CheckButton', () => {
  it('선택되지 않은 상태를 올바르게 렌더링한다.', () => {
    render(<CheckButton selected={false} />);

    const checkButton = screen.getByRole('checkbox');
    expect(checkButton).toBeInTheDocument();
    expect(checkButton).toHaveAttribute('aria-checked', 'false');

    const checkIcon = checkButton.querySelector('svg');
    expect(checkIcon).not.toBeInTheDocument();
  });

  it('선택된 상태를 올바르게 렌더링한다.', () => {
    render(<CheckButton selected />);

    const checkButton = screen.getByRole('checkbox');
    expect(checkButton).toBeInTheDocument();
    expect(checkButton).toHaveAttribute('aria-checked', 'true');

    const checkIcon = checkButton.querySelector('svg');
    expect(checkIcon).toBeInTheDocument();
  });

  it('클릭 시 onClick 함수가 호출된다.', () => {
    const handleClick = vi.fn();
    render(<CheckButton selected={false} onClick={handleClick} />);

    const checkButton = screen.getByRole('checkbox');
    fireEvent.click(checkButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Enter 키를 눌렀을 때 onClick 함수가 호출된다.', () => {
    const handleClick = vi.fn();
    render(<CheckButton selected={false} onClick={handleClick} />);

    const checkButton = screen.getByRole('checkbox');
    fireEvent.keyDown(checkButton, { key: 'Enter' });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('올바른 크기가 적용된다.', () => {
    const size = 30;
    render(<CheckButton selected={false} size={size} />);

    const checkButton = screen.getByRole('checkbox');
    expect(checkButton).toHaveStyle(`width: ${size}px`);
    expect(checkButton).toHaveStyle(`height: ${size}px`);
  });

  it('rounded가 true일 때 둥근 모서리가 적용된다.', () => {
    render(<CheckButton selected={false} rounded />);

    const checkButton = screen.getByRole('checkbox');
    expect(checkButton).toHaveClass('rounded-full');
  });

  it('rounded가 false일 때 각진 모서리가 적용된다.', () => {
    render(<CheckButton selected={false} rounded={false} />);

    const checkButton = screen.getByRole('checkbox');
    expect(checkButton).toHaveClass('rounded-[3px]');
  });
});
