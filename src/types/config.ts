export type AppConfig = {
  defaultRegion: Region;
  sorting: {
    initialSortBy: SortOption;
    initialSortOrder: SortOrder;
  };
  fetchTimeout: number,
  subregionUrl: string,
  allCountriesUrl: string,
}

export type Region = string;

export type SortOption = "name" | "population";
export type SortOrder = "asc" | "desc";