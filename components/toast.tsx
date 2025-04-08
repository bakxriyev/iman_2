"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useToast } from "@/hooks/use_toast"

export function Toaster() {
  const { toasts, dismissToast } = useToast()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return createPortal(
    <div className="fixed top-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white/10 backdrop-blur-md border border-[#00e676]/20 rounded-lg shadow-lg p-4 animate-in fade-in slide-in-from-top-5"
          onClick={() => dismissToast(toast.id)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-white">{toast.title}</h3>
              {toast.description && <p className="text-sm text-white/70 mt-1">{toast.description}</p>}
            </div>
            <button className="text-white/50 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
        </div>
      ))}
    </div>,
    document.body,
  )
}
