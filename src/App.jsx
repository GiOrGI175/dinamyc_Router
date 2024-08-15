import React from 'react';

import './reset.css';
import Header from './components/header/Header';
import CountrySection from './pages/country_section/CountrySection';

const App = () => {
  return (
    <>
      <Header />
      <CountrySection />
    </>
  );
};

export default App;
