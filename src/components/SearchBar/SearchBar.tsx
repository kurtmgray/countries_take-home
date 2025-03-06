import { useState } from 'react';
import { Country } from '@/types/country';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  countries: Country[];
  setFilteredCountries: (countries: Country[]) => void;
};

export function SearchBar({ countries, setFilteredCountries }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setFilteredCountries(
      countries.filter((country) => country.name.toLowerCase().includes(value))
    );
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by country name..."
        className={styles.input}
      />
    </div>
  );
}
