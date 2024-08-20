import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './SinglePage.module.scss';

const SinglePage = () => {
  const [countrys, setCountrys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { country } = useParams();

  console.log(useParams());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${country}`
        );
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setCountrys(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [country]);

  console.log(countrys);

  const renderInfo = (info) => {
    if (Array.isArray(info)) {
      return info.length > 0 ? info.join(', ') : 'No Information Here';
    } else if (typeof info === 'string') {
      return info.trim() !== '' ? info : 'No Information Here';
    } else if (info && typeof info === 'object') {
      if (Object.keys(info).length > 0) {
        return Object.values(info).join(', ');
      } else {
        return 'No Information Here';
      }
    } else {
      return 'No Information Here';
    }
  };

  return (
    <section>
      <div className={styles.section_container}>
        <div className={styles.section_content}>
          <div>
            <button>go bk</button>
          </div>
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div>
                <div>
                  {countrys.map((countrtInfo) => (
                    <div>
                      <img
                        src={countrtInfo.flags.png}
                        alt={`Flag of ${countrtInfo.name.common}`}
                      />
                    </div>
                  ))}
                </div>
                {countrys.map((countrtInfo) => (
                  <div
                    className={styles.country_Card}
                    key={countrtInfo.name.common}
                  >
                    <div className={styles.country_info}>
                      <div>
                        <h2>Native Name: {countrtInfo.name.common}</h2>
                        <p>Population:{countrtInfo.altSpellings[1]}</p>
                        <p>Region: {countrtInfo.population}</p>
                        <p>Sub Region: {countrtInfo.region}</p>
                        <p>Capital: {countrtInfo.capital}</p>
                      </div>
                      <div>
                        <p>Top Level Domain: {countrtInfo.tld}</p>
                        {/* <p>Currencies: {countrtInfo.currencie}</p> shecdoamaaa aq */}
                        <p>Languages: {renderInfo(countrtInfo.languages)}</p>
                      </div>
                      <div>
                        <p>
                          Border Countries: {renderInfo(countrtInfo.borders)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <h1>{country}</h1> */}
    </section>
  );
};

export default SinglePage;
