import { useMemo, useState } from 'react';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { SortControls } from '@/components/SortControls/SortControls';
import { RegionSelect } from '@/components/RegionSelect/RegionSelect';
import { CountryCard } from '@/components/CountryCard/CountryCard';
import { ErrorAlert } from '@/components/ErrorAlert/ErrorAlert';
import { useFetchCountriesByRegion } from '@/hooks/useFetchCountriesByRegion';
import { useFetchRegions } from '@/hooks/useFetchRegions';
import { Region, SortOption, SortOrder } from '@/types/config';
import { Country } from '@/types/country';
import { appConfig } from '@/config/appConfig';
import { sortCountries } from '@/lib/sortingUtils';
import styles from './Home.module.css';

/**
 * Home Component - Displays the list of countries based on the selected region.
 *
 * This component integrates search, sorting, and region selection functionality,
 * using custom hooks to fetch country and region data. Users can filter countries
 * by name, sort them by name or population, and select different regions to update the displayed data.
 *
 * @returns {JSX.Element} The Home component.
 *
 */
export default function Home() {
  const [region, setRegion] = useState<Region>(appConfig.defaultRegion);
  const { initialCountries, countriesLoading, countriesError } =
    useFetchCountriesByRegion(region);
  const { regions, regionsLoading, regionsError } = useFetchRegions();
  const [searchQuery, setSearchQuery] = useState('');

  const [sortBy, setSortBy] = useState<SortOption>(
    appConfig.sorting.initialSortBy
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    appConfig.sorting.initialSortOrder
  );

  const sortedCountries: Country[] = useMemo(() => {
    return sortCountries(initialCountries, sortBy, sortOrder);
  }, [initialCountries, sortBy, sortOrder]);

  const filteredCountries: Country[] = useMemo(() => {
    if (!searchQuery) return sortedCountries;
    return sortedCountries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedCountries, searchQuery]);

  const handleRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.heading}>Countries of {region}</h1>
      <div className={styles.searchContainer}>
        <RegionSelect
          regions={regions}
          regionsLoading={regionsLoading}
          selectedRegion={region}
          setRegion={handleRegionChange}
        />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <SortControls
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
      {countriesLoading && (
        <p className={styles.loading}>Loading {region} countries...</p>
        // <Skeleton region={region} />
      )}
      <div className={styles.errorsContainer}>
        {countriesError && (
          <ErrorAlert type="Countries" error={countriesError} />
        )}
        {regionsError && <ErrorAlert type="Regions" error={regionsError} />}
      </div>

      {!countriesError && !regionsError && (
        <div className={styles.grid}>
          {filteredCountries.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

// export function Skeleton({ region }: { region: string }) {
//   return (
//     <div className="w-full h-24 bg-gray-300 animate-pulse rounded-lg">
//       {' '}
//       Loading {region} countries...{' '}
//     </div>
//   );
// }
