import { Meta, StoryFn } from '@storybook/react';
import TabNavigator from '@components/TabNavigator';
import { CATEGORY_TABS, HEADER_TABS } from '@components/TabNavigator/tabs';

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
  defaultColor: 'text-brown-quaternary',
};
