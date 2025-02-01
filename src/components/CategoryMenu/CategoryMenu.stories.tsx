import { Meta, StoryFn } from '@storybook/react';
import { mockDynamicCategories } from '@mocks/handlers';
import CategoryMenu from '@components/CategoryMenu';
import '@styles/tailwind.css';

export default {
  title: 'Components/CategoryMenu',
  component: CategoryMenu,
} as Meta;

const Template: StoryFn = (args) => <CategoryMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  categories: mockDynamicCategories,
};
