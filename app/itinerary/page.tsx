'use client'

import { useState, useCallback, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import SectionNav from '@/app/components/SectionNav'
import Itinerary from '@/app/components/Itinerary'
import TripPlanner from '@/app/components/TripPlanner'
import PasswordWall from '@/app/components/PasswordWall'
import CustomCursor from '@/app/components/CustomCursor'
import AmbientGradients from '@/app/components/AmbientGradients'
import Footer from '@/app/components/Footer'
import { useAuth } from '@/app/hooks/useAuth'

export default function ItineraryPage() {
  const router = useRouter()
  const { mounted, isAuthenticated, setIsAuthenticated } = useAuth()
  const [activeSection, setActiveSection] = useState('itinerary')

  const handleSectionChange = useCallback((id: string) => {
    if (id === 'itinerary') {
      setActiveSection('itinerary')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setActiveSection(id)
      router.push(`/?scroll=${id}`)
    }
  }, [router])

  if (!mounted) {
    return <div className="min-h-screen bg-background" suppressHydrationWarning />
  }

  if (!isAuthenticated) {
    return <PasswordWall onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden" suppressHydrationWarning>
      <CustomCursor />
      <AmbientGradients />
      <SectionNav activeSection={activeSection} onSectionChange={handleSectionChange} />
      <TripPlanner />

      <div className="max-w-[1920px] mx-auto py-8 relative z-10" suppressHydrationWarning>
        <Itinerary />
      </div>

      <Footer />
    </main>
  )
}
