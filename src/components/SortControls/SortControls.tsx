import { SortOption, SortOrder } from '@/types/config';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';
import styles from './SortControls.module.css';

/**
 * SortControls Component - Handles sorting of country data.
 *
 * This component allows users to sort countries by name or population in ascending
 * or descending order. Clicking a button toggles the sorting order and updates the
 * state in the parent component.
 *
 * @param {SortOption} sortBy - The current sorting criteria (`"name"` or `"population"`).
 * @param {(sortBy: SortOption) => void} setSortBy - Function to update the sorting criteria.
 * @param {SortOrder} sortOrder - The current sorting order (`"asc"` or `"desc"`).
 * @param {(sortOrder: SortOrder) => void} setSortOrder - Function to update the sorting order.
 *
 * @returns {JSX.Element} A set of buttons for sorting the country list.
 */

type SortControlsProps = {
  sortBy: SortOption;
  setSortBy: (sortBy: SortOption) => void;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
};

export function SortControls({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: SortControlsProps) {
  const handleSort = (type: SortOption) => {
    const newOrder: SortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setSortBy(type);
  };

  return (
    <div className={styles.sortControls}>
      <Button
        variant={sortBy === 'name' ? 'default' : 'secondary'}
        onClick={() => handleSort('name')}
      >
        Sort by Name {sortOrder === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </Button>
      <Button
        variant={sortBy === 'population' ? 'default' : 'secondary'}
        onClick={() => handleSort('population')}
      >
        Sort by Population{' '}
        {sortOrder === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </Button>
    </div>
  );
}
