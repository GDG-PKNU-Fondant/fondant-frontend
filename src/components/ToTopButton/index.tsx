import { useState, useEffect, useRef } from 'react';
import UpIcon from '@assets/icons/up.svg?react';

const ToTopButton = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [parentWidth, setParentWidth] = useState<number>(0);
  const [parentLeft, setParentLeft] = useState<number>(0);

  useEffect(() => {
    const updateSize = () => {
      if (parentRef.current) {
        const rect = parentRef.current.getBoundingClientRect();
        setParentWidth(rect.width);
        setParentLeft(rect.left);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div ref={parentRef} className="relative mx-auto">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-[100px] bg-[#B1B1B1]/50 rounded-full shadow-md transition hover:bg-[#B1B1B1]/60 flex justify-center items-center w-[40px] h-[40px]"
        style={{
          left: `${parentLeft + parentWidth - 70}px`,
        }}
      >
        <UpIcon />
      </button>
    </div>
  );
};

export default ToTopButton;
