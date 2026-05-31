'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Clock, VenetianMask, DollarSign, MapPin, Map, Star, Heart, Car } from 'lucide-react'
import nightlife from '@/data/nightlife.json'
import { getDriveTime, getShortBaseName } from '@/app/utils/driveTimes'

const zones = ['Tutte', ...Array.from(new Set(nightlife.map((n: any) => n.zone))).sort()]

export default function Nightlife() {
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

  const toggleBookmark = (zone: any) => {
    const isBookmarked = bookmarks.some(b => b.id === zone.zone)
    let nextBookmarks
    if (isBookmarked) {
      nextBookmarks = bookmarks.filter(b => b.id !== zone.zone)
    } else {
      nextBookmarks = [...bookmarks, {
        id: zone.zone,
        name: zone.zone,
        type: 'nightlife',
        zone: zone.zone
      }]
    }
    setBookmarks(nextBookmarks)
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const nextState = { ...current, bookmarks: nextBookmarks }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
  }

  const filteredNightlife = useMemo(() => {
    let result = nightlife.filter((n: any) => {
      if (zoneFilter !== 'Tutte' && n.zone !== zoneFilter) return false
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
    <section id="nightlife" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Dopo il tramonto</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Vita notturna</h2>
        </motion.div>

        {/* Zone filter buttons */}
        <div className="glass p-3 rounded-2xl border border-terracotta-100/40 mb-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <span className="text-[10px] uppercase tracking-wider font-bold text-mare-400 ml-1">Filtra per zona:</span>
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
              <div className="flex gap-1.5 overflow-x-auto scrollbar-hide py-1.5 px-0.5 whitespace-nowrap snap-x">
                {zones.map((z) => (
                  <button
                    key={z}
                    onClick={() => setZoneFilter(z)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors duration-300 snap-center cursor-pointer ${
                      zoneFilter === z
                        ? 'text-white'
                        : 'text-mare-700/80 hover:text-terracotta-600 hover:bg-terracotta-50/50'
                    }`}
                  >
                    <span className="relative z-10">{z === 'Tutte' ? 'Tutte le zone' : z}</span>
                    {zoneFilter === z && (
                      <motion.span
                        layoutId="nightlifeZoneBg"
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

        <div className="space-y-4">
          {filteredNightlife.map((zone: any, i: number) => {
            const isBookmarked = bookmarks.some(b => b.id === zone.zone)
            return (
              <motion.div
                key={zone.zone}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-terracotta-100/40 card-hover"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-xl font-bold text-notte">{zone.zone}</h3>
                      <button
                        onClick={() => toggleBookmark(zone)}
                        className="p-1 text-mare-400 hover:text-red-500 hover:scale-115 transition-all cursor-pointer"
                        title={isBookmarked ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            isBookmarked ? 'fill-red-500 text-red-500' : 'text-mare-300'
                          }`}
                        />
                      </button>
                    </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs px-2 py-0.5 bg-terracotta-50 text-terracotta-600 rounded-full">
                      <Users className="w-3 h-3 inline mr-0.5" /> {zone.clientType.split(',')[0]}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-terracotta-50 text-terracotta-600 rounded-full">
                      <Clock className="w-3 h-3 inline mr-0.5" /> {zone.bestTime}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-terracotta-50 text-terracotta-600 rounded-full">
                      <VenetianMask className="w-3 h-3 inline mr-0.5" /> {zone.dressCode}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-terracotta-100/60 font-semibold text-terracotta-700 rounded-full inline-flex items-center gap-1">
                      <Car className="w-3 h-3" /> ~{getDriveTime(selectedBase, zone.zone)} min (da {getShortBaseName(selectedBase)})
                    </span>
                  </div>
                  <p className="text-sm text-mare-700/70 mb-3">{zone.vibe.charAt(0).toUpperCase() + zone.vibe.slice(1)}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {zone.venues.map((v: any) => (
                      <div key={v.name} className="flex flex-col gap-1 p-2 bg-terracotta-50/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-terracotta-600 shrink-0">{v.name}</span>
                          <span className="text-[10px] text-mare-500">{v.type}</span>
                          <span className="text-[10px] ml-auto font-medium text-mare-600">{v.price}</span>
                        </div>
                        <div className="flex gap-1.5">
                          <a
                            href={v.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                          >
                            <Map className="w-2.5 h-2.5" /> Maps
                          </a>
                          <a
                            href={v.tripadvisorLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          >
                            <Star className="w-2.5 h-2.5" /> TA
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-mare-700/50">
                    <MapPin className="w-3 h-3" /> {zone.start}
                    <span className="mx-1">→</span> {zone.continueTo}
                    <span className="mx-1 text-mare-300">|</span>
                    <a
                      href={zone.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                    >
                      <Map className="w-3 h-3" /> Maps
                    </a>
                    <a
                      href={zone.tripadvisorLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      <Star className="w-3 h-3" /> TA
                    </a>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center gap-3 sm:min-w-[100px]">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-mare-400" />
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                        <div key={n} className={`w-1.5 h-3 rounded-full ${
                          n <= Math.round(zone.socialEase) ? 'bg-terracotta-400' : 'bg-terracotta-200/30'
                        }`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-mare-400 uppercase tracking-wider">Social</span>
                  <div className="text-xs text-mare-500 bg-terracotta-50 px-2 py-1 rounded-lg w-full text-center">
                    <DollarSign className="w-3 h-3 inline" /> {zone.venues[0]?.price || '€€'}
                  </div>
                </div>
              </div>
              {zone.notes && (
                <div className="mt-3 pt-3 border-t border-terracotta-100/30">
                  <p className="text-xs text-mare-600/70 italic">💡 {zone.notes}</p>
                </div>
              )}
            </motion.div>
          )
        })}
          
          {filteredNightlife.length === 0 && (
            <div className="text-center py-12 text-mare-400">
              <p className="font-body">Nessuna zona nightlife trovata per questa selezione.</p>
            </div>
          )}
        </div>

        <div className="mt-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200/50">
          <h4 className="font-display text-lg font-semibold text-notte mb-2">🌙 Strategia nightlife consigliata</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-mare-700/80">
            <div className="p-3 bg-white/50 rounded-xl">
              <p className="font-medium text-terracotta-600 mb-1">2 sere a Marbella / Puerto Banús</p>
              <p className="text-sm text-mare-700/80">Per l&apos;esperienza luxury, vedere e farsi vedere, il lato patinato della Costa del Sol</p>
            </div>
            <div className="p-3 bg-white/50 rounded-xl">
              <p className="font-medium text-terracotta-600 mb-1">2 sere a Málaga</p>
              <p className="text-sm text-mare-700/80">Per socializzare davvero, gente autentica, locali veri, costi contenuti. La notte migliore per conoscere persone</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}