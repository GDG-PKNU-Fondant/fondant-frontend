import React, { useState } from 'react';
import RadioButton from '@components/RadioButton';
import tosspay from '@assets/images/tosspay.png';
import kakaopay from '@assets/images/kakaopay.png';

const PaymentMethods: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedOtherMethod, setSelectedOtherMethod] = useState('');

  const handleMethodChange = (method: string) => {
    setSelectedMethod(method);
    if (method !== 'other') {
      setSelectedOtherMethod('');
    }
  };

  const handleOtherMethodChange = (method: string) => {
    if (selectedMethod === 'other') {
      setSelectedOtherMethod(method);
    }
  };

  return (
    <div className="bg-background rounded-[10px] shadow-[0px_0px_10px_0px_rgba(156,108,79,0.15)]">
      <div className="w-full">
        <div className="px-[16px] pt-[16px] pb-[14px]">
          <div className="text-[16px] font-semibold text-brown-primary tracking-[-0.5px]">
            결제 수단
          </div>
        </div>
        <div className="w-full border-b border-beige-tertiary" />
      </div>
      <div className="p-[16px] flex flex-col gap-[12px]">
        <div className="flex items-center gap-[8px]">
          <RadioButton
            selected={selectedMethod === 'toss'}
            size={20}
            onClick={() => handleMethodChange('toss')}
          />
          <div className="flex items-center gap-[2px]">
            <img src={tosspay} alt="토스페이" className="w-[24px] h-[24px]" />
            <div className="text-[14px] font-semibold text-brown-primary">
              토스페이
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[8px]">
          <RadioButton
            selected={selectedMethod === 'kakao'}
            size={20}
            onClick={() => handleMethodChange('kakao')}
          />
          <div className="flex items-center gap-[6px]">
            <img
              src={kakaopay}
              alt="카카오페이"
              className="w-[53px] h-[22px]"
            />
            <div className="text-[14px] font-semibold text-brown-primary">
              카카오페이
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[8px]">
          <RadioButton
            selected={selectedMethod === 'account'}
            size={20}
            onClick={() => handleMethodChange('account')}
          />
          <div className="text-[14px] font-semibold text-brown-primary">
            계좌 간편결제
          </div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[8px]">
            <RadioButton
              selected={selectedMethod === 'other'}
              size={20}
              onClick={() => handleMethodChange('other')}
            />
            <div className="text-[14px] font-semibold text-brown-primary">
              기타 결제
            </div>
          </div>
          <div className="p-[10px] border border-beige-primary rounded-[6px] bg-background flex flex-col gap-[8px] w-full">
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-[8px] flex-grow">
                <RadioButton
                  selected={selectedOtherMethod === 'mobile'}
                  size={20}
                  onClick={() =>
                    selectedMethod === 'other' &&
                    handleOtherMethodChange('mobile')
                  }
                />
                <div className="text-[14px] font-semibold text-brown-primary">
                  휴대폰
                </div>
              </div>
              <div className="flex items-center gap-[8px] flex-grow">
                <RadioButton
                  selected={selectedOtherMethod === 'card'}
                  size={20}
                  onClick={() =>
                    selectedMethod === 'other' &&
                    handleOtherMethodChange('card')
                  }
                />
                <div className="text-[14px] font-semibold text-brown-primary">
                  신용/체크카드
                </div>
              </div>
            </div>
            <div className="flex items-center gap-[8px] flex-grow">
              <RadioButton
                selected={selectedOtherMethod === 'bank'}
                size={20}
                onClick={() =>
                  selectedMethod === 'other' && handleOtherMethodChange('bank')
                }
              />
              <div className="text-[14px] font-semibold text-brown-primary">
                무통장입금
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
