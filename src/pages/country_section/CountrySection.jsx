import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './CountrySection.module.scss';
import FilterBtn from '../../components/filterButton/FilterBtn';

const CountrySection = () => {
  const [countrys, setCountrys] = useState();
  const [loading, setLoading] = useState(true);
  const [totalitems, setTotalitems] = useState(0);

  const itemsPerPage = 8;
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = parseInt(page, 10) || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        if (!res.ok) {
          throw new Error('Network error');
        }
        const data = await res.json();
        setCountrys(data);
        setTotalitems(data.length);
        setLoading(false);
      } catch (error) {
        console.log('error data', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(countrys);

  const totalPages = Math.ceil(totalitems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currenItems = countrys ? countrys.slice(startIndex, endIndex) : [];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      navigate(`/posts/${page}`);
    }
  };

  return (
    <main>
      <FilterBtn />
      <div className={styles.main_container}>
        <div className={styles.main_content}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className={styles.country_section}>
              {currenItems.map((country) => {
                return (
                  <div
                    key={country.name.common}
                    className={styles.country_Card}
                  >
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

              <div>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CountrySection;
