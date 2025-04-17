import { Meta } from '@storybook/react';
import Badge from '@components/Badge';
import BadgeProps from '@type/Badge';
import '@styles/tailwind.css';

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['alert', 'count'],
      description: `\`alert\`는 단순히 알림 유무를 표시하며, \`count\`는 숫자를 함께 표시합니다.`,
    },
    count: {
      control: { type: 'number' },
      description: `\`count\` 타입에서 배지에 표시될 숫자를 지정합니다. 숫자가 100 이상일 경우 '99+'로 표시되며, \`alert\` 타입에서는 무시됩니다.`,
    },
    position: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: `배지를 자식 요소의 어느 위치에 표시할지를 지정합니다. 각 방향은 \`absolute\` 포지셔닝 기준으로 정렬됩니다.`,
    },
    visible: {
      control: 'boolean',
      description: `배지를 표시할지 여부를 제어합니다.`,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '알림이나 개수를 표시하기 위한 배지 컴포넌트입니다. 버튼이나 아이콘 등의 요소에 추가 정보를 표시할 때 사용합니다.',
      },
    },
  },
} as Meta<BadgeProps>;

export const AlertBadge = {
  args: {
    type: 'alert',
    count: 3,
    position: 'top-right',
  },
  render: (args: BadgeProps) => (
    <div className="inline-block">
      <Badge {...args}>
        <button type="button" className="p-[12px] bg-gray-50 rounded-[10px]">
          Cart
        </button>
      </Badge>
    </div>
  ),
};

export const CountBadge = {
  args: {
    type: 'count',
    count: 5,
  },
  render: (args: BadgeProps) => (
    <div className="inline-block">
      <Badge {...args}>
        <button type="button" className="p-[12px] bg-gray-50 rounded-[10px]">
          Cart
        </button>
      </Badge>
    </div>
  ),
};

export const CountBadgeTwoDigits = {
  args: {
    type: 'count',
    count: 25,
    position: 'bottom-right',
  },
  render: (args: BadgeProps) => (
    <div className="inline-block">
      <Badge {...args}>
        <button type="button" className="p-[12px] bg-gray-50 rounded-[10px]">
          Cart
        </button>
      </Badge>
    </div>
  ),
};

export const CountBadgeMax = {
  args: {
    type: 'count',
    count: 120,
  },
  render: (args: BadgeProps) => (
    <div className="inline-block">
      <Badge {...args}>
        <button type="button" className="p-[12px] bg-gray-50 rounded-[10px]">
          Cart
        </button>
      </Badge>
    </div>
  ),
};
