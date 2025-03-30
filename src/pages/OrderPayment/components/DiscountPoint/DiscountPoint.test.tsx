import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DiscountPoint from '@pages/OrderPayment/components/DiscountPoint';
import MOCK_POINT from '@mocks/constants/mockPoint';
import MOCK_ORDER_PRODUCTS from '@mocks/constants/mockOrderProducts';

describe('DiscountPoint Component', () => {
  const totalPrice = MOCK_ORDER_PRODUCTS.reduce(
    (sum, item) => sum + item.price,
    0,
  );
  const maxAvailablePoint = Math.min(
    MOCK_POINT.totalPoint,
    Math.floor(totalPrice * 0.1),
  );

  it('전액사용 버튼 클릭 시 최대 포인트가 입력된다', () => {
    render(<DiscountPoint />);
    const button = screen.getByRole('button', { name: /전액사용/i });
    fireEvent.click(button);

    expect(
      screen.getByDisplayValue(maxAvailablePoint.toLocaleString()),
    ).toBeInTheDocument();
  });

  it('10원 단위가 아닌 값은 onBlur 시 반올림 처리된다', () => {
    render(<DiscountPoint />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.blur(input);

    expect(screen.getByDisplayValue('1,230')).toBeInTheDocument();
  });

  it('입력값이 사용가능 포인트보다 크면 사용가능 포인트로 제한된다', () => {
    render(<DiscountPoint />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '9999999' } });
    fireEvent.blur(input);

    expect(
      screen.getByDisplayValue(maxAvailablePoint.toLocaleString()),
    ).toBeInTheDocument();
  });

  it('totalPoint가 상품 총액의 10%보다 작으면 사용가능 포인트가 totalPoint로 제한된다', () => {
    const { totalPoint } = MOCK_POINT;
    const tenPercentOfProduct = Math.floor(totalPrice * 0.1);
    const expectedPoint = Math.min(totalPoint, tenPercentOfProduct);

    render(<DiscountPoint />);
    const button = screen.getByRole('button', { name: /전액사용/i });
    fireEvent.click(button);

    expect(
      screen.getByDisplayValue(expectedPoint.toLocaleString()),
    ).toBeInTheDocument();
  });
});
