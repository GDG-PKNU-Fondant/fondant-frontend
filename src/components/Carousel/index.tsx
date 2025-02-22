import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import CarouselSlide from '@type/Carousel';

interface ProgressBarProps {
  progressIndex: number;
  totalSlides: number;
  animationDelay: number;
}

const SLIDE_DELAY_MS = 5000;
const ANIMATION_DELAY_MS = 500;

const useSlideSetup = (slides: CarouselSlide[]) => {
  const displayedSlides = useMemo(() => {
    if (slides.length === 0) return [];
    return [
      { ...slides[slides.length - 1], id: -1 },
      ...slides,
      { ...slides[0], id: 99 },
    ];
  }, [slides]);

  return { displayedSlides };
};

const useCarouselState = (totalSlides: number) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [progressIndex, setProgressIndex] = useState(0);
  const [slideAnimated, setSlideAnimated] = useState(true);

  const goToNext = useCallback(() => {
    if (slideIndex === totalSlides) {
      setSlideIndex(totalSlides + 1);
      setTimeout(() => {
        setSlideAnimated(false);
        setSlideIndex(1);
      }, ANIMATION_DELAY_MS);
      setSlideAnimated(true);
    } else {
      setSlideAnimated(true);
      setSlideIndex((prev) => prev + 1);
    }
  }, [totalSlides, slideIndex]);

  const goToPrev = useCallback(() => {
    if (slideIndex === 1) {
      setSlideIndex(0);
      setTimeout(() => {
        setSlideAnimated(false);
        setSlideIndex(totalSlides);
      }, ANIMATION_DELAY_MS);
      setSlideAnimated(true);
    } else {
      setSlideAnimated(true);
      setSlideIndex((prev) => prev - 1);
    }
  }, [totalSlides, slideIndex]);

  useEffect(() => {
    let newProgressIndex = slideIndex - 1;

    if (slideIndex === 0) {
      newProgressIndex = totalSlides - 1;
    } else if (slideIndex === totalSlides + 1) {
      newProgressIndex = 0;
    }

    setProgressIndex(newProgressIndex);
  }, [slideIndex, totalSlides]);

  return { slideIndex, progressIndex, slideAnimated, goToNext, goToPrev };
};

const useAutoSlide = (goToNext: () => void) => {
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }
    autoSlideTimer.current = setInterval(goToNext, SLIDE_DELAY_MS);
  }, [goToNext]);

  const pauseTimer = useCallback(() => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
      autoSlideTimer.current = null;
    }
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [resetTimer]);

  return { resetTimer, pauseTimer };
};

const useSlideSwipe = ({
  goToNext,
  goToPrev,
}: {
  goToNext: () => void;
  goToPrev: () => void;
}) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const [startX, setStartX] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const handleSwipeStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      setIsSwiping(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      setStartX(clientX);
    },
    [],
  );

  const handleSwipeMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!isSwiping) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      setSwipeOffset(clientX - startX);
    },
    [isSwiping, startX],
  );

  const handleSwipeEnd = useCallback(() => {
    if (isSwiping && Math.abs(swipeOffset) > 100) {
      if (swipeOffset > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
    setIsSwiping(false);
    setSwipeOffset(0);
  }, [isSwiping, swipeOffset]);

  return {
    isSwiping,
    swipeOffset,
    handleSwipeStart,
    handleSwipeMove,
    handleSwipeEnd,
  };
};

const SlideImage = ({ slide }: { slide: CarouselSlide }) => (
  <div className="flex-shrink-0 w-full h-full">
    <img
      src={slide.thumbnailUrl}
      alt="Carousel"
      className="w-full h-full object-cover"
      draggable={false}
    />
  </div>
);

const ProgressBar: React.FC<ProgressBarProps> = ({
  progressIndex,
  totalSlides,
  animationDelay,
}) => {
  const width = 100 / totalSlides;

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[4px] bg-beige-secondary">
      <motion.div
        className="absolute h-[4px] bg-pink"
        initial={false}
        animate={{
          left: `${progressIndex * width}%`,
          width: `${width}%`,
        }}
        transition={{
          duration: animationDelay / 1000,
          ease: 'easeOut',
        }}
      />
    </div>
  );
};

const Carousel: React.FC<{ slides: CarouselSlide[] }> = ({ slides }) => {
  const { displayedSlides } = useSlideSetup(slides);
  const { slideIndex, progressIndex, slideAnimated, goToNext, goToPrev } =
    useCarouselState(slides.length);
  const {
    isSwiping,
    swipeOffset,
    handleSwipeStart,
    handleSwipeMove,
    handleSwipeEnd,
  } = useSlideSwipe({ goToNext, goToPrev });
  const { resetTimer, pauseTimer } = useAutoSlide(goToNext);

  const translateX = useMemo(
    () => -100 * slideIndex + (swipeOffset / window.innerWidth) * 100,
    [slideIndex, swipeOffset],
  );

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    handleSwipeStart(e);
    pauseTimer();
  };

  const handleEnd = () => {
    handleSwipeEnd();
    resetTimer();
  };

  if (slides.length === 1) {
    return (
      <div className="flex relative overflow-hidden aspect-[36/29] bg-beige-primary rounded-[10px]">
        <div className="flex h-full">
          <img
            src={slides[0].thumbnailUrl}
            alt="Carousel"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
        <div className="absolute inset-0 w-full h-full border-beige-secondary border-4 rounded-[10px]" />
        <div className="hidden" data-testid="carousel-slide-index">
          {slideIndex}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex relative overflow-hidden aspect-[36/29] bg-beige-primary rounded-[10px]"
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      onMouseMove={handleSwipeMove}
      onTouchMove={handleSwipeMove}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
      onMouseLeave={handleEnd}
      role="button"
      tabIndex={0}
    >
      <motion.div
        className="flex h-full"
        initial={false}
        animate={{
          x: `${translateX}%`,
        }}
        transition={{
          duration: isSwiping || !slideAnimated ? 0 : ANIMATION_DELAY_MS / 1000,
          ease: 'easeOut',
        }}
      >
        {displayedSlides.map((slide) => (
          <SlideImage key={slide.id} slide={slide} />
        ))}
      </motion.div>
      <div className="absolute inset-0 w-full h-full border-beige-secondary border-[4px] rounded-[10px]" />
      <ProgressBar
        progressIndex={progressIndex}
        totalSlides={slides.length}
        animationDelay={ANIMATION_DELAY_MS}
      />
      <div className="hidden" data-testid="carousel-slide-index">
        {slideIndex}
      </div>
      <div className="hidden" data-testid="carousel-progress-index">
        {progressIndex}
      </div>
    </div>
  );
};

export default Carousel;
