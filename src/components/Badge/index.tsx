import React from 'react';
import BadgeProps from '@type/Badge';

const Badge: React.FC<BadgeProps> = ({
  type,
  count = 0,
  children,
  inset = '0px 0px auto auto',
}) => {
  let badgeSize = 'w-[17px] h-[17px]';
  let textSize = 'text-[12px]';
  let displayCount: string | number = count;

  if (type === 'alert') {
    badgeSize = 'w-[10px] h-[10px]';
  } else if (type === 'count' && count !== undefined) {
    if (count >= 100) {
      displayCount = '99+';
      textSize = 'text-[8px]';
    } else if (count < 10) {
      textSize = 'text-[12px]';
    } else {
      textSize = 'text-[10px]';
    }
  }

  return (
    <div className="relative inline-block">
      {children}
      {count > 0 && (
        <div
          data-testid="badge"
          className={`absolute flex items-center justify-center rounded-full text-white font-bold ${badgeSize} ${
            type === 'count' ? 'bg-brown-primary' : 'bg-pink'
          } ${textSize}`}
          style={{ inset }}
        >
          {type === 'count' ? displayCount : ''}
        </div>
      )}
    </div>
  );
};

export default Badge;
