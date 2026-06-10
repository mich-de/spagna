'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import SectionNav from '@/app/components/SectionNav'
import Itinerary from '@/app/components/Itinerary'
import TripPlanner from '@/app/components/TripPlanner'
import PasswordWall from '@/app/components/PasswordWall'

export default function ItineraryPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const savedHash = localStorage.getItem('sol-auth')
      if (savedHash === '2beb6b5fe3d7bdf658da84d6ce4252d853f7d4865e025f6b3970e39a3777fd4f') {
        setIsAuthenticated(true)
      }
    }
  }, [])

  const handleSectionChange = useCallback((id: string) => {
    if (id === 'itinerary') {
      // Scroll to top of itinerary page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Redirect to home page with scroll parameter
      router.push(`/?scroll=${id}`)
    }
  }, [router])

  if (!mounted) {
    return <div className="min-h-screen bg-sabbia" suppressHydrationWarning />
  }

  if (!isAuthenticated) {
    return <PasswordWall onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <main className="min-h-screen bg-sabbia" suppressHydrationWarning>
      <SectionNav activeSection="itinerary" onSectionChange={handleSectionChange} />
      <TripPlanner />

      <div className="max-w-[1920px] mx-auto py-8" suppressHydrationWarning>
        <Itinerary />
      </div>

      <footer className="border-t border-terracotta-100/50 bg-white/40 py-8 px-4 sm:px-6">
        <div className="max-w-[1920px] mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-5 h-5 bg-gradient-to-br from-terracotta-500 to-mare-600 rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">S</span>
            </div>
            <span className="font-display text-sm font-semibold text-notte">Sol & Local</span>
          </div>
          <p className="text-xs text-mare-400">
            Costa del Sol · 19–25 Giugno 2026 · Generato da Tour Operator Premium
          </p>
          <p className="text-[10px] text-mare-300 mt-1">
            Verifica sempre orari e prenotazioni prima della partenza
          </p>
        </div>
      </footer>
    </main>
  )
}
