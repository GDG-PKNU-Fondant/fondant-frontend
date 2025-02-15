import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate, useLocation } from 'react-router-dom';
import TABS from '@components/BottomTab/tabs';
import activeBottomTabAtom, { getInitialTab } from '@stores/bottomTabState';

interface BottomTabItemProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const BottomTabItem: React.FC<BottomTabItemProps> = ({
  Icon,
  label,
  isActive,
  onClick,
}) => (
  <div
    onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
    role="button"
    tabIndex={0}
    className="flex flex-col items-center gap-[4px] cursor-pointer"
  >
    <div className="flex h-[25px] items-center">
      <Icon fill={isActive ? '#BC8462' : 'none'} />
    </div>
    <div className="font-semibold text-[12px] text-brown-primary tracking-[-0.5px]">
      {label}
    </div>
  </div>
);

const BottomTab = () => {
  const [activeTab, setActiveTab] = useAtom(activeBottomTabAtom);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveTab(getInitialTab(location.pathname));
  }, [location.pathname, setActiveTab]);

  const handleTabClick = (tabName: string, path: string) => {
    setActiveTab(tabName);
    navigate(path);
  };

  return (
    <div className="absolute w-[100%] h-[90px] bottom-0 bg-background rounded-tl-[10px] rounded-tr-[10px] shadow-[0px_-4px_10px_0px_rgba(156,108,79,0.10)]">
      <div className="flex justify-around items-center h-full">
        {TABS.map(({ Icon, label, path }) => (
          <BottomTabItem
            key={label}
            Icon={Icon}
            label={label}
            isActive={activeTab === label}
            onClick={() => handleTabClick(label, path)}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomTab;
