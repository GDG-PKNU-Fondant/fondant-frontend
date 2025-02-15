import { useState } from 'react';
import { motion } from 'framer-motion';
import { TabNavigatorProps } from '@type/TabNavigator';

const TabNavigator = ({
  tabs,
  onTabChange,
  defaultColor = 'text-gray',
  selectedColor = 'text-brown-primary',
}: TabNavigatorProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);

  const handleTabClick = (key: string) => {
    setSelectedTab(key);
    if (onTabChange) onTabChange(key);
  };

  return (
    <div className="relative flex items-center justify-center space-x-6">
      {tabs.map((tab) => {
        const isSelected = tab.key === selectedTab;
        const textColor =
          tab.customStyles || (isSelected ? selectedColor : defaultColor);

        return (
          <button
            type="button"
            key={tab.key}
            className={`relative py-2 text-[16px] leading-[20px] tracking-[-0.5px] ${
              isSelected ? 'font-bold' : 'font-semibold'
            } ${textColor}`}
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
