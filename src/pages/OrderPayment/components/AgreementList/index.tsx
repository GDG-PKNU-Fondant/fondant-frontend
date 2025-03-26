import React, { useState } from 'react';
import CheckButton from '@components/CheckButton';

const AgreementList: React.FC = () => {
  const [agreements, setAgreements] = useState({
    all: false,
    personalInfo: false,
    thirdParty: false,
    paymentTerms: false,
  });

  const handleAgreementChange = (key: keyof typeof agreements) => {
    if (key === 'all') {
      const newState = !agreements.all;
      setAgreements({
        all: newState,
        personalInfo: newState,
        thirdParty: newState,
        paymentTerms: newState,
      });
    } else {
      const updatedAgreements = { ...agreements, [key]: !agreements[key] };
      const allChecked =
        updatedAgreements.personalInfo &&
        updatedAgreements.thirdParty &&
        updatedAgreements.paymentTerms;
      setAgreements({ ...updatedAgreements, all: allChecked });
    }
  };

  return (
    <div className="bg-background rounded-[10px] shadow-[0px_0px_10px_0px_rgba(156,108,79,0.15)]">
      <div className="p-[16px] flex items-center gap-[10px]">
        <CheckButton
          selected={agreements.all}
          size={18}
          onClick={() => handleAgreementChange('all')}
        />
        <div className="text-[16px] font-semibold text-brown-primary tracking-[-0.5px]">
          주문내용 확인 및 결제 동의
        </div>
      </div>
      <div className="w-full border-b border-beige-tertiary" />
      <div className="p-[16px] flex flex-col gap-[12px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[10px]">
            <CheckButton
              selected={agreements.personalInfo}
              size={18}
              onClick={() => handleAgreementChange('personalInfo')}
            />
            <div className="text-[11px] font-medium text-brown-secondary tracking-[0.2px] leading-[16px]">
              (필수) 개인정보 수집/이용 동의
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <CheckButton
              selected={agreements.thirdParty}
              size={18}
              onClick={() => handleAgreementChange('thirdParty')}
            />
            <div className="text-[11px] font-medium text-brown-secondary tracking-[0.2px] leading-[16px]">
              (필수) 개인정보 제3자 제공 동의
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <CheckButton
              selected={agreements.paymentTerms}
              size={18}
              onClick={() => handleAgreementChange('paymentTerms')}
            />
            <div className="text-[11px] font-medium text-brown-secondary tracking-[0.2px] leading-[16px]">
              (필수) 결제대행 서비스 이용약관 동의
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementList;
