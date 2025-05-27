import { useNavigate } from 'react-router-dom';
import PageHeader from '@components/PageHeader';
import RightIcon from '@assets/icons/userright.svg?react';
import UserIcon from '@assets/icons/user.svg?react';
import DeliveryIcon from '@assets/icons/delivery.svg?react';
import SavingsIcon from '@assets/icons/savings.svg?react';
import CouponIcon from '@assets/icons/coupon.svg?react';
import useUserInfoQuery from '@hooks/queries/useUserInfoQuery';
import useLogoutMutation from '@hooks/mutations/useLogoutMutation';

const My = () => {
  const { data: user } = useUserInfoQuery();
  const navigate = useNavigate();
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
      },
    });
  };

  return (
    <div className="min-h-screen bg-background overflow-y-auto">
      <div className="px-[24px] pb-[40px]">
        <PageHeader title="마이페이지" />
        <div className="flex items-center justify-between mt-[24px]">
          <div className="flex items-center gap-[16px]">
            <div className="w-[64px] h-[64px] rounded-full bg-brown-secondary flex items-center justify-center">
              <UserIcon width={24} height={24} />
            </div>
            <div className="leading-[26px]">
              <div className="text-[20px] font-bold text-pink">
                {user?.name}
                <span className="text-brown-primary ml-1">님</span>
              </div>
              <div className="text-[20px] font-bold text-brown-primary">
                환영합니다!
              </div>
            </div>
          </div>
          <RightIcon width={10} height={18} />
        </div>
        <div className="flex gap-[15px] mt-[30px]">
          <div className="h-[78px] flex-1 bg-background rounded-[10px] shadow-[0px_0px_10px_0px_rgba(156,108,79,0.20)] flex flex-col items-center justify-center">
            <DeliveryIcon width={24} height={24} />
            <div className="mt-[2px] text-brown-primary text-[16px] font-bold">
              주문배송
            </div>
          </div>
          <div className="h-[78px] flex-1 bg-background rounded-[10px] shadow-[0px_0px_10px_0px_rgba(156,108,79,0.20)] flex flex-col items-center justify-center">
            <SavingsIcon width={24} height={24} />
            <div className="mt-[2px] text-brown-primary text-[16px] font-bold">
              적립금
            </div>
          </div>
          <div className="h-[78px] flex-1 bg-background rounded-[10px] shadow-[0px_0px_10px_0px_rgba(156,108,79,0.20)] flex flex-col items-center justify-center">
            <CouponIcon width={24} height={24} />
            <div className="mt-[2px] text-brown-primary text-[16px] font-bold">
              쿠폰
            </div>
          </div>
        </div>
      </div>
      <div className="px-[24px] ml-[10px]">
        <div className="text-[16px] font-bold text-brown-primary leading-[28px]">
          나의 활동
        </div>
        <div className="mt-[15px] flex flex-col gap-[12px]">
          <div className="text-[14px] font-medium text-brown-secondary leading-[28px]">
            작성한 리뷰
          </div>
        </div>
      </div>
      <div className="w-full border-b border-beige-tertiary mt-[20px] mb-[20px]" />
      <div className="px-[24px] ml-[10px]">
        <div className="text-[16px] font-bold text-brown-primary leading-[28px]">
          계정설정
        </div>
        <div className="mt-[15px] flex flex-col gap-[12px]">
          <div className="text-[14px] font-medium text-brown-secondary leading-[28px]">
            배송지 관리
          </div>
          <div className="text-[14px] font-medium text-brown-secondary leading-[28px]">
            환불계좌관리
          </div>
          <div className="text-[14px] font-medium text-brown-secondary leading-[28px]">
            회원정보 수정
          </div>
          <div className="text-[14px] font-medium text-brown-secondary leading-[28px]">
            회원탈퇴
          </div>
        </div>
      </div>
      <div className="w-full border-b border-beige-tertiary mt-[20px] mb-[20px]" />
      <div className="px-[24px] ml-[10px]">
        <div className="flex flex-col gap-[12px]">
          <div className="text-[14px] font-medium text-brown-secondary leading-[28px]">
            개인정보 관리
          </div>
          <div className="text-[14px] font-medium text-brown-secondary leading-[28px]">
            고객센터
          </div>
        </div>
      </div>
      <div className="w-full border-b border-beige-tertiary mt-[20px] mb-[20px]" />
      <div className="px-[24px] ml-[10px] mb-[100px]">
        <button
          type="button"
          onClick={handleLogout}
          className="text-[14px] font-medium text-brown-secondary leading-[28px] cursor-pointer"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default My;
