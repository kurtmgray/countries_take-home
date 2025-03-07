import { SortOption, SortOrder } from "@/types/config";
import { Country } from "@/types/country";

/**
 * Sorts an array of countries based on the specified sorting criteria.
 *
 * This function sorts countries either by name (alphabetically) or by population,
 * in ascending or descending order, based on the provided parameters.
 *
 * @param {Country[]} countries - The array of countries to be sorted.
 * @param {SortOption} sortBy - The sorting criteria (`"name"` or `"population"`).
 * @param {SortOrder} sortOrder - The sorting order (`"asc"` or `"desc"`).
 * @returns {Country[]} A new sorted array of countries.
 */

export const sortCountries = (
  countries: Country[],
  sortBy: SortOption,
  sortOrder: SortOrder
): Country[] => {
  if (sortBy === 'name') {
    return sortOrder === 'asc'
      ? sortByNameAsc(countries)
      : sortByNameDesc(countries);
  } else {
    return sortOrder === 'asc'
      ? sortByPopulationAsc(countries)
      : sortByPopulationDesc(countries);
  }
};

const sortByPopulationAsc = (countries: Country[]): Country[] => {
  return [...countries].sort((a, b) => a.population - b.population);
}

const sortByPopulationDesc = (countries: Country[]): Country[] => {
  return [...countries].sort((a, b) => b.population - a.population);
}

const sortByNameAsc = (countries: Country[]): Country[] => {
  return [...countries].sort((a, b) => a.name.localeCompare(b.name));
}

const sortByNameDesc = (countries: Country[]): Country[] => {  
  return [...countries].sort((a, b) => b.name.localeCompare(a.name));
}