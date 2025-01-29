import { Meta, StoryFn } from '@storybook/react';
import TabNavigator from '@components/Header/TabNavigator';
import { CategoryTabs, HeaderTabs } from '@components/Header/TabNavigator/tabs';

export default {
  title: 'Components/TabNavigator',
  component: TabNavigator,
} as Meta<typeof TabNavigator>;

const Template: StoryFn<typeof TabNavigator> = (args) => (
  <TabNavigator {...args} />
);

export const HeaderTab = Template.bind({});
HeaderTab.args = {
  tabs: HeaderTabs,
};

export const CategoryTab = Template.bind({});
CategoryTab.args = {
  tabs: CategoryTabs,
  defaultColor: 'text-brown-quaternary',
};
