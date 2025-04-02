import React from 'react';
import PreviewCard from '@components/PreviewCard';
import useDragScroll from '@hooks/useDragScroll';
import ScrollableProductProps from '@type/ScrollableProduct';
import MOCK_PRODUCTS from '@mocks/constants/mockProducts';

const ScrollableProduct: React.FC<ScrollableProductProps> = ({ title }) => {
  const { scrollRef, handleDragStart, handleDragMove, handleDragEnd } =
    useDragScroll();

  return (
    <div className="flex flex-col bg-background pt-[16px] px-[16px] pb-[20px]">
      <div className="text-[16px] font-semibold text-brown-primary leading-[15px] pb-[15px] tracking-[-0.5px]">
        {title}
      </div>
      <div
        ref={scrollRef}
        className="flex gap-[12px] overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        role="presentation"
      >
        {MOCK_PRODUCTS.map((product) => (
          <PreviewCard
            key={product.id}
            {...product}
            type="product"
            size="medium"
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollableProduct;
