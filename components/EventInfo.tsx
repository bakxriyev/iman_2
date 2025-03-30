"use client"

import { useEffect, useState } from "react"

export default function EventInfo() {
  const [animate, setAnimate] = useState(true) // Set to true by default to avoid delay

  useEffect(() => {
    setAnimate(true)
  }, [])

  const topics = [
    "Nega Maqsadlarga erishish QIYINDEK tuyiladi?",
    "O'ziga bo'lgan ishonch Muvaffaqiyat kaliti",
    "Dangasalikning kelib chiqish sabablari?",
    "Intizomga qanday qilib erishish mumkin?",
    "Maqsad yo'lida \"Fail\" bo'lishning asl sabablari",
  ]

  return (
    <>
      <div className="flex justify-center mb-6">
        <h2 className="text-center text-3xl font-bold text-white mb-8 px-6 py-3 inline-block mx-auto bg-white/5 rounded-lg">
          BEPUL VEBINAR DAVOMIDA
        </h2>
      </div>
      <div
        className="mb-10 transform transition-all duration-500"
        style={{
          transform: animate ? "translateY(0)" : "translateY(30px)",
          opacity: animate ? 1 : 0,
          transitionDelay: "0.3s",
        }}
      >
        <ul className="space-y-4">
          {topics.map((topic, index) => (
            <li
              key={index}
              className="flex items-start p-5 transition-all transform hover:translate-x-1 bg-white/5 rounded-lg"
              style={{
                transitionDelay: `${0.05 * index}s`,
                animation: `fadeSlideIn 0.4s ease-out ${0.2 + index * 0.1}s both`,
              }}
            >
              <div className="mr-4 mt-1 text-white">
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
                  className="h-6 w-6"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <span className="text-white text-lg md:text-xl font-medium">{topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

