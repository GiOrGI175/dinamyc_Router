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

  return (
    <section>
      <div className={styles.section_container}>
        <div className={styles.section_content}>
          <div>
            <button></button>
          </div>
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div>
                {countrys.map((countrtInfo) => (
                  <div key={countrtInfo.name.common}>
                    <h1>{countrtInfo.name.common}</h1>
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
