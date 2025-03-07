export interface AppConfig {
  defaultRegion: Region;
  sorting: {
    initialSortBy: SortOption;
    initialSortOrder: SortOrder;
  };
}

export interface ApiConfig {
  subregion: {
    url: string;
    fields: string[];
  };
  all: {
    url: string;
    fields: string[];
  };
  fetchTimeout: number;
};

export type Region = string;

export type SortOption = "name" | "population";
export type SortOrder = "asc" | "desc";