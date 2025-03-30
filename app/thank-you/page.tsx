"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function ThankYouPage() {
  const router = useRouter()
  const [animate, setAnimate] = useState(true) // Set to true by default to avoid delay
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const handleJoinTelegram = () => {
    window.open("https://t.me/+sjPXaaS97QU5NWJi", "_blank")
    // Redirect back to main page after a short delay
    setTimeout(() => {
      router.push("/")
    }, 500) // Reduced timeout for faster processing
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background animation */}
      <div
        className="text-center max-w-2xl z-10 p-10 rounded-2xl transform transition-all duration-700 ease-out bg-white/5"
        style={{
          transform: animate ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          opacity: animate ? 1 : 0,
        }}
      >
        <div className="w-40 h-40 mx-auto mb-6 relative">
          <Image src="/logo.jpg" alt="Logo" fill style={{ objectFit: "contain" }} priority />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeIn">Tabriklaymiz!</h1>
        <p className="text-xl md:text-2xl text-white mb-8 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          Ro&apos;yhatdan o&apos;tganingiz bilan tabriklayman.
        </p>
        <p className="text-xl md:text-2xl text-white mb-12 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
          Oxirgi bosqichni bajaring va yopiq telegram kanalga qo&apos;shiling.
        </p>

        <button
          onClick={handleJoinTelegram}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative animate-fadeIn overflow-hidden rounded-xl transition-all duration-500 transform hover:scale-105 animate-float-button"
          style={{ animationDelay: "0.4s" }}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 animate-gradient"></div>

          {/* Shine effect */}
          <div
            className={`absolute inset-0 opacity-50 ${isHovered ? "animate-shine" : ""}`}
            style={{
              background: "linear-gradient(45deg, transparent 45%, rgba(255, 255, 255, 0.8) 50%, transparent 55%)",
              backgroundSize: "200% 200%",
              backgroundPosition: isHovered ? "100% 100%" : "0% 0%",
            }}
          ></div>

          {/* Button content */}
          <div className="relative flex items-center justify-center px-2 py-2">
            <span className="text-white text-[20px] font-bold uppercase tracking-wider">
              Telegram kanalga qo&apos;shilish
            </span>

            {/* Arrow icon that moves on hover */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-6 w-6 ml-3 text-white transition-transform duration-300 ${isHovered ? "translate-x-2" : ""}`}
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>

          {/* Animated border */}
          <div className="absolute inset-0 border-2 border-white/30 rounded-xl"></div>
        </button>
      </div>
    </div>
  )
}

