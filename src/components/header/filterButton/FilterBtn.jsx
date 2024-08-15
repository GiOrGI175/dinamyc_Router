import React, { useState } from 'react';

import arrow from '/arrow.svg';

import styles from './filterBtn.module.scss';

const FilterBtn = () => {
  const [filter, setFilter] = useState(false);

  const handleArrow = () => {
    setFilter((perv) => !perv);
  };

  return (
    <div className={styles.filter_container}>
      <div className={styles.filter_content}>
        <div>
          <button onClick={handleArrow}>
            <span>Filter by Region</span>
            <div>
              <img
                src={arrow}
                alt='arrow'
                className={`${styles.Arrowimg} ${
                  filter ? styles['rotate'] : ''
                }`}
              />
            </div>
          </button>
          <div className={styles.region_container}>
            <div
              className={`${styles.region_content} ${
                filter ? styles['show'] : ''
              }`}
            >
              <ul>
                <li>Africa</li>
                <li>America</li>
                <li>Asia</li>
                <li>Europe</li>
                <li>Oceania</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBtn;
