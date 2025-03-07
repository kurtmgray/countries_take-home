import { memo } from 'react';
import { Country } from '@/types/country';
import styles from './CountryCard.module.css';

/**
 * CountryCard Component - Displays country information in a card.
 *
 * This component renders a country's flag, name, capital, and population in a card format.
 *
 * @param {Country} country - The country object containing name, population, capital, and flag URL.
 *
 * @returns {JSX.Element} A styled card displaying the country's details.
 */

export const CountryCard = memo(({ country }: { country: Country }) => {
  return (
    <div className={styles.card}>
      <img
        src={country.flags.svg || country.flags.png} // add placeholder, edge case
        alt={country.flags.alt}
        className={styles.image}
      />
      <h2 className={styles.name}>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
    </div>
  );
});
