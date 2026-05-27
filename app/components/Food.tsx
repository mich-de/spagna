'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Map, Star, Search } from 'lucide-react'
import foods from '@/data/food.json'
import restaurants from '@/data/restaurants.json'

const zones = ['Tutte', ...Array.from(new Set(restaurants.map((r: any) => r.zone))).sort()]

export default function Food() {
  const [zoneFilter, setZoneFilter] = useState('Tutte')

  const filteredRestaurants = useMemo(() => 
    restaurants.filter((r: any) => {
      if (zoneFilter !== 'Tutte' && r.zone !== zoneFilter) return false
      return true
    }),
  [zoneFilter])

  return (
    <section id="food" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Gastronomia andalusa</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Piatti tipici & Ristoranti</h2>
        </motion.div>

        {/* PIATTI TIPICI */}
        <div className="mb-12">
          <h3 className="font-display text-xl font-semibold text-notte mb-4">🍤 Piatti da provare</h3>
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-visible gap-3 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {foods.map((item: any, i: number) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/70 rounded-xl p-4 border border-terracotta-100/40 card-shadow card-hover min-w-[85vw] xs:min-w-[300px] sm:min-w-0 snap-center"
              >
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-display font-bold text-notte">{item.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    item.authenticity >= 9 ? 'bg-emerald-100 text-emerald-700' :
                    item.authenticity >= 7 ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {item.authenticity}/10
                  </span>
                </div>
                <p className="text-xs text-mare-700/60 mb-2">{item.description}</p>
                <div className="flex flex-wrap gap-1.5 text-xs text-mare-700/50">
                  <span className="px-2 py-0.5 bg-terracotta-50 rounded">🕐 {item.when}</span>
                  <span className="px-2 py-0.5 bg-terracotta-50 rounded">📍 {item.where}</span>
                </div>
                <p className="text-xs text-terracotta-600 mt-1.5 italic">🍷 {item.pairing}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RISTORANTI & CHIRINGUITI */}
        <div>
          <div className="flex flex-col gap-4 mb-8">
            <h3 className="font-display text-xl font-semibold text-notte">🍽 Ristoranti & Chiringuiti</h3>
            
            {/* Zone filter buttons */}
            <div className="glass p-3 rounded-2xl border border-terracotta-100/40">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-mare-400 ml-1">Filtra per zona:</span>
                <div className="flex flex-wrap gap-1.5">
                  {zones.map((z) => (
                    <button
                      key={z}
                      onClick={() => setZoneFilter(z)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        zoneFilter === z
                          ? 'bg-terracotta-500 text-white shadow-md'
                          : 'bg-white/60 text-mare-600 border border-terracotta-100/50 hover:bg-terracotta-50 hover:text-terracotta-600 hover:border-terracotta-200'
                      }`}
                    >
                      {z === 'Tutte' ? 'Tutte le zone' : z}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-visible gap-4 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {filteredRestaurants.map((r: any, i: number) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-terracotta-100/40 card-shadow card-hover min-w-[85vw] xs:min-w-[300px] sm:min-w-0 snap-center"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-display font-bold text-notte">{r.name}</h4>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-mare-100 text-mare-700">
                    {r.price}
                  </span>
                </div>
                <p className="text-xs text-mare-500 mb-1">{r.zone} · {r.type}</p>
                <p className="text-xs text-mare-700/60 mb-2">{r.description}</p>
                <p className="text-xs font-medium text-terracotta-600 mb-2">🔥 {r.specialty}</p>
                <div className="flex flex-wrap gap-1.5 text-xs mb-3">
                  <span className={`px-2 py-0.5 rounded ${
                    r.reservation.includes('no') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {r.reservation.includes('no') ? 'Walk-in' : r.reservation}
                  </span>
                  <span className="px-2 py-0.5 bg-terracotta-50 text-mare-700 rounded">
                    🕐 {r.bestTime}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <a
                    href={r.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                  >
                    <Map className="w-3.5 h-3.5" />
                    Maps
                  </a>
                  <a
                    href={r.tripadvisorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                  >
                    <Star className="w-3.5 h-3.5" />
                    TripAdvisor
                  </a>
                </div>
                {r.localTip && (
                  <p className="text-xs text-terracotta-600 mt-2 italic border-t border-terracotta-100/30 pt-2">
                    💡 {r.localTip}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
          
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12 text-mare-400">
              <p className="font-body">Nessun ristorante trovato per questa zona.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}