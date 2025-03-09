import React from 'react';
import CheckIcon from '@assets/icons/check.svg?react';

interface CheckButtonProps {
  size?: number;
  rounded?: boolean;
  selected: boolean;
  onClick?: () => void;
}

const CheckButton: React.FC<CheckButtonProps> = ({
  size = 22,
  rounded = false,
  selected,
  onClick,
}) => {
  const radiusClass = rounded ? 'rounded-full' : 'rounded-[3px]';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onClick?.();
    }
  };

  return selected ? (
    <div
      role="checkbox"
      aria-checked={selected}
      aria-label={selected ? 'selected' : 'unselected'}
      tabIndex={0}
      className={`flex items-center justify-center bg-pink ${radiusClass} cursor-pointer`}
      style={{ width: size, height: size }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <CheckIcon width={size} height={size} />
    </div>
  ) : (
    <div
      role="checkbox"
      aria-checked={selected}
      aria-label={selected ? 'selected' : 'unselected'}
      tabIndex={0}
      className={`border-[2px] border-beige-primary ${radiusClass} cursor-pointer`}
      style={{ width: size, height: size }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    />
  );
};

export default CheckButton;
