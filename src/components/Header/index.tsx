import Badge from '@components/Badge';
import TabNavigator from '@components/TabNavigator';
import NotificationIcon from '@assets/icons/Notification.svg?react';
import CartIcon from '@assets/icons/cart.svg?react';
import { HEADER_TABS } from '@components/TabNavigator/tabs';
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
    <div className="w-full bg-background z-50">
      <div className="flex items-center justify-between p-4">
        <h1 className="font-black text-[40px] leading-[20px] tracking-[-5px] text-center text-brown-primary">
          LOGO
        </h1>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleNotificationClick}
            data-testid="notificationButton"
          >
            <Badge
              type="alert"
              position={{ top: '-2px', right: '-1px' }}
              count={notificationCount}
            >
              <NotificationIcon />
            </Badge>
          </button>
          <button type="button" onClick={onCartClick} data-testid="cartButton">
            <Badge
              type="count"
              count={cartCount}
              position={{ bottom: '0px', right: '-5px' }}
            >
              <CartIcon />
            </Badge>
          </button>
        </div>
      </div>
      <div className="px-4 pb-2">
        <button
          type="button"
          className="w-full h-9 border bg-white border-brown-primary rounded-[5px] font-medium text-placeholder text-4 leading-[20px] tracking-[-0.5px] text-left ps-2"
          onClick={onSearchClick}
        >
          검색
        </button>
      </div>
      <TabNavigator tabs={HEADER_TABS} />
    </div>
  );
};

export default Header;
