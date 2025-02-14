import { atom } from 'jotai';
import TABS from '@components/BottomTab/tabs';

const getInitialTab = () => {
  const path = window.location.pathname;
  const matchedTab = TABS.find((tab) =>
    tab.path === '/' ? path === '/' : path.startsWith(tab.path),
  );
  return matchedTab?.label ?? '홈';
};

const activeBottomTabAtom = atom(getInitialTab());

export default activeBottomTabAtom;
