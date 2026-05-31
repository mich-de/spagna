'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Clock, Sunrise, Sunset, Moon, Car, DollarSign, Sparkles } from 'lucide-react'
import itineraryData from '@/data/itinerary.json'

function getEnergyBadge(level: string) {
  switch (level) {
    case 'relax': return { label: 'Relax', color: 'bg-emerald-100 text-emerald-700' }
    case 'medio': return { label: 'Medio', color: 'bg-amber-100 text-amber-700' }
    case 'intenso': return { label: 'Intenso', color: 'bg-rose-100 text-rose-700' }
    default: return { label: level, color: 'bg-gray-100 text-gray-700' }
  }
}

function getBudgetBadge(level: string) {
  switch (level) {
    case 'basso': return { label: '€', color: 'bg-emerald-100 text-emerald-700' }
    case 'medio': return { label: '€€', color: 'bg-amber-100 text-amber-700' }
    case 'alto': return { label: '€€€', color: 'bg-rose-100 text-rose-700' }
    default: return { label: level, color: 'bg-gray-100 text-gray-700' }
  }
}

const baseDriveTimes: Record<string, number[]> = {
  "San Pedro de Alcántara": [65, 45, 60, 95, 60, 10, 65],
  "Marbella (Centro/Casco Antiguo)": [55, 0, 50, 70, 50, 24, 55],
  "Estepona": [85, 50, 85, 100, 85, 0, 85],
  "Benalmádena": [20, 80, 20, 140, 20, 0, 20],
  "Nerja": [50, 200, 50, 250, 50, 0, 50]
}

function getAdjustedContent(dayIndex: number, selectedBase: string, originalDay: any) {
  let morning = originalDay.morning
  let afternoon = originalDay.afternoon
  let sunset = originalDay.sunset
  let local_tip = originalDay.local_tip

  const normalizedBase = selectedBase || "San Pedro de Alcántara"

  if (dayIndex === 1) { // Day 2 (Sab)
    if (normalizedBase === "Marbella (Centro/Casco Antiguo)") {
      morning = morning.replace("Spostamento a Marbella / Cabopino (22min).", "Spostamento a Cabopino (15min).")
    } else if (normalizedBase === "Estepona") {
      morning = morning.replace("Spostamento a Marbella / Cabopino (22min).", "Spostamento a Marbella / Cabopino (35min).")
    } else if (normalizedBase === "Benalmádena") {
      morning = morning.replace("Spostamento a Marbella / Cabopino (22min).", "Spostamento a Marbella / Cabopino (25min).")
    } else if (normalizedBase === "Nerja") {
      morning = morning.replace("Spostamento a Marbella / Cabopino (22min).", "Spostamento a Marbella / Cabopino (65min).")
    }
  }

  if (dayIndex === 3) { // Day 4 (Lun)
    if (normalizedBase === "Marbella (Centro/Casco Antiguo)") {
      morning = morning.replace("Mattina a Mijas Pueblo (35min da San Pedro).", "Mattina a Mijas Pueblo (20min da Marbella).")
      afternoon = afternoon.replace("Spostamento a Estepona (50min).", "Spostamento a Estepona (25min).")
    } else if (normalizedBase === "Estepona") {
      morning = morning.replace("Mattina a Mijas Pueblo (35min da San Pedro).", "Mattina a Mijas Pueblo (50min da Estepona).")
      afternoon = afternoon.replace("Spostamento a Estepona (50min).", "Spiaggia a Estepona direttamente sotto casa (0min).")
    } else if (normalizedBase === "Benalmádena") {
      morning = morning.replace("Mattina a Mijas Pueblo (35min da San Pedro).", "Mattina a Mijas Pueblo (10min da Benalmádena).")
      afternoon = afternoon.replace("Spostamento a Estepona (50min).", "Spostamento a Estepona (65min).")
    } else if (normalizedBase === "Nerja") {
      morning = morning.replace("Mattina a Mijas Pueblo (35min da San Pedro).", "Mattina a Mijas Pueblo (60min da Nerja).")
      afternoon = afternoon.replace("Spostamento a Estepona (50min).", "Spostamento a Estepona (95min).")
    }
  }

  if (dayIndex === 4) { // Day 5 (Mar)
    if (normalizedBase === "Marbella (Centro/Casco Antiguo)") {
      sunset = sunset.replace("Aperitivo soft a San Pedro, poi spostamento verso Málaga (60min).", "Aperitivo a Marbella, poi spostamento verso Málaga (50min).")
    } else if (normalizedBase === "Estepona") {
      sunset = sunset.replace("Aperitivo soft a San Pedro, poi spostamento verso Málaga (60min).", "Aperitivo a Estepona, poi spostamento verso Málaga (85min).")
    } else if (normalizedBase === "Benalmádena") {
      sunset = sunset.replace("Aperitivo soft a San Pedro, poi spostamento verso Málaga (60min).", "Aperitivo a Benalmádena, poi spostamento verso Málaga (20min).")
    } else if (normalizedBase === "Nerja") {
      sunset = sunset.replace("Aperitivo soft a San Pedro, poi spostamento verso Málaga (60min).", "Aperitivo a Nerja, poi spostamento verso Málaga (50min).")
    }
  }

  if (dayIndex === 6) { // Day 7 (Gio)
    if (normalizedBase === "Marbella (Centro/Casco Antiguo)") {
      afternoon = afternoon.replace("alle 15:25", "alle 15:35")
      local_tip = local_tip.replace("lasciare Marbella al massimo alle 15:35", "lasciare Marbella al massimo alle 15:35")
    } else if (normalizedBase === "Estepona") {
      afternoon = afternoon.replace("alle 15:25", "alle 15:05")
      local_tip = local_tip.replace("lasciare Marbella al massimo alle 15:35", "lasciare Estepona al massimo alle 15:05")
    } else if (normalizedBase === "Benalmádena") {
      afternoon = afternoon.replace("alle 15:25", "alle 16:10")
      local_tip = local_tip.replace("lasciare Marbella al massimo alle 15:35", "lasciare Benalmádena al massimo alle 16:10")
    } else if (normalizedBase === "Nerja") {
      afternoon = afternoon.replace("alle 15:25", "alle 15:40")
      local_tip = local_tip.replace("lasciare Marbella al massimo alle 15:35", "lasciare Nerja al massimo alle 15:40")
    } else { // San Pedro
      local_tip = local_tip.replace("lasciare Marbella al massimo alle 15:35", "lasciare San Pedro al massimo alle 15:25")
    }
  }

  return { ...originalDay, morning, afternoon, sunset, local_tip }
}

export default function Itinerary() {
  const [openDay, setOpenDay] = useState<number | null>(0)
  const [selectedBase, setSelectedBase] = useState<string>("San Pedro de Alcántara")

  useEffect(() => {
    const stored = localStorage.getItem('sol_local_planner')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.selectedBase) setSelectedBase(data.selectedBase)
      } catch (e) {}
    }

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail && customEvent.detail.selectedBase !== undefined) {
        setSelectedBase(customEvent.detail.selectedBase || "San Pedro de Alcántara")
      }
    }
    window.addEventListener('sol-local-planner-update', handleUpdate)
    return () => window.removeEventListener('sol-local-planner-update', handleUpdate)
  }, [])

  return (
    <section id="itinerary" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-4 sm:p-6 rounded-2xl mb-8"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Piano giornaliero</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Itinerario</h2>
        </motion.div>

        {/* BASE ADAPTATION BADGE */}
        <div className="mb-6 p-4 rounded-2xl bg-crema/40 border border-terracotta-100/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-terracotta-500"></span>
            </span>
            <p className="text-xs text-mare-700/80 font-medium">
              Tempi di guida e percorsi adattati alla base attiva:
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-terracotta-500 text-white text-xs font-bold shadow-sm self-start sm:self-auto">
            📍 {selectedBase}
          </span>
        </div>

        <div className="relative">
          <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-terracotta-300 via-terracotta-500 to-mare-300 rounded-full" />
          
          {itineraryData.map((originalDay, i) => {
            const day = getAdjustedContent(i, selectedBase, originalDay)
            const driveTimes = baseDriveTimes[selectedBase] || baseDriveTimes["San Pedro de Alcántara"]
            const calculatedDriveTime = driveTimes[i]
            
            const energy = getEnergyBadge(day.energy_level)
            const budget = getBudgetBadge(day.budget_level)
            const isOpen = openDay === i
            const isSanJuan = day.date === '2026-06-23'

            return (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative pl-10 sm:pl-12 pb-6 ${isSanJuan ? 'mb-4' : ''}`}
              >
                <div className={`absolute left-2.5 sm:left-3.5 top-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 ${
                  isSanJuan
                    ? 'bg-red-500 border-red-300 san-juan-pulse'
                    : 'bg-terracotta-500 border-terracotta-200'
                } z-10`} />

                <div
                  onClick={() => setOpenDay(isOpen ? null : i)}
                  className={`rounded-2xl p-4 sm:p-6 cursor-pointer border transition-all card-shadow card-hover ${
                    isSanJuan
                      ? 'bg-gradient-to-r from-red-50 to-amber-50 border-red-200'
                      : isOpen
                        ? 'bg-white/90 border-terracotta-200 shadow-md'
                        : 'bg-white/70 border-terracotta-100/40'
                  }`}
                >
                  <div className="flex flex-row sm:items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-medium text-terracotta-500 uppercase tracking-wider">
                          {day.dayName} {day.date}
                        </span>
                        {isSanJuan && (
                          <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold uppercase">
                            🔥 San Juan
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-notte">{day.title}</h3>
                      <p className="text-sm text-mare-700/60 mt-1">{day.zone}</p>
                      
                      {/* Mobile badges */}
                      <div className="flex items-center gap-1.5 mt-2 sm:hidden">
                        <span className={`badge-pill text-[10px] ${energy.color}`}>{energy.label}</span>
                        <span className={`badge-pill text-[10px] ${budget.color}`}>{budget.label}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-center sm:self-start">
                      {/* Desktop badges */}
                      <div className="hidden sm:flex items-center gap-1.5">
                        <span className={`badge-pill ${energy.color}`}>{energy.label}</span>
                        <span className={`badge-pill ${budget.color}`}>{budget.label}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-mare-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-terracotta-100/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {day.morning && (
                              <div className="bg-terracotta-50/50 rounded-xl p-3">
                                <div className="flex items-center gap-2 text-terracotta-600 mb-1">
                                  <Sunrise className="w-4 h-4" />
                                  <span className="text-xs font-semibold uppercase tracking-wider">Mattina</span>
                                </div>
                                <p className="text-sm text-mare-700/80">{day.morning}</p>
                              </div>
                            )}
                            {day.lunch && (
                              <div className="bg-amber-50/50 rounded-xl p-3">
                                <div className="flex items-center gap-2 text-amber-600 mb-1">
                                  <Clock className="w-4 h-4" />
                                  <span className="text-xs font-semibold uppercase tracking-wider">Pranzo</span>
                                </div>
                                <p className="text-sm text-mare-700/80">{day.lunch}</p>
                              </div>
                            )}
                            {day.afternoon && (
                              <div className="bg-crema/50 rounded-xl p-3">
                                <div className="flex items-center gap-2 text-oro mb-1">
                                  <Sunset className="w-4 h-4" />
                                  <span className="text-xs font-semibold uppercase tracking-wider">Pomeriggio</span>
                                </div>
                                <p className="text-sm text-mare-700/80">{day.afternoon}</p>
                              </div>
                            )}
                            {day.sunset && (
                              <div className="bg-gradient-to-r from-orange-50 to-rose-50 rounded-xl p-3">
                                <div className="flex items-center gap-2 text-orange-600 mb-1">
                                  <Sunset className="w-4 h-4" />
                                  <span className="text-xs font-semibold uppercase tracking-wider">Tramonto</span>
                                </div>
                                <p className="text-sm text-mare-700/80">{day.sunset}</p>
                              </div>
                            )}
                            {day.evening && (
                              <div className="bg-indigo-50/50 rounded-xl p-3">
                                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                                  <Moon className="w-4 h-4" />
                                  <span className="text-xs font-semibold uppercase tracking-wider">Sera</span>
                                </div>
                                <p className="text-sm text-mare-700/80">{day.evening}</p>
                              </div>
                            )}
                            {day.night && (
                              <div className="bg-purple-50/50 rounded-xl p-3">
                                <div className="flex items-center gap-2 text-purple-600 mb-1">
                                  <Moon className="w-4 h-4" />
                                  <span className="text-xs font-semibold uppercase tracking-wider">Notte</span>
                                </div>
                                <p className="text-sm text-mare-700/80">{day.night}</p>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2 mt-3">
                            {day.beach && (
                              <span className="badge-pill bg-blue-50 text-blue-700">
                                🏖 {day.beach}
                              </span>
                            )}
                            {day.restaurant && (
                              <span className="badge-pill bg-orange-50 text-orange-700">
                                🍽 {day.restaurant}
                              </span>
                            )}
                            {day.attraction && (
                              <span className="badge-pill bg-green-50 text-green-700">
                                🎭 {day.attraction}
                              </span>
                            )}
                            {day.club && (
                              <span className="badge-pill bg-purple-50 text-purple-700">
                                🎵 {day.club}
                              </span>
                            )}
                            {calculatedDriveTime > 0 && (
                              <span className="px-2.5 py-1 bg-gray-50 text-gray-700 rounded-lg text-xs flex items-center gap-1">
                                <Car className="w-3 h-3" /> ~{calculatedDriveTime} min
                              </span>
                            )}
                          </div>

                          {day.local_tip && (
                            <div className="mt-3 p-3 bg-gradient-to-r from-terracotta-100 to-crema rounded-xl">
                              <div className="flex items-center gap-2 text-terracotta-700 mb-1">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-xs font-semibold uppercase tracking-wider">Consiglio da locale</span>
                              </div>
                              <p className="text-sm text-mare-700/90">{day.local_tip}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
