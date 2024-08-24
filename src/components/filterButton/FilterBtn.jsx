import React, { useState, useContext } from 'react';
import ThemeContext from '../useContext/themeContext';
import styles from './filterBtn.module.scss';

import dark_arrow from '/DarkMode_Arrow.svg';

const FilterBtn = ({ arrow, regions, onRegionSelect }) => {
  const [filter, setFilter] = useState(false);

  const { isDark } = useContext(ThemeContext);

  const handleArrow = () => {
    setFilter((prev) => !prev);
  };

  const handleRegionClick = (region) => {
    if (onRegionSelect) {
      onRegionSelect(region);
    }
    setFilter(false);
  };

  return (
    <div className={styles.filter_container}>
      <div className={styles.filter_content}>
        <div>
          <button
            className={`${styles.button} ${isDark ? styles['DarkMode'] : ''}`}
            onClick={handleArrow}
          >
            <span>Filter by Region</span>
            <div>
              <img
                src={isDark ? dark_arrow : arrow}
                alt='Arrow indicating filter dropdown'
                className={`${styles.Arrowimg} ${filter ? styles.rotate : ''}`}
              />
            </div>
          </button>
          <div className={styles.region_container}>
            <div
              className={`${styles.region_content} ${
                filter ? styles.show : ''
              } ${isDark ? styles.DarkMode : ''}`}
            >
              <ul>
                {regions.length > 0 ? (
                  regions.map((region) => (
                    <li key={region} onClick={() => handleRegionClick(region)}>
                      {region}
                    </li>
                  ))
                ) : (
                  <li>No regions available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBtn;
