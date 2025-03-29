"use client"

import { useState } from "react"
import Header from "./Header"
import Logo from "./logo"
import EventInfo from "./EventInfo"
import EventBenefits from "./EventBenefits"
import RegisterButton from "./register-button"
import RegistrationModal from "./register-modal"
import BackgroundAnimation from "./background-animation"

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRegister = () => {
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: {
    full_name: string
    phone_number: string
    tg_user: string
  }) => {
    console.log("Form submitted:", data)
    setIsModalOpen(false)
    return Promise.resolve()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-gray-900 relative overflow-hidden">
      {/* Background animation */}
      <BackgroundAnimation />

      {/* Content overlay with slight transparency */}
      <div className="relative z-10 container mx-auto px-4 py-6 min-h-screen flex flex-col">
        {/* Header Section */}
        <Header />

        {/* Logo Section with text below */}
        <Logo />

        {/* Event Info Section */}
        <EventInfo />

        {/* Register Button */}
        <RegisterButton onRegister={handleRegister} />

        {/* Event Benefits */}
        <EventBenefits />

        {/* Registration Modal */}
        <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

