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
    setIsModalOpen(false)
    router.push("/thank-you?pending=true")

    const apiData = {
      full_name: data.full_name,
      phone_number: data.phone_number,
      tg_user: "",
      email: "",
      source: "website",
    }

    try {
      axios
        .post("https://orqa.imanakhmedovna.uz/users", apiData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .catch((error) => {
          console.error("Background submission error:", error)
        })
    } catch (error) {
      console.error("Registration error:", error)
    }

    return Promise.resolve()
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <header className="flex justify-center items-center mb-8 mt-4">
          <div className="flex items-center space-x-2 bg-green-600 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-white font-medium font-sans">2-3-4 sentabr | 20:00</span>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center">
          <div className="text-center mb-12 w-full max-w-md mx-auto">
            <p className="text-white/80 text-sm mb-4 font-sans">Iman Ahmedovadan 3 kunlik BEPUL maxsus dars</p>

            <h1 className="text-2xl md:text-3xl mb-8 text-white font-bold font-sans leading-tight">
              "DANGASALIKDAN QUTUL VA XOTIRJAM HAYOTDA YASHA"
            </h1>

            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-2xl mb-6">
              <p className="text-white font-medium font-sans text-lg leading-relaxed uppercase">
                Qanday qilib kibr, dangasalik va qo'rquvlarni yengish orqali asliyatingizga qaytib, to'kis hayotda
                yashashni 3 kunlik darsimda o'rgataman
              </p>
            </div>

            <div className="relative mb-8">
              <div className="relative w-full aspect-video bg-gradient-to-br from-purple-900 to-purple-700 rounded-2xl overflow-hidden">
                <Image
                  src="/imann.jpg"
                  alt="Video thumbnail"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center 20%",
                  }}
                  className="opacity-80"
                />
              </div>
            </div>

            <button onClick={handleRegister} className="w-full mb-8">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 rounded-2xl px-8 py-6 flex items-center justify-center space-x-3 shadow-lg hover:shadow-2xl transform hover:scale-105">
                <span className="text-white font-bold text-xl font-sans uppercase">YOPIQ KANALGA QO'SHILISH</span>
                <div className="bg-white/20 p-2 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </button>

            <p className="text-white/60 text-sm mb-8 font-sans">Bepul qatnashish uchun bosing</p>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-800">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gray-700">
                  <Image
                    src="/imann.jpg"
                    alt="Iman Akhmedova"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 30%" }}
                  />
                </div>
                <h3 className="text-white font-bold text-xl mb-6 font-sans">IMAN AHMEDOVA</h3>
                <div className="text-white/90 font-sans leading-relaxed space-y-3 text-left">
                  <p>• Oilaviy munosabatlar va bolalar psixologi</p>
                  <p>• Prezidentimiz tomonidan taqdirlangan 30 yillik ko'krak nishoni sohibasi</p>
                  <p>• 3 yillik tajriba</p>
                  <p>• 50.000 dan ortiq o'quvchilar</p>
                  <p>• Psixologlar assotsiatsiyasi a'zosi</p>
                  <p>• PHD mustaqil izlanuvchisi</p>
                </div>
              </div>
            </div>
            <button onClick={handleRegister} className="w-full mb-8">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 rounded-2xl px-8 py-6 flex items-center justify-center space-x-3 shadow-lg hover:shadow-2xl transform hover:scale-105">
                <span className="text-white font-bold text-xl font-sans uppercase">YOPIQ KANALGA QO'SHILISH</span>
                <div className="bg-white/20 p-2 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </button>
            <p className="text-white/60 text-sm mb-8 font-sans">Bepul qatnashish uchun bosing</p>
            <br />
            <h2 className="text-white font-bold text-xl mb-6 font-sans uppercase">ONLAYN BEPUL DARSDA SIZ:</h2>

            <div className="space-y-4 mb-8 uppercase">
              <div className="flex items-start text-left">
                <div className="mr-4 flex-shrink-0 bg-purple-600 p-2 rounded-full mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-white font-sans leading-relaxed">
                  Nima uchun dangasalik samootsenka bilan bog'lanishi
                </span>
              </div>

              <div className="flex items-start text-left">
                <div className="mr-4 flex-shrink-0 bg-purple-600 p-2 rounded-full mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-white font-sans leading-relaxed">
                  Insonda kibr qanday ko'rinishda bo'lishi va uni qanday yengish mumkinligi
                </span>
              </div>

              <div className="flex items-start text-left">
                <div className="mr-4 flex-shrink-0 bg-purple-600 p-2 rounded-full mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-white font-sans leading-relaxed">Prorabotka o'zi nima va u qanday qilinishi</span>
              </div>

              <div className="flex items-start text-left">
                <div className="mr-4 flex-shrink-0 bg-purple-600 p-2 rounded-full mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-white font-sans leading-relaxed">
                  Qalbni shaytoniy kasalliklardan qanday asrash mumkinligini bilib olasiz
                </span>
              </div>
            </div>

            <button onClick={handleRegister} className="w-full">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 rounded-2xl px-8 py-6 flex items-center justify-center space-x-3 shadow-lg hover:shadow-2xl transform hover:scale-105">
                <span className="text-white font-bold text-xl font-sans uppercase">DARSDA JONLI QATNASHISH</span>
                <div className="bg-white/20 p-2 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </main>
      </div>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  )
}
