import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dangasalikdan Halos Bo'l - Bepul Vebinar",
  description: "Hayotni tartiblash va maqsadlarga erishish bo'yicha bepul vebinar",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz">
      <body className="antialiased">{children}</body>
    </html>
  )
}
