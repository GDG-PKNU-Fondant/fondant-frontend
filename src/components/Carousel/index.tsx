import React, { useState, useEffect, useRef, useCallback } from 'react';
import CarouselSlide from '@type/Carousel';

const Carousel = ({ slides }: { slides: CarouselSlide[] }) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [progressIndex, setProgressIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [startX, setStartX] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [slideAnimated, setSlideAnimated] = useState(true);

  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

  const ANIMATION_DELAY_MS = 500;
  const SLIDE_DELAY_MS = 5000;

  const goToNext = useCallback(() => {
    if (slideIndex === slides.length) {
      setSlideIndex(slides.length + 1);
      setTimeout(() => {
        setSlideAnimated(false);
        setSlideIndex(1);
      }, ANIMATION_DELAY_MS);
      setSlideAnimated(true);
    } else {
      setSlideAnimated(true);
      setSlideIndex((prev) => prev + 1);
    }
  }, [slides.length, slideIndex]);

  const goToPrev = () => {
    if (slideIndex === 1) {
      setSlideIndex(0);
      setTimeout(() => {
        setSlideAnimated(false);
        setSlideIndex(slides.length);
      }, ANIMATION_DELAY_MS);
      setSlideAnimated(true);
    } else {
      setSlideAnimated(true);
      setSlideIndex((prev) => prev - 1);
    }
  };

  const resetTimer = useCallback(() => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }
    autoSlideTimer.current = setInterval(goToNext, SLIDE_DELAY_MS);
  }, [goToNext]);

  const handleSwipeStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsSwiping(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);

    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }
  };

  const handleSwipeMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwiping) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setSwipeOffset(diff);
  };

  const handleSwipeEnd = () => {
    if (!isSwiping) return;

    if (Math.abs(swipeOffset) > 100) {
      if (swipeOffset > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }

    setIsSwiping(false);
    setSwipeOffset(0);
    resetTimer();
  };

  useEffect(() => {
    resetTimer();

    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [resetTimer]);

  useEffect(() => {
    if (slideIndex === 0) {
      setProgressIndex(slides.length - 1);
    } else if (slideIndex === slides.length + 1) {
      setProgressIndex(0);
    } else {
      setProgressIndex(slideIndex - 1);
    }
  }, [slideIndex, slides.length]);

  const translateX =
    -(slideIndex * 100) + (swipeOffset / window.innerWidth) * 100;

  const progressBarStyle = {
    width: `${100 / slides.length}%`,
    left: `${progressIndex * (100 / slides.length)}%`,
  };

  const displayedSlides =
    slides.length > 0
      ? [
          { ...slides[slides.length - 1], id: -1 },
          ...slides,
          { ...slides[0], id: 99 },
        ]
      : [];

  if (slides.length === 1) {
    return (
      <div
        className="relative overflow-hidden w-[358px] h-[292px] bg-beige-primary rounded-[8px]"
        role="button"
        tabIndex={0}
      >
        <div className="flex h-full">
          <div className="flex-shrink-0 w-full h-full">
            <img
              src={slides[0].thumbnailUrl}
              alt="Carousel 1"
              className="w-full h-full object-cover"
              draggable="false"
            />
          </div>
        </div>
        <div className="absolute inset-0 w-full h-full border-beige-secondary border-4 rounded-[8px]" />
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden w-[358px] h-[292px] bg-beige-primary rounded-[8px]"
      onMouseDown={handleSwipeStart}
      onTouchStart={handleSwipeStart}
      onMouseMove={handleSwipeMove}
      onTouchMove={handleSwipeMove}
      onMouseUp={handleSwipeEnd}
      onTouchEnd={handleSwipeEnd}
      onMouseLeave={handleSwipeEnd}
      role="button"
      tabIndex={0}
    >
      <div
        className={`flex h-full transition-transform duration-${ANIMATION_DELAY_MS} ease-out`}
        style={{
          transform: `translateX(${translateX}%)`,
          transitionProperty:
            isSwiping || !slideAnimated ? 'none' : 'transform',
        }}
      >
        {displayedSlides.map((slide, index) => {
          return (
            <div key={slide.id} className="flex-shrink-0 w-full h-full">
              <img
                src={slide.thumbnailUrl}
                alt={`Carousel ${index + 1}`}
                className="w-full h-full object-cover"
                draggable="false"
              />
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 w-full h-full border-beige-secondary border-[4px] rounded-[8px]" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] h-[4px] bg-beige-secondary">
        <div
          className={`absolute h-[4px] bg-pink transition-all duration-${ANIMATION_DELAY_MS} ease-out`}
          style={progressBarStyle}
        />
      </div>
    </div>
  );
};

export default Carousel;
