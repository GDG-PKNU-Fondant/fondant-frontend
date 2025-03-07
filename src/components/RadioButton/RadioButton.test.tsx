import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RadioButton from '@components/RadioButton';

describe('RadioButton', () => {
  it('선택되지 않은 상태를 올바르게 렌더링한다.', () => {
    render(<RadioButton selected={false} />);

    const radioButton = screen.getByRole('radio');
    expect(radioButton).toBeInTheDocument();
    expect(radioButton).toHaveAttribute('aria-checked', 'false');

    const innerCircle = radioButton.querySelector('div');
    expect(innerCircle).not.toBeInTheDocument();
  });

  it('선택된 상태를 올바르게 렌더링한다.', () => {
    render(<RadioButton selected />);

    const radioButton = screen.getByRole('radio');
    expect(radioButton).toBeInTheDocument();
    expect(radioButton).toHaveAttribute('aria-checked', 'true');

    const innerCircle = radioButton.querySelector('div');
    expect(innerCircle).toBeInTheDocument();
  });

  it('클릭 시 onClick 함수가 호출된다.', () => {
    const handleClick = vi.fn();
    render(<RadioButton selected={false} onClick={handleClick} />);

    const radioButton = screen.getByRole('radio');
    fireEvent.click(radioButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Enter 키를 눌렀을 때 onClick 함수가 호출된다.', () => {
    const handleClick = vi.fn();
    render(<RadioButton selected={false} onClick={handleClick} />);

    const radioButton = screen.getByRole('radio');
    fireEvent.keyDown(radioButton, { key: 'Enter' });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('올바른 크기가 적용된다.', () => {
    const size = 30;
    render(<RadioButton selected={false} size={size} />);

    const radioButton = screen.getByRole('radio');
    expect(radioButton).toHaveStyle(`width: ${size}px`);
    expect(radioButton).toHaveStyle(`height: ${size}px`);
  });
});
