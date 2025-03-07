import styles from './SearchBar.module.css';

/**
 * SearchBar Component - Handles user input for filtering countries by name.
 *
 * This component provides an input field that allows users to search for countries
 * dynamically. The `setSearchQuery` function updates the search term in the parent
 * component, ensuring that search results update in real-time.
 *
 * @param {string} searchQuery - The current search term.
 * @param {(query: string) => void} setSearchQuery - Function to update the search term.
 *
 * @returns {JSX.Element} A styled input field for searching countries.
 */

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        placeholder="Search by country name..."
        className={styles.input}
      />
    </div>
  );
}
