import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import Home from '@pages/Home';
import Category from '@pages/Category';
import Search from '@pages/Search';
import Wish from '@pages/Wish';
import My from '@pages/My';
import BottomTab from '@components/BottomTab';
import useScrollVisibility from '@hooks/useScrollVisibility';
import { bottomTabVisibilityAtom } from '@stores/layoutState';

const App: React.FC = () => {
  const setIsBottomTabVisible = useSetAtom(bottomTabVisibilityAtom);

  useScrollVisibility(setIsBottomTabVisible);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/wish" element={<Wish />} />
          <Route path="/my" element={<My />} />
        </Routes>
        <BottomTab />
      </div>
    </Router>
  );
};

export default App;
