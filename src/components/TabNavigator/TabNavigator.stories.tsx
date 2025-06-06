import { Meta, StoryFn } from '@storybook/react';
import TabNavigator from '@components/TabNavigator';
import { HEADER_TABS } from '@components/TabNavigator/tabs';

const MOCK_TABS = [
  { label: '베스트', key: 'best' },
  { label: '빵', key: 'bread' },
  { label: '쿠키', key: 'cookie' },
  { label: '조각케이크', key: 'pieces' },
  { label: '롤케이크', key: 'roll' },
  { label: '세트', key: 'set' },
];

export default {
  title: 'Components/TabNavigator',
  component: TabNavigator,
} as Meta<typeof TabNavigator>;

const Template: StoryFn<typeof TabNavigator> = (args) => (
  <TabNavigator {...args} />
);

export const HeaderTab = Template.bind({});
HeaderTab.args = {
  tabs: HEADER_TABS,
};

export const CategoryTab = Template.bind({});
CategoryTab.args = {
  tabs: MOCK_TABS,
  defaultColor: 'text-brown-secondary',
};

export const FilterTab = Template.bind({});
FilterTab.args = {
  tabs: MOCK_TABS,
  defaultColor: 'text-gray-400',
  selectedColor: 'text-brown-primary',
  fixedTextSize: 13,
};
