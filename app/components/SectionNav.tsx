'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, MapPin, Sun, Waves, Utensils, Moon, Flame, Heart, Car, DollarSign, Menu, X, Play, Briefcase, CheckSquare, Sparkles, Users } from 'lucide-react'

const sections = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'single-guide', label: 'Movida Over 35', icon: Users },
  { id: 'base', label: 'Base', icon: MapPin },
  { id: 'inspiration', label: 'Ispirazione', icon: Sparkles },
  { id: 'videos', label: 'Video', icon: Play },
  { id: 'itinerary', label: 'Itinerario', icon: Sun },
  { id: 'beaches', label: 'Spiagge', icon: Waves },
  { id: 'food', label: 'Food', icon: Utensils },
  { id: 'nightlife', label: 'Nightlife', icon: Moon },
  { id: 'sanjuan', label: 'San Juan', icon: Flame },
  { id: 'experiences', label: 'Local', icon: Heart },
  { id: 'logistics', label: 'Logistica', icon: Car },
  { id: 'budget', label: 'Budget', icon: DollarSign },
]

export default function SectionNav({ activeSection, onSectionChange }: {
  activeSection: string
  onSectionChange: (id: string) => void
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const [plannerStats, setPlannerStats] = useState({ bookmarksCount: 0, completedTasks: 0, totalTasks: 0 })

  useEffect(() => {
    if (!navRef.current) return
    const activeEl = navRef.current.querySelector(`[data-nav-id="${activeSection}"]`) as HTMLElement | null
    if (activeEl) {
      const parentRect = navRef.current.getBoundingClientRect()
      const elRect = activeEl.getBoundingClientRect()
      setIndicatorStyle({
        left: elRect.left - parentRect.left,
        width: elRect.width,
      })
    }
  }, [activeSection])

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

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-sabbia/90 backdrop-blur-xl border-b border-terracotta-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-terracotta-500 to-mare-600 rounded-lg flex items-center justify-center">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-base sm:text-lg font-semibold text-notte">
                Sol & Local
              </span>
            </div>

            <div ref={navRef} className="hidden lg:flex items-center gap-0.5 overflow-x-auto scrollbar-hide relative">
              {sections.map((s) => (
                <button
                  key={s.id}
                  data-nav-id={s.id}
                  onClick={() => onSectionChange(s.id)}
                  className={`relative z-10 px-3 py-2 text-sm rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors duration-200 ${
                    activeSection === s.id
                      ? 'text-white'
                      : 'text-mare-700/60 hover:text-terracotta-700'
                  }`}
                >
                  <s.icon className="w-3.5 h-3.5" />
                  {s.label}
                </button>
              ))}
              <motion.div
                className="absolute bottom-0 left-0 h-8 bg-gradient-to-r from-terracotta-500 to-terracotta-600 rounded-lg shadow-sm shadow-terracotta-500/20"
                animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-mare-700 hover:bg-terracotta-50 rounded-xl transition-all cursor-pointer relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute"
              >
                {mobileOpen ? <X className="w-6 h-6 text-terracotta-600" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-sabbia/98 backdrop-blur-2xl border-t border-terracotta-100/50 flex flex-col justify-between"
            >
              {/* Menu Links with Staggered Fade-in */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.05
                    }
                  }
                }}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto px-6 py-6 space-y-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  {sections.map((s) => (
                    <motion.button
                      key={s.id}
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
                      }}
                      onClick={() => {
                        setMobileOpen(false)
                        setTimeout(() => onSectionChange(s.id), 100)
                      }}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                        activeSection === s.id
                          ? 'text-white bg-gradient-to-r from-terracotta-500 to-terracotta-600 shadow-md shadow-terracotta-500/25'
                          : 'text-mare-700 hover:text-terracotta-600 hover:bg-terracotta-50/50 border border-terracotta-100/20 bg-white/40'
                      }`}
                    >
                      <s.icon className={`w-4 h-4 ${activeSection === s.id ? 'text-white' : 'text-terracotta-500'}`} />
                      {s.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Progress Summary Footer inside Mobile Menu */}
              {(plannerStats.bookmarksCount > 0 || plannerStats.totalTasks > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 bg-white/70 border-t border-terracotta-100/50 backdrop-blur-md space-y-3 shrink-0 pb-safe"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-mare-600">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-terracotta-500" /> Il Mio Piano
                    </span>
                    <span className="flex items-center gap-3">
                      {plannerStats.bookmarksCount > 0 && (
                        <span className="flex items-center gap-1 text-[11px] text-mare-500">
                          <Heart className="w-3 h-3 text-red-500 fill-red-500" /> {plannerStats.bookmarksCount} preferiti
                        </span>
                      )}
                      {plannerStats.totalTasks > 0 && (
                        <span className="flex items-center gap-1 text-[11px] text-mare-500">
                          <CheckSquare className="w-3 h-3 text-emerald-500" /> {plannerStats.completedTasks}/{plannerStats.totalTasks} task
                        </span>
                      )}
                    </span>
                  </div>
                  {plannerStats.totalTasks > 0 && (
                    <div className="w-full h-1.5 rounded-full bg-terracotta-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-terracotta-500 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${(plannerStats.completedTasks / plannerStats.totalTasks) * 100}%` }}
                      />
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <div className="h-16" />
    </>
  )
}
