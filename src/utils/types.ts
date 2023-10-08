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
    svg: string;
    png: string;
    alt: string;
  };
  
  capital: string;
  region: string;
  subregion?: string;
  population: any;

  languages?: {
    [key: string ]: string;
  }   
}