import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TabNavigator from '@components/TabNavigator';
import { HEADER_TABS } from '@components/TabNavigator/tabs';

describe('TabNavigator Component', () => {
  it('탭이 정상적으로 렌더링되는지 확인', () => {
    render(<TabNavigator tabs={HEADER_TABS} />);

    HEADER_TABS.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
    });
  });

  it('탭을 클릭하면 선택 상태가 변경되는지 확인', () => {
    render(<TabNavigator tabs={HEADER_TABS} />);

    const bestTab = screen.getByText('베스트');

    expect(bestTab).toHaveClass('font-semibold text-brown-secondary');

    fireEvent.click(bestTab);

    expect(bestTab).toHaveClass('font-bold text-brown-primary');
  });

  it('onTabChange 콜백이 정상적으로 호출되는지 확인', () => {
    const mockOnTabChange = vi.fn();

    render(<TabNavigator tabs={HEADER_TABS} onTabChange={mockOnTabChange} />);

    const giftTab = screen.getByText('선물하기');

    fireEvent.click(giftTab);

    expect(mockOnTabChange).toHaveBeenCalledTimes(1);

    expect(mockOnTabChange).toHaveBeenCalledWith('gift');
  });

  it('퐁당 PICK 탭의 스타일이 항상 유지되는지 확인', () => {
    render(<TabNavigator tabs={HEADER_TABS} />);

    const fondantTab = screen.getByText('퐁당 PICK');

    expect(fondantTab).toHaveClass('text-pink');

    fireEvent.click(fondantTab);
    expect(fondantTab).toHaveClass('text-pink');
  });

  it('하단 인디케이터(Framer Motion)가 선택된 탭으로 이동하는지 확인', () => {
    render(<TabNavigator tabs={HEADER_TABS} />);

    const discountTab = screen.getByText('할인');
    fireEvent.click(discountTab);

    const indicator = screen.getByTestId('tab-indicator');
    expect(indicator).toBeInTheDocument();
  });
});
