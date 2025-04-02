import { Meta, StoryFn } from '@storybook/react';
import ScrollableProduct from '@components/ScrollableProduct';
import ScrollableProductProps from '@type/ScrollableProduct';
import '@styles/tailwind.css';

export default {
  title: 'Components/ScrollableProduct',
  component: ScrollableProduct,
  argTypes: {
    title: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<ScrollableProductProps> = (args) => (
  <ScrollableProduct {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'OO가게 인기상품 보러가기',
};
