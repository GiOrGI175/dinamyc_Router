import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './reset.css';
import CountrySection from './pages/country_section/CountrySection';
import Layout from './components/layout/Layout';
import SinglePage from './pages/single_page/SinglePage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<CountrySection />} />
          <Route path='posts' element={<CountrySection />} />
          <Route path='posts/:page' element={<CountrySection />} />
          <Route path='posts/:page/:country' element={<SinglePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
