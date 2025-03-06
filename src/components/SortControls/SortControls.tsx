import { Country } from '@/types/country';
import { Button } from '@/components/ui/button';

type SortControlsProps = {
  filteredCountries: Country[];
  setFilteredCountries: (countries: Country[]) => void;
};

export function SortControls({
  filteredCountries,
  setFilteredCountries,
}: SortControlsProps) {
  const sortByName = () => {
    setFilteredCountries(
      [...filteredCountries].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const sortByNameDesc = () => {
    setFilteredCountries(
      [...filteredCountries].sort((a, b) => b.name.localeCompare(a.name))
    );
  };

  const sortByPopulation = () => {
    setFilteredCountries(
      [...filteredCountries].sort((a, b) => a.population - b.population)
    );
  };

  const sortByPopulationDesc = () => {
    setFilteredCountries(
      [...filteredCountries].sort((a, b) => b.population - a.population)
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      <Button variant="default" onClick={sortByName}>
        Sort by Name (A-Z)
      </Button>
      <Button onClick={sortByNameDesc}>Sort by Name (Z-A)</Button>
      <Button onClick={sortByPopulation}>Sort by Population (Ascending)</Button>
      <Button onClick={sortByPopulationDesc}>
        Sort by Population (Descending)
      </Button>
    </div>
  );
}
