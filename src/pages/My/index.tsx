import React from 'react';
import PageHeader from '@components/PageHeader';
import RightIcon from '@assets/icons/userright.svg?react';
import UserIcon from '@assets/icons/user.svg?react';
import DeliveryIcon from '@assets/icons/delivery.svg?react';
import SavingsIcon from '@assets/icons/savings.svg?react';
import CouponIcon from '@assets/icons/coupon.svg?react';
import useUserInfoQuery from '@hooks/queries/useUserInfoQuery';
import useLogoutMutation from '@hooks/mutations/useLogoutMutation';

const InfoCard = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="h-[78px] flex-1 bg-background rounded-[10px] shadow-[0px_0px_10px_0px_rgba(156,108,79,0.20)] flex flex-col items-center justify-center cursor-pointer"
  >
    <Icon width={24} height={24} />
    <div className="mt-[2px] text-brown-primary text-[16px] font-bold">
      {label}
    </div>
  </button>
);

const Section = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div className="px-[24px]">
    {title && (
      <div className="text-[16px] font-bold text-brown-primary leading-[28px]">
        {title}
      </div>
    )}
    <div className="mt-[15px] flex flex-col gap-[12px]">{children}</div>
  </div>
);

interface SectionItemProps {
  label: string;
  onClick?: () => void;
}

const SectionItem = ({ label, onClick }: SectionItemProps) => (
  <button
    type="button"
    onClick={onClick}
    className="text-left text-[14px] font-medium text-brown-secondary leading-[28px] cursor-pointer"
  >
    {label}
  </button>
);

const My = () => {
  const { data: user } = useUserInfoQuery();
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm('정말 로그아웃 하시겠습니까?');
    if (!confirmed) return;

    logout();
  };

  return (
    <div className="min-h-screen bg-background overflow-y-auto pb-[100px]">
      <PageHeader title="마이페이지" />
      <div className="px-[24px] pb-[40px]">
        <div className="flex items-center justify-between mt-[24px]">
          <div className="flex items-center gap-[16px]">
            <div className="w-[64px] h-[64px] rounded-full bg-brown-secondary flex items-center justify-center">
              <UserIcon width={24} height={24} />
            </div>
            <div className="leading-[26px]">
              <div className="text-[20px] font-bold text-pink">
                {user?.name}
                <span className="text-brown-primary ml-[4px]">님</span>
              </div>
              <div className="text-[20px] font-bold text-brown-primary">
                환영합니다!
              </div>
            </div>
          </div>
          <RightIcon width={10} height={18} />
        </div>
        <div className="flex gap-[16px] mt-[32px]">
          <InfoCard icon={DeliveryIcon} label="주문/배송" />
          <InfoCard icon={SavingsIcon} label="적립금" />
          <InfoCard icon={CouponIcon} label="쿠폰" />
        </div>
      </div>
      <Section title="나의 활동">
        <SectionItem label="작성한 리뷰" />
      </Section>
      <div className="w-full border-b border-beige-tertiary my-[20px]" />
      <Section title="계정 설정">
        <SectionItem label="배송지 관리" />
        <SectionItem label="환불 계좌 관리" />
        <SectionItem label="회원 정보 수정" />
        <SectionItem label="회원 탈퇴" />
      </Section>
      <div className="w-full border-b border-beige-tertiary my-[20px]" />
      <Section>
        <SectionItem label="개인정보 관리" />
        <SectionItem label="고객센터" />
      </Section>
      <div className="w-full border-b border-beige-tertiary my-[20px]" />
      <Section>
        <SectionItem label="로그아웃" onClick={handleLogout} />
      </Section>
    </div>
  );
};

export default My;
