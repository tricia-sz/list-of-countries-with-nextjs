"use client"

import Link from "next/link"
import { IoArrowBackCircleSharp } from "react-icons/io5"

export default function Error() {
  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl text-center font-bol text-slate-700 my-16">Ops, ocorreu um erro ao exibir esse país</h1>
      <Link href={"/"} className="">
        <div className="flex items-center py-4 text-2xl justify-center">
          <IoArrowBackCircleSharp size={50}/>
          Voltar
        </div>
      </Link>
    </section>
  )
}