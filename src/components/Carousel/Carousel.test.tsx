import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  useCarouselState,
  useAutoSlide,
  useSlideSwipe,
} from '@components/Carousel';
import MOCK_CAROUSEL_SLIDES from '@mocks/constants/mockCarouselSlides';

describe('Carousel Hooks', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  describe('useCarouselState', () => {
    it('초기 상태가 올바르게 설정된다.', () => {
      const { result } = renderHook(() =>
        useCarouselState(MOCK_CAROUSEL_SLIDES.length),
      );

      expect(result.current.slideIndex).toBe(1);
      expect(result.current.progressIndex).toBe(0);
      expect(result.current.slideAnimated).toBe(true);
    });

    it('다음 슬라이드로 이동한다.', () => {
      const { result } = renderHook(() =>
        useCarouselState(MOCK_CAROUSEL_SLIDES.length),
      );

      act(() => {
        result.current.goToNext();
      });

      expect(result.current.slideIndex).toBe(2);
      expect(result.current.progressIndex).toBe(1);
    });

    it('마지막 슬라이드에서 첫 슬라이드로 순환한다.', () => {
      const { result } = renderHook(() =>
        useCarouselState(MOCK_CAROUSEL_SLIDES.length),
      );

      // eslint-disable-next-line
      for (let i = 1; i < MOCK_CAROUSEL_SLIDES.length; i++) {
        act(() => {
          result.current.goToNext();
        });
      }

      expect(result.current.slideIndex).toBe(MOCK_CAROUSEL_SLIDES.length);

      act(() => {
        result.current.goToNext();
      });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current.slideIndex).toBe(1);
      expect(result.current.progressIndex).toBe(0);
    });
  });

  describe('useAutoSlide', () => {
    it('5초마다 자동으로 다음 슬라이드로 이동한다.', () => {
      const mockGoToNext = vi.fn();
      renderHook(() => useAutoSlide(mockGoToNext));

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(mockGoToNext).toHaveBeenCalledTimes(1);

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(mockGoToNext).toHaveBeenCalledTimes(2);
    });

    it('타이머를 일시정지하고 재시작할 수 있다.', () => {
      const mockGoToNext = vi.fn();
      const { result } = renderHook(() => useAutoSlide(mockGoToNext));

      act(() => {
        result.current.pauseTimer();
        vi.advanceTimersByTime(5000);
      });

      expect(mockGoToNext).not.toHaveBeenCalled();

      act(() => {
        result.current.resetTimer();
        vi.advanceTimersByTime(5000);
      });

      expect(mockGoToNext).toHaveBeenCalledTimes(1);
    });
  });

  describe('useSlideSwipe', () => {
    it('스와이프 제스처를 올바르게 처리한다.', () => {
      const mockGoToNext = vi.fn();
      const mockGoToPrev = vi.fn();

      const { result } = renderHook(() =>
        useSlideSwipe({ goToNext: mockGoToNext, goToPrev: mockGoToPrev }),
      );

      act(() => {
        result.current.handleSwipeStart({ clientX: 200 } as React.MouseEvent);
      });

      act(() => {
        result.current.handleSwipeMove({ clientX: 50 } as React.MouseEvent);
      });

      act(() => {
        result.current.handleSwipeEnd();
      });

      expect(mockGoToNext).toHaveBeenCalledTimes(1);

      mockGoToNext.mockClear();
      mockGoToPrev.mockClear();

      act(() => {
        result.current.handleSwipeStart({ clientX: 50 } as React.MouseEvent);
      });

      act(() => {
        result.current.handleSwipeMove({ clientX: 200 } as React.MouseEvent);
      });

      act(() => {
        result.current.handleSwipeEnd();
      });

      expect(mockGoToPrev).toHaveBeenCalledTimes(1);
    });

    it('짧은 스와이프는 무시한다.', () => {
      const mockGoToNext = vi.fn();
      const mockGoToPrev = vi.fn();
      const { result } = renderHook(() =>
        useSlideSwipe({ goToNext: mockGoToNext, goToPrev: mockGoToPrev }),
      );

      act(() => {
        result.current.handleSwipeStart({ clientX: 200 } as React.MouseEvent);
        result.current.handleSwipeMove({ clientX: 150 } as React.MouseEvent);
        result.current.handleSwipeEnd();
      });

      expect(mockGoToNext).not.toHaveBeenCalled();
      expect(mockGoToPrev).not.toHaveBeenCalled();
    });
  });
});
