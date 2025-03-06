import { SearchBar } from '@/components/SearchBar/SearchBar';
import { SortControls } from '@/components/SortControls/SortControls';
import { RegionSelect } from '@/components/RegionSelect/RegionSelect';
import { CountryCard } from '@/components/CountryCard/CountryCard';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useFetchCountries } from '@/hooks/useFetchCountries';
import styles from './Home.module.css';
import { useState } from 'react';

export default function Home() {
  const [region, setRegion] = useState<string>('Northern Europe');
  const { countries, filteredCountries, setFilteredCountries, loading, error } =
    useFetchCountries(region);

  const handleRegionChange = (newRegion: string) => {
    console.log('Region changed to:', newRegion); // Debugging
    setRegion(newRegion);
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.heading}>{region} Countries</h1>

      <div>
        <SearchBar
          countries={countries}
          setFilteredCountries={setFilteredCountries}
        />
        <RegionSelect selectedRegion={region} setRegion={handleRegionChange} />
      </div>
      <SortControls
        filteredCountries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
      />
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && (
        <Alert variant="destructive" className={styles.error}>
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className={styles.grid}>
        {filteredCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}
