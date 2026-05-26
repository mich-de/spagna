'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Clock, Sunrise, Sunset, Moon, Car, DollarSign, Sparkles } from 'lucide-react'
import itinerary from '@/data/itinerary.json'

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

export default function Itinerary() {
  const [openDay, setOpenDay] = useState<number | null>(0)

  return (
    <section id="itinerary" className="px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Piano giornaliero</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Itinerario</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-terracotta-300 via-terracotta-500 to-mare-300 rounded-full" />
          
          {itinerary.map((day, i) => {
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
                  className={`rounded-2xl p-4 sm:p-6 cursor-pointer border transition-all ${
                    isSanJuan
                      ? 'bg-gradient-to-r from-red-50 to-amber-50 border-red-200'
                      : isOpen
                        ? 'bg-white/90 border-terracotta-200 shadow-md'
                        : 'bg-white/70 border-terracotta-100/40 card-hover'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
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
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${energy.color}`}>{energy.label}</span>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${budget.color}`}>{budget.label}</span>
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
                              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs">
                                🏖 {day.beach}
                              </span>
                            )}
                            {day.restaurant && (
                              <span className="px-2.5 py-1 bg-orange-50 text-orange-700 rounded-lg text-xs">
                                🍽 {day.restaurant}
                              </span>
                            )}
                            {day.attraction && (
                              <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs">
                                🎭 {day.attraction}
                              </span>
                            )}
                            {day.club && (
                              <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs">
                                🎵 {day.club}
                              </span>
                            )}
                            {day.drive_time_min > 0 && (
                              <span className="px-2.5 py-1 bg-gray-50 text-gray-700 rounded-lg text-xs flex items-center gap-1">
                                <Car className="w-3 h-3" /> ~{day.drive_time_min} min
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
