"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from '../hooks/toast'
import axios from "axios"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { full_name: string; phone_number: string; tg_user: string }) => void
}

export default function RegistrationModal({ isOpen, onClose, onSubmit }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "+998",
    tg_user: "@",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const phoneInputRef = useRef<HTMLInputElement>(null)
  const tgInputRef = useRef<HTMLInputElement>(null)

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        full_name: "",
        phone_number: "+998",
        tg_user: "@",
      })
      setMessage("")
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Handle phone number prefix
    if (name === "phone_number") {
      if (!value.startsWith("+998")) {
        // If user deletes the prefix, keep it
        setFormData((prev) => ({ ...prev, [name]: "+998" + value.replace("+998", "") }))
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }))
      }
    }
    // Handle telegram username prefix
    else if (name === "tg_user") {
      if (!value.startsWith("@")) {
        // If user deletes the @, keep it
        setFormData((prev) => ({ ...prev, [name]: "@" + value.replace("@", "") }))
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }))
      }
    }
    // Handle other fields normally
    else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Handle key press to ensure prefixes can't be deleted
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, prefix: string) => {
    const input = e.currentTarget
    const selectionStart = input.selectionStart || 0

    // Prevent backspace at prefix length position
    if (e.key === "Backspace" && selectionStart <= prefix.length) {
      e.preventDefault()
    }

    // Prevent selection and deletion of prefix
    if (e.key === "a" && e.ctrlKey) {
      e.preventDefault()
      // Select all text except prefix
      setTimeout(() => {
        input.setSelectionRange(prefix.length, input.value.length)
      }, 0)
    }
  }

  // Handle selection to prevent selecting the prefix
  const handleSelect = (e: React.SyntheticEvent<HTMLInputElement>, prefix: string) => {
    const input = e.currentTarget
    const selectionStart = input.selectionStart || 0

    if (selectionStart < prefix.length) {
      setTimeout(() => {
        input.setSelectionRange(prefix.length, input.selectionEnd || prefix.length)
      }, 0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    // Show toast notification
    toast({
      title: "Iltimos biroz kuting",
      description: "Ma'lumotlaringiz yuborilmoqda...",
      duration: 3000,
    })

    try {
      // Send data to the backend API - using a timeout to simulate faster processing
      setTimeout(async () => {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, formData)

          // Call the onSubmit prop to maintain compatibility with parent component
          await onSubmit(formData)

          // Reset form after successful submission
          setFormData({
            full_name: "",
            phone_number: "+998",
            tg_user: "@",
          })

          // Show success message briefly before redirecting
          setMessage("Muvaffaqiyatli ro'yxatdan o'tdingiz!")

          // Redirect to thank you page after successful submission
          router.push("/thank-you")
        } catch (error) {
          console.error("Registration error:", error)
          setMessage("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.")
          setLoading(false)
        }
      }, 500) // Reduced timeout for faster processing
    } catch (error) {
      console.error("Registration error:", error)
      setMessage("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.")
      setLoading(false)
    }
  }

  // Focus cursor at the end of the prefilled value when input is focused
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target
    setTimeout(() => {
      input.selectionStart = input.selectionEnd = input.value.length
    }, 0)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm">
      <div className="bg-indigo-950/80 rounded-2xl p-8 max-w-md w-full mx-4 transform animate-scaleIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Ro'yxatdan o'tish</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            ✖
          </button>
        </div>

        {message && (
          <p
            className={`text-center text-lg mb-4 ${message.includes("Muvaffaqiyatli") ? "text-green-400" : "text-red-400"} bg-opacity-20 p-3 rounded-lg`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="full_name" className="text-white/80 text-sm">
              Ism va familiya
            </label>
            <input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
              placeholder="Ism va familiya"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone_number" className="text-white/80 text-sm">
              Telefon raqam
            </label>
            <input
              id="phone_number"
              name="phone_number"
              ref={phoneInputRef}
              value={formData.phone_number}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, "+998")}
              onSelect={(e) => handleSelect(e, "+998")}
              onFocus={handleFocus}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
              placeholder="+998 XX XXX XX XX"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tg_user" className="text-white/80 text-sm">
              Telegram username
            </label>
            <input
              id="tg_user"
              name="tg_user"
              ref={tgInputRef}
              value={formData.tg_user}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, "@")}
              onSelect={(e) => handleSelect(e, "@")}
              onFocus={handleFocus}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
              placeholder="@username"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative overflow-hidden rounded-xl transition-all duration-500 w-full"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 animate-gradient"></div>

            {/* Button content */}
            <div className="relative py-3 px-6 flex items-center justify-center">
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-white font-bold">Yuborilmoqda...</span>
                </>
              ) : (
                <span className="text-white font-bold">Yuborish</span>
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  )
}

