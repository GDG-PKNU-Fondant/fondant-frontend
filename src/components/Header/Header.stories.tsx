import type { Meta, StoryObj } from '@storybook/react';
import Header from '@components/Header';
import { HeaderProps } from '@type/Header';
import { useAtom, Provider } from 'jotai';
import { notificationCountAtom, cartCountAtom } from '@stores/badgeState';
import { useEffect } from 'react';

const JotaiWrapper = ({ children, nCount, cCount }: any) => {
  const [notificationCount, setNotificationCount] = useAtom(
    notificationCountAtom,
  );
  const [cartCount, setCartCount] = useAtom(cartCountAtom);

  useEffect(() => {
    if (notificationCount !== nCount) setNotificationCount(nCount);
    if (cartCount !== cCount) setCartCount(cCount);
  }, [
    nCount,
    cCount,
    notificationCount,
    cartCount,
    setNotificationCount,
    setCartCount,
  ]);

  return children;
};

const meta: Meta<
  { notificationCount: number; cartCount: number } & HeaderProps
> = {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story, { args }) => (
      <Provider>
        <JotaiWrapper nCount={args.notificationCount} cCount={args.cartCount}>
          <Story />
        </JotaiWrapper>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<
  { notificationCount: number; cartCount: number } & HeaderProps
>;

export const Default: Story = {
  args: {
    notificationCount: 2,
    cartCount: 3,
    onSearchClick: () => alert('🔍 검색 버튼 클릭'),
    onNotificationClick: () => alert('🔔 알림 버튼 클릭'),
    onCartClick: () => alert('🛒 장바구니 버튼 클릭'),
  },
  render: ({ notificationCount, cartCount, ...rest }) => <Header {...rest} />,
};
