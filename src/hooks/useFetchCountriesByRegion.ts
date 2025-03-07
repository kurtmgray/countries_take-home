import { useState, useEffect } from "react";
import { Country } from "@/types/country";
import { mapCountries } from "@/lib/mappingUtils";
import { appConfig } from "@/config/appConfig";
import { testConfig } from "@/config/testConfig";

/**
 * Hook to fetch countries based on a selected (sub) region.
 *
 * This hook fetches country data from the REST Countries API,
 * applies a timeout mechanism, and returns the fetched countries,
 * loading state, and any potential errors.
 *
 * @param {string} region - The selected region for which countries should be fetched.
 * @returns {Object} 
 *   - `initialCountries`: The list of fetched countries.
 *   - `countriesLoading`: Boolean indicating whether the request is in progress.
 *   - `countriesError`: An error encountered during fetching.
 */
export function useFetchCountriesByRegion(region: string) {
  const [initialCountries, setInitialCountries] = useState<Country[]>([]);
  const [countriesLoading, setLoading] = useState<boolean>(true);
  const [countriesError, setError] = useState<string | null>(null);

  useEffect(() => {
    
    // extract to API service
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      setError("Fetch request aborted due to timeout.");
      setLoading(false);
    }, appConfig.fetchTimeout);

    async function fetchCountries() {
      try {
        if (testConfig.countryError) throw new Error("Test error");
        
        const response = await fetch(`${appConfig.subregionUrl}${region}`, {
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error("Failed to fetch countries.");
        }
        const data = await response.json();
        
        const mappedCountries: Country[] = mapCountries(data);
        
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
