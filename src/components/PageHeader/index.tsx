import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import Badge from '@components/Badge';
import { cartCountAtom } from '@stores/badgeState';
import BackIcon from '@assets/icons/back.svg?react';
import HomeIcon from '@assets/icons/home.svg?react';
import SearchIcon from '@assets/icons/search.svg?react';
import CartIcon from '@assets/icons/cart.svg?react';

interface PageHeaderProps {
  title?: string;
  showActionButtons?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showActionButtons = false,
}) => {
  const navigate = useNavigate();
  const cartCount = useAtomValue(cartCountAtom);

  return (
    <header className="sticky top-0 left-0 right-0 w-full z-1">
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
        {showActionButtons && (
          <div className="flex gap-[16px]">
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => {
                navigate('/');
              }}
            >
              <HomeIcon />
            </button>
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => {
                navigate('/search');
              }}
            >
              <SearchIcon />
            </button>
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => {
                navigate('/cart');
              }}
            >
              <Badge type="count" count={cartCount}>
                <CartIcon />
              </Badge>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
