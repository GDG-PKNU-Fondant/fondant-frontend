import React from 'react';
import CategoryMenuProps from '@type/CategoryMenu';

const CategoryMenu = ({ category }: { category: CategoryMenuProps }) => {
  return (
    <button type="button">
      <div
        className={`w-16 h-16 bg-beige-primary rounded-full 
          ${category.primary ? 'text-pink font-semibold' : 'text-brown-primary'}`}
      >
        <img
          src={category.iconUrl}
          alt={category.categoryName}
          className="w-full h-full object-contain rounded-full"
        />
      </div>
      <div
        className={`mt-2 text-center text-[13px] font-medium tracking-[-0.5px]
          ${category.primary ? 'text-pink font-semibold' : ''}`}
      >
        {category.categoryName}
      </div>
    </button>
  );
};

export default CategoryMenu;
