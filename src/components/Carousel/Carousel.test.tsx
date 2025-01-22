import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import Carousel from '@components/Carousel';
import { mockSlides } from '@mocks/handlers';

describe('Carousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('모든 슬라이드가 올바르게 렌더링된다.', () => {
    render(<Carousel slides={mockSlides} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(7);

    expect(images[0]).toHaveAttribute('src', mockSlides[4].thumbnailUrl);
    expect(images[6]).toHaveAttribute('src', mockSlides[0].thumbnailUrl);
  });

  it('5초 간격으로 슬라이드가 자동 재생된다.', async () => {
    render(<Carousel slides={mockSlides} />);

    const images = screen.getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', mockSlides[0].thumbnailUrl);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    const slideContainer = screen.getByRole('button').children[0];
    expect(slideContainer).toHaveStyle({
      transform: 'translateX(-200%)',
    });
  });

  it('스와이프 제스처가 올바르게 동작한다.', () => {
    render(<Carousel slides={mockSlides} />);

    const carouselElement = screen.getByRole('button');

    fireEvent.mouseDown(carouselElement, { clientX: 200 });
    fireEvent.mouseMove(carouselElement, { clientX: 350 });
    fireEvent.mouseUp(carouselElement);

    const slideContainer = carouselElement.children[0];
    expect(slideContainer).toHaveStyle({
      transform: 'translateX(0%)',
    });
  });

  it('마지막 슬라이드 이후 첫 번째 슬라이드로 돌아간다.', () => {
    render(<Carousel slides={mockSlides} />);

    act(() => {
      vi.advanceTimersByTime(5000 * (mockSlides.length - 1));
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    const slideContainer = screen.getByRole('button').children[0];
    expect(slideContainer).toHaveStyle({
      transform: 'translateX(-100%)',
    });
  });

  it('프로그레스 바가 올바르게 업데이트된다.', () => {
    render(<Carousel slides={mockSlides} />);

    const progressBar = screen
      .getByRole('button')
      .querySelector('.bg-\\[\\#FF80A6\\]');

    expect(progressBar).toHaveStyle({
      width: `${100 / mockSlides.length}%`,
      left: '0%',
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(progressBar).toHaveStyle({
      left: `${100 / mockSlides.length}%`,
    });
  });

  it('스와이프 중에는 자동 재생이 멈추고 스와이프가 끝나면 재개된다.', () => {
    render(<Carousel slides={mockSlides} />);

    const carouselElement = screen.getByRole('button');

    fireEvent.mouseDown(carouselElement, { clientX: 200 });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    const slideContainer = carouselElement.children[0];
    expect(slideContainer).toHaveStyle({
      transform: 'translateX(-100%)',
    });

    fireEvent.mouseUp(carouselElement);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(slideContainer).toHaveStyle({
      transform: 'translateX(-200%)',
    });
  });
});
