import React, { useState, useEffect } from 'react';
import RightIcon from '@assets/icons/right.svg?react';
import Button from '@components/Button';
import MOCK_COUPON from '@mocks/constants/mockCoupon';
import MOCK_POINT from '@mocks/constants/mockPoint';
import MOCK_ORDER_PRODUCTS from '@mocks/constants/mockOrderProducts';

const DiscountPoint: React.FC = () => {
  const coupon = MOCK_COUPON;
  const { totalPoint } = MOCK_POINT;

  const productPrice = MOCK_ORDER_PRODUCTS.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  const pointLimitByPrice = Math.floor(productPrice * 0.1);
  const maxAvailablePoint = Math.min(totalPoint, pointLimitByPrice);

  const [pointInput, setPointInput] = useState('');
  const [isFullUsed, setIsFullUsed] = useState(false);

  useEffect(() => {
    if (isFullUsed) {
      setPointInput(maxAvailablePoint.toLocaleString());
    }
  }, [isFullUsed, maxAvailablePoint]);

  const handlePointInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    setPointInput(rawValue);
    if (isFullUsed) setIsFullUsed(false);
  };

  const handlePointInputBlur = () => {
    const inputValue = Number(pointInput);

    if (Number.isNaN(inputValue) || pointInput === '') {
      setPointInput('');
      return;
    }

    const clamped = Math.min(inputValue, maxAvailablePoint);
    const rounded = Math.floor(clamped / 10) * 10;
    setPointInput(rounded.toLocaleString());
  };

  const handleFullUse = () => {
    setIsFullUsed((prev) => !prev);
  };

  return (
    <div className="bg-background rounded-[10px] shadow-[0px_0px_10px_0px_rgba(156,108,79,0.15)]">
      <div className="w-full">
        <div className="p-[16px]">
          <div className="text-[16px] font-semibold text-brown-primary tracking-[-0.5px]">
            할인/포인트
          </div>
        </div>
        <div className="w-full border-b border-beige-tertiary" />
      </div>
      <div className="p-[16px] flex flex-col gap-[12px]">
        <div className="flex justify-between items-center px-[12px] py-[10px] border border-beige-secondary rounded-[6px] bg-white">
          <div className="text-[14px] font-semibold text-brown-primary">
            쿠폰
          </div>
          <div className="flex items-center gap-[6px]">
            <div className="text-[12px] font-medium text-brown-secondary">
              최대 {coupon.discountAmount.toLocaleString()}원 할인
            </div>
            <RightIcon />
          </div>
        </div>
        <div className="px-[12px] py-[10px] border border-beige-secondary rounded-[6px] bg-white">
          <div className="flex justify-between items-center">
            <div className="text-[14px] font-semibold text-brown-primary">
              포인트 사용
            </div>
            <div className="flex items-center gap-[8px]">
              <input
                type="text"
                inputMode="numeric"
                value={pointInput}
                onChange={handlePointInputChange}
                onBlur={handlePointInputBlur}
                className="w-[153px] min-w-[153px] h-[25px] border border-beige-primary rounded-[6px] text-[12px] font-normal text-brown-secondary pr-[4px] bg-background text-right placeholder:text-brown-secondary"
                placeholder="0"
              />
              <Button
                variant={isFullUsed ? 'primary' : 'secondary'}
                size="small"
                onClick={handleFullUse}
              >
                전액사용
              </Button>
            </div>
          </div>
          <div className="text-[12px] font-normal text-brown-secondary text-right mt-[4px]">
            사용가능 : {maxAvailablePoint.toLocaleString()}P / 보유 :{' '}
            {totalPoint.toLocaleString()}P
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountPoint;
