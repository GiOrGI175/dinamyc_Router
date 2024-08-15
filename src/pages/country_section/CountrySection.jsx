import React, { useState, useEffect } from 'react';

import styles from './CountrySection.module.scss';
import FilterBtn from '../../components/header/filterButton/FilterBtn';

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
            <div>
              {countrys.map((country) => {
                return (
                  <div>
                    <div>
                      <img src={country.flags.png} alt='flag' />
                    </div>
                    <div>
                      <h2>{country.name.common}</h2>
                      <div>
                        <p>Population: {country.population}</p>
                        <p>Region: {country.region}</p>
                        <p>Capital: {country.capital}</p>
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
