import type { Metadata } from "next"
import { Archivo, Major_Mono_Display, TASA_Orbiter, Pacifico } from "next/font/google"
import "@/globals.css"

const tasaOrbiter = TASA_Orbiter({
  variable: "--font-tasa-orbiter",
  fallback: ["Arial", "sans-serif"],
})

const archivo = Archivo({
  variable: "--font-archivo",
  axes: ["wdth"],
})

const majorMono = Major_Mono_Display({
  variable: "--font-major-mono",
  weight: "400",
})

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
})

export const metadata: Metadata = {
  title: "yoori dot space",
  description: "thank you for choosing the yoori dot space program for your internet browsing experience",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${tasaOrbiter.variable} ${archivo.variable} ${majorMono.variable} ${pacifico.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
