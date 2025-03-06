import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useFetchRegions } from '@/hooks/useFetchRegions';

type RegionSelectProps = {
  selectedRegion: string;
  setRegion: (region: string) => void;
};

export function RegionSelect({ selectedRegion, setRegion }: RegionSelectProps) {
  const { regions, loading } = useFetchRegions();
  console.log(regions);
  return (
    <Select value={selectedRegion} onValueChange={setRegion}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={selectedRegion || 'Select a region'} />
      </SelectTrigger>
      <SelectContent>
        {loading ? (
          <SelectValue>Loading...</SelectValue>
        ) : (
          regions.map((region: string) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
