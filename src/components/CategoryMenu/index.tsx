import CategoryMenuProps from '@type/CategoryMenu';

const CategoryMenu = ({ category }: { category: CategoryMenuProps }) => {
  return (
    <button type="button">
      <div
        className={`w-[64px] h-[64px] bg-beige-primary rounded-full flex items-center justify-center
          ${category.primary ? 'text-pink font-semibold' : 'text-brown-primary'}`}
      >
        <img
          src={category.iconUrl}
          alt={category.categoryName}
          className="w-[52px] h-[52px] object-center rounded-full"
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
