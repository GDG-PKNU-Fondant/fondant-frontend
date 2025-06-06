import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useCategoryQuery from '@hooks/queries/useCategoryQuery';
import Home from '@pages/Home';
import Category from '@pages/Category';
import Search from '@pages/Search';
import Wish from '@pages/Wish';
import My from '@pages/My';
import Cart from '@pages/Cart';
import Login from '@pages/Login';
import Market from '@pages/Market';
import BottomTab from '@components/BottomTab';

const App: React.FC = () => {
  const { isLoading } = useCategoryQuery();

  if (isLoading) {
    return null;
  }

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/wish" element={<Wish />} />
          <Route path="/my" element={<My />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/market/:marketId" element={<Market />} />
        </Routes>
        <BottomTab />
      </div>
    </Router>
  );
};

export default App;
