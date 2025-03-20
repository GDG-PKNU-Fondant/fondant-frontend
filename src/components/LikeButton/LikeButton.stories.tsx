import { Meta, StoryObj } from '@storybook/react';
import LikeButton from '@components/LikeButton';
import '@styles/tailwind.css';

const meta: Meta<typeof LikeButton> = {
  title: 'Components/LikeButton',
  component: LikeButton,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '좋아요를 표시하는 버튼입니다.' } },
  },
  argTypes: {
    liked: {
      control: 'boolean',
      description: '나의 "좋아요" 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    count: {
      control: 'number',
      description: '전체 "좋아요" 수',
      table: {
        type: { summary: 'number' },
      },
    },
    countDisplay: {
      control: 'boolean',
      description: '"좋아요" 수 표시 여부',
      table: { summary: 'boolean' },
    },
  },
};
export default meta;

type Story = StoryObj<typeof LikeButton>;

export const Default: Story = {
  args: {
    liked: false,
    count: 9999,
    countDisplay: true,
  },
};

export const AlreadyLiked: Story = {
  args: {
    liked: true,
    count: 121,
    countDisplay: true,
  },
};

export const HiddenCount: Story = {
  args: {
    liked: false,
    count: 150,
    countDisplay: false,
  },
};
