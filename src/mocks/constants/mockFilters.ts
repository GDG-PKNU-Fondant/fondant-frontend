interface FilterOption {
  label: string;
  value: string;
}

const MOCK_FILTERS: Record<string, FilterOption[]> = {
  category: [
    { label: '빵', value: '빵' },
    { label: '쿠키', value: '쿠키' },
    { label: '구움과자', value: '구움과자' },
    { label: '젤리', value: '젤리' },
    { label: '제로 슈가', value: '제로 슈가' },
    { label: '글루텐 프리', value: '글루텐 프리' },
  ],
  shipping: [
    { label: '퀵배송', value: '퀵 배송' },
    { label: '일반배송', value: '일반 배송' },
    { label: '셀프픽업', value: '셀프 픽업' },
  ],
  packaging: [
    { label: '개별 포장', value: '개별 포장' },
    { label: '상온 포장', value: '상온 포장' },
    { label: '냉장 포장', value: '냉장 포장' },
    { label: '냉동 포장', value: '냉동 포장' },
  ],
  price: [
    { label: '~3000원', value: '~3000원' },
    { label: '~5000원', value: '~5000원' },
    { label: '1만원 이하', value: '1만원 이하' },
    { label: '3만원 이하', value: '3만원 이하' },
    { label: '3만원 이상', value: '3만원 이상' },
  ],
  brand: [
    { label: 'fondant Only', value: 'fondant Only' },
    { label: '지역 상생 프로젝트', value: '지역 상생 프로젝트' },
    { label: '지역 특색', value: '지역 특색' },
  ],
  benefit: [
    { label: '할인 상품', value: '할인 상품' },
    { label: '무료 배송', value: '무료 배송' },
  ],
};

export default MOCK_FILTERS;
