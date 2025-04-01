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
      <head>
        <meta name="facebook-domain-verification" content="1vqun6falybd4bax8vgv5xpvvw6sgf" />
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '677395238071057');
          fbq('track', 'PageView');
        ` }} />
      </head>
      <body>
        <noscript>
          <img height="1" width="1" style={{display:'none'}} 
          src="https://www.facebook.com/tr?id=677395238071057&ev=PageView&noscript=1" />
        </noscript>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
