import React, { useState } from 'react';
import RadioButton from '@components/RadioButton';

const REASONS = [
  '상품 / 옵션을 잘못 선택',
  '상품 추가 및 혜택 적용 후 재구매 예정',
  '단순 변심 및 기타',
];

const CancelReason: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState(REASONS[0]);
  const [text, setText] = useState('');

  const handleTextLength = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length <= 500) {
      setText(value);
    }
  };

  return (
    <div className="w-full rounded-[10px] shadow-[0px_0px_10px_0px_rgba(156,108,79,0.15)] bg-background">
      <div className="px-[14px] pt-[14px] pb-[12px]">
        <div className="text-[16px] font-semibold text-brown-primary leading-[15px] tracking-[-0.5px]">
          취소 사유
        </div>
      </div>
      <div className="w-full border-b border-beige-tertiary" />
      <div className="pt-[14px] px-[14px] pb-[20px] flex flex-col gap-[8px]">
        {REASONS.map((reason) => (
          <button
            type="button"
            key={reason}
            className="w-full h-[40px] px-[12px] flex items-center gap-[10px] rounded-[5px] border border-beige-primary"
            onClick={() => setSelectedReason(reason)}
          >
            <RadioButton selected={selectedReason === reason} size={20} />
            <div className="text-[13px] text-brown-primary font-medium">
              {reason}
            </div>
          </button>
        ))}
        <div className="relative mt-[18px] w-full">
          <textarea
            placeholder="상세 사유를 입력해주세요."
            className="w-full h-[134px] resize-none scrollbar-hide bg-background border border-beige-primary rounded-[5px] p-[12px] text-[13px] text-brown-secondary placeholder:text-brown-secondary"
            maxLength={500}
            onChange={handleTextLength}
          />
          <div className="absolute bottom-[12px] right-[12px] text-[12px] text-beige-primary">
            {text.length}/500
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelReason;
