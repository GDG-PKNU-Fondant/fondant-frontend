import { useState } from 'react';
import { motion } from 'framer-motion';
import { TabNavigatorProps } from '@type/TabNavigator';

const TabNavigator = ({
  tabs,
  onTabChange,
  defaultColor = 'text-brown-secondary',
  selectedColor = 'text-brown-primary',
  textSize = 16,
  fixedTextSize,
  type = 'outer',
}: TabNavigatorProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);

  const handleTabClick = (key: string) => {
    setSelectedTab(key);
    if (onTabChange) onTabChange(key);
  };

  return (
    <div className="relative flex items-center justify-between space-x-1 px-[20px]">
      {tabs.map((tab) => {
        const isSelected = tab.key === selectedTab;
        const textColor =
          tab.fixedColor || (isSelected ? selectedColor : defaultColor);

        const fontSize =
          fixedTextSize || (isSelected ? textSize + 2 : textSize);

        const fontWeight =
          type === 'inner'
            ? 'font-normal'
            : (isSelected && 'font-bold') || 'font-semibold';

        return (
          <button
            type="button"
            key={tab.key}
            className={`relative py-2 leading-[20px] tracking-[-0.5px] ${fontWeight} ${textColor}`}
            style={{ fontSize: `${fontSize}px` }}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
            {isSelected && (
              <motion.div
                data-testid="tab-indicator"
                layoutId="tab-indicator"
                className={`absolute bottom-[-2px] h-[3px]  w-[80%] left-[10%] ${textColor} bg-current`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigator;
