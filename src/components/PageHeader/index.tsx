import React from 'react';
import BackIcon from '@assets/icons/back.svg?react';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="flex p-[16px] bg-background items-center justify-between">
      <BackIcon className="cursor-pointer" />
      <div
        className="flex-grow text-brown-primary text-[19px] text-center font-bold mr-[24px]"
        aria-label={title}
      >
        {title}
      </div>
    </div>
  );
};

export default PageHeader;
