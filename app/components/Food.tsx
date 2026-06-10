'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Map, Star, Search, Heart, Car, Clock, MapPin } from 'lucide-react'
import foods from '@/data/food.json'
import restaurants from '@/data/restaurants.json'
import { getDriveTime, getShortBaseName } from '@/app/utils/driveTimes'

const zones = ['Tutte', ...Array.from(new Set(restaurants.map((r: any) => r.zone))).sort()]

const zoneIcons: Record<string, string> = {
  'Tutte': '🗺️',
  'Málaga': '🏛️',
  'Marbella': '💎',
  'Estepona': '🌸',
  'Nerja': '🏖️',
  'Mijas': '🏔️',
  'Benalmádena': '⛵',
  'Ronda': '🍷',
  'Fuengirola': '🛍️'
}

export default function Food() {
  const [zoneFilter, setZoneFilter] = useState('Tutte')
  const [sortByDriveTime, setSortByDriveTime] = useState(false)

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [selectedBase, setSelectedBase] = useState<string>('San Pedro de Alcántara')

  useEffect(() => {
    const stored = localStorage.getItem('sol_local_planner')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.bookmarks) setBookmarks(data.bookmarks)
        if (data.selectedBase) setSelectedBase(data.selectedBase)
      } catch (e) {}
    }
  }, [])

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail) {
        if (customEvent.detail.bookmarks !== undefined) {
          setBookmarks(customEvent.detail.bookmarks)
        }
        if (customEvent.detail.selectedBase !== undefined) {
          setSelectedBase(customEvent.detail.selectedBase || "San Pedro de Alcántara")
        }
      }
    }
    window.addEventListener('sol-local-planner-update', handleUpdate)
    return () => window.removeEventListener('sol-local-planner-update', handleUpdate)
  }, [])

  const toggleBookmark = (restaurant: any) => {
    const isBookmarked = bookmarks.some(b => b.id === restaurant.name)
    let nextBookmarks
    if (isBookmarked) {
      nextBookmarks = bookmarks.filter(b => b.id !== restaurant.name)
    } else {
      nextBookmarks = [...bookmarks, {
        id: restaurant.name,
        name: restaurant.name,
        type: 'restaurant',
        zone: restaurant.zone
      }]
    }
    setBookmarks(nextBookmarks)
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const nextState = { ...current, bookmarks: nextBookmarks }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
  }

  const filteredRestaurants = useMemo(() => {
    let result = restaurants.filter((r: any) => {
      if (zoneFilter !== 'Tutte' && r.zone !== zoneFilter) return false
      return true
    })

    if (sortByDriveTime) {
      result = [...result].sort((a: any, b: any) => {
        const timeA = getDriveTime(selectedBase, a.zone)
        const timeB = getDriveTime(selectedBase, b.zone)
        return timeA - timeB
      })
    }
    return result
  }, [zoneFilter, sortByDriveTime, selectedBase])

  return (
    <section id="food" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-terracotta-500 mb-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium uppercase tracking-[0.3em]">Gastronomia Andalusa</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-notte leading-tight">
            Piatti <span className="italic font-medium text-terracotta-500">Tipici</span> & Ristoranti
          </h2>
          <p className="text-mare-700/70 mt-3 max-w-3xl text-base sm:text-lg font-body leading-relaxed">
            Dalla croccantezza del <span className="text-terracotta-400 font-semibold">Pescaíto Frito</span> alla convivialità dei chiringuiti sulla sabbia. Un viaggio tra i sapori autentici del Sud.
          </p>
        </motion.div>

        {/* PIATTI TIPICI */}
        <div className="mb-12">
          <h3 className="font-display text-xl font-semibold text-notte mb-4">🍤 Piatti da provare</h3>
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-visible gap-3 pt-2 pb-4 sm:pt-0 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {foods.map((item: any, i: number) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/70 rounded-xl border border-terracotta-100/40 card-shadow card-hover w-[290px] xs:w-[325px] sm:w-auto shrink-0 snap-center overflow-hidden"
              >
                {item.image && (
                  <div className="relative h-36 sm:h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                  </div>
                )}
                <div className="p-4">
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
                </div>
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-mare-600 ml-1 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
                    <span>Filtra per zona</span>
                  </div>
                  <button
                    onClick={() => setSortByDriveTime(!sortByDriveTime)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 self-start sm:self-auto cursor-pointer ${
                      sortByDriveTime
                        ? 'bg-terracotta-500 text-white border-terracotta-500 shadow-md shadow-terracotta-500/25'
                        : 'bg-white/80 text-mare-750 border-terracotta-100/50 hover:bg-terracotta-50 hover:text-terracotta-600'
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" />
                    {sortByDriveTime ? 'Ordinato per vicinanza (⏱)' : 'Ordina per vicinanza (⏱)'}
                  </button>
                </div>
                <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-sabbia to-transparent pointer-events-none z-10 sm:hidden" />
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-sabbia to-transparent pointer-events-none z-10 sm:hidden" />
                  <div className="flex flex-row flex-nowrap sm:flex-wrap gap-1.5 overflow-x-auto sm:overflow-x-visible whitespace-nowrap sm:whitespace-normal scrollbar-hide py-1.5 px-0.5 snap-x sm:snap-none">
                    {zones.map((z) => (
                      <button
                        key={z}
                        onClick={() => setZoneFilter(z)}
                        className={`relative px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all snap-center cursor-pointer ${
                          zoneFilter === z
                            ? 'text-white font-bold'
                            : 'text-mare-750/90 hover:text-terracotta-600 bg-white border border-terracotta-100/40 hover:border-terracotta-200 shadow-sm hover:scale-102'
                        }`}
                      >
                        <span className="relative z-10 flex items-center gap-1.5">
                          <span>{zoneIcons[z] || '📍'}</span>
                          <span>{z === 'Tutte' ? 'Tutte le zone' : z}</span>
                        </span>
                        {zoneFilter === z && (
                          <motion.span
                            layoutId="foodZoneBg"
                            className="absolute inset-0 bg-gradient-to-r from-terracotta-500 to-terracotta-600 rounded-xl shadow-sm shadow-terracotta-500/25 border border-terracotta-400/20"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-visible gap-4 pt-2 pb-4 sm:pt-0 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {filteredRestaurants.map((r: any, i: number) => {
              const isBookmarked = bookmarks.some(b => b.id === r.name)
              return (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-terracotta-100/40 card-shadow card-hover w-[290px] xs:w-[325px] sm:w-auto shrink-0 snap-center"
                >
                  {r.imageUrl && (
                    <div className="relative w-full aspect-[16/9] -mx-5 -mt-5 mb-3 overflow-hidden rounded-t-2xl">
                      <img
                        src={r.imageUrl}
                        alt={r.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <button
                        onClick={() => toggleBookmark(r)}
                        className="absolute top-2.5 right-2.5 p-1.5 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all cursor-pointer shadow-sm"
                        title={isBookmarked ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-colors ${
                            isBookmarked ? 'fill-red-500 text-red-500' : 'text-mare-600'
                          }`}
                        />
                      </button>
                      <span className="absolute bottom-2 left-2.5 badge-pill text-white bg-black/40 backdrop-blur-sm border-0 text-[10px]">
                        {r.vibe}
                      </span>
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-display font-bold text-notte">{r.name}</h4>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-mare-100 text-mare-700">
                      {r.price}
                    </span>
                  </div>
                <p className="text-xs text-mare-500 mb-1.5 flex flex-wrap items-center gap-1.5">
                  <span>{r.zone} · {r.type}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-terracotta-600 bg-terracotta-50/50 px-2 py-0.5 rounded-full shrink-0">
                    <Car className="w-2.5 h-2.5" />
                    ~{getDriveTime(selectedBase, r.zone)} min (da {getShortBaseName(selectedBase)})
                  </span>
                </p>
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
            )
          })}
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