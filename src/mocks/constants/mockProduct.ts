export interface ProductItem {
  marketName?: string;
  productName: string;
  price: number;
  discountPrice?: number;
  rate: number;
  reviewer: number;
  category: string;
  brand: string;
  benefit: string[];
  shipping: string;
  packaging: string;
  sales: number;
}

export const MOCK_PRODUCTS: ProductItem[] = [
  {
    marketName: '아 목업 데이터 귀찮아융',
    productName: '제로 카카오 초콜릿',
    price: 5900,
    discountPrice: 5500,
    rate: 4.9,
    reviewer: 95,
    category: '제로 슈가',
    brand: 'fondant Only',
    benefit: ['할인 상품', '무료 배송'],
    shipping: '로켓배송',
    packaging: '냉장 포장',
    sales: 1100,
  },
];
for (let i = 2; i <= 30; i++) {
  MOCK_PRODUCTS.push({
    marketName: `Market ${i}`,
    productName: `Sample Product ${i}`,
    price: 2000 + i * 100,
    discountPrice: 1800 + i * 100,
    rate: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
    reviewer: Math.floor(Math.random() * 500 + 50),
    category: ['빵', '쿠키', '구움과자', '젤리', '제로 슈가', '글루텐 프리'][
      i % 6
    ],
    brand: ['fondant Only', '지역 상생 프로젝트', '지역 특색'][i % 3],
    benefit: i % 2 === 0 ? ['할인 상품'] : ['무료 배송'],
    shipping: ['퀵 배송', '일반 배송', '로켓배송'][i % 3],
    packaging: ['개별 포장', '상온 포장', '냉장 포장', '냉동 포장'][i % 4],
    sales: Math.floor(Math.random() * 2000 + 100),
  });
}

export default MOCK_PRODUCTS;
