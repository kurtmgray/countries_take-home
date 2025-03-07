export interface Country {
  name: string;
  population: number;
  capital?: string;
  flags: { png: string; svg: string, alt: string };
  id: string; 
};

export interface CountryApiResponse {
  name: { common: string };
  population: number;
  capital?: string[];
  flags: { png: string; svg: string, alt: string };
  cca3: string;
};

export interface RegionsApiResponse {
  region: string;
  subregion: string;
}