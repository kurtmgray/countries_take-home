export type AppConfig = {
  defaultRegion: Region;
  sorting: {
    initialSortBy: SortOption;
    initialSortOrder: SortOrder;
  };
}

export type ApiConfig = {
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