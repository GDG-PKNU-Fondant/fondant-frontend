import { useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import CharactersImage from '@assets/images/characters.png';

const ErrorPage = ({ errorMessage }: { errorMessage: string }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-background">
      <img
        src={CharactersImage}
        alt="fondant"
        className="w-[180px] mb-[16px]"
      />
      <div className="text-brown-primary font-semibold tracking-[-0.5px] mb-[16px]">
        {errorMessage}
      </div>
      <Button variant="tertiary" onClick={() => navigate(-1)}>
        이전 페이지
      </Button>
    </div>
  );
};

export default ErrorPage;
