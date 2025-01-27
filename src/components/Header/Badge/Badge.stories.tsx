import { Meta, StoryFn } from '@storybook/react';
import Badge from '@components/Header/Badge';
import BadgeProps from '@type/Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    type: {
      control: 'radio',
      options: ['alert', 'count'],
      description: '배지 타입 (alert: 핑크 알람, count: 갈색 숫자)',
    },
    count: {
      control: { type: 'number' },
      description: 'count 타입일 때 표시할 숫자',
      if: { arg: 'type', eq: 'count' },
    },
    position: {
      control: 'object',
      description: '배지 위치 조정 (top, right, bottom, left)',
    },
  },
} as Meta<typeof Badge>;

const Template: StoryFn<BadgeProps> = (args) => (
  <Badge {...args}>
    <button className="p-4 bg-gray-200 rounded">Cart</button>
  </Badge>
);

export const AlertBadge = Template.bind({});
AlertBadge.args = {
  type: 'alert',
  position: { top: '0px', right: '0px' },
};

export const CountBadge = Template.bind({});
CountBadge.args = {
  type: 'count',
  count: 5,
  position: { top: '0px', right: '0px' },
};

export const CountBadgeTwoDigits = Template.bind({});
CountBadgeTwoDigits.args = {
  type: 'count',
  count: 25,
  position: { top: '5px', right: '5px' },
};

export const CountBadgeMax = Template.bind({});
CountBadgeMax.args = {
  type: 'count',
  count: 120,
  position: { bottom: '0px', right: '0px' },
};
