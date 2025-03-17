import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dropdown from '@components/Dropdown';

describe('Dropdown', () => {
  const MOCK_OPTIONS = [
    { id: 1, label: '옵션 1' },
    { id: 2, label: '옵션 2' },
    { id: 3, label: '옵션 3' },
  ];

  it('버튼 클릭 시 드롭다운이 열린다.', () => {
    render(<Dropdown title="옵션 선택" options={MOCK_OPTIONS} />);

    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);

    expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  it('옵션 선택 시 해당 레이블이 표시되고, 드롭다운이 닫힌다.', async () => {
    render(<Dropdown title="옵션 선택" options={MOCK_OPTIONS} />);

    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);

    const options = screen.getAllByRole('option');
    fireEvent.click(options[1]);

    await waitFor(() => {
      expect(screen.getByText('옵션 1')).toBeInTheDocument();
      expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('옵션 선택 시 onSelect 콜백이 호출된다.', () => {
    const handleSelect = vi.fn();
    render(
      <Dropdown
        title="옵션 선택"
        options={MOCK_OPTIONS}
        onSelect={handleSelect}
      />,
    );

    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);

    const options = screen.getAllByRole('option');
    fireEvent.click(options[2]);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(MOCK_OPTIONS[1]);
  });

  it('타이틀 클릭 시 선택이 초기화된다.', async () => {
    const handleSelect = vi.fn();
    render(
      <Dropdown
        title="옵션 선택"
        options={MOCK_OPTIONS}
        onSelect={handleSelect}
      />,
    );

    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);

    const options = screen.getAllByRole('option');
    fireEvent.click(options[1]);

    fireEvent.click(dropdownButton);

    const titleOption = screen.getAllByRole('option')[0];
    fireEvent.click(titleOption);

    await waitFor(() => {
      expect(screen.getByText('옵션 선택')).toBeInTheDocument();
      expect(handleSelect).toHaveBeenLastCalledWith(null);
    });
  });

  it('외부 클릭 시 드롭다운이 닫힌다.', async () => {
    render(
      <div>
        <div data-testid="outside" />
        <Dropdown title="옵션 선택" options={MOCK_OPTIONS} />
      </div>,
    );

    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);

    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside'));

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('maxVisibleItems를 초과하는 경우 스크롤이 활성화된다.', () => {
    const manyOptions = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      label: `옵션 ${i + 1}`,
    }));

    render(
      <Dropdown title="옵션 선택" options={manyOptions} maxVisibleItems={4} />,
    );

    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    expect(listbox).toHaveStyle('max-height: 216px');
    expect(listbox).toHaveStyle('overflow-y: auto');
  });

  it('maxVisibleItems 이하인 경우 스크롤이 비활성화된다.', () => {
    render(
      <Dropdown title="옵션 선택" options={MOCK_OPTIONS} maxVisibleItems={5} />,
    );

    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    expect(listbox).toHaveStyle('overflow-y: hidden');
  });
});
