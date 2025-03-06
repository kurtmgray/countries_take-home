import { useState, useEffect } from "react";
import { Country, CountryApiResponse } from "@/types/country";

export function useFetchCountries(region: string) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/subregion/${region}`);
        if (!response.ok) throw new Error("Failed to fetch countries.");
        const data = await response.json();
        const mappedCountries: Country[] = data.map((country: CountryApiResponse) => ({
          name: country.name.common,
          population: country.population,
          capital: country.capital ? country.capital[0] : "N/A",
          flag: country.flags.png || country.flags.svg,
          cca3: country.cca3,
        }));
        
        setCountries(mappedCountries);
        setFilteredCountries(mappedCountries);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, [region]);

  return { countries, filteredCountries, setFilteredCountries, loading, error };
}
