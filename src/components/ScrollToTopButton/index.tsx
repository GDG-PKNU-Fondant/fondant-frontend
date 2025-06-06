import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowUpIcon from '@assets/icons/arrow-up.svg?react';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          whileHover={{
            scale: 1.05,
            opacity: 0.8,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed z-0 bottom-[114px] right-[max(24px,calc(50vw-216px))] w-[40px] h-[40px] flex items-center justify-center
                     bg-[rgba(177,177,177,0.4)] border-[0.3px] border-white/20 rounded-full backdrop-blur-[10px] cursor-pointer
                     hover:bg-[rgba(177,177,177,0.5)] active:bg-[rgba(177,177,177,0.6)]
                     focus:outline-none focus:ring-1 focus:ring-white/30"
          aria-label="맨 위로 이동"
        >
          <ArrowUpIcon />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
