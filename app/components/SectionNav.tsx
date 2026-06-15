'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, MapPin, Sun, Waves, Utensils, Moon, Flame, Heart, Car, DollarSign, Menu, X, Play, Briefcase, CheckSquare, Sparkles, Users, Receipt, Ship, Store, ClipboardCheck, Droplets } from 'lucide-react'

interface SectionDef {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  group?: string
}

const sections: SectionDef[] = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'single-guide', label: 'Movida', icon: Users },
  { id: 'base', label: 'Base', icon: MapPin },
  { id: 'inspiration', label: 'Ispirazione', icon: Sparkles },
  { id: 'videos', label: 'Video', icon: Play },
  { id: 'itinerary', label: 'Itinerario', icon: Sun, group: 'divider' },
  { id: 'beaches', label: 'Spiagge', icon: Waves },
  { id: 'boat-tours', label: 'Barca', icon: Ship },
  { id: 'water-activities', label: 'Kayak', icon: Droplets },
  { id: 'food', label: 'Food', icon: Utensils, group: 'divider' },
  { id: 'markets', label: 'Mercati', icon: Store },
  { id: 'sanjuan', label: 'San Juan', icon: Flame },
  { id: 'experiences', label: 'Esperienze', icon: Heart, group: 'divider' },
  { id: 'pretrip-checklist', label: 'Checklist', icon: ClipboardCheck },
  { id: 'logistics', label: 'Logistica', icon: Car },
  { id: 'expenses', label: 'Spese', icon: Receipt },
  { id: 'budget', label: 'Budget', icon: DollarSign },
]

export default function SectionNav({ activeSection, onSectionChange }: {
  activeSection: string
  onSectionChange: (id: string) => void
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const [plannerStats, setPlannerStats] = useState({ bookmarksCount: 0, completedTasks: 0, totalTasks: 0 })

  const scrollToActive = useCallback(() => {
    if (!navRef.current) return
    const el = navRef.current.querySelector(`[data-nav-id="${activeSection}"]`) as HTMLElement | null
    if (el) {
      const container = navRef.current
      const elLeft = el.offsetLeft
      const elWidth = el.offsetWidth
      const containerWidth = container.clientWidth
      const scrollLeft = container.scrollLeft
      const target = elLeft - containerWidth / 2 + elWidth / 2
      container.scrollTo({ left: target, behavior: 'smooth' })
    }
  }, [activeSection])

  useEffect(() => { scrollToActive() }, [activeSection, scrollToActive])

  useEffect(() => {
    const updateStats = () => {
      const stored = localStorage.getItem('sol_local_planner')
      if (stored) {
        try {
          const data = JSON.parse(stored)
          const bookmarksCount = data.bookmarks?.length || 0
          const predefinedTasks = data.predefinedTasks || {}
          const customTasks = data.customTasks || []
          const completedPredefined = Object.values(predefinedTasks).filter(Boolean).length
          const completedCustom = customTasks.filter((t: any) => t.completed).length
          const completedTasks = completedPredefined + completedCustom
          const totalTasks = Object.keys(predefinedTasks).length + customTasks.length
          setPlannerStats({ bookmarksCount, completedTasks, totalTasks })
        } catch (e) {}
      }
    }
    updateStats()
    window.addEventListener('sol-local-planner-update', updateStats)
    return () => window.removeEventListener('sol-local-planner-update', updateStats)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-surface/80 backdrop-blur-2xl border-b border-outline-variant/30">
        <div className="max-w-[1920px] mx-auto px-3 sm:px-5">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2 shrink-0 mr-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-sm shadow-primary/20">
                <Compass className="w-4 h-4 text-on-primary" />
              </div>
              <span className="font-headline-sm text-on-surface font-bold tracking-tight hidden sm:block">
                Sol <span className="italic font-medium text-primary">&</span> Local
              </span>
            </div>

            <div ref={navRef} className="hidden lg:flex items-center gap-1 overflow-x-auto scrollbar-hide relative py-1">
              {sections.map((s, i) => {
                const isActive = activeSection === s.id
                const showDivider = s.group === 'divider' && i > 0
                return (
                  <div key={s.id} className="flex items-center">
                    {showDivider && <div className="w-px h-4 bg-outline-variant/30 mx-1 shrink-0" />}
                    <button data-nav-id={s.id} onClick={() => onSectionChange(s.id)}
                      className={`relative shrink-0 px-3 py-1.5 font-label-sm text-label-sm font-medium rounded-full flex items-center gap-1.5 whitespace-nowrap transition-all duration-200 ${
                        isActive
                          ? 'text-on-primary bg-primary shadow-sm'
                          : 'text-on-surface-variant hover:text-primary hover:bg-surface-variant'
                      }`}>
                      <s.icon className={`w-3.5 h-3.5 ${isActive ? 'text-on-primary' : ''}`} />
                      <span className="hidden xl:inline">{s.label}</span>
                      <span className="xl:hidden">{s.label.length > 6 ? s.label.slice(0, 5) + '…' : s.label}</span>
                    </button>
                  </div>
                )
              })}
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant rounded-xl transition-all cursor-pointer relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu">
              <motion.div animate={{ rotate: mobileOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="absolute">
                {mobileOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-[9997] bg-black/20 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:hidden fixed inset-x-0 top-14 bottom-0 z-[9998] bg-surface/95 backdrop-blur-2xl border-t border-outline-variant/30 flex flex-col">
              <motion.div onClick={(e) => e.stopPropagation()}
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.025, delayChildren: 0.04 } } }}
                initial="hidden" animate="show" className="flex-1 overflow-y-auto px-5 py-5">
                <div className="space-y-1">
                  {sections.map((s) => {
                    const isActive = activeSection === s.id
                    const showDivider = s.group === 'divider'
                    return (
                      <div key={s.id}>
                        {showDivider && <div className="h-px bg-outline-variant/30 my-2" />}
                        <motion.button variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } } }}
                          onClick={() => { setMobileOpen(false); setTimeout(() => onSectionChange(s.id), 50) }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-label-md font-medium transition-all ${
                            isActive ? 'text-on-primary bg-primary shadow-sm' : 'text-on-surface-variant hover:text-primary hover:bg-surface-variant'
                          }`}>
                          <s.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-on-primary' : 'text-primary'}`} />
                          {s.label}
                        </motion.button>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {(plannerStats.bookmarksCount > 0 || plannerStats.totalTasks > 0) && (
                <motion.div onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="p-5 bg-surface-container-lowest border-t border-outline-variant/30 backdrop-blur-md space-y-2.5 shrink-0 pb-safe">
                  <div className="flex items-center justify-between font-label-sm text-label-sm font-bold text-on-surface-variant">
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-primary" /> Il Mio Piano</span>
                    <span className="flex items-center gap-3">
                      {plannerStats.bookmarksCount > 0 && (
                        <span className="flex items-center gap-1 font-body-md text-[13px] text-on-surface-variant">
                          <Heart className="w-3 h-3 text-red-500 fill-red-500" /> {plannerStats.bookmarksCount}
                        </span>
                      )}
                      {plannerStats.totalTasks > 0 && (
                        <span className="flex items-center gap-1 font-body-md text-[13px] text-on-surface-variant">
                          <CheckSquare className="w-3 h-3 text-tertiary" /> {plannerStats.completedTasks}/{plannerStats.totalTasks}
                        </span>
                      )}
                    </span>
                  </div>
                  {plannerStats.totalTasks > 0 && (
                    <div className="w-full h-1.5 rounded-full bg-surface-variant overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full transition-all duration-500" style={{ width: `${(plannerStats.completedTasks / plannerStats.totalTasks) * 100}%` }} />
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-14" />
    </>
  )
}
