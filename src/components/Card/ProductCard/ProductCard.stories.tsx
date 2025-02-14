import { Meta, StoryFn } from '@storybook/react';
import ProductCard from '@components/Card/ProductCard';
import { ProductCardProps, CardSize } from '@type/Card';
import { mockProducts } from '@mocks/handlers';
import '@styles/tailwind.css';

export default {
  title: 'Components/Card/ProductCard',
  component: ProductCard,
  argTypes: {
    details: {
      control: 'object',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
  },
} as Meta;

const Template: StoryFn<{
  details: Omit<ProductCardProps, 'size'>;
  size: CardSize;
}> = ({ details, size }) => <ProductCard {...details} size={size} />;

export const Default = Template.bind({});
Default.args = {
  details: mockProducts[0],
  size: 'medium',
};

export const SmallCard = Template.bind({});
SmallCard.args = {
  details: mockProducts[1],
  size: 'small',
};

export const LargeCard = Template.bind({});
LargeCard.args = {
  details: mockProducts[2],
  size: 'large',
};

export const DiscountedCard = Template.bind({});
DiscountedCard.args = {
  details: mockProducts[3],
  size: 'medium',
};
