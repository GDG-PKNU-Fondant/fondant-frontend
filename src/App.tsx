import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import Home from '@pages/Home';
import Category from '@pages/Category';
import Search from '@pages/Search';
import Wish from '@pages/Wish';
import My from '@pages/My';
import Header from '@components/Header';
import BottomTab from '@components/BottomTab';
import {
  headerVisibilityAtom,
  bottomTabVisibilityAtom,
} from '@stores/layoutState';

const useScrollVisibility = () => {
  const setIsHeaderVisible = useSetAtom(headerVisibilityAtom);
  const setIsBottomTabVisible = useSetAtom(bottomTabVisibilityAtom);

  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const maxScrollY =
      document.documentElement.scrollHeight - window.innerHeight;

    if (currentScrollY <= 0 || currentScrollY >= maxScrollY) {
      if (currentScrollY <= 0) {
        setIsHeaderVisible(true);
      }
      return;
    }

    if (currentScrollY > lastScrollY) {
      setIsBottomTabVisible(false);
    } else {
      setIsBottomTabVisible(true);
    }

    setIsHeaderVisible(currentScrollY < 10);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return { handleScroll };
};

const App: React.FC = () => {
  useScrollVisibility();

  return (
    <Router>
      <div className="app-container">
        <Header
          onCartClick={() => {}}
          onNotificationClick={() => {}}
          onSearchClick={() => {}}
        />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/search" element={<Search />} />
            <Route path="/wish" element={<Wish />} />
            <Route path="/my" element={<My />} />
          </Routes>
        </div>
        <BottomTab />
      </div>
    </Router>
  );
};

export default App;
