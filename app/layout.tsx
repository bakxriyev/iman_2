import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Toaster } from "@/components/toast"

export const metadata: Metadata = {
  title: "Jonli Vebinar - Ibodatlarda Dangasalikka Nuqta Qo'yamiz",
  description: "Iman Akhmedovnadan 2 kunlik Bepul Vebinar",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz">
      <head>
      <meta name="facebook-domain-verification" content="65jfbkql08wmrcp5o23nz0v9ogsw1y" />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
