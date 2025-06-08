import LoginButton from '@pages/Login/components/LoginButton';
import CharactersImage from '@assets/images/characters.png';

const DividerWithText = ({ text }: { text: string }) => (
  <div className="flex items-center w-full text-[14px] text-brown-tertiary tracking-[-0.5px]">
    <div className="w-full border-t border-brown-tertiary" />
    <span className="px-[16px] whitespace-nowrap">{text}</span>
    <div className="w-full border-t border-brown-tertiary" />
  </div>
);

type OAuthProvider = 'kakao' | 'google' | 'naver';

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const openOAuthPopup = (provider: OAuthProvider) => {
  window.open(
    `${SERVER_URL}/oauth2/authorization/${provider}`,
    `${provider}-login`,
    'width=600,height=800',
  );

  return new Promise<string | null>((resolve) => {
    const listener = (event: MessageEvent) => {
      if (event.origin !== SERVER_URL) return;

      const { accessToken } = event.data;

      if (accessToken) {
        resolve(accessToken);
      } else {
        resolve(null);
      }

      window.removeEventListener('message', listener);
    };

    window.addEventListener('message', listener);
  });
};

const Login = () => {
  const handleLoginClick = async (provider: OAuthProvider) => {
    try {
      const token = await openOAuthPopup(provider);
      if (token) {
        localStorage.setItem('accessToken', token);
      }
    } catch (err) {
      // console.error('로그인 중 에러 발생:', err);
    }
  };

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
        <LoginButton type="kakao" onClick={() => handleLoginClick('kakao')} />
        <DividerWithText text="또는" />
        <div className="flex justify-center gap-[24px]">
          <LoginButton
            type="google"
            onClick={() => handleLoginClick('google')}
          />
          <LoginButton type="naver" onClick={() => handleLoginClick('naver')} />
        </div>
        <div className="text-[14px] text-brown-tertiary underline tracking-[-0.5px] cursor-pointer">
          비회원으로 주문하셨나요?
        </div>
      </div>
    </div>
  );
};

export default Login;
