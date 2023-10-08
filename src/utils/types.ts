export type Country = {
  name: {
    common: string;
    official: string
  }
  
  translations: {
    por: {
      common: string
    }
  };

  flags?: {
    svg?: any;
    png: string;
    alt?: string;
  };
  
  capital: string;
  region: string;
  subregion?: string;
  population?: number;
  borders?: string[]
  cca3: string

  languages?: {
    [key: string ]: string;
  }   
}