export type Country = {
  name: string;
  population: number;
  capital?: string;
  flag: string;
  cca3: string; // ID 
};

export type CountryApiResponse = {
  name: { common: string };
  population: number;
  capital?: string[];
  flags: { png: string; svg: string };
  cca3: string;
};