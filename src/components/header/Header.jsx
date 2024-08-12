import React from 'react';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header>
      <div className={styles.header_container}>
        <div className={styles.header_content}></div>
      </div>
    </header>
  );
};

export default Header;
