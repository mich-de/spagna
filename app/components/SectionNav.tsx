'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, MapPin, Sun, Waves, Utensils, Moon, Flame, Heart, Car, DollarSign, Menu, X } from 'lucide-react'

const sections = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'base', label: 'Base', icon: MapPin },
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
  const menuRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

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
    if (!mobileOpen) return
    let timer: ReturnType<typeof setTimeout>
    const handleScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(() => setMobileOpen(false), 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
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
              className="lg:hidden p-2 text-mare-700 hover:bg-terracotta-50 rounded-lg transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              />
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-terracotta-100/50 bg-sabbia/95 backdrop-blur-xl overflow-hidden relative z-50"
              >
                <div className="grid grid-cols-2 gap-1 p-4 pb-6">
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { onSectionChange(s.id); setMobileOpen(false) }}
                      className={`flex items-center gap-2.5 px-3 py-3 rounded-lg text-sm transition-all ${
                        activeSection === s.id
                          ? 'text-white bg-gradient-to-r from-terracotta-500 to-terracotta-600 font-medium shadow-sm shadow-terracotta-500/20'
                          : 'text-mare-700/60 hover:text-terracotta-700 hover:bg-terracotta-100/50'
                      }`}
                    >
                      <s.icon className="w-4 h-4" />
                      {s.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      <div className="h-16" />
    </>
  )
}
