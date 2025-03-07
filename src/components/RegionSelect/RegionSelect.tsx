import { SelectGroup } from '@radix-ui/react-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Region } from '@/types/config';

/**
 * RegionSelect Component - Dropdown for selecting regions and subregions.
 *
 * This component allows users to select a region and its associated subregions
 * from a structured `Map<string, string[]>`, where each region serves as a
 * category containing multiple subregions.
 *
 * @param {Map<string, string[]>} regions - A map where the key is the region name and the value is an array of subregions.
 * @param {boolean} regionsLoading - Indicates if the region data is being fetched.
 * @param {Region} selectedRegion - The currently selected region.
 * @param {(region: Region) => void} setRegion - Function to update the selected region.
 *
 * @returns {JSX.Element} The dropdown component for selecting regions.
 */

type RegionSelectProps = {
  regions: Map<string, string[]>;
  regionsLoading: boolean;
  selectedRegion: Region;
  setRegion: (region: Region) => void;
};

export function RegionSelect({
  regions,
  regionsLoading,
  selectedRegion,
  setRegion,
}: RegionSelectProps) {
  return (
    <Select value={selectedRegion} onValueChange={setRegion}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>
          {regionsLoading ? 'Loading regions...' : selectedRegion}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Array.from(regions.entries()).map(([region, subregions]) => (
          <SelectGroup key={region}>
            <SelectLabel key={region}>{region}</SelectLabel>
            {subregions.map((subregion) => (
              <SelectItem key={subregion} value={subregion}>
                {subregion}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
