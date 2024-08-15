import React from 'react';

import Light_moon from '/public/LightMode_moon.svg';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header>
      <div className={styles.header_container}>
        <div className={styles.header_content}>
          <div>
            <p>Where in the world?</p>
          </div>
          <div>
            <button>
              <div>
                <img src={Light_moon} alt='moon' />
              </div>
              <span>Dark Mode</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
