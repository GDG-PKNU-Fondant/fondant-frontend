import { Meta, StoryFn } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BottomTab from '@components/BottomTab';

export default {
  title: 'Components/BottomTab',
  component: BottomTab,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
} as Meta;

const Template: StoryFn = () => {
  return <BottomTab />;
};

export const Default = Template.bind({});
