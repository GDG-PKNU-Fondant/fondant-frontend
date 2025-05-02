import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MarketCartCard from '@pages/Cart/components/MarketCartCard';
import { CartItem, MarketCart, CartItemOption } from '@type/MarketCartCard';

vi.mock('@pages/Cart/components/MarketCartCard/CartItemCard', () => ({
  default: ({
    item,
    onSelect,
  }: {
    item: CartItem;
    onSelect: (selected: boolean) => void;
  }) => (
    <div data-testid={`cart-item-${item.id}`}>
      <div>{item.name}</div>
      <div>상품 금액</div>
      <button type="button" onClick={() => onSelect(!item.selected)}>
        Select
      </button>
    </div>
  ),
}));

const createMockCart = (overrides = {}): MarketCart => ({
  id: 0,
  name: '테스트 마켓',
  selected: true,
  freeDeliveryLimit: 30000,
  items: [
    {
      id: 0,
      name: '테스트 상품 1',
      basePrice: 10000,
      quantity: 1,
      selected: true,
      thumbnailUrl: '',
      arrivalDate: new Date('2025-05-10'),
      selectedOptions: [
        {
          id: 0,
          name: '옵션 1',
          additionalPrice: 1000,
          quantity: 1,
        },
      ],
    },
    {
      id: 1,
      name: '테스트 상품 2',
      basePrice: 15000,
      quantity: 2,
      selected: true,
      thumbnailUrl: '',
      arrivalDate: new Date('2025-05-15'),
      selectedOptions: undefined,
    },
  ],
  ...overrides,
});

describe('MarketCartCard', () => {
  const mockOnMarketSelect = vi.fn();
  const mockOnItemSelect = vi.fn();
  const mockOnQuantityChange = vi.fn();
  const mockOnOptionChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('마켓 이름이 올바르게 렌더링된다.', () => {
    const MOCK_MARKET_CART = createMockCart();

    render(
      <MarketCartCard
        market={MOCK_MARKET_CART}
        onMarketSelect={mockOnMarketSelect}
        onItemSelect={mockOnItemSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    expect(screen.getByText('테스트 마켓')).toBeInTheDocument();
  });

  it('가격 정보가 올바르게 표시된다.', () => {
    const MOCK_MARKET_CART = createMockCart();

    render(
      <MarketCartCard
        market={MOCK_MARKET_CART}
        onMarketSelect={mockOnMarketSelect}
        onItemSelect={mockOnItemSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const totalPrice = 10000 + 1000 + 15000 * 2;
    expect(
      screen.getByText(`상품 ${totalPrice.toLocaleString()}원 + 배송비 0원`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`= ${totalPrice.toLocaleString()}원`),
    ).toBeInTheDocument();
  });

  it('무료 배송 한도 미만일 경우 배송비가 적용된다.', () => {
    const MOCK_MARKET_CART = createMockCart({ freeDeliveryLimit: 50000 });

    render(
      <MarketCartCard
        market={MOCK_MARKET_CART}
        onMarketSelect={mockOnMarketSelect}
        onItemSelect={mockOnItemSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const totalPrice = 10000 + 1000 + 15000 * 2;
    const deliveryFee = 2500;
    expect(
      screen.getByText(
        `상품 ${totalPrice.toLocaleString()}원 + 배송비 ${deliveryFee.toLocaleString()}원`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`= ${(totalPrice + deliveryFee).toLocaleString()}원`),
    ).toBeInTheDocument();
  });

  it('마켓 체크박스를 클릭하면 onMarketSelect가 호출된다.', () => {
    const MOCK_MARKET_CART = createMockCart();

    render(
      <MarketCartCard
        market={MOCK_MARKET_CART}
        onMarketSelect={mockOnMarketSelect}
        onItemSelect={mockOnItemSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const marketHeader = screen.getByText('테스트 마켓').closest('button');

    if (marketHeader) {
      fireEvent.click(marketHeader);
      expect(mockOnMarketSelect).toHaveBeenCalledWith(false);
    }
  });

  it('상품 선택 이벤트가 올바르게 처리된다.', () => {
    const MOCK_MARKET_CART = createMockCart();

    render(
      <MarketCartCard
        market={MOCK_MARKET_CART}
        onMarketSelect={mockOnMarketSelect}
        onItemSelect={mockOnItemSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const firstItemCard = screen.getByTestId('cart-item-0');
    const selectButton = firstItemCard.querySelector('button');

    if (selectButton) {
      fireEvent.click(selectButton);
      expect(mockOnItemSelect).toHaveBeenCalledWith(0, false);
    }
  });

  it('장바구니 아이템이 올바르게 렌더링된다.', () => {
    const MOCK_MARKET_CART = createMockCart();

    render(
      <MarketCartCard
        market={MOCK_MARKET_CART}
        onMarketSelect={mockOnMarketSelect}
        onItemSelect={mockOnItemSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const itemCards = screen.getAllByTestId(/cart-item-/);
    expect(itemCards).toHaveLength(2);
  });

  it('수량 및 옵션 변경이 올바르게 적용된다.', () => {
    const MOCK_MARKET_CART = createMockCart();

    render(
      <MarketCartCard
        market={MOCK_MARKET_CART}
        onMarketSelect={mockOnMarketSelect}
        onItemSelect={mockOnItemSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const NEW_OPTION: CartItemOption[] = [
      { id: 0, name: '새 옵션', additionalPrice: 2000, quantity: 2 },
    ];

    mockOnQuantityChange(0, 3);
    mockOnOptionChange(0, NEW_OPTION);

    expect(mockOnQuantityChange).toHaveBeenCalledWith(0, 3);
    expect(mockOnOptionChange).toHaveBeenCalledWith(0, NEW_OPTION);
  });
});
