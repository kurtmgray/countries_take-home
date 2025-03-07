import { AppConfig } from "@/types/config";

export const appConfig: AppConfig = {
  defaultRegion: "Northern Europe",
  sorting: {
    initialSortBy: "name",
    initialSortOrder: "asc",
  },
  fetchTimeout: 5000,
  subregionUrl: "https://restcountries.com/v3.1/subregion/",
  allCountriesUrl: "https://restcountries.com/v3.1/all",
};
