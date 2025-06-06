import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import axios from 'axios';
import { MarketDetail } from '@type/Market';
import { rawCategoriesAtom } from '@stores/categoryState';
import ErrorPage from '@pages/ErrorPage';
import TabNavigator from '@components/TabNavigator';
import ProductList from '@components/ProductList';

const Market = () => {
  const { marketId } = useParams<{ marketId: string }>();
  const [productList, setProductList] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [marketDetail, setMarketDetail] = useState<MarketDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const categories = useAtomValue(rawCategoriesAtom);

  useEffect(() => {
    if (!marketId) return;

    const fetchMarketDetail = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/markets/${marketId}`);
        setMarketDetail(response.data);
        setError(null);
      } catch (fetchError) {
        // eslint-disable-next-line no-console
        console.error('마켓 상세 정보를 불러오는 데 실패했습니다:', fetchError);
        setError(
          axios.isAxiosError(fetchError) && fetchError.response?.status === 404
            ? '존재하지 않는 마켓입니다'
            : '마켓 정보를 불러올 수 없습니다',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketDetail();
  }, [marketId]);

  const categoryTabs = useMemo(() => {
    if (!marketDetail?.subCategoryIds || !categories) return [];

    return marketDetail.subCategoryIds
      .map((categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);

        if (!category) return null;

        return {
          label: category.name,
          key: category.id.toString(),
        };
      })
      .filter((tab) => tab !== null);
  }, [marketDetail?.subCategoryIds, categories]);

  useEffect(() => {
    if (categoryTabs.length > 0 && !activeTab) {
      setActiveTab(categoryTabs[0].key);
    }
  }, [categoryTabs, activeTab]);

  useEffect(() => {
    if (!marketId || !activeTab) return;

    const fetchProductList = async () => {
      try {
        const response = await axios.get(
          `/api/product/${marketId}/${activeTab}`,
        );
        setProductList(response.data);
      } catch (fetchError) {
        // eslint-disable-next-line no-console
        console.error('상품 목록을 불러오는 데 실패했습니다:', fetchError);
        setProductList([]);
      }
    };

    fetchProductList();
  }, [marketId, activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  if (isLoading || !marketDetail) {
    return null;
  }

  return (
    <div className="min-h-dvh pb-[90px]">
      <div className="relative mb-[16px]">
        <div className="absolute bottom-[4px] left-0 right-0">
          <div className="h-[1px] bg-beige-secondary w-full" />
        </div>
        <TabNavigator tabs={categoryTabs} onTabChange={handleTabChange} />
      </div>
      <div className="px-[16px]">
        <ProductList products={productList} />
      </div>
    </div>
  );
};

export default Market;
