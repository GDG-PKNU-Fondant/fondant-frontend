import { useState } from 'react';
import { Meta } from '@storybook/react';
import Dropdown from '@components/Dropdown';
import '@styles/tailwind.css';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: '드롭다운의 제목을 설정합니다.',
      control: 'text',
    },
    options: {
      description: '드롭다운에 표시될 옵션 목록입니다.',
      control: 'object',
    },
    onSelect: {
      description: '옵션이 선택되었을 때 호출되는 콜백 함수입니다.',
    },
    maxVisibleItems: {
      description: '스크롤 없이 표시할 최대 아이템 수를 설정합니다.',
      control: { type: 'number', min: 1, max: 10, step: 1 },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '사용자가 여러 옵션 중 하나를 선택할 수 있는 드롭다운 컴포넌트입니다.',
      },
    },
  },
} as Meta;

const defaultOptions = [
  { id: 1, label: '옵션 1' },
  { id: 2, label: '옵션 2' },
  { id: 3, label: '옵션 3' },
];

export const Default = {
  args: {
    title: '옵션 선택',
    options: defaultOptions,
  },
};

export const LimitedVisibleItems = {
  args: {
    title: '옵션 선택',
    options: [
      { id: 1, label: '옵션 1' },
      { id: 2, label: '옵션 2' },
      { id: 3, label: '옵션 3' },
      { id: 4, label: '옵션 4' },
      { id: 5, label: '옵션 5' },
    ],
  },
};

export const InteractiveExample = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState<{
      id: number;
      label: string;
    } | null>(null);

    const options = [
      { id: 1, label: '옵션 1' },
      { id: 2, label: '옵션 2' },
      { id: 3, label: '옵션 3' },
      { id: 4, label: '옵션 4' },
      { id: 5, label: '옵션 5' },
    ];

    const handleSelect = (option: { id: number; label: string } | null) => {
      setSelectedOption(option);
    };

    return (
      <div className="flex flex-col gap-[12px]">
        <Dropdown title="옵션 선택" options={options} onSelect={handleSelect} />
        <div className="bg-beige-tertiary rounded-md p-[12px]">
          <span className="font-semibold">선택한 항목: </span>
          {selectedOption ? (
            <span>{selectedOption.label}</span>
          ) : (
            <span>선택한 항목이 없습니다.</span>
          )}
        </div>
      </div>
    );
  },
};
