import Badge from '@components/Badge';
import TabNavigator from '@components/TabNavigator';
import NotificationIcon from '@assets/icons/Notification.svg?react';
import CartIcon from '@assets/icons/cart.svg?react';
import { HeaderTabs } from '@components/TabNavigator/tabs';
import { HeaderProps } from '@type/Header';
import { useAtom, useAtomValue } from 'jotai';
import { cartCountAtom, notificationCountAtom } from '@stores/badgeState';

const Header = ({
  onSearchClick,
  onNotificationClick,
  onCartClick,
}: HeaderProps) => {
  const [notificationCount, setNotificationCount] = useAtom(
    notificationCountAtom,
  );
  const cartCount = useAtomValue(cartCountAtom);

  const handleNotificationClick = () => {
    setNotificationCount(0);
    onNotificationClick();
  };

  return (
    <div className="w-[390px] bg-background z-50">
      <div className="flex items-center justify-between p-4">
        <h1 className="font-black text-[40px] leading-[20px] tracking-[-5px] text-center text-brown-primary">
          LOGO
        </h1>

        <div className="flex space-x-4">
          <Badge
            type="alert"
            position={{ top: '-2px', right: '-1px' }}
            count={notificationCount}
          >
            <button
              onClick={handleNotificationClick}
              data-testid="notificationButton"
            >
              <NotificationIcon />
            </button>
          </Badge>
          <Badge
            type="count"
            count={cartCount}
            position={{ bottom: '0px', right: '-5px' }}
          >
            <button onClick={onCartClick} data-testid="cartButton">
              <CartIcon />
            </button>
          </Badge>
        </div>
      </div>
      <div className="px-4 pb-2">
        <button
          className="w-full h-9 border bg-white border-brown-primary rounded-[5px] font-medium text-placeholder text-4 leading-[20px] tracking-[-0.5px] text-left ps-2"
          onClick={onSearchClick}
        >
          검색
        </button>
      </div>
      <TabNavigator tabs={HeaderTabs} />
    </div>
  );
};

export default Header;
