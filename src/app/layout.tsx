import './globals.css'
import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import {FcGlobe} from 'react-icons/fc'

const nunito = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lista de Países',
  description: 'Lista de países utilizando a API REST Countries',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <main className="min-h-screen">
          <nav className="bg-slate-200 w-full h-16 flex justify-center items-center">
            <section className=" flex  items-center h-5 container gap-3">
              <FcGlobe size={50} />
              <h1 className="font-bold text-2xl">Lista de Países</h1>
            </section>
          </nav>
          {children}
        </main>
      </body>
    </html>
  )
}
