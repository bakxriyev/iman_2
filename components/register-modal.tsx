"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { full_name: string; phone_number: string; tg_user: string }) => Promise<void>
}

export default function RegistrationModal({ isOpen, onClose, onSubmit }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "+998",
    tg_user: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const phoneInputRef = useRef<HTMLInputElement>(null)

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        full_name: "",
        phone_number: "+998",
        tg_user: "",
      })
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

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a0f47] rounded-2xl p-8 max-w-md w-full mx-4 border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Ro'yxatdan o'tish</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="full_name" className="text-white/80 text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Ism va familiya
            </label>
            <input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#e91e63]/50 text-white placeholder-white/50"
              placeholder="Ism va familiya"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone_number" className="text-white/80 text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
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
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#e91e63]/50 text-white placeholder-white/50"
              placeholder="+998 XX XXX XX XX"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tg_user" className="text-white/80 text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81z"></path>
                <polygon points="10 15 15 12 10 9 10 15"></polygon>
              </svg>
              Telegram username (ixtiyoriy)
            </label>
            <input
              id="tg_user"
              name="tg_user"
              value={formData.tg_user}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#e91e63]/50 text-white placeholder-white/50"
              placeholder="@username"
            />
          </div>

          <button type="submit" disabled={loading} className="relative w-full">
            <div className="relative bg-[#e91e63] rounded-lg py-3 px-6 flex items-center justify-center">
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
