import CountryCard from "@/components/CountryCard";
import { Country } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineBackward } from "react-icons/ai";
import { FcConferenceCall, FcFactoryBreakdown, FcGlobe, FcLandscape, FcSms } from "react-icons/fc";

// async function getCountryByName(name: string): Promise<Country | null> {
//   const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);

//   const data = await response.json();

//   if (Array.isArray(data) && data.length > 0) {
//     return data[0];
//   } else {
//     return null; // Retorna null se não houver país encontrado
//   }

// }

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const countries:Country[] = await response.json();

  return countries.find((country: Country) => country.name.common === name)!;
}

async function getCountryBordersByName(name: string) {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const countries:Country[] = await response.json();

  const country = countries.find((country: Country) => country.name.common === name)!;

  return country.borders?.map((border) => {
    const borderCountry = countries.find((country) => (
      country.cca3 === border)!)
    return {
      name: borderCountry?.name.common,
      ptName: borderCountry?.translations.por.common,
      flag: borderCountry?.flags?.svg,
      flagAlt: borderCountry?.flags?.alt
    }
  });
}

export default async function CountryPage(
  {params: {name}}: {params: {name: string}}
  ) {
  const country = await getCountryByName(name)
  const borderCountries = await getCountryBordersByName(decodeURI(name))

  const formatter = Intl.NumberFormat("en", {notation: "compact"})

  return(
    <section className="grid  flex-col container">
      <h1 className="text-5xl font-bold text-center text-gray-800 my-16">
        {country?.translations.por.common}
      </h1>
      <Link href={"/"} className="">
        <div className="flex items-center py-4">
          <AiOutlineBackward size={30}/>
          Voltar
        </div>
      </Link>
      <article className="flex justify-between min-w-full p-10 bg-slate-200 rouded-xl">
        <section>
           <h2 className="text-xl text-gray-800 mt-3 flex gap-2">
            <FcGlobe />
            <b>Continente: </b>{country?.region}
          </h2>
          {country?.capital && (
            <h2 className="text-xl text-gray-800 mt-3 flex gap-2">
            <FcFactoryBreakdown />
            <b>Capital: </b>{country?.capital}
          </h2>
          )}
          { country?.subregion && (
             <h2 className="text-xl text-gray-800 mt-3 flex gap-2">
               <FcLandscape />
              <b>Subregição: </b>
              {country?.subregion}
             </h2>
            )
          }
          <h2 className="text-xl text-gray-800 mt-3 flex gap-2">
            <FcConferenceCall size={24} />
            <b>População: </b>{formatter.format(country?.population)}
          </h2>
          {country?.languages && (
            <h2 className="text-xl text-gray-800 mt-3  gap-2">
              <div className="flex gap-2">
                <FcSms />
                <b>Línguas Faladas: </b>
              </div>
              <br/>
              {Object.values(country?.languages).map((language) => (
                <span 
                  key={language}
                  className="inline-block px-2 mr-2 rounded-full bg-slate-500 text-sm text-white">
                  {language}
                </span>
              ))}
            </h2>
          )}j
        </section>
        <div className="relative my-4 md:h-auto sm- w-96 shadow-md md:order-last order-first ">
          <Image  
            src={country?.flags?.svg} 
            fill 
            className="object-cover" 
            alt={country?.flags?.alt}/>
        </div>
      </article>

      <h3 className="mt-12 text-2xl font-semibold text-slate-800">
        Países que fazem fronteira
      </h3>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
        {
          borderCountries?.map((border) => (
            // eslint-disable-next-line react/jsx-key
            <CountryCard  {...border} />
          ))
        }
      </div>
    </section>
  )
}

