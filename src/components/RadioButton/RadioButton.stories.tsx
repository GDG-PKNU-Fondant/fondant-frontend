import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import RadioButton from '@components/RadioButton';
import '@styles/tailwind.css';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: '버튼의 크기를 설정합니다.',
      control: { type: 'number', min: 16, max: 28, step: 2 },
    },
    selected: {
      description: '버튼의 선택 여부를 설정합니다.',
      control: 'boolean',
    },
    onClick: { description: '버튼이 클릭되었을 때 호출되는 콜백 함수입니다.' },
  },
  parameters: {
    docs: {
      description: {
        component: '단일 옵션을 선택할 수 있는 라디오 버튼 컴포넌트입니다.',
      },
    },
  },
} as Meta;

export const Default = {
  args: {
    selected: false,
  },
};

export const Selected = {
  args: {
    selected: true,
  },
};

export const InteractiveExample = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState<{
      id: number;
      label: string;
    }>({ id: 1, label: '옵션 1' });

    const options = [
      { id: 1, label: '옵션 1' },
      { id: 2, label: '옵션 2' },
      { id: 3, label: '옵션 3' },
    ];

    const handleOptionSelect = (id: number, label: string) => {
      setSelectedOption({ id, label });
    };

    const handleKeyDown = (
      e: React.KeyboardEvent,
      id: number,
      label: string,
    ) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleOptionSelect(id, label);
      }
    };

    return (
      <div
        role="radiogroup"
        aria-label="option-select"
        className="flex flex-col gap-[12px]"
      >
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-[10px] cursor-pointer"
          >
            <RadioButton
              selected={selectedOption.id === option.id}
              onClick={() => handleOptionSelect(option.id, option.label)}
            />
            <span
              onClick={() => handleOptionSelect(option.id, option.label)}
              onKeyDown={(e) => handleKeyDown(e, option.id, option.label)}
              tabIndex={0}
              role="button"
            >
              {option.label}
            </span>
          </div>
        ))}
        <div className="bg-beige-tertiary rounded-md p-[12px]">
          <span className="font-semibold">선택한 항목: </span>
          <span>{selectedOption.label}</span>
        </div>
      </div>
    );
  },
};
