import type { Meta, StoryObj } from '@storybook/react';
import Button from '@components/Button';
import ButtonProps from '@type/Button';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'submit'],
      description: '버튼의 스타일을 결정합니다.',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: '버튼 크기를 설정합니다.',
    },
    block: {
      control: 'boolean',
      description: '부모 width를 따라가도록 설정합니다.',
    },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right'],
      description: '버튼 내부 텍스트 정렬을 설정합니다.',
    },
    children: {
      control: 'text',
      description: '버튼 내부에 들어갈 텍스트입니다.',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 실행될 함수입니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '공통적으로 사용될 버튼 컴포넌트입니다. `variant`, `size`, `block`, `align` props를 이용하여 다양한 스타일을 적용할 수 있습니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'Secondary',
  },
};

export const Submit: Story = {
  args: {
    variant: 'submit',
    size: 'large',
    block: true,
    children: 'Submit',
  },
};
