"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

type ToastType = {
  id: string
  title: string
  description?: string
  duration?: number
}

type ToastContextType = {
  toasts: ToastType[]
  toast: (toast: Omit<ToastType, "id">) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const toast = ({ title, description, duration = 5000 }: Omit<ToastType, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, description, duration }])
  }

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

function ToastContainer() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-0 right-0 p-4 z-50 flex flex-col gap-2 max-w-md w-full">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
      ))}
    </div>
  )
}

function Toast({ toast, onDismiss }: { toast: ToastType; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss()
    }, toast.duration)

    return () => clearTimeout(timer)
  }, [toast.duration, onDismiss])

  return (
    <div className="bg-indigo-950/90 border border-indigo-800 text-white rounded-lg shadow-lg p-4 animate-fadeIn backdrop-blur-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{toast.title}</h3>
          {toast.description && <p className="text-sm text-white/80 mt-1">{toast.description}</p>}
        </div>
        <button onClick={onDismiss} className="text-white/70 hover:text-white">
          ✖
        </button>
      </div>
    </div>
  )
}

