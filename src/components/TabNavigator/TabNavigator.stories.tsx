import { Meta, StoryFn } from '@storybook/react';
import TabNavigator from '@components/TabNavigator';
import {
  CATEGORY_TABS,
  filterTabs,
  HEADER_TABS,
} from '@components/TabNavigator/tabs';

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
  tabs: filterTabs,
  defaultColor: 'text-gray-400',
  selectedColor: 'text-brown-primary',
  fixedTextSize: 13,
  type: 'inner',
};
