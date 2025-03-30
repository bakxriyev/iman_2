import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ToastProvider } from "@/hooks/toast"

export const metadata: Metadata = {
  title: "O'ziga bo'lgan ishonchni Maqsadlarga ta'siri",
  description: "17-18 aprel, soat 20:00 da bo'lib o'tadigan jonli vebinar",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}

