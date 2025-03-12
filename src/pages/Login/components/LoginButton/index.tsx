import React from 'react';
import NaverIcon from '@assets/icons/naver.png';
import KakaoIcon from '@assets/icons/kakao.png';
import GoogleIcon from '@assets/icons/google.png';

interface LoginButtonProps {
  type: 'naver' | 'kakao' | 'google';
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ type, onClick }) => {
  const buttonDetails = {
    naver: {
      icon: NaverIcon,
      className: 'bg-[#03C75A] p-[15px] rounded-full cursor-pointer',
    },
    kakao: {
      icon: KakaoIcon,
      className:
        'w-[calc(100%-16px)] bg-[#FEE500] text-[#191919] font-semibold p-[15px] rounded-[12px] cursor-pointer',
    },
    google: {
      icon: GoogleIcon,
      className: 'bg-[#F2F2F2] p-[15px] rounded-full cursor-pointer',
    },
  };

  const { icon, className } = buttonDetails[type];

  return type === 'kakao' ? (
    <button type="button" className={className} onClick={onClick}>
      <div className="flex items-center justify-center">
        <img src={icon} alt={type} className="w-[20px] h-[20px] ml-[8px]" />
        <span className="flex-grow text-center">카카오로 시작하기</span>
      </div>
    </button>
  ) : (
    <button type="button" className={className} onClick={onClick}>
      <img src={icon} alt={type} className="w-[20px]" />
    </button>
  );
};

export default LoginButton;
