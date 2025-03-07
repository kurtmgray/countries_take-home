import { useState, useEffect } from "react";
import { apiConfig } from "@/config/apiConfig";
import { buildRegionMap } from "@/lib/mappingUtils";
import { testConfig } from "@/config/testConfig";
import { RegionsApiResponse } from "@/types/country";

const CACHE_KEY = "regions_cache";
const CACHE_EXPIRY_KEY = "regions_cache_expiry";
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24h

/**
 * Custom hook to fetch and process regions from the REST Countries API.
 *
 * This hook retrieves country data, processes it into a Map where each region
 * is a key and its corresponding subregions are values, and returns the data
 * along with loading and error states.
 * 
 * Cached data is stored in `localStorage` and expires after a set time.
 *
 * @returns {Object}
 *   - `regions`: A Map where the keys are region names and values are arrays of subregions.
 *   - `regionsLoading`: Boolean indicating whether the request is in progress.
 *   - `regionsError`: Any error encountered during fetching.
 */

export function useFetchRegions() {
  const [regions, setRegions] = useState<Map<string, string[]>>(()=> {
    
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    
    if (cachedData && cachedExpiry && Date.now() < Number(cachedExpiry)) {
      console.log("Using cached regions data");
      return new Map(JSON.parse(cachedData));
    }
    return new Map();
  });

  const [regionsLoading, setRegionsLoading] = useState<boolean>(false);
  const [regionsError, setRegionsError] = useState<string | null>(null);

    useEffect(() => {
      if (regions.size > 0) return;
      setRegionsLoading(true);
      
      console.log("Regions not in cache, fetching fresh data");

      // extract to API service
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        setRegionsError("Fetch request aborted due to timeout.");
        setRegionsLoading(false);
      }, apiConfig.fetchTimeout);

      async function fetchRegions() {
        try {
          if (testConfig.regionError) throw new Error("Test error");
          
          const response = await fetch(`${apiConfig.all.url}?fields=${apiConfig.all.fields.join(',')}`, {
            signal: controller.signal,
          });
          
          clearTimeout(timeoutId);


          if (!response.ok) {
            throw new Error("Failed to fetch countries.");
          }
          const data: RegionsApiResponse[] = await response.json();

          const regionsMap: Map<string,string[]> = buildRegionMap(data);

          localStorage.setItem(CACHE_KEY, JSON.stringify([...regionsMap]));
          localStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_TTL).toString());

          setRegions(regionsMap);
        } catch (err) {
          setRegionsError((err as Error).message);
          clearTimeout(timeoutId);
        } finally {
          setRegionsLoading(false);
        }
      }
      fetchRegions();
    }, []);
  
    return { regions, regionsLoading, regionsError };
  }