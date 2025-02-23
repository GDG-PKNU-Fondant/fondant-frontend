import { Meta, StoryFn } from '@storybook/react';
import PreviewCard from '@components/PreviewCard';
import PreviewCardProps, { CardType, CardSize } from '@type/PreviewCard';
import MOCK_PRODUCTS from '@mocks/constants/mockProducts';
import '@styles/tailwind.css';

export default {
  title: 'Components/PreviewCard',
  component: PreviewCard,
  argTypes: {
    details: {
      control: 'object',
    },
    type: {
      control: 'radio',
      options: ['market', 'product'],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
  },
} as Meta;

const Template: StoryFn<{
  details: Omit<PreviewCardProps, 'type' | 'size'>;
  type: CardType;
  size: CardSize;
}> = ({ details, type, size }) => (
  <PreviewCard {...details} type={type} size={size} />
);

export const Default = Template.bind({});
Default.args = {
  details: MOCK_PRODUCTS[0],
  type: 'product',
  size: 'medium',
};

export const SmallCard = Template.bind({});
SmallCard.args = {
  details: MOCK_PRODUCTS[1],
  type: 'product',
  size: 'small',
};

export const LargeCard = Template.bind({});
LargeCard.args = {
  details: MOCK_PRODUCTS[2],
  type: 'product',
  size: 'large',
};

export const DiscountedCard = Template.bind({});
DiscountedCard.args = {
  details: MOCK_PRODUCTS[3],
  type: 'product',
  size: 'medium',
};
