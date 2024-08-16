import React, { useState, useEffect } from 'react';

import styles from './CountrySection.module.scss';

const CountrySection = () => {
  const [countrys, setCountrys] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        if (!res.ok) {
          throw new Error('Network error');
        }
        const data = await res.json();
        setCountrys(data);
        setLoading(false);
      } catch (error) {
        console.log('error data', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(countrys);

  return (
    <main>
      <FilterBtn />
      <div className={styles.main_container}>
        <div className={styles.main_content}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className={styles.country_section}>
              {countrys.map((country) => {
                return (
                  <div className={styles.country_Card}>
                    <div className={styles.imgBox}>
                      <img src={country.flags.png} alt='flag' />
                    </div>
                    <div className={styles.info_box}>
                      <h2>{country.name.common}</h2>
                      <div className={styles.country_info}>
                        <p>
                          Population: <span>{country.population}</span>
                        </p>
                        <p>
                          Region: <span>{country.region}</span>
                        </p>
                        <p>
                          Capital: <span>{country.capital}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CountrySection;
