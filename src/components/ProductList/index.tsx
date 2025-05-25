import PreviewCard from '@components/PreviewCard';
import PreviewCardProps from '@type/PreviewCard';

const ProductList = ({ products }: { products: PreviewCardProps[] }) => {
  return (
    <div className="grid grid-cols-3 place-items-center gap-x-[12px] gap-y-[24px]">
      {products.map((product) => (
        <PreviewCard key={product.id} {...product} type="product" />
      ))}
    </div>
  );
};

export default ProductList;
