import { Meta, StoryFn } from '@storybook/react';
import TabNavigator from '@components/TabNavigator';
import { CATEGORY_TABS, HEADER_TABS } from '@components/TabNavigator/tabs';
import MOCK_TABS from '@mocks/constants/mockTabs';

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
  tabs: CATEGORY_TABS,
  defaultColor: 'text-brown-secondary',
};

export const FilterTab = Template.bind({});
FilterTab.args = {
  tabs: MOCK_TABS,
  defaultColor: 'text-gray-400',
  selectedColor: 'text-brown-primary',
  fixedTextSize: 13,
};
