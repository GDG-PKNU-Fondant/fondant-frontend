import React from 'react';
import CategoryMenuProps from '@type/CategoryMenu';

const CategoryMenu = ({
  details,
}: {
  details: { category: CategoryMenuProps };
}) => {
  const isPrimary = details.category.categoryName === '퐁당 PICK';

  return (
    <button type="button">
      <div
        className={`w-16 h-16 bg-beige-primary rounded-full
          ${isPrimary ? 'text-pink font-semibold' : 'text-brown-primary'}`}
      >
        <img
          src={details.category.iconUrl}
          alt={details.category.categoryName}
          className="w-full h-full object-contain rounded-full"
        />
      </div>
      <div
        className={`mt-2 text-center text-[13px] font-medium tracking-[-0.5px]
          ${isPrimary ? 'text-pink font-semibold' : ''}`}
      >
        {details.category.categoryName}
      </div>
    </button>
  );
};

export default CategoryMenu;
