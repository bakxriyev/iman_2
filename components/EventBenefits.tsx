"use client"

import { useEffect, useState } from "react"

export default function EventBenefits() {
  const [animate, setAnimate] = useState(true) // Set to true by default to avoid delay

  useEffect(() => {
    setAnimate(true)
  }, [])

  const benefits = [
    {
      text: "Dangasalikdan qutilish va Maqsadlarga erishishning qadamma-qadam bosqichlari",
      icon: (
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
          className="h-8 w-8"
        >
          <path d="M12 5v14"></path>
          <path d="M18 13l-6 6-6-6"></path>
        </svg>
      ),
    },
    {
      text: "Hayotni tartiblash orqali Muammolarni yengish",
      icon: (
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
          className="h-8 w-8"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="9" y1="15" x2="15" y2="15"></line>
          <line x1="9" y1="11" x2="15" y2="11"></line>
        </svg>
      ),
    },
    {
      text: "O'ziga bo'lgan ishonchni oshirish mumkinligi",
      icon: (
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
          className="h-8 w-8"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
      ),
    },
    {
      text: "Odatlarni shakllantirishning bir nechta usullarini ko'rib chiqamiz",
      icon: (
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
          className="h-8 w-8"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      ),
    },
  ]

  return (
    <div
      className="mb-10 transform transition-all duration-500"
      style={{
        transform: animate ? "translateY(0)" : "translateY(30px)",
        opacity: animate ? 1 : 0,
        transitionDelay: "0.4s",
      }}
    >
      <h2 className="text-center text-3xl font-bold text-white mb-8 px-6 py-3 inline-block mx-auto bg-white/5 rounded-lg">
        VEBINARDAN QANDAY FOYDALAR OLASIZ?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="p-6 flex items-start transition-all transform hover:scale-105 bg-white/5 rounded-lg"
            style={{
              animation: `fadeSlideIn 0.4s ease-out ${0.5 + index * 0.1}s both`,
            }}
          >
            <div className="mr-4 mt-1 flex-shrink-0 text-white p-3 rounded-full">{benefit.icon}</div>
            <p className="text-white text-lg font-medium">{benefit.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

