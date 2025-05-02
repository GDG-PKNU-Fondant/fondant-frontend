import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackIcon from '@assets/icons/back.svg?react';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 left-0 right-0 w-full">
      <div className="flex h-[60px] bg-background items-center justify-between px-[16px]">
        <button
          className="cursor-pointer"
          type="button"
          onClick={() => navigate(-1)}
        >
          <BackIcon />
        </button>
        <div
          className="flex-grow text-brown-primary text-[19px] text-center font-bold mr-[24px]"
          aria-label={title}
        >
          {title}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
