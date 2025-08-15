"use client"

import { useState } from "react"
import Image from "next/image"
import RegistrationModal from "./register-modal"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

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

      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#e8c7b9] opacity-10 blur-[100px]"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#d4a89a] opacity-10 blur-[100px]"></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header with date and time */}
        <header className="flex justify-between items-center mb-8 mt-4">
          <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full">
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
            <span className="text-white/90 font-medium">2,3,4 - SENTABR</span>
          </div>

          <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full">
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
            <span className="text-white/90 font-medium">20:00</span>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center">
          {/* Image and title */}
          <div className="text-center mb-12 w-full">
            <div className="relative w-full max-w-2xl mx-auto mb-8 aspect-[4/3] overflow-hidden">
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

            <div className="inline-block mb-2 px-4 py-2 bg-white/5 rounded-full">
              <div className="flex items-center justify-center gap-2">
                <span className="text-white font-bold">BEPUL VEBINAR</span>
                <span className="bg-[#d4a89a] text-white px-2 py-0.5 text-xs font-bold rounded-md">LIVE</span>
              </div>
            </div>

            <h1 className="text-xl md:text-5xl mb-2 text-white">Iman Akhmedovnadan 3 kunlik Bepul Vebinar</h1>
            <div className="mt-4 bg-white/5 p-4 rounded-2xl border border-white/20">
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                "Dangasalikdan Halos Bo'lishning 3 Ta Yo'li"
              </h1>
            </div>
          </div>

          {/* Registration button */}
          <div className="flex justify-center my-10">
            <button onClick={handleRegister} className="relative">
              <div className="relative bg-[#d4a89a] rounded-lg px-8 py-4 flex items-center space-x-3">
                <span className="text-white font-bold text-xl">ISHTIROK ETISH</span>
                <div className="bg-white/20 px-2 py-1 rounded-md text-white text-sm font-bold">BEPUL</div>
              </div>
            </button>
          </div>

          {/* Webinar topics */}
          <div className="w-full max-w-4xl mb-12">
            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/20">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-white">
                Jonli Bepul Vebinar Davomida Quyidagilar Haqida Gaplashamiz:
              </h2>

              <ul className="space-y-3">
                {[
                  {
                    title: "Nima uchun dangasalik kasaliga chalinamiz?",
                    subtitle: "Dangasalikning asosiy sabablari va ularni aniqlash usullari",
                  },
                  {
                    title: "Dangasalikning ichki ruhiy sabablari nima?",
                    subtitle: "Psixologik omillar va ularning ta'siri",
                  },
                  {
                    title: "Dangasalikning hech kim bilmaydigan eng muhim omili",
                    subtitle: "Yashirin sabab va uni bartaraf etish yo'llari",
                  },
                  {
                    title: "O'zgarishga harakat qilish, lekin uddalay olmaslikning psixologik omillari",
                    subtitle: "Nima uchun muvaffaqiyatsizlikka uchraymiz va qanday yengish mumkin",
                  },
                ].map((topic, index) => (
                  <li key={index} className="flex items-start bg-white/5 p-4 rounded-xl">
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
                      <span className="text-white font-semibold text-lg block mb-1">{topic.title}</span>
                      <span className="text-white/70 text-sm">{topic.subtitle}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits section */}
            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/20">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-white">
                Bepul Vebinardan Qanday Foydalar Olasiz:
              </h2>

              <ul className="space-y-3">
                {[
                  {
                    title: "Dangasalikdan qutilish uchun eng ishlaydigan texnikalar",
                    subtitle: "Amaliy usullar va kundalik hayotda qo'llash yo'llari",
                  },
                  {
                    title: "Tuganmas energiya holatida yashash siri",
                    subtitle: "Doimiy motivatsiya va faollik uchun maxsus texnikalar",
                  },
                  {
                    title: "Dangasalikdan 1 kunda halos qiladigan 1 ta amal va duo",
                    subtitle: "Tezkor natija beruvchi maxsus uslub",
                  },
                  {
                    title: "O'zini prorabotka qilish orqali halovatda yashashni boshlash",
                    subtitle: "Ichki o'zgarish va ruhiy poklanish yo'llari",
                  },
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start bg-white/5 p-4 rounded-xl">
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
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className="text-white font-semibold text-lg block mb-1">{benefit.title}</span>
                      <span className="text-white/70 text-sm">{benefit.subtitle}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Registration button */}
            <div className="flex justify-center my-10">
              <button onClick={handleRegister} className="relative">
                <div className="relative bg-[#d4a89a] rounded-lg px-8 py-4 flex items-center space-x-3">
                  <span className="text-white font-bold text-xl">ISHTIROK ETISH</span>
                  <div className="bg-white/20 px-2 py-1 rounded-md text-white text-sm font-bold">BEPUL</div>
                </div>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-white/50 py-4">
          <p>
            This site or product is not part of or endorsed by Facebook, Google, or any social media platform in any way
            FACEBOOK is a trademark of META PLATFORMS, Inc. YOUTUBE and GOOGLE are trademarks of ALPHABET, Inc..
          </p>
        </footer>
      </div>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  )
}
