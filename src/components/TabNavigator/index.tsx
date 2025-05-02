import { useState } from 'react';
import { motion } from 'framer-motion';
import { TabNavigatorProps } from '@type/TabNavigator';

const TabNavigator = ({
  tabs,
  onTabChange,
  defaultColor = 'text-brown-secondary',
  selectedColor = 'text-brown-primary',
  bottomBorder,
  textSize = 16,
  fixedTextSize,
  fixedFontWeight,
}: TabNavigatorProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);

  const handleTabClick = (key: string) => {
    setSelectedTab(key);
    if (onTabChange) onTabChange(key);
  };

  return (
    <div className="relative px-[20px]">
      <div className="flex items-center justify-between pb-[5px]">
        {tabs.map((tab) => {
          const isSelected = tab.key === selectedTab;
          const textColor =
            tab.fixedColor || (isSelected ? selectedColor : defaultColor);

          const fontSize =
            fixedTextSize || (isSelected ? textSize + 2 : textSize);

          const fontWeight =
            fixedFontWeight || (isSelected ? 'font-bold' : 'font-medium');

          return (
            <button
              type="button"
              key={tab.key}
              className={`relative py-[8px] leading-[20px] tracking-[-0.5px] ${fontWeight} ${textColor}`}
              style={{ fontSize: `${fontSize}px` }}
              onClick={() => handleTabClick(tab.key)}
            >
              {tab.label}
              {isSelected && (
                <motion.div
                  data-testid="tab-indicator"
                  layoutId="tab-indicator"
                  className={`absolute bottom-[-2px] h-[3px]  w-[100%] rounded-[3px] ${textColor} bg-current`}
                />
              )}
            </button>
          );
        })}
      </div>
      {bottomBorder && (
        <div className="w-full h-[1px] bg-beige-secondary mt-[-3px]" />
      )}
    </div>
  );
};

export default TabNavigator;
