import { useSetAtom } from 'jotai';
import Header from '@components/Header';
import useScrollVisibility from '@hooks/useScrollVisibility';
import { headerVisibilityAtom } from '@stores/layoutState';

const Home = () => {
  const setHeaderVisibility = useSetAtom(headerVisibilityAtom);

  useScrollVisibility(setHeaderVisibility, 10);

  return (
    <div>
      <Header
        onSearchClick={() => {}}
        onNotificationClick={() => {}}
        onCartClick={() => {}}
      />
    </div>
  );
};

export default Home;
