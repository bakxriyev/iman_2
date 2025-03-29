import type React from "react"
import "./globals.css"

export const metadata = {
  title: "Dangasalikdan Halos Bo'l - Jonli Vebinar",
  description: "Jonli bepul vebinar davomida dangasalikdan qutilish va maqsadlarga erishish yo'llari",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  )
}

