import { useState, useEffect, useRef } from "react";
import { Country, CountryApiResponse } from "@/types/country";
import { mapCountries } from "@/lib/mappingUtils";
import { apiConfig } from "@/config/apiConfig";
import { testConfig } from "@/config/testConfig";

/**
 * Hook to fetch countries based on a selected (sub) region.
 *
 * This hook fetches country data from the REST Countries API,
 * applies a timeout mechanism, and returns the fetched countries,
 * loading state, and any errors.
 *
 * @param {string} region - The selected region for which countries should be fetched.
 * @returns {Object} 
 *   - `initialCountries`: The list of fetched countries.
 *   - `countriesLoading`: Boolean indicating whether the request is in progress.
 *   - `countriesError`: An error encountered during fetching.
 */

export function useFetchCountriesByRegion(region: string) {
  const [initialCountries, setInitialCountries] = useState<Country[]>([]);  // stores region countries fetched one region at a time
  const [countriesLoading, setLoading] = useState<boolean>(true);
  const [countriesError, setError] = useState<string | null>(null);
  
  const cache = useRef<Map<string, Country[]>>(new Map()); // caches all fetched regions

  useEffect(() => {
    setLoading(true);
    
    // check if region's countries are cached
    if (cache.current.has(region)) {
      console.log('cache before fetch', cache.current);
      console.log(`Using cached data for ${region}`);
      setInitialCountries(cache.current.get(region)!);
      setLoading(false);
      return;
    }
    
    // TODO: extract to API service - fetchWithTimeout()
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      setError("Fetch request aborted due to timeout.");
      setLoading(false);
    }, apiConfig.fetchTimeout);

    async function fetchCountries() {
      try {
        if (testConfig.countryError) throw new Error("Test error");
        
        const response = await fetch(`${apiConfig.subregion.url}${region}?fields=${apiConfig.subregion.fields.join(',')}`, {
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error("Failed to fetch countries.");
        }
        const data: CountryApiResponse[] = await response.json();
      
        // mapping data from API to app format
        const mappedCountries: Country[] = mapCountries(data);
      
        cache.current.set(region, mappedCountries);
        console.log('cache after fetch', cache.current);

        setInitialCountries(mappedCountries);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, [region]);

  return { initialCountries, countriesLoading, countriesError };
}
