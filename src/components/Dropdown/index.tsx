import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DropdownArrowIcon from '@assets/icons/dropdown-arrow.svg?react';
import DropdownArrowSmallIcon from '@assets/icons/dropdown-arrow-small.svg?react';

interface DropdownOption {
  id: number;
  label: string;
}

interface DropdownProps {
  title: string;
  options: DropdownOption[];
  onSelect?: (option: DropdownOption | null) => void;
  maxVisibleItems?: number;
  variant?: 'primary' | 'secondary';
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  onSelect,
  maxVisibleItems = 4,
  variant = 'primary',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    null,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonHeight, setButtonHeight] = useState<number>(0);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.offsetHeight + 4);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    if (onSelect) {
      onSelect(option);
    }
    setIsOpen(false);
  };

  const handleTitleClick = () => {
    setSelectedOption(null);
    if (onSelect) {
      onSelect(null);
    }
    setIsOpen(false);
  };

  const contentVariants = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: 'auto',
      opacity: 1,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  };

  const arrowVariants = {
    closed: { rotate: 180 },
    open: { rotate: 0 },
  };

  const getVariantStyles = () => {
    if (variant === 'secondary') {
      return {
        buttonBorder: 'border-[1px]',
        buttonRadius: 'rounded-[6px]',
        buttonPadding: 'p-[10px]',
        textSize: 'text-[12px]',
        textColor: 'text-brown-secondary',
        fontWeight: 'font-medium',
        itemPadding: 'p-[10px]',
        itemTextSize: 'text-[12px]',
        itemHeight: 38,
        ArrowIcon: DropdownArrowSmallIcon,
      };
    }

    return {
      buttonBorder: 'border-[2px]',
      buttonRadius: 'rounded-[10px]',
      buttonPadding: 'p-[16px]',
      textSize: 'text-[16px]',
      textColor: 'text-brown-primary',
      fontWeight: 'font-semibold',
      itemPadding: 'p-[16px]',
      itemTextSize: 'text-[15px]',
      itemHeight: 54,
      ArrowIcon: DropdownArrowIcon,
    };
  };

  const variantStyles = getVariantStyles();
  const { itemHeight, ArrowIcon } = variantStyles;
  const maxHeight = maxVisibleItems * itemHeight;

  const displayTitle = selectedOption ? selectedOption.label : title;

  return (
    <div
      className="relative"
      style={{ height: buttonHeight }}
      ref={dropdownRef}
    >
      <div className="w-full absolute z-0" style={{ width: '100%' }}>
        <div
          className={`w-full bg-background ${variantStyles.buttonBorder} border-beige-primary ${variantStyles.buttonRadius} overflow-hidden`}
        >
          <button
            ref={buttonRef}
            type="button"
            onClick={handleToggle}
            className={`flex items-center justify-between w-full ${variantStyles.buttonPadding} text-left tracking-[-0.5px] cursor-pointer`}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span
              className={`${variantStyles.textColor} ${variantStyles.textSize} ${variantStyles.fontWeight}`}
            >
              {displayTitle}
            </span>
            <motion.div
              animate={isOpen ? 'open' : 'closed'}
              variants={arrowVariants}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <ArrowIcon />
            </motion.div>
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentVariants}
                className="overflow-hidden border-t border-beige-secondary"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                  maxHeight:
                    options.length + 1 > maxVisibleItems ? maxHeight : 'none',
                  overflowY:
                    options.length + 1 > maxVisibleItems ? 'auto' : 'hidden',
                }}
                role="listbox"
              >
                <div className="divide-y divide-beige-secondary">
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className={`${variantStyles.itemPadding} ${variantStyles.textColor} ${variantStyles.itemTextSize} cursor-pointer hover:bg-beige-tertiary`}
                    onClick={handleTitleClick}
                    role="option"
                  >
                    {title}
                  </motion.div>
                  {options.map((option) => (
                    <motion.div
                      key={option.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.3, delay: 0.05 }}
                      className={`${variantStyles.itemPadding} ${variantStyles.textColor} ${variantStyles.itemTextSize} cursor-pointer hover:bg-beige-tertiary ${
                        selectedOption?.id === option.id
                          ? 'bg-beige-tertiary'
                          : ''
                      }`}
                      onClick={() => handleSelect(option)}
                      role="option"
                      aria-selected={selectedOption?.id === option.id}
                    >
                      {option.label}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
