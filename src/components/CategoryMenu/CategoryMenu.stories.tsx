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
    }
  }
} as Meta;

const Template: StoryFn = (args) => (
  <div className="grid grid-cols-5 gap-4 p-4">
    <CategoryMenu {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  details: {
    categories: mockDynamicCategories,
    primary: false,
  },
};
