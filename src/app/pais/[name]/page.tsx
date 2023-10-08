import { Country } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineBackward } from "react-icons/ai";
import { FcConferenceCall, FcFactoryBreakdown, FcGlobe, FcLandscape, FcSms } from "react-icons/fc";

async function getCountryByName(name: string): Promise<Country | null> {
  const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);

  const data = await response.json();

  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  } else {
    return null; // Retorna null se não houver país encontrado
  }

}

export default async function CountryPage(
  {params: {name}}: {params: {name: string}}
  ) {
  const country = await getCountryByName(name)

  const formatter = Intl.NumberFormat("en", {notation: "compact"})

  return(
    <section className="flex flex-col container">
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
          )}
        </section>
        <div className="relative h-auto w-96 shadow-md">
          <Image  fill className="object-cover" src={country?.flags?.svg} alt={country?.flags?.alt}/>
        </div>
      </article>
    </section>
  )
}