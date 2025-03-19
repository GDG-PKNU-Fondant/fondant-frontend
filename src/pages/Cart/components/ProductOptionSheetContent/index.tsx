import React, { useState, useEffect, useCallback } from 'react';
import Dropdown from '@components/Dropdown';
import Button from '@components/Button';
import QuantityController from '@components/QuantityController';
import { ProductOption } from '@type/Product';
import { CartItem, CartItemOption } from '@type/MarketCartCard';

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
          >
            <path
              d="M7.50525 0.493111L4.50005 3.49831L1.49485 0.493111C1.36201 0.360273 1.18184 0.285645 0.993978 0.285645C0.806116 0.285645 0.625949 0.360273 0.493111 0.493111C0.360272 0.625949 0.285645 0.806117 0.285645 0.993979C0.285645 1.18184 0.360272 1.36201 0.49311 1.49485L3.49831 4.50005L0.49311 7.50525C0.360272 7.63809 0.285645 7.81826 0.285645 8.00612C0.285645 8.19398 0.360272 8.37415 0.493111 8.50699C0.625949 8.63983 0.806116 8.71445 0.993978 8.71445C1.18184 8.71445 1.36201 8.63983 1.49485 8.50699L4.50005 5.50178L7.50525 8.50699C7.63809 8.63983 7.81826 8.71445 8.00612 8.71445C8.19398 8.71445 8.37415 8.63983 8.50699 8.50699C8.63982 8.37415 8.71445 8.19398 8.71445 8.00612C8.71445 7.81826 8.63983 7.63809 8.50699 7.50525L5.50178 4.50005L8.50699 1.49485C8.63983 1.36201 8.71445 1.18184 8.71445 0.993978C8.71445 0.806116 8.63982 0.625949 8.50699 0.493111C8.37415 0.360273 8.19398 0.285645 8.00612 0.285645C7.81826 0.285645 7.63809 0.360273 7.50525 0.493111Z"
              fill="#BC8462"
            />
          </svg>
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
