import { Meta, StoryFn } from '@storybook/react';
import MarketCard from '@components/Card/MarketCard';
import { MarketCardProps, CardSize } from '@type/Card';
import { mockMarkets } from '@mocks/handlers';
import '@styles/tailwind.css';

export default {
  title: 'Components/Card/MarketCard',
  component: MarketCard,
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
  details: Omit<MarketCardProps, 'size'>;
  size: CardSize;
}> = ({ details, size }) => <MarketCard {...details} size={size} />;

export const Default = Template.bind({});
Default.args = {
  details: mockMarkets[0],
  size: 'medium',
};

export const SmallCard = Template.bind({});
SmallCard.args = {
  details: mockMarkets[1],
  size: 'small',
};

export const LargeCard = Template.bind({});
LargeCard.args = {
  details: mockMarkets[2],
  size: 'large',
};
