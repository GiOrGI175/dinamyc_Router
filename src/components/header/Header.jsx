import React, { useContext } from 'react';
import ThemeContext from '../useContext/themeContext';

import Light_moon from '/LightMode_moon.svg';
import Dark_moon from '/DarkMode_moon.svg';

import styles from './Header.module.scss';

const Header = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`${styles.header} ${isDark ? styles['DarkMode'] : ''}`}>
      <div className={styles.header_container}>
        <div className={styles.header_content}>
          <div>
            <p
              className={`${styles.Main_Pharagraph} ${
                isDark ? styles['DarkMode'] : ''
              }`}
            >
              Where in the world?
            </p>
          </div>
          <div>
            <button onClick={toggleTheme}>
              <div>
                <img src={isDark ? Dark_moon : Light_moon} alt='moon' />
              </div>
              <span
                className={`${styles.Dark_Mode} ${
                  isDark ? styles['DarkMode'] : ''
                }`}
              >
                Dark Mode
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
