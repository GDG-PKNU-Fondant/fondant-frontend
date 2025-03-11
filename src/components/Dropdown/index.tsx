import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DropdownArrowIcon from '@assets/icons/dropdown-arrow.svg?react';

interface DropdownOption {
  id: number;
  label: string;
}

interface DropdownProps {
  title: string;
  options: DropdownOption[];
  onSelect?: (option: DropdownOption | null) => void;
  maxVisibleItems?: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  onSelect,
  maxVisibleItems = 4,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    null,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const itemHeight = 54;
  const maxHeight = maxVisibleItems * itemHeight;

  const displayTitle = selectedOption ? selectedOption.label : title;

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className="w-full bg-background border-[2px] border-beige-primary rounded-[10px] overflow-hidden">
        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center justify-between w-full p-[16px] text-left tracking-[-0.5px] cursor-pointer"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="text-brown-primary text-[16px] font-semibold">
            {displayTitle}
          </span>
          <motion.div
            animate={isOpen ? 'open' : 'closed'}
            variants={arrowVariants}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <DropdownArrowIcon />
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
                  className="p-[16px] text-brown-primary text-[15px] cursor-pointer hover:bg-beige-tertiary"
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
                    className={`p-[16px] text-brown-primary text-[15px] cursor-pointer hover:bg-beige-tertiary ${
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
  );
};

export default Dropdown;
