import DoughnutIcon from '@assets/icons/Doughnut.png'
import SNShotIcon from '@assets/icons/SNShot.png'
import SeniorIcon from '@assets/icons/Senior.png'
import CalendarIcon from '@assets/icons/Calendar.png'
import MagazineIcon from '@assets/icons/Magazine.png'

const MOCK_DYNAMIC_CATEGORIES = [
  {
    id: 1,
    categoryName: '퐁당 PICK',
    iconUrl: DoughnutIcon,
    primary: true,
  },
  {
    id: 2,
    categoryName: 'SNS 인기',
    iconUrl: SNShotIcon,
    primary: false,
  },
  {
    id: 3,
    categoryName: '어르신 취향',
    iconUrl: SeniorIcon,
    primary: false,
  },
  {
    id: 4,
    categoryName: '캘린더',
    iconUrl: CalendarIcon,
    primary: false,
  },
  {
    id: 5,
    categoryName: '매거진',
    iconUrl: MagazineIcon,
    primary: false,
  },
];

export default MOCK_DYNAMIC_CATEGORIES