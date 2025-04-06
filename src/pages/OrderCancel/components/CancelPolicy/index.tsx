import React from 'react';

const CancelPolicy: React.FC = () => {
  return (
    <div className="w-full rounded-[10px] bg-background shadow-[0px_0px_10px_0px_rgba(156,108,79,0.15)]">
      <div className="px-[14px] pt-[14px] pb-[12px]">
        <div className="text-[16px] font-semibold text-brown-primary leading-[15px] tracking-[-0.5px]">
          취소 정책
        </div>
      </div>
      <div className="w-full border-b border-beige-tertiary" />
      <div className="h-[364px] px-[14px] pt-[14px] pb-[20px] text-[13px] text-brown-secondary leading-[16px]">
        취소 정책 내용 쭈루루루루룩
      </div>
    </div>
  );
};

export default CancelPolicy;
