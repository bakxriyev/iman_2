"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import RegistrationModal from "./register-modal"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const aboutRef = useRef<HTMLDivElement>(null)
  const courseContentRef = useRef<HTMLDivElement>(null)
  const topicsRef = useRef<HTMLDivElement>(null)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => {
              const newSet = new Set(prev)
              newSet.add(entry.target.id)
              return newSet
            })
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "-50px 0px -50px 0px",
      },
    )

    const elements = [aboutRef.current, courseContentRef.current, topicsRef.current]
    elements.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleRegister = () => {
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: {
    full_name: string
    phone_number: string
  }) => {
    // Close the modal immediately
    setIsModalOpen(false)

    // Redirect immediately without waiting for API response
    router.push("/thank-you?pending=true")

    // Prepare data for backend - ensure we include all required fields
    const apiData = {
      full_name: data.full_name,
      phone_number: data.phone_number,
      tg_user: "", // Send empty array instead of empty string
      email: "", // Include empty email field if backend expects it
      source: "website", // Add source information
    }

    // Send data to backend in the background after redirect
    try {
      // This will run in the background after the page transition
      axios
        .post("https://orqa.imanakhmedovna.uz/users", apiData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .catch((error) => {
          console.error("Background submission error:", error)
          // Log more detailed error information
        })
    } catch (error) {
      console.error("Registration error:", error)
    }

    return Promise.resolve()
  }

  return (
    <div className="min-h-screen bg-[#2a1e1a] relative">
      {/* Background grid */}
      <div className="bg-grid absolute inset-0 z-0 opacity-30"></div>

      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#e8c7b9] blur-[100px] animate-orb-1"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#d4a89a] blur-[100px] animate-orb-2"></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <header className="flex justify-between items-center mb-8 mt-4 animate-float">
          <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full hover-lift">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span className="text-white/90 font-medium font-sans">2-3-4 SENTABR</span>
          </div>

          <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full hover-lift">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-white/90 font-medium font-sans">20:00</span>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center">
          {/* Image and title */}
          <div className="text-center mb-12 w-full">
            <div className="relative w-full max-w-2xl mx-auto mb-8 aspect-[4/3] overflow-hidden hover-lift">
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a1e1a] via-transparent to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#2a1e1a]/30 via-transparent to-[#2a1e1a]/30 z-10"></div>
              <Image
                src="/imann.jpg"
                alt="Iman Akhmedova"
                fill
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
                className="rounded-xl border border-[#e8c7b9]/20 shadow-lg"
                priority
              />
            </div>

            <div className="inline-block mb-6 px-4 py-2 bg-white/5 rounded-full animate-bounce-subtle">
              <div className="flex items-center justify-center gap-2">
                <span className="text-white font-bold font-sans">BEPUL MAXSUS DARS</span>
                <span className="bg-[#d4a89a] text-white px-2 py-0.5 text-xs font-bold rounded-md">LIVE</span>
              </div>
            </div>

            <h1 className="text-xl md:text-2xl mb-6 text-white font-sans leading-relaxed">
              Iman Ahmedovadan 3 kunlik BEPUL maxsus dars
            </h1>

            <div className="flex justify-center mb-8">
              <button onClick={handleRegister} className="relative group animate-pulse-glow">
                <div className="relative bg-[#d4a89a] hover:bg-[#c49688] transition-all duration-300 rounded-lg px-8 py-4 flex items-center space-x-3 shadow-lg hover:shadow-2xl transform hover:scale-105">
                  <span className="text-white font-bold text-xl font-sans">Yopiq kanalga qo'shilish</span>
                  <div className="bg-white/20 px-2 py-1 rounded-md text-white text-sm font-bold animate-shimmer">
                    (Bepul qatnashish uchun bosing)
                  </div>
                </div>
              </button>
            </div>

            <div
              ref={aboutRef}
              id="about-section"
              className={`mb-8 bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-2xl border border-[#d4a89a]/30 hover-lift shadow-xl max-w-2xl mx-auto transition-all duration-700 ease-out ${
                visibleElements.has("about-section")
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-12 scale-95"
              }`}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Iman Akhmedova</h3>
                <div className="w-20 h-1 bg-[#d4a89a] mx-auto rounded-full"></div>
              </div>

              {/* Profile image */}
              <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full border-4 border-[#d4a89a]/30 shadow-xl hover-lift">
                <Image
                  src="/imann.jpg"
                  alt="Iman Akhmedova"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Compact credentials grid */}
              <div className="grid grid-cols-1 gap-3 text-center">
                <div className="bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-all duration-300">
                  <p className="text-white font-medium font-sans text-sm leading-relaxed">
                    Oilaviy munosabatlar va bolalar psixologi
                  </p>
                </div>

                <div className="bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-all duration-300">
                  <p className="text-white font-medium font-sans text-sm leading-relaxed">
                    Prezidentimiz tomonidan taqdirlangan 30 yillik ko'krak nishoni sohibasi
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-all duration-300">
                    <p className="text-white font-medium font-sans text-sm leading-relaxed">3 yillik tajriba</p>
                  </div>

                  <div className="bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-all duration-300">
                    <p className="text-white font-medium font-sans text-sm leading-relaxed">50.000+ o'quvchilar</p>
                  </div>
                </div>

                <div className="bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-all duration-300">
                  <p className="text-white font-medium font-sans text-sm leading-relaxed">
                    Psixologlar assotsiatsiyasi a'zosi
                  </p>
                </div>
              </div>
            </div>

            {/* Main content sections */}
            <div className="w-full max-w-4xl mb-12">
              <div
                ref={courseContentRef}
                id="course-content"
                className={`transition-all duration-700 ease-out ${
                  visibleElements.has("course-content")
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                }`}
                style={{
                  transitionDelay: visibleElements.has("course-content") ? "200ms" : "0ms",
                }}
              >
                <div className="bg-white/10 rounded-2xl p-6 mb-8 border border-[#d4a89a]/30 hover-lift shadow-xl">
                  {/* Chat header */}
                  <div className="flex items-center mb-4 pb-4 border-b border-white/20">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#d4a89a]/50 mr-3">
                      <Image
                        src="/imann.jpg"
                        alt="Iman Akhmedova"
                        fill
                        style={{ objectFit: "cover", objectPosition: "center 20%" }}
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-bold font-sans">Iman Akhmedova</h3>
                    
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Chat message */}
                  <div className="bg-[#d4a89a]/20 rounded-2xl rounded-tl-sm p-6 border-l-4 border-[#d4a89a]">
                    <p className="text-white font-sans text-lg leading-relaxed">
                      Qanday qilib kibr, dangasalik va qo'rquvlarni yengish orqali asliyatingizga qaytib, to'kis hayotda
                      yashashni 3 kunlik darsimda o'rgataman
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                      <span className="text-white/60 text-sm font-sans">3 kunlik maxsus dars</span>
                      <span className="text-white/60 text-sm font-sans">20:00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button onClick={handleRegister} className="relative group w-full max-w-md animate-pulse-glow">
                  <div className="relative bg-[#d4a89a] hover:bg-[#c49688] transition-all duration-300 rounded-lg px-6 py-4 flex flex-col items-center space-y-2 shadow-lg hover:shadow-2xl transform hover:scale-105">
                    <span className="text-white font-bold text-lg font-sans">Darsda jonli qatnashish</span>
                    <span className="text-white/90 text-sm font-sans animate-shimmer">
                      (bepul qatnashish uchun bosing)
                    </span>
                  </div>
                </button>
              </div>
              <br />

              <div
                ref={topicsRef}
                id="topics-section"
                className={`bg-white/5 rounded-2xl p-6 mb-8 border border-white/20 hover-lift transition-all duration-700 ease-out ${
                  visibleElements.has("topics-section")
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                }`}
                style={{
                  transitionDelay: visibleElements.has("topics-section") ? "400ms" : "0ms",
                }}
              >
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#d4a89a]/20 p-2 rounded-lg mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-white">Onlayn bepul darsda siz:</h2>
                </div>

                <ul className="space-y-4">
                  {[
                    "nima uchun dangasalik samootsenka bilan bog'lanishi",
                    "insonda kibr qanday ko'rinishda bo'lishi va uni qanday yengish mumkinligi",
                    "Prorabotka o'zi nima va u qanday qilinishi",
                    "qalbni shaytoniy kasalliklardan qanday asrash mumkinligini bilib olasiz",
                  ].map((topic, index) => (
                    <li
                      key={index}
                      className={`flex items-start bg-white/5 p-4 rounded-xl hover-lift transition-all duration-500 ease-out ${
                        visibleElements.has("topics-section") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                      } hover:bg-white/10`}
                      style={{
                        transitionDelay: visibleElements.has("topics-section") ? `${600 + index * 100}ms` : "0ms",
                      }}
                    >
                      <div className="mr-4 flex-shrink-0 bg-[#d4a89a]/20 p-2 rounded-lg mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <span className="text-white font-sans text-lg leading-relaxed">{topic}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-white/50 py-4 font-sans text-sm"></footer>
      </div>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  )
}
