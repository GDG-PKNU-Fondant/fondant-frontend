import { ProductOption } from '@type/Product';

interface MockProductOption {
  [key: number]: ProductOption[];
}

const MOCK_PRODUCT_OPTION: MockProductOption = {
  0: [
    {
      id: 0,
      name: '민트 초콜릿 시리얼',
      additionalPrice: 0,
    },
    {
      id: 1,
      name: '얼그레이 초콜릿 시리얼',
      additionalPrice: 0,
    },
    {
      id: 2,
      name: '딸기 초콜릿 시리얼',
      additionalPrice: 1200,
    },
    {
      id: 3,
      name: '더블 초콜릿 시리얼',
      additionalPrice: 2400,
    },
  ],
  1: [
    {
      id: 0,
      name: '플레인 그릭 요거트',
      additionalPrice: 0,
    },
    {
      id: 1,
      name: '말차 그릭 요거트',
      additionalPrice: 1000,
    },
    {
      id: 2,
      name: '딸기 그릭 요거트',
      additionalPrice: 1500,
    },
    {
      id: 3,
      name: '블루베리 그릭 요거트',
      additionalPrice: 1500,
    },
  ],
};

export default MOCK_PRODUCT_OPTION;
