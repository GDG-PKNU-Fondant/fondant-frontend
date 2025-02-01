import React from 'react';
import CategoryMenuProps from '@type/CategoryMenu';

const fixedCategories: CategoryMenuProps[] = [
  {
    id: 6,
    categoryName: '빵',
    iconUrl:
      'https://images.unsplash.com/photo-1736673016620-5c61ddc0388f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    categoryName: '쿠키',
    iconUrl:
      'https://images.unsplash.com/photo-1516295615676-7ae4303c1c63?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    categoryName: '구움과자',
    iconUrl:
      'https://images.unsplash.com/photo-1737984788286-032e7d8f0ec2?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 9,
    categoryName: '젤리',
    iconUrl:
      'https://images.unsplash.com/photo-1683405731287-8205c0a92ace?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 10,
    categoryName: '기타 간식',
    iconUrl:
      'https://images.unsplash.com/photo-1618411640018-972400a01458?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const CategoryMenu = ({ categories }: { categories: CategoryMenuProps[] }) => {
  const allCategories = [...categories, ...fixedCategories];

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {allCategories.map((category) => (
        <div key={category.id} className="flex flex-col items-center">
          <div className="w-16 h-16 bg-beige-primary rounded-full flex items-center justify-center">
            <img
              src={category.iconUrl}
              alt={category.categoryName}
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="mt-2 text-center text-[13px] font-medium leading-[20px] text-brown-primary">
            {category.categoryName}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryMenu;
