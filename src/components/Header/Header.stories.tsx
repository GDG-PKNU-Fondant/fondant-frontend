import { Meta, StoryFn } from '@storybook/react';
import Header from './index';

export default {
  title: 'Components/Header',
  component: Header,
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSearchClick: () => alert('검색 페이지 이동'),
  onNotificationClick: () => alert('알림 페이지 이동'),
  onCartClick: () => alert('장바구니 이동'),
};
