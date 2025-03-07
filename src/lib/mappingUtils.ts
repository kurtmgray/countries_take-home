import { Country, CountryApiResponse, RegionsApiResponse } from "@/types/country";

/**
 * Maps API response data into a structured array of Country objects.
 *
 * This function extracts relevant fields from the API response and returns
 * a simplified structure containing essential country information such as
 * name, population, capital, flag, and unique ID.
 *
 * @param {CountryApiResponse[]} data - The raw API response array of countries.
 * @returns {Country[]} An array of formatted Country objects.
 */

export function mapCountries(data: CountryApiResponse[]): Country[] {
  return data.map((country) => ({
    name: country.name.common,
    population: country.population,
    capital: country.capital ? country.capital[0] : "N/A",
    flags: {
      png: country.flags.png,
      svg: country.flags.svg,
      alt: country.flags.alt,
    },
    id: country.cca3,
  }));
}

/**
 * Builds a mapping of regions to their associated subregions.
 *
 * This function processes an array of country data, grouping subregions under
 * their respective regions in a Map. Each region serves as a key, while its value
 * is an array of unique subregions.
 *
 * @param {CountryApiResponse[]} countryData - The raw API response array of countries.
 * @returns {Map<string, string[]>} A Map where keys are regions and values are arrays of subregions.
 */

export function buildRegionMap(countryData: RegionsApiResponse[]): Map<string, string[]> {
  const regionMap = new Map<string, Set<string>>();

  for (const country of countryData) {
    if (!country.subregion) continue;

    // faster lookup on set than array.inclues()
    if (!regionMap.has(country.region)) {
      regionMap.set(country.region, new Set());
    }

    regionMap.get(country.region)!.add(country.subregion);
  }

  return new Map([...regionMap].map(([region, subregions]) => [region, [...subregions]]));
}