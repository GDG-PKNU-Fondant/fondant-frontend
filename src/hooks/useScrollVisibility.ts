import { useState, useEffect } from 'react';

const useScrollVisibility = (
  setVisibility: (visible: boolean) => void,
  threshold?: number,
) => {
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const maxScrollY =
      document.documentElement.scrollHeight - window.innerHeight;

    const currentThreshold = threshold !== undefined ? threshold : lastScrollY;

    if (currentScrollY <= 0 || currentScrollY >= maxScrollY) {
      if (currentScrollY <= 0) {
        setVisibility(true);
      }
      return;
    }

    setVisibility(currentScrollY < currentThreshold);

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, threshold]);

  return { handleScroll };
};

export default useScrollVisibility;
