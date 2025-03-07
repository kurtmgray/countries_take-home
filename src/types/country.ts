export type Country = {
  name: string;
  population: number;
  capital?: string;
  flag: string;
  id: string; 
};

export type CountryApiResponse = {
  name: { common: string };
  population: number;
  capital?: string[];
  flags: { png: string; svg: string };
  cca3: string;
  region: string;
  subregion: string;
};