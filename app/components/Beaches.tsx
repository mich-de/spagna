'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Waves, Car, Clock, Map, Star, Heart, X } from 'lucide-react'
import beaches from '@/data/beaches.json'
import { getDriveTime, getShortBaseName } from '@/app/utils/driveTimes'

const zones = ['Tutte', ...Array.from(new Set(beaches.map((b: any) => b.zone))).sort()]
const atmospheres = ['Tutte', ...Array.from(new Set(beaches.map((b: any) => b.atmosphere))).sort()]
const nerjaFallbackImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Burriana_%286861858288%29.jpg/1280px-Burriana_%286861858288%29.jpg'

export default function Beaches() {
  const [search, setSearch] = useState('')
  const [zoneFilter, setZoneFilter] = useState('Tutte')
  const [atmosFilter, setAtmosFilter] = useState('Tutte')
  const [sortByDriveTime, setSortByDriveTime] = useState(false)
  const [balconFilter, setBalconFilter] = useState(false)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [selectedBase, setSelectedBase] = useState<string>('Nerja')

  const BALCON_BEACHES = ['Balcón de Europa', 'Playa de Calahonda', 'Playa de la Caletilla', 'Playa del Salón', 'Cale di El Chorrillo']

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
        if (customEvent.detail.bookmarks !== undefined) setBookmarks(customEvent.detail.bookmarks)
        if (customEvent.detail.selectedBase !== undefined) setSelectedBase(customEvent.detail.selectedBase || "Nerja")
      }
    }
    window.addEventListener('sol-local-planner-update', handleUpdate)
    return () => window.removeEventListener('sol-local-planner-update', handleUpdate)
  }, [])

  const toggleBookmark = (beach: any) => {
    const isBookmarked = bookmarks.some(b => b.id === beach.name)
    const nextBookmarks = isBookmarked
      ? bookmarks.filter(b => b.id !== beach.name)
      : [...bookmarks, { id: beach.name, name: beach.name, type: 'beach', zone: beach.zone }]
    setBookmarks(nextBookmarks)
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const nextState = { ...current, bookmarks: nextBookmarks }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
  }

  const filtered = useMemo(() => {
    let result = beaches.filter((b: any) => {
      if (balconFilter && !BALCON_BEACHES.includes(b.name)) return false
      if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.zone.toLowerCase().includes(search.toLowerCase())) return false
      if (zoneFilter !== 'Tutte' && b.zone !== zoneFilter) return false
      if (atmosFilter !== 'Tutte' && b.atmosphere !== atmosFilter) return false
      return true
    })
    if (sortByDriveTime) {
      result = [...result].sort((a: any, b: any) => {
        return getDriveTime(selectedBase, a.zone) - getDriveTime(selectedBase, b.zone)
      })
    }
    return result
  }, [search, zoneFilter, atmosFilter, sortByDriveTime, selectedBase, balconFilter, BALCON_BEACHES])

  return (
    <section id="beaches" className="scroll-mt-20 px-container-margin md:px-lg pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Waves className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Costa del Sol</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Spiagge Consigliate</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-3xl">Una selezione curata dei litorali più iconici, dalle calette selvagge di Maro alle spiagge esclusive di Marbella.</p>
        </motion.div>

        <div className="glass-panel rounded-xl card-hover p-4 mb-8 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] border border-outline-variant/30">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input type="text" placeholder="Cerca spiaggia o zona..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-outline hover:text-primary hover:bg-surface-variant rounded-lg transition-colors active:scale-95 transition-transform">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => { setBalconFilter(!balconFilter); setZoneFilter('Tutte'); setAtmosFilter('Tutte'); setSearch('') }}
                className={`px-4 py-2.5 rounded-lg font-label-sm text-label-sm transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
                  balconFilter
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/50 hover:border-amber-400/60'
                }`}>
                <span className="text-base leading-none">🏛️</span>
                Balcón de Europa
              </button>
              <button onClick={() => setSortByDriveTime(!sortByDriveTime)}
                className={`px-4 py-2.5 rounded-lg font-label-sm text-label-sm transition-all border flex items-center justify-center gap-2 cursor-pointer ${
                  sortByDriveTime
                    ? 'bg-secondary text-on-secondary border-secondary shadow-sm'
                    : 'border border-outline-variant text-on-surface-variant hover:border-tertiary transition-colors'
                }`}>
                <Car className="w-4 h-4" />
                {sortByDriveTime ? 'Ordinato per vicinanza' : 'Ordina per vicinanza'}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant mb-2 block">Zona</span>
              <div className="flex flex-wrap gap-1.5">
                {zones.map((z) => (
                  <button key={z} onClick={() => setZoneFilter(z)}
                    className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all active:scale-95 ${
                      zoneFilter === z
                        ? 'bg-secondary text-on-secondary shadow-sm'
                        : 'border border-outline-variant text-on-surface-variant hover:border-tertiary transition-colors'
                    }`}>
                    {z}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant mb-2 block">Atmosfera</span>
              <div className="flex flex-wrap gap-1.5">
                {atmospheres.map((a) => (
                  <button key={a} onClick={() => setAtmosFilter(a)}
                    className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all active:scale-95 ${
                      atmosFilter === a
                        ? 'bg-secondary text-on-secondary shadow-sm'
                        : 'border border-outline-variant text-on-surface-variant hover:border-tertiary transition-colors'
                    }`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((beach: any, i: number) => {
            const isBookmarked = bookmarks.some(b => b.id === beach.name)
            return (
              <motion.div key={beach.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-surface-container-lowest rounded-xl overflow-hidden card-hover shadow-[0px_4px_12px_rgba(30,58,95,0.08)] hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] transition-all duration-200 hover:scale-[0.98] border border-outline-variant/30 flex flex-col"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  {beach.imageUrl ? (
                    <img src={beach.imageUrl} alt={beach.name} className="w-full h-full object-cover scale-hover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full relative">
                      <img src={nerjaFallbackImage} alt={`${beach.name} Nerja`} className="w-full h-full object-cover scale-hover" loading="lazy" />
                      <div className="absolute inset-0 bg-[rgba(34,26,15,0.2)]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Waves className="w-12 h-12 text-on-surface/40" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <button onClick={() => toggleBookmark(beach)}
                    className="absolute top-2.5 right-2.5 p-1.5 bg-surface/70 backdrop-blur-sm rounded-full hover:bg-surface hover:scale-110 transition-all cursor-pointer shadow-sm active:scale-95"
                    title={isBookmarked ? "Rimuovi" : "Aggiungi"}>
                    <Heart className={`w-3.5 h-3.5 transition-colors ${isBookmarked ? 'fill-red-500 text-red-500' : 'text-on-surface-variant'}`} />
                  </button>
                  <span className="absolute bottom-2 left-2.5 px-2 py-0.5 bg-surface/70 backdrop-blur-sm text-on-surface-variant font-label-sm text-label-sm rounded-full">
                    {beach.atmosphere}
                  </span>
                </div>
                <div className="p-sm flex flex-col flex-1">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">{beach.name}</h3>
                  <p className="font-body-md text-[14px] text-on-surface-variant mb-3">{beach.description}</p>
                  <div className="space-y-1.5 font-body-md text-[13px] text-on-surface-variant mb-3">
                    <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-outline" />{beach.zone}</p>
                    <p className="flex items-center gap-1.5"><Car className="w-3.5 h-3.5 text-outline" />{beach.parking}</p>
                    <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" />Percorrenza: ~{getDriveTime(selectedBase, beach.zone)} min (da {getShortBaseName(selectedBase)})</p>
                    <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-outline" />Miglior momento: {beach.bestTime}</p>
                    <p className="flex items-center gap-1.5"><Waves className="w-3.5 h-3.5 text-outline" />{beach.sand}{beach.chiringuitos ? ' · Chiringuiti ✅' : ''}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <a href={beach.mapLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm hover:bg-primary hover:text-on-primary transition-all">
                      <Map className="w-3.5 h-3.5" /> Maps
                    </a>
                    <a href={beach.tripadvisorLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm hover:bg-emerald-600 hover:text-white transition-all">
                      <Star className="w-3.5 h-3.5" /> TripAdvisor
                    </a>
                  </div>
                  {beach.localTip && (
                    <div className="mt-auto pt-3 border-t border-outline-variant/30">
                      <p className="font-body-md text-[13px] text-on-surface-variant italic">
                        <span className="font-bold text-primary not-italic uppercase text-[10px] tracking-wider mr-1">Tip:</span>
                        {beach.localTip}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-outline">
            <Waves className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p className="font-body-md text-body-md">Nessuna spiaggia trovata. Prova altri filtri.</p>
          </div>
        )}
      </div>
    </section>
  )
}
