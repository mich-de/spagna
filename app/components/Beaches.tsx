'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Waves, Car, Clock, Map, Star, Heart, X } from 'lucide-react'
import beaches from '@/data/beaches.json'
import { getDriveTime, getShortBaseName } from '@/app/utils/driveTimes'

const zones = ['Tutte', ...Array.from(new Set(beaches.map((b: any) => b.zone))).sort()]
const atmospheres = ['Tutte', ...Array.from(new Set(beaches.map((b: any) => b.atmosphere))).sort()]

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

const atmosIcons: Record<string, string> = {
  'Tutte': '🌊',
  'Attrezzata': '🏖️',
  'Rilassata': '🧘',
  'Selvaggia': '🌿',
  'Popolare': '👥',
  'Snorkeling': '🤿'
}

export default function Beaches() {
  const [search, setSearch] = useState('')
  const [zoneFilter, setZoneFilter] = useState('Tutte')
  const [atmosFilter, setAtmosFilter] = useState('Tutte')
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

  const toggleBookmark = (beach: any) => {
    const isBookmarked = bookmarks.some(b => b.id === beach.name)
    let nextBookmarks
    if (isBookmarked) {
      nextBookmarks = bookmarks.filter(b => b.id !== beach.name)
    } else {
      nextBookmarks = [...bookmarks, {
        id: beach.name,
        name: beach.name,
        type: 'beach',
        zone: beach.zone
      }]
    }
    setBookmarks(nextBookmarks)
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const nextState = { ...current, bookmarks: nextBookmarks }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
  }

  const filtered = useMemo(() => {
    let result = beaches.filter((b: any) => {
      if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.zone.toLowerCase().includes(search.toLowerCase())) return false
      if (zoneFilter !== 'Tutte' && b.zone !== zoneFilter) return false
      if (atmosFilter !== 'Tutte' && b.atmosphere !== atmosFilter) return false
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
  }, [search, zoneFilter, atmosFilter, sortByDriveTime, selectedBase])

  return (
    <section id="beaches" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-terracotta-500 mb-2">
            <Waves className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-[0.3em]">Costa del Sol</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-notte leading-tight">
            Spiagge <span className="italic font-medium text-terracotta-500">Consigliate</span>
          </h2>
          <p className="text-mare-700/70 mt-3 max-w-3xl text-base sm:text-lg font-body leading-relaxed">
            Una selezione curata dei litorali più iconici, dalle calette selvagge di <span className="text-terracotta-400 font-semibold">Maro</span> alle spiagge esclusive di <span className="text-terracotta-400 font-semibold">Marbella</span>.
          </p>
        </motion.div>

        {/* FILTER BAR — responsive container */}
        <div className="glass flex flex-col gap-4 mb-8 p-4 rounded-2xl border border-terracotta-100/40">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mare-400" />
              <input
                type="text"
                placeholder="Cerca spiaggia o zona..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-white/80 border border-terracotta-100/50 text-sm text-notte placeholder:text-mare-300 focus:outline-none focus:ring-2 focus:ring-terracotta-300/50 transition-all focus:bg-white"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-mare-400 hover:text-terracotta-600 hover:bg-terracotta-50 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setSortByDriveTime(!sortByDriveTime)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
                sortByDriveTime
                  ? 'bg-terracotta-500 text-white border-terracotta-500 shadow-md shadow-terracotta-500/25'
                  : 'bg-white/80 text-mare-750 border-terracotta-100/50 hover:bg-terracotta-50 hover:text-terracotta-600'
              }`}
            >
              <Car className="w-4 h-4 shrink-0" />
              {sortByDriveTime ? 'Ordinato per vicinanza (⏱)' : 'Ordina per vicinanza (⏱)'}
            </button>
          </div>

          <div className="space-y-5">
            {/* Zona filter */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-mare-600 ml-1 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
                <span>Filtra per zona</span>
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
                          layoutId="beachZoneBg"
                          className="absolute inset-0 bg-gradient-to-r from-terracotta-500 to-terracotta-600 rounded-xl shadow-sm shadow-terracotta-500/25 border border-terracotta-400/20"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Atmosfera filter */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-mare-600 ml-1 uppercase tracking-wider">
                <Waves className="w-3.5 h-3.5 text-terracotta-500" />
                <span>Filtra per atmosfera</span>
              </div>
              <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-sabbia to-transparent pointer-events-none z-10 sm:hidden" />
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-sabbia to-transparent pointer-events-none z-10 sm:hidden" />
                <div className="flex flex-row flex-nowrap sm:flex-wrap gap-1.5 overflow-x-auto sm:overflow-x-visible whitespace-nowrap sm:whitespace-normal scrollbar-hide py-1.5 px-0.5 snap-x sm:snap-none">
                  {atmospheres.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAtmosFilter(a)}
                      className={`relative px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all snap-center cursor-pointer ${
                        atmosFilter === a
                          ? 'text-white font-bold'
                          : 'text-mare-750/90 hover:text-terracotta-600 bg-white border border-terracotta-100/40 hover:border-terracotta-200 shadow-sm hover:scale-102'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        <span>{atmosIcons[a] || '✨'}</span>
                        <span>{a === 'Tutte' ? 'Tutte atmosfere' : a}</span>
                      </span>
                      {atmosFilter === a && (
                        <motion.span
                          layoutId="beachAtmosBg"
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
          {filtered.map((beach: any, i: number) => {
            const isBookmarked = bookmarks.some(b => b.id === beach.name)
            return (
              <motion.div
                key={beach.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-terracotta-100/40 card-shadow card-hover w-[290px] xs:w-[325px] sm:w-auto shrink-0 snap-center"
              >
                <div className="relative w-full aspect-[16/9] -mx-5 -mt-5 mb-3 overflow-hidden rounded-t-2xl">
                  <img
                    src={beach.imageUrl}
                    alt={beach.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <button
                    onClick={() => toggleBookmark(beach)}
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
                    {beach.atmosphere}
                  </span>
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-lg font-bold text-notte">{beach.name}</h3>
                </div>
              <p className="text-xs text-mare-700/50 mb-2">{beach.description}</p>
              <div className="space-y-1.5 mb-3">
                <p className="text-xs text-mare-700/60 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-terracotta-400" />
                  {beach.zone}
                </p>
                <p className="text-xs text-mare-700/60 flex items-center gap-1.5">
                  <Car className="w-3 h-3 text-terracotta-400" />
                  {beach.parking}
                </p>
                <p className="text-xs font-semibold text-terracotta-600 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-terracotta-500" />
                  Percorrenza: ~{getDriveTime(selectedBase, beach.zone)} min (da {getShortBaseName(selectedBase)})
                </p>
                <p className="text-xs text-mare-700/60 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-terracotta-400" />
                  Miglior momento: {beach.bestTime}
                </p>
                <p className="text-xs text-mare-700/60 flex items-center gap-1.5">
                  <Waves className="w-3 h-3 text-terracotta-400" />
                  {beach.sand}{beach.chiringuitos ? ' · Chiringuiti ✅' : ''}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <a
                  href={beach.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge-pill hover:bg-terracotta-500 hover:text-white hover:border-terracotta-500 transition-all duration-200"
                >
                  <Map className="w-3.5 h-3.5" />
                  Maps
                </a>
                <a
                  href={beach.tripadvisorLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge-pill hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-200"
                >
                  <Star className="w-3.5 h-3.5" />
                  TripAdvisor
                </a>
              </div>
              {beach.localTip && (
                <div className="p-2.5 bg-gradient-to-r from-terracotta-50 to-crema/50 rounded-lg">
                  <p className="text-xs text-mare-700/80">
                    <span className="font-medium text-terracotta-600">💡 </span>
                    {beach.localTip}
                  </p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-mare-400">
            <Waves className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p className="font-body">Nessuna spiaggia trovata. Prova altri filtri.</p>
          </div>
        )}
      </div>
    </section>
  )
}