'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { motion } from 'framer-motion'
import SectionNav from '@/app/components/SectionNav'
import { useRouter, useSearchParams } from 'next/navigation'
import Overview from '@/app/components/Overview'
import Videos from '@/app/components/Videos'
import BaseSelection from '@/app/components/BaseSelection'
import Beaches from '@/app/components/Beaches'
import BoatTours from '@/app/components/BoatTours'
import Food from '@/app/components/Food'
import Markets from '@/app/components/Markets'
import Nightlife from '@/app/components/Nightlife'
import SingleGuide from '@/app/components/SingleGuide'
import SanJuan from '@/app/components/SanJuan'
import LocalExperiences from '@/app/components/LocalExperiences'
import Logistics from '@/app/components/Logistics'
import Budget from '@/app/components/Budget'
import Expenses from '@/app/components/Expenses'
import TripPlanner from '@/app/components/TripPlanner'
import QuickInspiration from '@/app/components/QuickInspiration'
import PasswordWall from '@/app/components/PasswordWall'
import CustomCursor from '@/app/components/CustomCursor'

const sections = ['overview', 'single-guide', 'base', 'inspiration', 'videos', 'beaches', 'boat-tours', 'food', 'markets', 'nightlife', 'sanjuan', 'experiences', 'logistics', 'expenses', 'budget']

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const scrollTarget = searchParams ? searchParams.get('scroll') : null

  const [activeSection, setActiveSection] = useState('overview')
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
      router.push('/itinerary')
    } else {
      setActiveSection(id)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 50)
    }
  }, [router])

  useEffect(() => {
    if (mounted && scrollTarget) {
      setTimeout(() => {
        const el = document.getElementById(scrollTarget)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 300)
    }
  }, [mounted, scrollTarget])

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

  if (!isAuthenticated) {
    return <PasswordWall onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <main className="min-h-screen bg-sabbia relative overflow-x-hidden" suppressHydrationWarning>
      <CustomCursor />
      
      {/* ─── Ambient Mesh Gradients ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            x: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-terracotta-100/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0],
            x: [0, -40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -left-[15%] w-[50%] h-[70%] bg-mare-100/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
            y: [0, 60, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[5%] w-[45%] h-[50%] bg-oro/10 rounded-full blur-[140px]" 
        />
      </div>

      <SectionNav activeSection={activeSection} onSectionChange={handleSectionChange} />
      <TripPlanner />

      <div className="max-w-[1920px] mx-auto relative z-10" suppressHydrationWarning>
        {/* Hero decorative line */}
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-200 to-transparent mx-4 sm:mx-6 mt-2" />

        <Overview />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <SingleGuide />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <BaseSelection />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <QuickInspiration />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Videos />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Beaches />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <BoatTours />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Food />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Markets />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Nightlife />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <SanJuan />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <LocalExperiences />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Logistics />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Expenses />
        <div className="h-px bg-gradient-to-r from-transparent via-terracotta-100 to-transparent mx-4 sm:mx-6" />
        <Budget />
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

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-sabbia" />}>
      <HomeContent />
    </Suspense>
  )
}
