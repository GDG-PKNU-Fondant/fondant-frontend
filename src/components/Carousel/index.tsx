import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import CarouselSlide from '@type/Carousel';

interface CarouselProps {
  slides: CarouselSlide[];
  type?: 'banner' | 'product';
}

interface IndicatorProps {
  indicatorPosition: number;
  totalSlides: number;
  animationDelay: number;
}

const SLIDE_DELAY_MS = 5000;
const ANIMATION_DELAY_MS = 250;
const SWIPE_COOLDOWN_MS = 250;

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

export const useCarouselState = (totalSlides: number) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [slideAnimated, setSlideAnimated] = useState(true);

  const indicatorPosition = (slideIndex + totalSlides - 1) % totalSlides;

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

  return { slideIndex, indicatorPosition, slideAnimated, goToNext, goToPrev };
};

export const useAutoSlide = (goToNext: () => void) => {
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

export const useSlideSwipe = ({
  goToNext,
  goToPrev,
}: {
  goToNext: () => void;
  goToPrev: () => void;
}) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const [startX, setStartX] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwipeCooldown, setIsSwipeCooldown] = useState(false);
  const swipeCooldownTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSwipeStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (isSwipeCooldown) return;

      setIsSwiping(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      setStartX(clientX);
    },
    [isSwipeCooldown],
  );

  const handleSwipeMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!isSwiping || isSwipeCooldown) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      setSwipeOffset(clientX - startX);
    },
    [isSwiping, startX, isSwipeCooldown],
  );

  const handleSwipeEnd = useCallback(() => {
    if (isSwiping && !isSwipeCooldown && Math.abs(swipeOffset) > 100) {
      if (swipeOffset > 0) {
        goToPrev();
      } else {
        goToNext();
      }

      setIsSwipeCooldown(true);
      swipeCooldownTimer.current = setTimeout(() => {
        setIsSwipeCooldown(false);
      }, SWIPE_COOLDOWN_MS);
    }

    setIsSwiping(false);
    setSwipeOffset(0);
  }, [isSwiping, swipeOffset, isSwipeCooldown]);

  useEffect(() => {
    return () => {
      if (swipeCooldownTimer.current) {
        clearTimeout(swipeCooldownTimer.current);
      }
    };
  }, []);

  return {
    isSwiping,
    swipeOffset,
    handleSwipeStart,
    handleSwipeMove,
    handleSwipeEnd,
    isSwipeCooldown,
  };
};

const SlideImage = ({
  slide,
  type,
}: {
  slide: CarouselSlide;
  type: 'banner' | 'product';
}) => (
  <div className="shrink-0 w-full h-full relative">
    <img
      src={slide.thumbnailUrl}
      alt="Carousel"
      className="w-full h-full object-cover"
      draggable={false}
    />
    {type === 'product' && (
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(24, 24, 24, 0.00) 0%, rgba(24, 24, 24, 0.20) 80%, rgba(24, 24, 24, 0.40) 100%)',
        }}
      />
    )}
  </div>
);

const BannerIndicator: React.FC<IndicatorProps> = ({
  indicatorPosition,
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
          left: `${indicatorPosition * width}%`,
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

const ProductIndicator: React.FC<{
  currentSlide: number;
  totalSlides: number;
}> = ({ currentSlide, totalSlides }) => (
  <div className="absolute bottom-[14px] right-[14px] w-[40px] py-[2px] bg-beige-tertiary/20 rounded-full text-beige-tertiary text-[12px] text-center font-medium">
    {currentSlide} / {totalSlides}
  </div>
);

const Carousel: React.FC<CarouselProps> = ({ slides, type = 'banner' }) => {
  const { displayedSlides } = useSlideSetup(slides);
  const { slideIndex, indicatorPosition, slideAnimated, goToNext, goToPrev } =
    useCarouselState(slides.length);
  const {
    isSwiping,
    swipeOffset,
    handleSwipeStart,
    handleSwipeMove,
    handleSwipeEnd,
  } = useSlideSwipe({ goToNext, goToPrev });

  const autoSlide = useAutoSlide(type === 'banner' ? goToNext : () => {});

  const translateX = useMemo(
    () => -100 * slideIndex + (swipeOffset / window.innerWidth) * 100,
    [slideIndex, swipeOffset],
  );

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    handleSwipeStart(e);
    if (type === 'banner') autoSlide.pauseTimer();
  };

  const handleEnd = () => {
    handleSwipeEnd();
    if (type === 'banner') autoSlide.resetTimer();
  };

  const carouselClass = type === 'product' ? 'aspect-13/14' : 'aspect-36/29';
  const borderClass =
    type === 'product'
      ? ''
      : 'border-beige-secondary border-[4px] rounded-[10px]';

  if (slides.length === 1) {
    return (
      <div
        className={`flex relative overflow-hidden ${carouselClass} bg-beige-primary ${type === 'banner' ? 'rounded-[10px]' : ''}`}
      >
        <div className="flex h-full relative">
          <img
            src={slides[0].thumbnailUrl}
            alt="Carousel"
            className="w-full h-full object-cover"
            draggable={false}
          />
          {type === 'product' && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          )}
        </div>
        {type === 'banner' && (
          <div className={`absolute inset-0 w-full h-full ${borderClass}`} />
        )}
        {type === 'product' && (
          <ProductIndicator currentSlide={1} totalSlides={slides.length} />
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex relative overflow-hidden ${carouselClass} bg-beige-primary cursor-grab active:cursor-grabbing ${type === 'banner' ? 'rounded-[10px]' : ''}`}
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
          <SlideImage key={slide.id} slide={slide} type={type} />
        ))}
      </motion.div>
      {type === 'banner' && (
        <>
          <div className={`absolute inset-0 w-full h-full ${borderClass}`} />
          <BannerIndicator
            indicatorPosition={indicatorPosition}
            totalSlides={slides.length}
            animationDelay={ANIMATION_DELAY_MS}
          />
        </>
      )}
      {type === 'product' && (
        <ProductIndicator
          currentSlide={indicatorPosition + 1}
          totalSlides={slides.length}
        />
      )}
    </div>
  );
};

export default Carousel;
