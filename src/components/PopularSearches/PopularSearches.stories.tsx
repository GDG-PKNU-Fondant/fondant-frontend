import { Meta, StoryFn } from '@storybook/react';
import PopularSearches from '@components/PopularSearches';
import { PopularSearchesProps } from '@type/PopularSearches';
import MOCK_POPULAR_SEARCHES from '@mocks/constants/mockPopularSearches';
import '@styles/tailwind.css';

export default {
  title: 'Components/PopularSearches',
  component: PopularSearches,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<PopularSearchesProps> = (args) => (
  <PopularSearches {...args} />
);

export const Default = Template.bind({});
Default.args = {
  searches: MOCK_POPULAR_SEARCHES,
};

export const WithRankChanges = Template.bind({});
WithRankChanges.args = {
  searches: [
    { rank: 1, keyword: '김마루 귀여워', trend: 'up' },
    { rank: 2, keyword: '멋진빵', trend: 'down' },
    { rank: 3, keyword: '치즈케이크', trend: 'up' },
    { rank: 4, keyword: '김호두 사랑해', trend: 'down' },
    { rank: 5, keyword: '오늘칼국수먹음', trend: 'up' },
    { rank: 6, keyword: '으라차차', trend: 'down' },
  ],
};

export const AllNeutral = Template.bind({});
AllNeutral.args = {
  searches: [
    { rank: 1, keyword: '멋진빵', trend: 'neutral' },
    { rank: 2, keyword: '김마루 귀여워', trend: 'neutral' },
    { rank: 3, keyword: '김호두 사랑해', trend: 'neutral' },
    { rank: 4, keyword: '으라차차', trend: 'neutral' },
    { rank: 5, keyword: '치즈케이크', trend: 'neutral' },
    { rank: 6, keyword: '오늘칼국수먹음', trend: 'neutral' },
  ],
};
