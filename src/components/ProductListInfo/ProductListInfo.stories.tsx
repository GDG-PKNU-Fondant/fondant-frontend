import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'jotai';
import ProductListInfo from '@components/ProductListInfo';

const JotaiProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

const meta: Meta<typeof ProductListInfo> = {
  title: 'Components/ProductListInfo',
  component: ProductListInfo,
  decorators: [
    (Story) => (
      <JotaiProviderWrapper>
        <Story />
      </JotaiProviderWrapper>
    ),
  ],
  argTypes: {
    totalCount: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof ProductListInfo>;

export const Default: Story = {
  render: (args) => {
    return <ProductListInfo {...args} totalCount={args.totalCount ?? 100} />;
  },
  args: {
    totalCount: 100,
  },
};
