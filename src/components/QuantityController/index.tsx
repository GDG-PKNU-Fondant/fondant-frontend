import React from 'react';
import MinusIcon from '@assets/icons/minus.svg?react';
import PlusIcon from '@assets/icons/plus.svg?react';

interface QuantityControllerProps {
  variant?: 'primary' | 'secondary';
  value: number;
  maxValue?: number;
  onChange: (value: number) => void;
}

const QuantityController: React.FC<QuantityControllerProps> = ({
  variant = 'primary',
  value,
  maxValue = 99,
  onChange,
}) => {
  const isMinValue = value === 1;
  const isMaxValue = value === maxValue;

  const handleDecrement = () => {
    onChange(Math.max(1, value - 1));
  };

  const handleIncrement = () => {
    onChange(Math.min(maxValue, value + 1));
  };

  const renderControlButton = (
    action: () => void,
    isDisabled: boolean,
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  ) => (
    <button type="button" onClick={action} className="px-[5px] cursor-pointer">
      <Icon
        className={`${
          Icon === PlusIcon
            ? 'fill-brown-secondary justify-self-end'
            : 'stroke-brown-secondary'
        }`}
        fillOpacity={isDisabled ? 0.3 : 1}
        strokeOpacity={isDisabled ? 0.3 : 1}
      />
    </button>
  );

  const renderValue = (isPrimary: boolean) =>
    isPrimary ? (
      <div className="text-[14px] text-brown-primary">{value}</div>
    ) : (
      <span className="flex items-center justify-center w-[32px] h-[24px] bg-background border border-beige-primary text-[12px] text-brown-primary rounded-[5px]">
        {value}
      </span>
    );

  const isPrimary = variant === 'primary';
  const containerClasses = isPrimary
    ? 'flex items-center justify-between w-full bg-background border border-beige-primary text-brown-tertiary rounded-[5px] p-[9px]'
    : 'inline-grid grid grid-cols-3 text-brown-tertiary rounded-[5px] ml-[-5px]';

  return (
    <div className={containerClasses}>
      {renderControlButton(handleDecrement, isMinValue, MinusIcon)}
      {renderValue(isPrimary)}
      {renderControlButton(handleIncrement, isMaxValue, PlusIcon)}
    </div>
  );
};

export default QuantityController;
