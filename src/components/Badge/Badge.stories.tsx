import { Meta, StoryFn } from '@storybook/react';
import Badge from '@components/Badge';
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
    },
    position: {
      control: { type: 'string' },
      description: '배지 위치 조정 (inset)',
    },
  },
} as Meta<typeof Badge>;

const Template: StoryFn<BadgeProps> = (args) => (
  <Badge {...args}>
    <button type="button" className="p-4 bg-stone-100 rounded">
      Cart
    </button>
  </Badge>
);

export const AlertBadge = Template.bind({});
AlertBadge.args = {
  type: 'alert',
  count: 3,
};

export const CountBadge = Template.bind({});
CountBadge.args = {
  type: 'count',
  count: 5,
};

export const CountBadgeTwoDigits = Template.bind({});
CountBadgeTwoDigits.args = {
  type: 'count',
  count: 25,
  inset: '5px 5px auto auto',
};

export const CountBadgeMax = Template.bind({});
CountBadgeMax.args = {
  type: 'count',
  count: 120,
  inset: 'auto 0px 0px auto',
};
