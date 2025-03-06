import { Country } from '@/types/country';
import styles from './CountryCard.module.css';

export function CountryCard({ country }: { country: Country }) {
  return (
    <div className={styles.card}>
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        className={styles.image}
      />
      <h2 className={styles.name}>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
    </div>
  );
}
