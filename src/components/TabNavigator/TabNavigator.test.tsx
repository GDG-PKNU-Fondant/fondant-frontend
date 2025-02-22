import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TabNavigator from '@components/TabNavigator';
import { HEADER_TABS } from '@components/TabNavigator/tabs';
import MOCK_TABS from '@mocks/constants/mockTabs';

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

  it('하단 인디케이터가 선택된 탭으로 이동하는지 확인', () => {
    render(<TabNavigator tabs={HEADER_TABS} />);

    const discountTab = screen.getByText('할인');
    fireEvent.click(discountTab);

    const indicator = screen.getByTestId('tab-indicator');
    const parentButton = indicator.closest('button');

    expect(parentButton).toHaveTextContent('할인');
  });

  it('기본 텍스트 설정 시, 선택된 탭만 +2px 되는지 확인', () => {
    render(<TabNavigator tabs={HEADER_TABS} textSize={20} />);

    const firstTab = screen.getByText('추천');
    const secondTab = screen.getByText('베스트');

    expect(firstTab).toHaveStyle({ fontSize: '22px' });
    expect(secondTab).toHaveStyle({ fontSize: '20px' });

    fireEvent.click(secondTab);

    expect(firstTab).toHaveStyle({ fontSize: '20px' });
    expect(secondTab).toHaveStyle({ fontSize: '22px' });
  });

  it('탭의 타입이 "inner"이면 글씨 굵기가 고정되는지 확인', () => {
    render(<TabNavigator tabs={MOCK_TABS} type="inner" />);

    MOCK_TABS.forEach((tab) => {
      const tabElement = screen.getByText(tab.label);
      expect(tabElement).toHaveClass('font-normal');
    });
  });

  it('고정된 텍스트 크기 설정 시, 크기가 변하지 않는지 확인', () => {
    render(<TabNavigator tabs={MOCK_TABS} fixedTextSize={13} />);

    MOCK_TABS.forEach((tab) => {
      const tabElement = screen.getByText(tab.label);
      expect(tabElement).toHaveStyle({ fontSize: '13px' });
    });
  });
});
