import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import arrow from '/arrow.svg';
import styles from './CountrySection.module.scss';
import FilterBtn from '../../components/filterButton/FilterBtn';

const CountrySection = () => {
  const [countrys, setCountrys] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('');
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
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setCountrys(data);
        setFilteredCountries(data);
        setTotalitems(data.length);
        setLoading(false);
      } catch (error) {
        setError('Failed to load countries.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const filtered = countrys.filter(
        (country) => country.region === selectedRegion
      );
      setFilteredCountries(filtered);
      setTotalitems(filtered.length);
    } else {
      setFilteredCountries(countrys);
      setTotalitems(countrys.length);
    }
  }, [selectedRegion, countrys]);

  const totalPages = Math.ceil(totalitems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currenItems = filteredCountries.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      navigate(`/posts/${page}`);
    }
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    navigate(`/posts/1`);
  };

  return (
    <main>
      <FilterBtn
        arrow={arrow}
        onRegionSelect={handleRegionSelect}
        regions={['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']}
      />
      <div className={styles.main_container}>
        <div className={styles.main_content}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className={styles.country_section}>
              {currenItems.length > 0 ? (
                currenItems.map((country) => (
                  <div
                    key={country.name.common}
                    className={styles.country_Card}
                  >
                    <div className={styles.imgBox}>
                      <img
                        src={country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                      />
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
                ))
              ) : (
                <p>No countries found for the selected region.</p>
              )}

              <div className={styles.buttons_continer}>
                <div className={styles.buttons_content}>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <div>
                      <img
                        src={arrow}
                        alt='Previous page'
                        className={styles.perv_arrow}
                      />
                    </div>
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
                    <div>
                      <img
                        src={arrow}
                        alt='Next page'
                        className={styles.next_arrow}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CountrySection;
