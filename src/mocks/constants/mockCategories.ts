import { Categories } from '@type/Category';
import BreadIcon from '@assets/icons/Bread.png';
import CookieIcon from '@assets/icons/Cookie.png';
import ShortcakeIcon from '@assets/icons/Shortcake.png';
import CandyIcon from '@assets/icons/Candy.png';
import ChocolatebarIcon from '@assets/icons/Chocolatebar.png';

const MOCK_CATEGORIES: Categories[] = [
  {
    id: 1,
    name: '빵',
    iconUrl: BreadIcon,
    subCategories: [
      { id: 6, name: '식빵' },
      { id: 7, name: '단팥빵' },
      { id: 8, name: '바게트' },
      { id: 9, name: '슈크림빵' },
      { id: 10, name: '치아바타' },
      { id: 11, name: '멜론빵' },
      { id: 12, name: '크루아상' },
      { id: 13, name: '소보로빵' },
      { id: 14, name: '브리오슈' },
      { id: 15, name: '시나몬롤' },
    ],
  },
  {
    id: 2,
    name: '쿠키',
    iconUrl: CookieIcon,
    subCategories: [
      { id: 16, name: '초코칩 쿠키' },
      { id: 17, name: '통밀 쿠키' },
      { id: 18, name: '버터 쿠키' },
      { id: 19, name: '쌀쿠키' },
      { id: 20, name: '오트밀 쿠키' },
      { id: 21, name: '비스킷' },
      { id: 22, name: '설탕 쿠키' },
      { id: 23, name: '크래커' },
    ],
  },
  {
    id: 3,
    name: '구움과자',
    iconUrl: ShortcakeIcon,
    subCategories: [
      { id: 24, name: '브라우니' },
      { id: 25, name: '시폰케이크' },
      { id: 26, name: '마들렌' },
      { id: 27, name: '컵케이크' },
      { id: 28, name: '치즈케이크' },
      { id: 29, name: '타르트' },
    ],
  },
  {
    id: 4,
    name: '젤리',
    iconUrl: CandyIcon,
    subCategories: [
      { id: 30, name: '젤리' },
      { id: 31, name: '캔디' },
      { id: 32, name: '푸딩' },
      { id: 33, name: '양갱' },
      { id: 34, name: '무스 케이크' },
    ],
  },
  {
    id: 5,
    name: '기타간식',
    iconUrl: ChocolatebarIcon,
    subCategories: [
      { id: 35, name: '그래놀라 바' },
      { id: 36, name: '초콜릿' },
      { id: 37, name: '단백질 바' },
      { id: 38, name: '캐러멜' },
      { id: 39, name: '감자칩' },
      { id: 40, name: '사탕' },
      { id: 41, name: '쌀과자' },
      { id: 42, name: '막대사탕' },
    ],
  },
];

export default MOCK_CATEGORIES;
