export type Country = {
  name: string;
  population: number;
  capital?: string;
  flags: { png: string; svg: string, alt: string };
  id: string; 
};

export type CountryApiResponse = {
  name: { common: string };
  population: number;
  capital?: string[];
  flags: { png: string; svg: string, alt: string };
  cca3: string;
};

export type RegionsApiResponse = {
  region: string;
  subregion: string;
}