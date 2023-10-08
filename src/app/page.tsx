import CountryCard from "@/components/CountryCard"
import { Country } from "@/utils/types"


async function fetchAllCountries(): Promise<Country[]> {
  const response = await fetch("https://restcountries.com/v3.1/all")

  return response.json()
}

export default async function Home() {
  const countries = await fetchAllCountries()

  return (
    // RESPONSIVE: "grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 sm:grid-cols-2"
    <section className="
      grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 w-full container gap-2 mt-16 rounded-xl">
      {countries.map((country) => (
        <CountryCard 
          key={country.name.common}
          name={country.name.common} 
          ptName={country.translations.por.common} 
          flag={country?.flags?.svg}
          alt={country.flags?.alt}
        />
      ))}
    </section>
  )
}
