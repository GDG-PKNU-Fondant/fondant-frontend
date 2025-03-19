import PreviewCard from '@components/PreviewCard';
import mockMarketProductListData from '@mocks/constants/mockMarketProductListData';

const MarketProductList = () => {
  return (
    <div className="flex-grow">
      <div className="pt-[16px] px-[20px] grid grid-cols-3 place-items-center gap-x-[10px] gap-y-[24px] overflow-x-hidden">
        {mockMarketProductListData.map((product) => (
          <PreviewCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default MarketProductList;
