import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BottomSheet from '@components/BottomSheet';
import SortSheet from '@components/BottomSheet/SortSheet';
import MOCK_SORT_OPTIONS from '@mocks/constants/mockSortList';
import MOCK_PRODUCT_ITEMS from '@mocks/constants/mockProductItems';
import FilterSheet from '@components/BottomSheet/FilterSheet';
import '@styles/tailwind.css';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      options: ['true', 'false'],
      description: '모달의 열리고 닫힘을 제어.',
    },
    onClose: {
      action: 'closed',
      description: '부모에게서 받는 함수.(모달이 닫힐 때 적용할 함수)',
    },
    children: { description: '모달 내부에 들어갈 자식 컴포넌트.' },
  },
  parameters: {
    docs: { description: { component: '하단 모달 시트 컴포넌트입니다.' } },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen ?? false);

    return (
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          모달 열기
        </button>

        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p className="text-center">내용 추가</p>
        </BottomSheet>
      </div>
    );
  },
};

export const SortBottomSheet: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen ?? false);
    const [selectedSort, setSelectedSort] = useState(
      MOCK_SORT_OPTIONS[0].value,
    );

    return (
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          정렬 모달 열기
        </button>
        <SortSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelect={(option) => setSelectedSort(option)}
          selectedOption={selectedSort}
        />
      </div>
    );
  },
};

export const FilterBottomSheet: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen ?? false);
    const [selectedFilters, setSelectedFilters] = useState<
      Record<string, string[]>
    >({});

    return (
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          필터 열기
        </button>

        <FilterSheet
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          selectedFilters={selectedFilters}
          onSelect={(filters) => setSelectedFilters(filters)}
          products={MOCK_PRODUCT_ITEMS}
        />
      </div>
    );
  },
  args: { isOpen: false },
};
