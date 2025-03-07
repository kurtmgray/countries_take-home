import { ApiConfig } from "@/types/config";

export const apiConfig: ApiConfig = {
  subregion: {
    url:"https://restcountries.com/v3.1/subregion/",
    fields: ["name", "capital", "population", "cca3", "flags"],
  },
  all: {
    url:"https://restcountries.com/v3.1/all",
    fields: ["region", "subregion"],
  },
  fetchTimeout: 5000,
};