import { Meta, StoryFn } from '@storybook/react';
import MarketProfileCard from '@components/MarketProfileCard';
import MarketProfileCardProps from '@type/MarketProfileCard';
import MOCK_MARKET_PROFILES from '@mocks/constants/mockMarketProfiles';
import '@styles/tailwind.css';

export default {
  title: 'Components/MarketProfileCard',
  component: MarketProfileCard,
  argTypes: {
    marketName: { control: 'text' },
    description: { control: 'text' },
    rating: { control: 'number' },
    likes: { control: 'number' },
  },
} as Meta;

const Template: StoryFn<MarketProfileCardProps> = (args) => (
  <MarketProfileCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...MOCK_MARKET_PROFILES[0],
};

export const ThousandLikes = Template.bind({});
ThousandLikes.args = {
  ...MOCK_MARKET_PROFILES[1],
};

export const TenThousandLikes = Template.bind({});
TenThousandLikes.args = {
  ...MOCK_MARKET_PROFILES[2],
};
