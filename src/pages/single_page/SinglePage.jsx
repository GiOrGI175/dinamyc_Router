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

        const uniqueCountries = data.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.cca3 === item.cca3)
        );

        console.log(uniqueCountries);

        setCountrys(uniqueCountries);
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

  const renderBorderCountrys = (info) => {
    if (Array.isArray(info) && info.length > 0) {
      return info.join(', ');
    } else if (
      info &&
      typeof info === 'object' &&
      Object.keys(info).length > 0
    ) {
      return Object.values(info).join(', ');
    } else {
      return 'No Information Here';
    }
  };

  const renderCurrencies = (currencies) => {
    if (
      currencies &&
      typeof currencies === 'object' &&
      Object.keys(currencies).length > 0
    ) {
      return Object.values(currencies)
        .map((currency) => currency.name || 'Unknown Currency')
        .join(', ');
    }
    return 'No Information Here';
  };

  console.log(countrys.length);

  console.log(countrys.length > 2);

  const countryToUse = countrys.length > 1 ? countrys[1] : countrys[0] || null;

  return (
    <section>
      <div className={styles.section_container}>
        <div className={styles.section_content}>
          <div className={styles.button_container}>
            <button>Go Back</button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <p>{error}</p>
          ) : countryToUse ? (
            <div className={styles.country_Card}>
              <div className={styles.imgBox}>
                <img
                  src={countryToUse.flags?.png}
                  alt={`Flag of ${countryToUse.name?.common}`}
                  className={styles.flag_image}
                />
              </div>
              <div className={styles.country_info}>
                <div className={styles.country_NameBox}>
                  <h1>{countryToUse.name.common}</h1>
                </div>
                <div className={styles.flex_box}>
                  <div className={styles.Info_continer_1}>
                    <p>
                      Native Name: <span>{countryToUse.altSpellings[1]}</span>
                    </p>
                    <p>
                      Population: <span>{countryToUse.population}</span>
                    </p>
                    <p>
                      Region: <span>{countryToUse.region}</span>
                    </p>
                    <p>
                      Sub Region: <span>{countryToUse.subregion}</span>
                    </p>
                    <p>
                      Capital: <span>{renderInfo(countryToUse.capital)}</span>
                    </p>
                  </div>
                  <div className={styles.Info_continer_2}>
                    <p>
                      Top Level Domain:{' '}
                      <span>{renderInfo(countryToUse.tld)}</span>
                    </p>
                    <p>
                      Currencies:{' '}
                      <span>{renderCurrencies(countryToUse.currencies)}</span>
                    </p>
                    <p>
                      Languages:{' '}
                      <span>{renderInfo(countryToUse.languages)}</span>
                    </p>
                  </div>
                </div>
                {/* <div className={styles.Info_continer_3}>
                  <p>
                    Border Countries:
                    {countryToUse.borders.map((border, index) => (
                      <span key={index}>
                        {renderBorderCountrys(border)}
                        {index < countryToUse.borders.length - 1
                          ? ', '
                          : ''}{' '}
                      </span>
                    ))}
                  </p>
                </div> */}
              </div>
            </div>
          ) : (
            <div>No country information available</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SinglePage;
