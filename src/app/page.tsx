import { Country } from "@/utils/types"

async function fetchAllCountries(): Promise<Country[]> {
  const response = await fetch("https://restcountries.com/v3.1/all")

  return response.json()
}

export default async function Home() {
  const countries = await fetchAllCountries()

  return (
    <section className="w-full flex container">
      {countries.map((country: Country) => (
        <h1 key={country.name.common}>{country.name.common}</h1>
      ))}
    </section>
  )
}
