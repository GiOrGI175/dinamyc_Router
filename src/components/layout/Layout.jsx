import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvaider } from '../useContext/themeContext';

import Header from '../header/Header';

const Layout = () => {
  return (
    <div>
      <ThemeProvaider>
        <Header />
        <main>
          <Outlet />
        </main>
      </ThemeProvaider>
    </div>
  );
};

export default Layout;
