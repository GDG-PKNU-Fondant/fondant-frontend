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
    <header className="fixed top-0 left-0 right-0 w-full max-w-[480px] bg-background mx-auto">
      <div className="flex items-center justify-between p-[18px] mt-[9px]">
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
              inset="-2px -1px auto auto"
              count={notificationCount}
            >
              <NotificationIcon />
            </Badge>
          </button>
          <button type="button" onClick={onCartClick} data-testid="cartButton">
            <Badge type="count" count={cartCount} inset="auto -5px -5px auto">
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
    </header>
  );
};

export default Header;
