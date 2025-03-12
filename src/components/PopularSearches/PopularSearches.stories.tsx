import { Meta, StoryFn } from '@storybook/react';
import PopularSearches from '@components/PopularSearches';
import { PopularSearchesProps } from '@type/PopularSearches';
import MOCK_POPULAR_SEARCHES from '@mocks/constants/mockPopularSearches';
import '@styles/tailwind.css';

export default {
  title: 'Components/PopularSearches',
  component: PopularSearches,
  tags: ['autodocs'],
  argTypes: {
    searches: {
      description: '인기 검색어 옵션을 설정합니다.',
      control: 'object',
    },
    updateTime: {
      description: '업데이트 시간을 설정합니다.',
      control: 'number',
    }
  },
  parameters: {
    docs: {
      description: {
        component: '인기 검색어를 나타내는 컴포넌트입니다.',
      },
    },
  },
} as Meta;

const Template: StoryFn<PopularSearchesProps> = (args) => (
  <PopularSearches {...args} />
);

export const Default = Template.bind({});
Default.args = {
  searches: MOCK_POPULAR_SEARCHES.searches,
  updateTime: MOCK_POPULAR_SEARCHES.updateTime,
};

export const TrendUp = Template.bind({});
TrendUp.args = {
  searches: [{ rank: 1, keyword: '김마루 귀여워', trend: 'up' }],
  updateTime: 3,
};

export const TrendDown = Template.bind({});
TrendDown.args = {
  searches: [{ rank: 1, keyword: '멋진빵', trend: 'down' }],
  updateTime: 21,
};
