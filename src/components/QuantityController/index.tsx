import React from 'react';
import MinusIcon from '@assets/icons/minus.svg?react';
import PlusIcon from '@assets/icons/plus.svg?react';

interface QuantityControllerProps {
  value: number;
  maxValue?: number;
  onChange: (value: number) => void;
  containerClass?: string;
  valueClass?: string;
}

const QuantityController: React.FC<QuantityControllerProps> = ({
  value,
  maxValue = 99,
  onChange,
  containerClass = 'flex items-center justify-between w-full border border-beige-primary text-brown-tertiary font-medium rounded-[5px] p-[9px]',
  valueClass = 'text-[14px] text-brown-primary font-medium',
}) => {
  const isMinValue = value === 1;
  const isMaxValue = value === maxValue;

  const handleDecrement = () => {
    onChange(Math.max(1, value - 1));
  };

  const handleIncrement = () => {
    onChange(Math.min(maxValue, value + 1));
  };

  return (
    <div className={containerClass}>
      <button
        type="button"
        onClick={handleDecrement}
        className="px-[5px] cursor-pointer"
      >
        <MinusIcon
          stroke={isMinValue ? '#F1E3D9' : '#BC8462'}
          strokeOpacity={isMinValue ? 1 : 0.8}
        />
      </button>
      <div className={valueClass}>{value}</div>
      <button
        type="button"
        onClick={handleIncrement}
        className="px-[5px] cursor-pointer"
      >
        <PlusIcon
          fill={isMaxValue ? '#F1E3D9' : '#BC8462'}
          fillOpacity={isMaxValue ? 1 : 0.8}
        />
      </button>
    </div>
  );
};

export default QuantityController;
