import type React from "react"
import "./globals.css"

export const metadata = {
  title: "Maqsadlarga erishish - Jonli Vebinar",
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

