import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItemCard from '@pages/Cart/components/MarketCartCard/CartItemCard';
import { CartItem, CartItemOption } from '@type/MarketCartCard';

vi.mock('@components/QuantityController', () => ({
  default: ({
    value,
    onChange,
  }: {
    value: number;
    onChange: (value: number) => void;
  }) => (
    <div>
      <button
        type="button"
        data-testid="decrease-quantity"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
      >
        +
      </button>
      <span data-testid="quantity-value">{value}</span>
      <button
        type="button"
        data-testid="increase-quantity"
        onClick={() => onChange(value + 1)}
      >
        -
      </button>
    </div>
  ),
}));

vi.mock('@components/Button', () => ({
  default: ({
    children,
    onClick,
    disabled,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
  }) => (
    <button type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

vi.mock('@components/CheckButton', () => ({
  default: ({ selected }: { selected: boolean; rounded: boolean }) => (
    <div data-testid="check-button" data-selected={selected} />
  ),
}));

vi.mock('@components/BottomSheet', () => ({
  default: ({
    children,
    sheetKey,
  }: {
    children: React.ReactNode;
    sheetKey: string;
  }) => <div data-testid={sheetKey}>{children}</div>,
}));

const mockCalculateItemTotal = vi.fn().mockImplementation((item: CartItem) => {
  let total = item.basePrice * item.quantity;
  if (item.selectedOptions) {
    item.selectedOptions.forEach((option) => {
      total += option.additionalPrice * option.quantity;
    });
  }
  return total;
});

vi.mock('@utils/cartCalculations', () => ({
  calculateItemTotal: (item: CartItem) => mockCalculateItemTotal(item),
}));

const mockOpenModal = vi.fn();
const mockCloseModal = vi.fn();
vi.mock('@hooks/useModal', () => ({
  default: () => ({
    openModal: mockOpenModal,
    closeModal: mockCloseModal,
  }),
}));

vi.mock('@pages/Cart/components/ProductOptionSheetContent', () => ({
  default: ({
    onClose,
    item,
    totalPrice,
    onOptionChange,
  }: {
    onClose: () => void;
    item: CartItem;
    totalPrice: number;
    onOptionChange: (options: CartItemOption[]) => void;
  }) => (
    <div data-testid="product-option-sheet-content">
      <div>상품: {item.name}</div>
      <div>가격: {totalPrice.toLocaleString()}원</div>
      <button
        type="button"
        data-testid="option-change-button"
        onClick={() =>
          onOptionChange([
            { id: 2, name: '새 옵션', additionalPrice: 2000, quantity: 2 },
          ])
        }
      >
        변경
      </button>
      <button type="button" data-testid="close-button" onClick={onClose}>
        닫기
      </button>
    </div>
  ),
}));

const createMockItem = (overrides = {}): CartItem => ({
  id: 1,
  name: '테스트 상품',
  basePrice: 10000,
  quantity: 1,
  selected: true,
  thumbnailUrl: '',
  arrivalDate: new Date(),
  selectedOptions: [
    {
      id: 1,
      name: '옵션 1',
      additionalPrice: 1000,
      quantity: 1,
    },
  ],
  ...overrides,
});

describe('CartItemCard', () => {
  const calculateExpectedTotal = (item: CartItem) => {
    let total = item.basePrice * item.quantity;
    if (item.selectedOptions) {
      item.selectedOptions.forEach((option) => {
        total += option.additionalPrice * option.quantity;
      });
    }
    return total;
  };
  const mockOnSelect = vi.fn();
  const mockOnQuantityChange = vi.fn();
  const mockOnOptionChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockCalculateItemTotal.mockClear();
    mockCalculateItemTotal.mockImplementation((item: CartItem) => {
      let total = item.basePrice * item.quantity;
      if (item.selectedOptions) {
        item.selectedOptions.forEach((option) => {
          total += option.additionalPrice * option.quantity;
        });
      }
      return total;
    });
  });

  it('상품 정보가 올바르게 렌더링된다.', () => {
    const MOCK_ITEM = createMockItem();

    render(
      <CartItemCard
        item={MOCK_ITEM}
        onSelect={mockOnSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    expect(screen.getByText('테스트 상품')).toBeInTheDocument();
    expect(screen.getByAltText('테스트 상품')).toBeInTheDocument();
    expect(screen.getByText('옵션 1')).toBeInTheDocument();
    expect(screen.getByText('(+1,000원)')).toBeInTheDocument();
  });

  it('상품 가격이 올바르게 계산되어 표시된다.', () => {
    const MOCK_ITEM = createMockItem({
      basePrice: 15000,
      quantity: 2,
      selectedOptions: [
        { id: 1, name: '옵션 1', additionalPrice: 2000, quantity: 2 },
        { id: 2, name: '옵션 2', additionalPrice: 3000, quantity: 1 },
      ],
    });

    const expectedTotal = 37000;

    mockCalculateItemTotal.mockClear();
    mockCalculateItemTotal.mockReturnValueOnce(expectedTotal);

    render(
      <CartItemCard
        item={MOCK_ITEM}
        onSelect={mockOnSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    expect(mockCalculateItemTotal).toHaveBeenCalledWith(MOCK_ITEM);
    expect(screen.getByText('37,000원')).toBeInTheDocument();

    expect(calculateExpectedTotal(MOCK_ITEM)).toBe(expectedTotal);
  });

  it('옵션이 없는 상품도 올바르게 렌더링된다.', () => {
    const MOCK_ITEM = createMockItem({
      selectedOptions: undefined,
      basePrice: 12000,
      quantity: 2,
    });

    mockCalculateItemTotal.mockClear();

    render(
      <CartItemCard
        item={MOCK_ITEM}
        onSelect={mockOnSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    expect(screen.getByText('테스트 상품')).toBeInTheDocument();
    expect(screen.getByText('단일 옵션 상품')).toBeInTheDocument();

    expect(mockCalculateItemTotal).toHaveBeenCalledWith(MOCK_ITEM);
    expect(screen.getByText('24,000원')).toBeInTheDocument();
  });

  it('체크박스 클릭 시 onSelect가 올바르게 호출된다.', () => {
    const MOCK_ITEM = createMockItem();

    render(
      <CartItemCard
        item={MOCK_ITEM}
        onSelect={mockOnSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const checkButton = screen.getByTestId('check-button').parentElement;
    fireEvent.click(checkButton!);
    expect(mockOnSelect).toHaveBeenCalledWith(false);
  });

  it('수량 변경 시 onQuantityChange가 올바르게 호출되고, 가격이 올바르게 변경된다.', () => {
    const MOCK_ITEM = createMockItem({
      basePrice: 10000,
      quantity: 1,
      selectedOptions: [
        { id: 1, name: '옵션 1', additionalPrice: 1000, quantity: 1 },
      ],
    });

    const updatedItem = {
      ...MOCK_ITEM,
      quantity: 2,
    };

    mockCalculateItemTotal
      .mockReturnValueOnce(11000)
      .mockReturnValueOnce(21000);

    const { rerender } = render(
      <CartItemCard
        item={MOCK_ITEM}
        onSelect={mockOnSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const priceElement = screen.getByText(/11,000원/i);
    expect(priceElement).toBeInTheDocument();

    const increaseButton = screen.getByTestId('increase-quantity');
    fireEvent.click(increaseButton);
    expect(mockOnQuantityChange).toHaveBeenCalledWith(2);

    rerender(
      <CartItemCard
        item={updatedItem}
        onSelect={mockOnSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    expect(mockCalculateItemTotal).toHaveBeenCalledWith(updatedItem);
    expect(screen.getByText('21,000원')).toBeInTheDocument();
  });

  it('옵션 변경 버튼이 선택된 옵션이 있을 때만 활성화된다.', () => {
    const ITEM_WITH_OPTIONS = createMockItem({
      selectedOptions: [
        { id: 1, name: '옵션 1', additionalPrice: 1000, quantity: 1 },
      ],
    });

    const ITEM_WITHOUT_OPTIONS = createMockItem({
      selectedOptions: undefined,
    });

    const { rerender } = render(
      <CartItemCard
        item={ITEM_WITH_OPTIONS}
        onSelect={mockOnSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const optionButton = screen.getByText('옵션 변경');
    expect(optionButton).not.toBeDisabled();

    rerender(
      <CartItemCard
        item={ITEM_WITHOUT_OPTIONS}
        onSelect={mockOnSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const disabledOptionButton = screen.getByText('단일 옵션 상품');
    expect(disabledOptionButton).toBeDisabled();
  });

  it('상품이 선택 해제 상태일 때도 올바르게 표시된다.', () => {
    const MOCK_ITEM = createMockItem({ selected: false });

    render(
      <CartItemCard
        item={MOCK_ITEM}
        onSelect={mockOnSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const checkButton = screen.getByTestId('check-button');
    expect(checkButton).toHaveAttribute('data-selected', 'false');
  });

  it('옵션 변경 시트가 렌더링되고, 옵션 변경 시 가격이 올바르게 변경된다.', () => {
    const MOCK_ITEM = createMockItem({
      basePrice: 10000,
      quantity: 1,
      selectedOptions: [
        { id: 1, name: '옵션 1', additionalPrice: 1000, quantity: 1 },
      ],
    });

    const updatedOptions: CartItemOption[] = [
      { id: 2, name: '새 옵션', additionalPrice: 2000, quantity: 2 },
    ];

    const updatedItem = {
      ...MOCK_ITEM,
      selectedOptions: updatedOptions,
    };

    mockCalculateItemTotal.mockReturnValueOnce(11000);

    const { rerender } = render(
      <CartItemCard
        item={MOCK_ITEM}
        onSelect={mockOnSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    expect(
      screen.getByTestId(`product-option-sheet-${MOCK_ITEM.id}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('product-option-sheet-content'),
    ).toBeInTheDocument();
    expect(screen.getByText('11,000원')).toBeInTheDocument();

    const optionChangeButton = screen.getByTestId('option-change-button');
    mockCalculateItemTotal.mockClear();
    mockCalculateItemTotal.mockReturnValueOnce(14000);
    fireEvent.click(optionChangeButton);

    expect(mockOnOptionChange).toHaveBeenCalledWith(updatedOptions);

    rerender(
      <CartItemCard
        item={updatedItem}
        onSelect={mockOnSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    expect(mockCalculateItemTotal).toHaveBeenCalledWith(updatedItem);
    expect(screen.getByText('14,000원')).toBeInTheDocument();
    expect(screen.getByText('새 옵션')).toBeInTheDocument();
    expect(screen.getByText('(+2,000원)')).toBeInTheDocument();
  });

  it('옵션 변경 후 onOptionChange가 올바르게 호출된다.', () => {
    const MOCK_ITEM = createMockItem();

    render(
      <CartItemCard
        item={MOCK_ITEM}
        onSelect={mockOnSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const optionChangeButton = screen.getByTestId('option-change-button');
    fireEvent.click(optionChangeButton);

    expect(mockOnOptionChange).toHaveBeenCalledWith([
      { id: 2, name: '새 옵션', additionalPrice: 2000, quantity: 2 },
    ]);

    expect(mockCloseModal).toHaveBeenCalledWith('product-option-sheet');
  });

  it('다수의 옵션이 있을 때도 모두 표시된다.', () => {
    const MOCK_ITEM = createMockItem({
      selectedOptions: [
        { id: 1, name: '옵션 1', additionalPrice: 1000, quantity: 1 },
        { id: 2, name: '옵션 2', additionalPrice: 2000, quantity: 2 },
      ],
    });

    render(
      <CartItemCard
        item={MOCK_ITEM}
        onSelect={mockOnSelect}
        onQuantityChange={mockOnQuantityChange}
        onOptionChange={mockOnOptionChange}
      />,
    );

    expect(screen.getByText('옵션 1')).toBeInTheDocument();
    expect(screen.getByText('(+1,000원)')).toBeInTheDocument();
    expect(screen.getByText('옵션 2')).toBeInTheDocument();
    expect(screen.getByText('(+2,000원)')).toBeInTheDocument();
  });
});
