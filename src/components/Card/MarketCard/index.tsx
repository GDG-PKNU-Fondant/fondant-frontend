import React from 'react';
import BaseCard from '@components/Card/BaseCard';
import { MarketCardProps } from '@type/Card';

const MarketCard: React.FC<MarketCardProps> = (props) => {
  return <BaseCard {...props} type="market" />;
};

export default MarketCard;
