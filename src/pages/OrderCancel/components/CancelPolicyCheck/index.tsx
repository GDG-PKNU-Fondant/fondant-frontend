import React, { useState } from 'react';
import CheckButton from '@components/CheckButton';

const CancelPolicyCheck: React.FC = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="w-full h-[46px] bg-background rounded-[10px] shadow-[0px_0px_10px_0px_rgba(156,108,79,0.15)] flex items-center px-[14px] gap-[8px]">
      <button type="button" onClick={() => setAgreed(!agreed)}>
        <CheckButton selected={agreed} />
      </button>
      <div className="text-[14px] text-brown-primary font-semibold leading-[16px]">
        취소 정책 내용을 확인했습니다.
      </div>
    </div>
  );
};

export default CancelPolicyCheck;
