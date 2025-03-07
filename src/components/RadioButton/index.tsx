import React from 'react';

interface RadioButtonProps {
  size?: number;
  selected: boolean;
  onClick?: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  size = 22,
  selected,
  onClick,
}) => {
  const innerCircleSize = Math.floor(size * 0.5);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      className={`flex items-center justify-center border-[2px] ${selected ? 'border-pink' : 'border-beige-primary'} rounded-full cursor-pointer`}
      style={{ width: size, height: size }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {selected && (
        <div
          className="bg-pink rounded-full"
          style={{ width: innerCircleSize, height: innerCircleSize }}
        />
      )}
    </div>
  );
};

export default RadioButton;
