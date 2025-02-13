import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'jotai';
import Header from './index';
import { cartCountAtom, notificationCountAtom } from '@store/badgeState';
import { useAtom } from 'jotai';

describe('Header Component', () => {
  const mockSearchClick = vi.fn();
  const mockNotificationClick = vi.fn();
  const mockCartClick = vi.fn();

  const JotaiWrapper = ({ children }: { children: React.ReactNode }) => {
    const [, setNotificationCount] = useAtom(notificationCountAtom);
    const [, setCartCount] = useAtom(cartCountAtom);

    setNotificationCount(2);
    setCartCount(3);

    return children;
  };

  const renderHeader = () => {
    return render(
      <Provider>
        <JotaiWrapper>
          <Header
            onSearchClick={mockSearchClick}
            onNotificationClick={mockNotificationClick}
            onCartClick={mockCartClick}
          />
        </JotaiWrapper>
      </Provider>,
    );
  };

  it('로고가 정상적으로 렌더링되는지 확인', () => {
    renderHeader();
    expect(screen.getByText('LOGO')).toBeInTheDocument();
  });

  it('버튼이 정상적으로 렌더링되는지 확인', () => {
    renderHeader();
    expect(screen.getByTestId('notificationButton')).toBeInTheDocument();
    expect(screen.getByTestId('cartButton')).toBeInTheDocument();
  });

  it('Badge가 정상적으로 렌더링되는지 확인', () => {
    renderHeader();

    const badges = screen.getAllByTestId('badge');
    const notificationBadge = badges[0];

    expect(notificationBadge).toHaveClass('bg-pink');

    const cartBadge = badges[1];
    expect(cartBadge).toHaveTextContent('3');
  });

  it('검색 버튼 클릭 시 onSearchClick 이벤트 실행 확인', () => {
    renderHeader();
    const searchButton = screen.getByText('검색');
    fireEvent.click(searchButton);
    expect(mockSearchClick).toHaveBeenCalledTimes(1);
  });

  it('알림 버튼 클릭 시 이벤트 실행 및 알림 개수 초기화 확인', () => {
    renderHeader();
    const notificationButton = screen.getByTestId('notificationButton');
    fireEvent.click(notificationButton);
    expect(mockNotificationClick).toHaveBeenCalledTimes(1);

    expect(screen.queryByTestId('notificationBadge')).not.toBeInTheDocument();
  });

  it('장바구니 버튼 클릭 시 이벤트 실행 확인', () => {
    renderHeader();
    const cartButton = screen.getByTestId('cartButton');
    fireEvent.click(cartButton);
    expect(mockCartClick).toHaveBeenCalledTimes(1);
  });

  it('TabNavigator가 렌더링되는지 확인', () => {
    renderHeader();
    expect(screen.getByText('추천')).toBeInTheDocument();
  });
});
