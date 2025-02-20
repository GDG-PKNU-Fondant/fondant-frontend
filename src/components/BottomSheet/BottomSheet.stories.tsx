import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BottomSheet from '@components/BottomSheet';
import SortSheet from '@components/BottomSheet/SortSheet';
import MOCK_SORT_OPTIONS from '@mocks/constants/mockSortList'; // 정렬 옵션

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
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
