import React from 'react';
import RightIcon from '@assets/icons/right.svg?react';
import MemoOptionsProps from '@type/MemoOptions';
import Dropdown from '@components/Dropdown';
import MOCK_DELIVERY_ADDRESS from '@mocks/constants/mockDeliveryAddress';

const memoOptions: MemoOptionsProps[] = [
  { id: 1, label: '부재 시 문 앞에 놓아주세요.' },
  { id: 2, label: '배송 전 연락 부탁드려요.' },
  { id: 3, label: '경비실에 맡겨주세요.' },
];

const DeliveryAddress: React.FC = () => {
  const { label, name, phone, address, detailAddress } = MOCK_DELIVERY_ADDRESS;

  return (
    <div className="w-full bg-background rounded-[10px] shadow-lg p-[16px] flex flex-col gap-[8px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-[16px] font-semibold text-brown-primary tracking-[-0.5px]">
            {label}
          </div>
          <div className="flex text-[10px] font-normal text-pink border border-pink px-[4px] rounded-[2px] ml-[6px]">
            기본배송지
          </div>
        </div>
        <RightIcon className="ml-auto" />
      </div>
      <div className="text-[14px] font-medium text-brown-primary">
        {name} {phone}
      </div>
      <div className="text-[13px] font-medium text-brown-secondary tracking-[0.2px] leading-[16px]">
        {address},<br />
        {detailAddress}
      </div>
      <div className="mt-auto">
        <Dropdown title="배송 메모를 선택해주세요." options={memoOptions} />
      </div>
    </div>
  );
};

export default DeliveryAddress;
