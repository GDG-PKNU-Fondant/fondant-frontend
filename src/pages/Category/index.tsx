import React, { useEffect, useRef, useState } from 'react';

import PageHeader from '@components/PageHeader';
import RightIcon from '@assets/icons/right.svg?react';
import { Categories } from '@type/Category';
import MOCK_CATEGORIES from '@mocks/constants/mockCategories';

interface SectionProps {
  title: string;
  iconUrl: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Section = ({ title, iconUrl, onClick, children }: SectionProps) => (
  <div>
    <div className="flex items-center justify-between mb-[12px]">
      <div className="flex items-center gap-[12px]">
        <div className="w-[40px] h-[40px] rounded-full bg-beige-primary flex items-center justify-center">
          <img
            src={iconUrl}
            alt={title}
            className="w-[27px] h-[27px] object-contain"
          />
        </div>
        <div className="text-[14px] font-semibold text-brown-primary tracking-[-0.5px]">
          {title}
        </div>
      </div>
      <button type="button" className="cursor-pointer" onClick={onClick}>
        <RightIcon />
      </button>
    </div>
    {children}
    <div className="border-b border-beige-tertiary -mx-[20px] my-[24px]" />
  </div>
);

interface SectionItemProps {
  label: string;
  onClick?: () => void;
}

const SectionItem = ({ label, onClick }: SectionItemProps) => (
  <button
    type="button"
    onClick={onClick}
    className="text-left text-[14px] font-medium text-brown-secondary leading-[28px] cursor-pointer"
  >
    {label}
  </button>
);

const Category = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const nameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCategories(MOCK_CATEGORIES);
  }, []);

  const handleCategoryClick = (index: number) => {
    setSelectedIndex(index);
    const target = nameRefs.current[index];
    const scrollContainer = scrollRef.current;
    if (target && scrollContainer) {
      const relativeTop = target.offsetTop - scrollContainer.offsetTop;
      scrollContainer.scrollTo({
        top: relativeTop - 20,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      let closestIndex = 0;
      let closestOffset = Infinity;

      nameRefs.current.forEach((ref, i) => {
        if (ref) {
          const elementTop = ref.getBoundingClientRect().top;
          const offset = Math.abs(elementTop - 100);
          if (offset < closestOffset) {
            closestOffset = offset;
            closestIndex = i;
          }
        }
      });

      setSelectedIndex(closestIndex);
    };

    const currentRef = scrollRef.current;
    currentRef?.addEventListener('scroll', handleScroll);
    return () => currentRef?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-background min-h-screen pb-[80px]">
      <PageHeader title="카테고리" />
      <div className="flex">
        <div className="w-[90px] bg-beige-tertiary fixed top-[60px] min-h-screen">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(i)}
              className={`w-full h-[50px] text-[14px] text-left pl-[16px] font-semibold tracking-[-0.5px] ${
                i === selectedIndex
                  ? 'bg-background text-brown-primary'
                  : 'text-brown-tertiary'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div
          className="flex-1 ml-[90px] px-[20px] pt-[5px] overflow-y-auto scrollbar-hide h-[calc(100vh-60px)]"
          ref={scrollRef}
        >
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              ref={(el) => {
                nameRefs.current[i] = el;
              }}
            >
              <Section
                title={cat.name}
                iconUrl={cat.iconUrl}
                onClick={() => {}}
              >
                <div className="grid grid-cols-2 pt-[14px] gap-x-[64px] gap-y-[24px]">
                  {cat.subCategories.map((sub) => (
                    <SectionItem
                      key={sub.id}
                      label={sub.name}
                      onClick={() => {}}
                    />
                  ))}
                </div>
              </Section>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
