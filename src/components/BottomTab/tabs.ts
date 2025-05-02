import HomeIcon from '@assets/icons/home.svg?react';
import CategoryIcon from '@assets/icons/category.svg?react';
import SearchIcon from '@assets/icons/search.svg?react';
import WishIcon from '@assets/icons/wish.svg?react';
import MyIcon from '@assets/icons/my.svg?react';

const TABS = [
  { Icon: HomeIcon, label: '홈', path: '/' },
  { Icon: CategoryIcon, label: '카테고리', path: '/category' },
  { Icon: SearchIcon, label: '검색', path: '/search' },
  { Icon: WishIcon, label: '위시', path: '/wish' },
  { Icon: MyIcon, label: 'my', path: '/my' },
];

export default TABS;
