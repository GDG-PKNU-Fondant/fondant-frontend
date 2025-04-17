import React from 'react';
import BadgeProps from '@type/Badge';

const Badge: React.FC<BadgeProps> = ({
  children,
  type,
  count = 0,
  position = 'bottom-right',
  visible = count > 0,
}) => {
  let displayCount: string | number = count;

  if (type === 'count' && count !== undefined) {
    if (count >= 100) {
      displayCount = '99+';
    }
  }

  const positionClasses = {
    'top-right': 'top-0 right-0 -translate-y-1/3 translate-x-1/3',
    'top-left': 'top-0 left-0 -translate-y-1/3 -translate-x-1/3',
    'bottom-right': 'bottom-0 right-0 translate-y-1/3 translate-x-1/3',
    'bottom-left': 'bottom-0 left-0 translate-y-1/3 -translate-x-1/3',
  }[position];

  const sizeClasses =
    type === 'alert'
      ? 'w-[11px] h-[11px] text-[0]'
      : 'min-w-[16px] h-[16px] text-[9px] px-[4px]';

  return (
    <div className="relative">
      {children}
      {visible && (
        <div
          data-testid="badge"
          className={`absolute flex items-center justify-center bg-pink rounded-full text-white font-semibold ${sizeClasses} ${positionClasses}`}
        >
          {type === 'count' ? displayCount : ''}
        </div>
      )}
    </div>
  );
};

export default Badge;
