'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import SectionNav from '@/app/components/SectionNav'
import Overview from '@/app/components/Overview'
import Videos from '@/app/components/Videos'
import BaseSelection from '@/app/components/BaseSelection'
import Itinerary from '@/app/components/Itinerary'
import Beaches from '@/app/components/Beaches'
import Food from '@/app/components/Food'
import Nightlife from '@/app/components/Nightlife'
import SanJuan from '@/app/components/SanJuan'
import LocalExperiences from '@/app/components/LocalExperiences'
import Logistics from '@/app/components/Logistics'
import Budget from '@/app/components/Budget'
import TripPlanner from '@/app/components/TripPlanner'

const sections = ['overview', 'videos', 'base', 'itinerary', 'beaches', 'food', 'nightlife', 'sanjuan', 'experiences', 'logistics', 'budget']

export default function Home() {
  const [activeSection, setActiveSection] = useState('overview')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSectionChange = useCallback((id: string) => {
    setActiveSection(id)
    // Use setTimeout instead of rAF for reliable mobile scrolling
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 150)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [mounted])

  if (!mounted) {
    return <div className="min-h-screen bg-sabbia" suppressHydrationWarning />
  }

  return (
    <main className="min-h-screen bg-sabbia" suppressHydrationWarning>
      <SectionNav activeSection={activeSection} onSectionChange={handleSectionChange} />
      <TripPlanner />

      <div className="max-w-7xl mx-auto" suppressHydrationWarning>
        {/* Hero decorative line */}
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-200 to-transparent mx-4 sm:mx-6 mt-2" />

        <Overview />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Videos />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <BaseSelection />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Itinerary />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Beaches />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Food />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Nightlife />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <SanJuan />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <LocalExperiences />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Logistics />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Budget />
      </div>

      <footer className="border-t border-terracotta-100/50 bg-white/40 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
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
