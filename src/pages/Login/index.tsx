import LoginButton from '@pages/Login/components/LoginButton';
import CharactersImage from '@assets/images/characters.png';

const DividerWithText = ({ text }: { text: string }) => (
  <div className="flex items-center w-full text-[14px] text-brown-tertiary tracking-[-0.5px]">
    <div className="w-full border-t border-brown-tertiary" />
    <span className="px-[16px] whitespace-nowrap">{text}</span>
    <div className="w-full border-t border-brown-tertiary" />
  </div>
);

const Login = () => {
  return (
    <div className="flex flex-col min-h-dvh items-center p-[36px] justify-between">
      <div className="flex flex-col items-center mt-[96px] mb-[24px]">
        <img src={CharactersImage} alt="fondant" className="w-1/2 mb-[24px]" />
        <div className="text-[20px] text-brown-secondary text-center font-semibold tracking-[-0.5px] leading-[28px] mb-[12px]">
          간편하게 로그인하고, <br /> 다양한 서비스를 이용해 보세요.
        </div>
        <div className="text-[16px] text-brown-tertiary font-medium tracking-[-0.5px]">
          한입에 퐁~ 배송까지 땅!
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center gap-[20px] mb-[90px]">
        <LoginButton type="kakao" onClick={() => {}} />
        <DividerWithText text="또는" />
        <div className="flex justify-center gap-[24px]">
          <LoginButton type="google" onClick={() => {}} />
          <LoginButton type="naver" onClick={() => {}} />
        </div>
        <div className="text-[14px] text-brown-tertiary underline tracking-[-0.5px] cursor-pointer">
          비회원으로 주문하셨나요?
        </div>
      </div>
    </div>
  );
};

export default Login;
