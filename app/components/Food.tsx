'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Map, Star, Heart, Car, Clock, MapPin } from 'lucide-react'
import foods from '@/data/food.json'
import restaurants from '@/data/restaurants.json'
import { getDriveTime, getShortBaseName } from '@/app/utils/driveTimes'

const zones = ['Tutte', ...Array.from(new Set(restaurants.map((r: any) => r.zone))).sort()]

export default function Food() {
  const [zoneFilter, setZoneFilter] = useState('Tutte')
  const [sortByDriveTime, setSortByDriveTime] = useState(false)
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
      const ce = e as CustomEvent
      if (ce.detail) {
        if (ce.detail.bookmarks !== undefined) setBookmarks(ce.detail.bookmarks)
        if (ce.detail.selectedBase !== undefined) setSelectedBase(ce.detail.selectedBase || "San Pedro de Alcántara")
      }
    }
    window.addEventListener('sol-local-planner-update', handleUpdate)
    return () => window.removeEventListener('sol-local-planner-update', handleUpdate)
  }, [])

  const toggleBookmark = (restaurant: any) => {
    const isBookmarked = bookmarks.some(b => b.id === restaurant.name)
    const nextBookmarks = isBookmarked
      ? bookmarks.filter(b => b.id !== restaurant.name)
      : [...bookmarks, { id: restaurant.name, name: restaurant.name, type: 'restaurant', zone: restaurant.zone }]
    setBookmarks(nextBookmarks)
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const nextState = { ...current, bookmarks: nextBookmarks }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
  }

  const filteredRestaurants = useMemo(() => {
    let result = restaurants.filter((r: any) => zoneFilter === 'Tutte' || r.zone === zoneFilter)
    if (sortByDriveTime) {
      result = [...result].sort((a: any, b: any) => getDriveTime(selectedBase, a.zone) - getDriveTime(selectedBase, b.zone))
    }
    return result
  }, [zoneFilter, sortByDriveTime, selectedBase])

  return (
    <section id="food" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Gastronomia Andalusa</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Piatti Tipici & Ristoranti</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-3xl">Dalla croccantezza del Pescaíto Frito alla convivialità dei chiringuiti sulla sabbia.</p>
        </motion.div>

        {/* PIATTI TIPICI */}
        <div className="mb-12">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Piatti da provare</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foods.map((item: any, i: number) => (
              <motion.div key={item.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_4px_12px_rgba(30,58,95,0.08)] hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] transition-all duration-200 hover:scale-[0.98] border border-outline-variant/30"
              >
                {item.image && (
                  <div className="relative h-36 sm:h-40 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-label-md text-label-md text-on-surface font-bold">{item.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm ${
                      item.authenticity >= 9 ? 'bg-emerald-100 text-emerald-700' :
                      item.authenticity >= 7 ? 'bg-amber-100 text-amber-700' :
                      'bg-surface-variant text-on-surface-variant'
                    }`}>
                      {item.authenticity}/10
                    </span>
                  </div>
                  <p className="font-body-md text-[14px] text-on-surface-variant mb-2">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5 font-body-md text-[12px] text-on-surface-variant">
                    <span className="px-2 py-0.5 bg-surface-variant rounded">🕐 {item.when}</span>
                    <span className="px-2 py-0.5 bg-surface-variant rounded">📍 {item.where}</span>
                  </div>
                  <p className="font-body-md text-[13px] text-primary mt-1.5 italic">🍷 {item.pairing}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RISTORANTI */}
        <div>
          <div className="flex flex-col gap-4 mb-8">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Ristoranti & Chiringuiti</h3>
            <div className="bg-surface-container rounded-xl p-4 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] border border-outline-variant/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Zona</span>
                <button onClick={() => setSortByDriveTime(!sortByDriveTime)}
                  className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-all border flex items-center gap-1.5 self-start sm:self-auto ${
                    sortByDriveTime
                      ? 'bg-secondary text-on-secondary border-secondary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/50 hover:border-secondary/50'
                  }`}>
                  <Car className="w-3.5 h-3.5" />
                  {sortByDriveTime ? 'Ordinato per vicinanza' : 'Ordina per vicinanza'}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {zones.map((z) => (
                  <button key={z} onClick={() => setZoneFilter(z)}
                    className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all active:scale-95 ${
                      zoneFilter === z
                        ? 'bg-secondary text-on-secondary shadow-sm'
                        : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:border-secondary/50'
                    }`}>
                    {z}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((r: any, i: number) => {
              const isBookmarked = bookmarks.some(b => b.id === r.name)
              return (
                <motion.div key={r.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_4px_12px_rgba(30,58,95,0.08)] hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] transition-all duration-200 hover:scale-[0.98] border border-outline-variant/30"
                >
                  {r.imageUrl && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={r.imageUrl} alt={r.name} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <button onClick={() => toggleBookmark(r)}
                        className="absolute top-2.5 right-2.5 p-1.5 bg-surface/70 backdrop-blur-sm rounded-full hover:bg-surface hover:scale-110 transition-all cursor-pointer shadow-sm"
                        title={isBookmarked ? "Rimuovi" : "Aggiungi"}>
                        <Heart className={`w-3.5 h-3.5 transition-colors ${isBookmarked ? 'fill-red-500 text-red-500' : 'text-on-surface-variant'}`} />
                      </button>
                      <span className="absolute bottom-2 left-2.5 px-2 py-0.5 bg-surface/70 backdrop-blur-sm text-on-surface-variant font-label-sm text-label-sm rounded-full">
                        {r.vibe}
                      </span>
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-label-md text-label-md text-on-surface font-bold">{r.name}</h4>
                      <span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-variant text-on-surface-variant">{r.price}</span>
                    </div>
                    <p className="font-body-md text-[13px] text-on-surface-variant flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span>{r.zone} · {r.type}</span>
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                        <Car className="w-2.5 h-2.5" />
                        ~{getDriveTime(selectedBase, r.zone)} min
                      </span>
                    </p>
                    <p className="font-body-md text-[13px] text-on-surface-variant mb-2">{r.description}</p>
                    <p className="font-label-md text-label-md text-primary mb-2">🔥 {r.specialty}</p>
                    <div className="flex flex-wrap gap-1.5 font-label-sm text-label-sm mb-3">
                      <span className={`px-2 py-0.5 rounded ${r.reservation.includes('no') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {r.reservation.includes('no') ? 'Walk-in' : r.reservation}
                      </span>
                      <span className="px-2 py-0.5 bg-surface-variant text-on-surface-variant rounded">🕐 {r.bestTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <a href={r.mapLink} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-label-sm text-label-sm bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors">
                        <Map className="w-3.5 h-3.5" /> Maps
                      </a>
                      <a href={r.tripadvisorLink} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-label-sm text-label-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                        <Star className="w-3.5 h-3.5" /> TripAdvisor
                      </a>
                    </div>
                    {r.localTip && (
                      <p className="font-body-md text-[13px] text-primary italic border-t border-outline-variant/30 pt-2">💡 {r.localTip}</p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12 text-outline">
              <p className="font-body-md text-body-md">Nessun ristorante trovato per questa zona.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
