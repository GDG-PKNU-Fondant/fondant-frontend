import { useCallback, useRef } from 'react';

const useBodyScrollLock = () => {
  const scrollPositionRef = useRef<number>(0);

  const lockBodyScroll = useCallback(() => {
    scrollPositionRef.current = window.scrollY;

    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.overflow = 'hidden';
  }, []);

  const unlockBodyScroll = useCallback(() => {
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.style.overflow = '';

    window.scrollTo(0, scrollPositionRef.current);
  }, []);

  return { lockBodyScroll, unlockBodyScroll };
};

export default useBodyScrollLock;
