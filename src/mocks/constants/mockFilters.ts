interface FilterOption {
  label: string;
  value: string;
}

const MOCK_FILTERS: Record<string, FilterOption[]> = {
  category: [
    { label: '빵', value: 'category_1' },
    { label: '쿠키', value: 'category_2' },
    { label: '구움과자', value: 'category_3' },
    { label: '젤리', value: 'category_4' },
    { label: '제로 슈가', value: 'category_5' },
    { label: '글루텐 프리', value: 'category_6' },
  ],
  shipping: [
    { label: '퀵배송', value: 'shipping_1' },
    { label: '일반배송', value: 'shipping_2' },
  ],
  packaging: [
    { label: '개별 포장', value: 'packaging_1' },
    { label: '냉동 포장', value: 'packaging_2' },
  ],
  price: [
    { label: '5000원 이하', value: 'price_1' },
    { label: '1~3만원', value: 'price_2' },
    { label: '3만원 이상', value: 'price_3' },
  ],
  brand: [
    { label: 'fondant Only', value: 'brand_1' },
    { label: '유명 브랜드', value: 'brand_2' },
  ],
  benefit: [
    { label: '할인 상품', value: 'benefit_1' },
    { label: '무료 배송', value: 'benefit_2' },
  ],
};

export default MOCK_FILTERS;
