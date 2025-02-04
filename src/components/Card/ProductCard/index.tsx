import React from 'react';
import BaseCard from '@components/Card/BaseCard';
import { ProductCardProps } from '@type/Card';

const ProductCard: React.FC<ProductCardProps> = (props) => {
  return <BaseCard {...props} type="product" />;
};

export default ProductCard;
