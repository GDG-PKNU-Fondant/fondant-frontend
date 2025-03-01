import { useState } from 'react';
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
      description: '버튼이 선택된 상태인지 여부를 설정합니다.',
      control: 'boolean',
    },
    onClick: { description: '버튼이 클릭되었을 때 호출되는 콜백 함수입니다.' },
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

export const RadioButtonGroupExample = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState<number>(0);

    const options = [
      { id: 1, label: '옵션 1' },
      { id: 2, label: '옵션 2' },
      { id: 3, label: '옵션 3' },
    ];

    const handleOptionSelect = (id: number) => {
      setSelectedOption(id);
    };

    const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleOptionSelect(id);
      }
    };

    return (
      <div
        role="radiogroup"
        aria-label="option-select"
        className="flex flex-col gap-[10px]"
      >
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-[10px] cursor-pointer"
          >
            <RadioButton
              selected={selectedOption === option.id}
              onClick={() => handleOptionSelect(option.id)}
            />
            <span
              onClick={() => handleOptionSelect(option.id)}
              onKeyDown={(e) => handleKeyDown(e, option.id)}
              tabIndex={0}
              role="button"
            >
              {option.label}
            </span>
          </div>
        ))}
        <span className="font-semibold">선택한 옵션: {selectedOption}</span>
      </div>
    );
  },
};
