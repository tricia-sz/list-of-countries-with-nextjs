import { Country } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function CountryCard(
  {name, ptName, flag, flagfAlt }: {name: string, ptName: string, flag: string, flagfAlt:string}
  ) {
  return (
    <Link href={`/pais/${name}`}>
    <article key={name} 
    className="h-64 min-w-full p-2 bg-slate-100 border-2 rounded-xl hover:border-sky-500 transition-all hover:shadow-lg">
    <div className="relative w-full h-40 p-2 overflow-hidden rounded-xl">
      <Image 
        key={name}
        src={flag} 
        alt={flagfAlt}
        fill
        className="object-cover"
        />
    </div>
    <h1 className="font-bold text-xl text-center mt-1">{ptName}</h1>
  </article>
  </Link>
  )
}

