import React, { useRef, useState } from 'react';

const useDragScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX + (scrollRef.current?.scrollLeft || 0));
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    scrollRef.current.scrollLeft = startX - e.pageX;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return {
    scrollRef,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
};

export default useDragScroll;
