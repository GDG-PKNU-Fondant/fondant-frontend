import { Meta, StoryFn } from '@storybook/react';
import PreviewCard from '@components/PreviewCard';
import MOCK_PRODUCTS from '@mocks/constants/mockProducts';
import '@styles/tailwind.css';

export default {
  title: 'Components/PreviewCard',
  component: PreviewCard,
  tags: ['autodocs'],
  argTypes: {
    marketName: {
      description: '마켓 이름을 설정합니다.',
      control: 'text',
    },
    productName: {
      description: '상품 이름을 설정합니다.',
      control: 'text',
    },
    price: {
      description: '상품 가격을 설정합니다.',
      control: { type: 'number', min: 0, step: 1000 },
    },
    discountPrice: {
      description: '할인된 가격을 설정합니다.',
      control: { type: 'number', min: 0, step: 1000 },
    },
    rating: {
      description: '평점을 설정합니다.',
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
    },
    reviewer: {
      description: '리뷰어 수를 설정합니다.',
      control: { type: 'number', min: 0, step: 1 },
    },
    thumbnailUrl: {
      description: '썸네일 이미지 URL을 설정합니다.',
      control: 'text',
    },
    layout: {
      description: '레이아웃에 따른 카드의 사이즈를 결정합니다.',
      control: 'radio',
      options: ['grid', 'slider'],
    },
    type: {
      description: '카드의 타입을 선택합니다.',
      control: 'radio',
      options: ['market', 'product'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '상품이나 마켓의 미리보기 정보를 표시하는 카드 컴포넌트입니다.',
      },
    },
  },
} as Meta;

const narrowCardDecorator = (Story: StoryFn) => (
  <div className="w-full max-w-[196px]">
    <Story />
  </div>
);

export const Default = {
  decorators: [narrowCardDecorator],
  args: {
    ...MOCK_PRODUCTS[1],
    type: 'product',
    layout: 'grid',
  },
};

export const MarketType = {
  decorators: [narrowCardDecorator],
  args: {
    ...MOCK_PRODUCTS[1],
    type: 'market',
    layout: 'grid',
  },
};

export const WithDiscount = {
  decorators: [narrowCardDecorator],
  args: {
    ...MOCK_PRODUCTS[1],
    price: 50000,
    discountPrice: 35000,
    type: 'product',
    layout: 'grid',
  },
};

export const WithoutDiscount = {
  decorators: [narrowCardDecorator],
  args: {
    ...MOCK_PRODUCTS[1],
    price: 30000,
    discountPrice: undefined,
    type: 'product',
    layout: 'grid',
  },
};

export const LayoutExample = {
  render: () => {
    const mockProducts = MOCK_PRODUCTS.slice(0, 4);

    return (
      <div className="w-full max-w-[512px] flex flex-col gap-[16px]">
        <div className="bg-beige-tertiary font-semibold rounded-md p-[12px]">
          그리드 레이아웃
        </div>
        <div>
          <div className="grid grid-cols-2 gap-[16px]">
            {mockProducts.map((product, index) => (
              <PreviewCard
                // eslint-disable-next-line
                key={`grid-${index}`}
                {...product}
                type="product"
                layout="grid"
              />
            ))}
          </div>
        </div>
        <div className="bg-beige-tertiary font-semibold rounded-md p-[12px]">
          슬라이더 레이아웃
        </div>
        <div className="flex gap-[8px] overflow-x-scroll">
          {mockProducts.map((product, index) => (
            <PreviewCard
              // eslint-disable-next-line
              key={`slider-${index}`}
              {...product}
              type="product"
              layout="slider"
            />
          ))}
        </div>
      </div>
    );
  },
};
