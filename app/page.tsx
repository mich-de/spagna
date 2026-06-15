'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SectionNav from '@/app/components/SectionNav'
import Overview from '@/app/components/Overview'
import Videos from '@/app/components/Videos'
import BaseSelection from '@/app/components/BaseSelection'
import Beaches from '@/app/components/Beaches'
import BoatTours from '@/app/components/BoatTours'
import WaterActivities from '@/app/components/WaterActivities'
import Food from '@/app/components/Food'
import Markets from '@/app/components/Markets'
import SingleGuide from '@/app/components/SingleGuide'
import SanJuan from '@/app/components/SanJuan'
import LocalExperiences from '@/app/components/LocalExperiences'
import Logistics from '@/app/components/Logistics'
import Budget from '@/app/components/Budget'
import Expenses from '@/app/components/Expenses'
import PreTripChecklist from '@/app/components/PreTripChecklist'
import TripPlanner from '@/app/components/TripPlanner'
import QuickInspiration from '@/app/components/QuickInspiration'
import PasswordWall from '@/app/components/PasswordWall'
import CustomCursor from '@/app/components/CustomCursor'
import AmbientGradients from '@/app/components/AmbientGradients'
import Footer from '@/app/components/Footer'
import { useAuth } from '@/app/hooks/useAuth'

const sections = ['overview', 'single-guide', 'base', 'inspiration', 'videos', 'beaches', 'boat-tours', 'water-activities', 'food', 'markets', 'sanjuan', 'experiences', 'pretrip-checklist', 'logistics', 'expenses', 'budget']

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const scrollTarget = searchParams ? searchParams.get('scroll') : null
  const { mounted, isAuthenticated, setIsAuthenticated } = useAuth()
  const [activeSection, setActiveSection] = useState('overview')

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

      <div className="max-w-[1920px] mx-auto relative z-10" suppressHydrationWarning>
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-4 sm:mx-6 mt-2" />
        <Overview />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <SingleGuide />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <BaseSelection />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <QuickInspiration />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <Videos />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <Beaches />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <BoatTours />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <WaterActivities />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <Food />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <Markets />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <SanJuan />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <LocalExperiences />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <PreTripChecklist />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <Logistics />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <Expenses />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-4 sm:mx-6" />
        <Budget />
      </div>

      <Footer />
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomeContent />
    </Suspense>
  )
}
