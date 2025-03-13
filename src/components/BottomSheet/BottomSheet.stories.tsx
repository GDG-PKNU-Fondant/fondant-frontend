import type { Meta, StoryObj } from '@storybook/react';
import BottomSheet from '@components/BottomSheet';
import SortSheetContent from '@components/BottomSheet/SortSheetContent';
import '@styles/tailwind.css';
import useModal from '@hooks/useModal';
import { useState } from 'react';
import MOCK_SORT_OPTIONS from '@mocks/constants/mockSortList';
import FilterSheetContent from '@components/BottomSheet/FilterSheetContent';
import MOCK_PRODUCT_ITEMS from '@mocks/constants/mockProductItems';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  argTypes: {
    sheetKey: {
      control: 'text',
      description: '모달의 고유 키값(구별용)',
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
  render: () => {
    const { openModal, closeModal } = useModal();

    const [selectedSort, setSelectedSort] = useState(
      MOCK_SORT_OPTIONS[0].value,
    );

    const [selectedFilters, setSelectedFilters] = useState<
      Record<string, string[]>
    >({});

    return (
      <>
        <div className="flex gap-[16px]">
          <button
            type="button"
            onClick={() => openModal('bottom-sheet')}
            className="p-[8px] bg-blue-500 text-white rounded"
          >
            바텀시트 열기
          </button>

          <button
            type="button"
            onClick={() => openModal('sort-sheet')}
            className="p-[8px] bg-green-500 text-white rounded"
          >
            정렬 바텀시트 열기
          </button>

          <button
            type="button"
            onClick={() => openModal('filter-sheet')}
            className="p-[8px] bg-red-500 text-white rounded"
          >
            필터 바텀시트 열기
          </button>
        </div>

        <BottomSheet sheetKey="bottom-sheet">
          <p className="text-center">Content를 추가</p>
        </BottomSheet>

        <BottomSheet sheetKey="sort-sheet">
          <SortSheetContent
            onSelect={(option) => setSelectedSort(option)}
            selectedOption={selectedSort}
          />
        </BottomSheet>

        <BottomSheet sheetKey="filter-sheet">
          <FilterSheetContent
            selectedFilters={selectedFilters}
            onSelect={(filters) => setSelectedFilters(filters)}
            products={MOCK_PRODUCT_ITEMS}
            onClose={() => closeModal('filter-sheet')}
          />
        </BottomSheet>
      </>
    );
  },
};
