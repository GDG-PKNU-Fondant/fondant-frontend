import React from 'react';
import MinusIcon from '@assets/icons/minus.svg?react';
import PlusIcon from '@assets/icons/plus.svg?react';

interface QuantityControlProps {
  value: number;
  maxValue?: number;
  onChange: (value: number) => void;
  containerClass?: string;
  valueClass?: string;
}

const QuantityController: React.FC<QuantityControlProps> = ({
  value,
  maxValue = 99,
  onChange,
  containerClass = 'flex flex-1 items-center justify-between border border-beige-secondary rounded-[5px] p-[10px]',
  valueClass = 'text-[14px] text-brown-primary font-medium',
}) => (
  <div className={containerClass}>
    <button
      type="button"
      onClick={() => onChange(Math.max(1, value - 1))}
      className="px-[5px]"
    >
      {value === 1 ? (
        <MinusIcon stroke="#F1E3D9" strokeOpacity={1} />
      ) : (
        <MinusIcon />
      )}
    </button>
    <div className={valueClass}>{value}</div>
    <button
      type="button"
      onClick={() => onChange(Math.min(maxValue, value + 1))}
      className="px-[5px]"
    >
      {value === maxValue ? (
        <PlusIcon fill="#F1E3D9" fillOpacity={1} />
      ) : (
        <PlusIcon />
      )}
    </button>
  </div>
);

export default QuantityController;
