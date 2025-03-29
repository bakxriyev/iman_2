"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function Logo() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  // Shared style for the serif font
  const serifStyle = {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontWeight: "580",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  }

  return (
    <div className="w-full flex flex-col items-center justify-center mb-24 px-4">
      {/* Large Logo */}
      <div
        className="w-full max-w-2xl mx-auto mb-0 text-center transform transition-all duration-1000"
        style={{
          transform: animate ? "translateY(-30px) scale(1.1)" : "translateY(30px) scale(0.9)",
          opacity: animate ? 1 : 0,
        }}
      >
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
          <Image src="/logo.jpg" alt="Logo" fill className="object-contain" priority />
        </div>
      </div>

      {/* Title Text Below Logo - Styled like the new image with responsive sizing */}
      <div
        className="text-center mb-6 transform transition-all duration-700"
        style={{
          transform: animate ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
          opacity: animate ? 1 : 0,
          transitionDelay: "0.3s",
        }}
      >
        <h2 className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl md:text-3xl lg:text-4xl text-purple-200" style={serifStyle}>
            Jonli Vebinar
          </span>
          <span className="bg-pink-600 text-white px-3 py-1 text-lg font-bold rounded-md animate-pulse ml-2">LIVE</span>
        </h2>

        <h1 className="text-4xl md:text-7xl lg:text-6xl mb-2 leading-tight text-white" style={serifStyle}>
          "O'ziga bo'lgan ishonchni
        </h1>
        <h1 className="text-4xl md:text-6xl lg:text-6xl leading-tight text-white" style={serifStyle}>
          Maqsadlarga ta'siri"
        </h1>
      </div>
    </div>
  )
}

