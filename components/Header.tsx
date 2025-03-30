"use client"

import { useEffect, useState } from "react"

export default function Header() {
  const [animate, setAnimate] = useState(true) // Set to true by default to avoid delay

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="w-full flex justify-between mb-6">
        <div
          className="px-6 py-3 flex items-center space-x-3 transform transition-transform hover:scale-105"
          style={{
            transform: animate ? "translateX(0)" : "translateX(-50px)",
            opacity: animate ? 1 : 0,
            transition: "all 0.4s ease-out",
          }}
        >
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
            className="h-6 w-6 text-white"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <span className="font-medium text-white text-lg">17-18 APREL</span>
        </div>
        <div
          className="px-6 py-3 flex items-center space-x-3 transform transition-transform hover:scale-105"
          style={{
            transform: animate ? "translateX(0)" : "translateX(50px)",
            opacity: animate ? 1 : 0,
            transition: "all 0.4s ease-out",
          }}
        >
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
            className="h-6 w-6 text-white"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="font-medium text-white text-lg">20:00</span>
        </div>
      </div>
    </div>
  )
}

