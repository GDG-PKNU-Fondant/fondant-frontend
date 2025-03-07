import { useState } from 'react';
import { Meta } from '@storybook/react';
import CheckButton from '@components/CheckButton';
import '@styles/tailwind.css';

export default {
  title: 'Components/CheckButton',
  component: CheckButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: '버튼의 크기를 설정합니다.',
      control: { type: 'number', min: 16, max: 28, step: 2 },
    },
    rounded: {
      description: '버튼의 모서리가 둥근지 여부를 결정합니다.',
      control: 'boolean',
    },
    selected: {
      description: '버튼이 선택된 상태인지 여부를 설정합니다.',
      control: 'boolean',
    },
    onClick: { description: '버튼이 클릭되었을 때 호출되는 콜백 함수입니다.' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '여러 옵션을 선택할 수 있는 체크 버튼 컴포넌트입니다.',
      },
    },
  },
} as Meta;

export const Default = {
  args: {
    rounded: false,
    selected: false,
  },
};

export const Selected = {
  args: {
    rounded: false,
    selected: true,
  },
};

export const Rounded = {
  args: {
    rounded: true,
    selected: false,
  },
};

export const RoundedSelected = {
  args: {
    rounded: true,
    selected: true,
  },
};

export const CheckButtonGroupExample = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

    const options = [
      { id: 1, label: '옵션 1' },
      { id: 2, label: '옵션 2' },
      { id: 3, label: '옵션 3' },
    ];

    const handleToggle = (id: number) => {
      setSelectedOptions((prevSelected) => {
        if (prevSelected.includes(id)) {
          return prevSelected.filter((optionId) => optionId !== id);
        }
        return [...prevSelected, id];
      });
    };

    const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleToggle(id);
      }
    };

    return (
      <div className="flex flex-col gap-[10px]">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-[10px] cursor-pointer"
          >
            <CheckButton
              selected={selectedOptions.includes(option.id)}
              onClick={() => handleToggle(option.id)}
            />
            <span
              onClick={() => handleToggle(option.id)}
              onKeyDown={(e) => handleKeyDown(e, option.id)}
              tabIndex={0}
              role="button"
            >
              {option.label}
            </span>
          </div>
        ))}
        <span className="font-semibold">
          선택한 옵션: {selectedOptions.join(', ')}
        </span>
      </div>
    );
  },
};
