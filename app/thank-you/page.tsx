"use client"
import { useRouter } from "next/navigation"

export default function ThankYouPage() {
  const router = useRouter()

  const handleJoinTelegram = () => {
    window.open("https://t.me/+HzuHstfa6x04MjAy", "_blank")
    // Redirect back to main page after a short delay
    setTimeout(() => {
      router.push("/")
    }, 500)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-[#4caf50] mb-6">Oxirgi qadam qoldi</h1>

        <p className="text-xl text-gray-800 mb-12 max-w-sm mx-auto">
          Jonli efirda qatnashish uchun quyidagi ko'k tugmani bosib yopiq kanalga obuna bo'ling!
        </p>

        <div className="flex flex-col items-center">
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
            className="text-gray-500 mb-4"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>

          <button
            onClick={handleJoinTelegram}
            className="bg-[#2196f3] text-white font-bold text-xl py-4 px-12 rounded-full shadow-lg hover:bg-[#1e88e5] transition-colors w-full max-w-xs"
          >
            OBUNA BO'LISH
          </button>
        </div>
      </div>
    </div>
  )
}
