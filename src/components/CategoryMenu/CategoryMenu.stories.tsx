import { Meta, StoryFn } from '@storybook/react';
import { mockDynamicCategories } from '@mocks/handlers';
import CategoryMenu from '@components/CategoryMenu';
import '@styles/tailwind.css';

export default {
  title: 'Components/CategoryMenu',
  component: CategoryMenu,
  argTypes: {
    details: {
      control: 'object',
    },
    primary: {
      control: 'boolean',
    },
  },
} as Meta;

const Template: StoryFn = (args) => <CategoryMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  details: {
    category: mockDynamicCategories[1],
  },
};

export const PrimaryCategory = Template.bind({});
PrimaryCategory.args = {
  details: {
    category: mockDynamicCategories.find((c) => c.categoryName === '퐁당 PICK'),
  },
};
