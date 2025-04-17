import React from 'react';

export default interface BadgeProps {
  children: React.ReactNode;
  type: 'alert' | 'count';
  count?: number;
  visible?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
