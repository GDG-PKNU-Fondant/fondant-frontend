import MarketInfo from '@components/MarketInfo';
import TabNavigator from '@components/TabNavigator';
import { CATEGORY_TABS } from '@components/TabNavigator/tabs';
import mockMarketInfoData from '@mocks/constants/mockMarketInfoData';
import MarketProductList from './components/MarketProductList';
import ToTopButton from '@components/ToTopButton';

const Market = () => {
  return (
    <div className="relative">
      <ToTopButton />
      <MarketInfo {...mockMarketInfoData} />
      <div className="pt-[30px]">
        <TabNavigator
          tabs={CATEGORY_TABS}
          fixedTextSize={16}
          bottomBorder
        ></TabNavigator>
      </div>
      <MarketProductList></MarketProductList>
    </div>
  );
};

export default Market;
