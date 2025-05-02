import { atom } from 'jotai';
import TABS from '@components/BottomTab/tabs';

export const getInitialTab = (pathname: string) => {
  if (pathname === '/login') {
    return 'my';
  }

  const matchedTab = TABS.find((tab) =>
    tab.path === '/' ? pathname === '/' : pathname.startsWith(tab.path),
  );
  return matchedTab?.label ?? '홈';
};

const activeBottomTabAtom = atom(getInitialTab('/'));

export default activeBottomTabAtom;
