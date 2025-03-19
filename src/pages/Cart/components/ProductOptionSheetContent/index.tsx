import React, { useState, useEffect, useCallback } from 'react';
import Dropdown from '@components/Dropdown';
import Button from '@components/Button';
import QuantityController from '@components/QuantityController';
import { ProductOption } from '@type/Product';
import { CartItem, CartItemOption } from '@type/MarketCartCard';
import RemoveIcon from '@assets/icons/remove.svg?react';

interface ProductOptionSheetContentProps {
  item: CartItem;
  totalPrice: number;
  onClose: () => void;
  onOptionChange: (options: CartItemOption[]) => void;
}

interface SelectedOptionProps {
  basePrice: number;
  selectedOption: CartItemOption;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
}

const SelectedOption: React.FC<SelectedOptionProps> = ({
  basePrice,
  selectedOption,
  onRemove,
  onQuantityChange,
}) => {
  const optionTotalPrice =
    (basePrice + selectedOption.additionalPrice) * selectedOption.quantity;

  return (
    <div className="flex flex-col bg-beige-tertiary rounded-[10px] p-[20px]">
      <div className="flex justify-between mb-[12px]">
        <span className="text-[13px] text-brown-primary">
          {selectedOption.name}
        </span>
        <button
          type="button"
          aria-label="remove-option"
          className="text-brown-primary text-[13px] cursor-pointer p-[5px] mr-[-5px]"
          onClick={onRemove}
        >
          <RemoveIcon />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <QuantityController
          variant="secondary"
          value={selectedOption.quantity}
          onChange={onQuantityChange}
        />
        <span className="text-[14px] text-brown-primary">
          {optionTotalPrice.toLocaleString()}원
        </span>
      </div>
    </div>
  );
};

const ProductOptionSheetContent: React.FC<ProductOptionSheetContentProps> = ({
  item,
  totalPrice,
  onClose,
  onOptionChange,
}) => {
  const [currentOptions, setCurrentOptions] = useState<CartItemOption[]>([]);
  const [availableOptions, setAvailableOptions] = useState<CartItemOption[]>(
    [],
  );
  const [calculatedPrice, setCalculatedPrice] = useState(totalPrice);

  useEffect(() => {
    setCurrentOptions(item.selectedOptions ? [...item.selectedOptions] : []);
  }, [item.selectedOptions]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const { basePrice } = item;

      return currentOptions.reduce(
        (sum, option) =>
          sum + (basePrice + option.additionalPrice) * option.quantity,
        0,
      );
    };

    setCalculatedPrice(calculateTotalPrice());
  }, [currentOptions, item.basePrice]);

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await fetch(`/api/products/${item.id}/options`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setAvailableOptions(data.availableOptions);
    };

    fetchOptions();
  }, [item.id]);

  const dropdownOptions = availableOptions?.map((option) => ({
    id: option.id,
    label: `${option.name} ${option.additionalPrice > 0 ? `(+${option.additionalPrice.toLocaleString()}원)` : ''}`,
  }));

  const handleOptionSelect = useCallback((option: ProductOption) => {
    setCurrentOptions((prevOptions) => {
      const existingIndex = prevOptions.findIndex((op) => op.id === option.id);

      if (existingIndex >= 0) {
        const newOptions = [...prevOptions];
        newOptions[existingIndex] = {
          ...newOptions[existingIndex],
          quantity: newOptions[existingIndex].quantity + 1,
        };
        return newOptions;
      }
      return [
        ...prevOptions,
        {
          id: option.id,
          name: option.name,
          additionalPrice: option.additionalPrice,
          quantity: 1,
        },
      ];
    });
  }, []);

  const handleRemoveOption = useCallback((optionId: number) => {
    setCurrentOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== optionId),
    );
  }, []);

  const handleQuantityChange = useCallback(
    (optionId: number, quantity: number) => {
      setCurrentOptions((prevOptions) =>
        prevOptions.map((option) =>
          option.id === optionId ? { ...option, quantity } : option,
        ),
      );
    },
    [],
  );

  const handleConfirm = useCallback(() => {
    onOptionChange(currentOptions);
    onClose();
  }, [currentOptions, onOptionChange, onClose]);

  return (
    <div className="p-[18px] h-[480px] flex flex-col font-medium">
      <div className="mb-[12px]">
        <Dropdown
          title="옵션 상품 선택"
          options={dropdownOptions}
          onSelect={(option: { id: number; label: string } | null) => {
            const selectedOption = availableOptions.find(
              (opt) => opt.id === option?.id,
            );
            if (selectedOption) {
              handleOptionSelect(selectedOption);
            }
          }}
        />
      </div>

      <div className="flex flex-col grow overflow-auto gap-[12px]">
        {currentOptions.map((option) => (
          <SelectedOption
            key={option.id}
            basePrice={item.basePrice}
            selectedOption={option}
            onRemove={() => handleRemoveOption(option.id)}
            onQuantityChange={(quantity) =>
              handleQuantityChange(option.id, quantity)
            }
          />
        ))}
      </div>

      <div className="flex justify-between items-center border-t border-beige-tertiary my-[16px] pt-[12px]">
        <span className="text-[16px] text-brown-primary">총 금액</span>
        <span className="text-[16px] text-pink font-semibold tracking-[-0.5px]">
          {calculatedPrice.toLocaleString()}원
        </span>
      </div>
      <Button variant="submit" onClick={handleConfirm}>
        변경하기
      </Button>
    </div>
  );
};

export default ProductOptionSheetContent;
