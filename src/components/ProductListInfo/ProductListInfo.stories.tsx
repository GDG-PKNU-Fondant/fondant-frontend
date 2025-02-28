import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Provider } from 'jotai';
import {
  selectedFiltersAtom,
  sortOptionAtom,
} from '@stores/selectedSortFilter';
import { useAtom } from 'jotai';
import ProductListInfo from '.';

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
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortOption, setSortOption] = useAtom(sortOptionAtom);
    const [selectedFilters, setSelectedFilters] = useAtom(selectedFiltersAtom);

    return <ProductListInfo {...args} totalCount={args.totalCount ?? 100} />;
  },
  args: {
    totalCount: 100,
  },
};
