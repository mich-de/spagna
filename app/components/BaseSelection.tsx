'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, X as XIcon, Heart, MapPin, Car, Map, Waves, Utensils, Sparkles } from 'lucide-react'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import bases from '@/data/bases.json'
import recommendedBase from '@/data/recommended-base.json'
import beaches from '@/data/beaches.json'
import restaurants from '@/data/restaurants.json'
import experiences from '@/data/local-experiences.json'
import attractions from '@/data/attractions.json'
import { getDriveTime, getShortBaseName } from '@/app/utils/driveTimes'

const attributes = [
  { key: 'distance_airport_min', label: 'Distanza aeroporto', suffix: ' min', invert: true },
  { key: 'distance_marbella_min', label: 'Distanza Marbella', suffix: ' min', invert: true },
  { key: 'parking_ease', label: 'Parcheggio', suffix: '/10', max: 10 },
  { key: 'nightlife_level', label: 'Nightlife', suffix: '/10', max: 10 },
  { key: 'beach_quality', label: 'Spiagge', suffix: '/10', max: 10 },
  { key: 'authenticity', label: 'Autenticità', suffix: '/10', max: 10 },
  { key: 'social_ease', label: 'Socializzare', suffix: '/10', max: 10 },
]

function getColor(score: number, invert = false) {
  const val = invert ? 10 - score : score
  if (val >= 8) return 'bg-emerald-100 text-emerald-800 border-emerald-200'
  if (val >= 6) return 'bg-amber-100 text-amber-800 border-amber-200'
  if (val >= 4) return 'bg-orange-100 text-orange-800 border-orange-200'
  return 'bg-red-100 text-red-800 border-red-200'
}

export default function BaseSelection() {
  const sorted = [...bases].sort((a: any, b: any) => b.score - a.score)
  const tableRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [showCardsHint, setShowCardsHint] = useState(true)
  const [isCardsOverflowing, setIsCardsOverflowing] = useState(false)

  // Selected base state synced with localStorage/TripPlanner
  const [selectedBase, setSelectedBase] = useState<string>('')

  useEffect(() => {
    const stored = localStorage.getItem('sol_local_planner')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.selectedBase) setSelectedBase(data.selectedBase)
      } catch (e) {}
    }
  }, [])

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail && customEvent.detail.selectedBase !== undefined) {
        setSelectedBase(customEvent.detail.selectedBase)
      }
    }
    window.addEventListener('sol-local-planner-update', handleUpdate)
    return () => window.removeEventListener('sol-local-planner-update', handleUpdate)
  }, [])

  const handleSelectBase = (baseName: string) => {
    const newBase = selectedBase === baseName ? '' : baseName
    setSelectedBase(newBase)
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const nextState = { ...current, selectedBase: newBase }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
  }

  // Bookmarks state synced with planner
  const [bookmarks, setBookmarks] = useState<any[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('sol_local_planner')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.bookmarks) setBookmarks(data.bookmarks)
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
      }
    }
    window.addEventListener('sol-local-planner-update', handleUpdate)
    return () => window.removeEventListener('sol-local-planner-update', handleUpdate)
  }, [])

  interface InspirationItem {
    id: string
    name: string
    type: 'beach' | 'restaurant' | 'experience' | 'nightlife'
    description: string
    zone: string
    tip: string
    additionalInfo: string
    mapLink?: string
    tripadvisorLink?: string
  }

  const toggleBookmark = (item: InspirationItem) => {
    const isBookmarked = bookmarks.some(b => b.id === item.id)
    let nextBookmarks
    if (isBookmarked) {
      nextBookmarks = bookmarks.filter(b => b.id !== item.id)
    } else {
      nextBookmarks = [
        ...bookmarks,
        {
          id: item.id,
          name: item.name,
          type: item.type,
          zone: item.zone,
        },
      ]
    }
    setBookmarks(nextBookmarks)
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const nextState = { ...current, bookmarks: nextBookmarks }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
  }

  const getTypeMeta = (type: string) => {
    switch (type) {
      case 'beach':
        return { label: 'Spiaggia', icon: Waves, color: 'bg-sky-50 text-sky-600 border-sky-100' }
      case 'restaurant':
        return { label: 'Cibo & Drink', icon: Utensils, color: 'bg-amber-50 text-amber-600 border-amber-100' }
      case 'experience':
      default:
        return { label: 'Esperienza / Sguardo', icon: Sparkles, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' }
    }
  }

  const normalizedItems = useMemo(() => {
    const bItems: InspirationItem[] = beaches.map((b: any) => ({
      id: b.name,
      name: b.name,
      type: 'beach',
      description: b.description,
      zone: b.zone || 'Ovunque',
      tip: b.localTip || '',
      additionalInfo: `Best Time: ${b.bestTime} · Sabbia: ${b.sand}`,
      mapLink: b.mapLink,
      tripadvisorLink: b.tripadvisorLink,
    }))

    const rItems: InspirationItem[] = restaurants.map((r: any) => ({
      id: r.name,
      name: r.name,
      type: 'restaurant',
      description: r.description,
      zone: r.zone || 'Ovunque',
      tip: r.localTip || `Specialità: ${r.specialty}`,
      additionalInfo: `Prezzo: ${r.price} · Tipo: ${r.type}`,
      mapLink: r.mapLink,
      tripadvisorLink: r.tripadvisorLink,
    }))

    const eItems: InspirationItem[] = experiences.map((e: any) => ({
      id: e.title,
      name: e.title,
      type: 'experience',
      description: e.tip || 'Un\'esperienza autentica consigliata da locali.',
      zone: e.where || 'Ovunque',
      tip: e.when ? `Quando: ${e.when}` : '',
      additionalInfo: `Costo: ${e.cost}`,
      mapLink: e.mapLink,
      tripadvisorLink: e.tripadvisorLink,
    }))

    const aItems: InspirationItem[] = attractions.map((a: any) => ({
      id: a.name,
      name: a.name,
      type: 'experience',
      description: a.whyVisit,
      zone: a.zone || 'Ovunque',
      tip: a.pairWith ? `Abbina con: ${a.pairWith}` : '',
      additionalInfo: `Durata: ${a.duration} · Costo: ${a.cost}`,
      mapLink: a.mapLink,
    }))

    return {
      tutti: [...bItems, ...rItems, ...eItems, ...aItems],
    }
  }, [])

  const nearbySuggestions = useMemo(() => {
    const all = normalizedItems.tutti
    const localized = all.filter((item, index, self) => 
      (!item.zone || !item.zone.toLowerCase().includes('ovunque')) &&
      self.findIndex(t => t.name === item.name) === index
    )

    const sorted = [...localized].sort((a, b) => {
      const timeA = getDriveTime(selectedBase, a.zone)
      const timeB = getDriveTime(selectedBase, b.zone)
      return timeA - timeB
    })

    const selected: InspirationItem[] = []
    const types = ['beach', 'restaurant', 'experience'] as const

    types.forEach(t => {
      const match = sorted.find(item => item.type === t && !selected.some(s => s.name === item.name))
      if (match) selected.push(match)
    })

    for (const item of sorted) {
      if (selected.length >= 10) break
      if (!selected.some(s => s.name === item.name)) {
        selected.push(item)
      }
    }

    return selected.sort((a, b) => {
      const timeA = getDriveTime(selectedBase, a.zone)
      const timeB = getDriveTime(selectedBase, b.zone)
      return timeA - timeB
    })
  }, [normalizedItems, selectedBase])

  const checkOverflow = useCallback(() => {
    const el = tableRef.current
    if (!el) return
    setIsOverflowing(el.scrollWidth > el.clientWidth + 4)
  }, [])

  const checkCardsOverflow = useCallback(() => {
    const el = cardsRef.current
    if (!el) return
    setIsCardsOverflowing(el.scrollWidth > el.clientWidth + 4)
  }, [])

  useEffect(() => {
    const el = tableRef.current
    if (!el) return
    checkOverflow()
    const onScroll = () => {
      if (el.scrollLeft > 10) setShowScrollHint(false)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', checkOverflow)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', checkOverflow)
    }
  }, [checkOverflow])

  useEffect(() => {
    const el = cardsRef.current
    if (!el) return
    checkCardsOverflow()
    const onScroll = () => {
      if (el.scrollLeft > 10) setShowCardsHint(false)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', checkCardsOverflow)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', checkCardsOverflow)
    }
  }, [checkCardsOverflow])

  return (
    <section id="base" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Analisi strategica</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Scelta della base</h2>
        </motion.div>

        <div className="relative">
          <div
            ref={tableRef}
            className="overflow-x-auto -mx-4 sm:mx-0"
          >
          <div className="inline-block min-w-full px-4 sm:px-0">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-mare-700/50 uppercase tracking-wider">Attributo</th>
                  {sorted.map((b) => (
                    <th
                      key={b.name}
                      className={`py-3 px-4 text-center rounded-t-xl transition-colors duration-300 ${
                        selectedBase === b.name ? 'bg-emerald-500/10 border-t border-x border-emerald-500/30' : ''
                      }`}
                    >
                      <span className="font-display text-lg font-semibold text-notte">{b.name}</span>
                      {recommendedBase.winner === b.name && (
                        <span className="ml-1 text-xs text-terracotta-500" title="Consigliata da noi">🏆</span>
                      )}
                      {selectedBase === b.name && (
                        <span className="ml-1 text-xs text-emerald-600 font-bold" title="La tua scelta"> (Tu)</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr) => (
                  <tr key={attr.key} className="border-t border-terracotta-100/30">
                    <td className="py-3 px-4 text-sm text-mare-700/70">{attr.label}</td>
                    {sorted.map((b) => {
                      const val = (b as any)[attr.key]
                      const display = attr.max ? `${val}${attr.suffix}` : `${val}${attr.suffix}`
                      return (
                        <td
                          key={b.name}
                          className={`py-3 px-4 text-center transition-colors duration-300 ${
                            selectedBase === b.name ? 'bg-emerald-500/5 border-x border-emerald-500/20' : ''
                          }`}
                        >
                          <span className={`inline-block px-2.5 py-1 rounded-lg text-sm font-medium border ${getColor(val, attr.invert)}`}>
                            {display}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                ))}
                <tr className="border-t-2 border-terracotta-200">
                  <td className="py-4 px-4 text-sm font-semibold text-notte">Punteggio finale</td>
                  {sorted.map((b) => (
                    <td
                      key={b.name}
                      className={`py-4 px-4 text-center rounded-b-xl transition-colors duration-300 ${
                        selectedBase === b.name ? 'bg-emerald-500/10 border-b border-x border-emerald-500/30' : ''
                      }`}
                    >
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold ${
                        b.score >= 9 ? 'bg-emerald-100 text-emerald-800' :
                        b.score >= 8 ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {b.score}/10
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <AnimatePresence>
          {showScrollHint && isOverflowing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-sabbia via-sabbia/90 to-transparent flex items-center justify-end pr-3 pointer-events-none md:hidden"
            >
              <div className="flex items-center gap-0.5">
                {[0, 0.15, 0.3].map((d) => (
                  <motion.div
                    key={d}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: d, ease: 'easeInOut' }}
                  >
                    <ChevronRight className="w-4 h-4 text-terracotta-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

        <div className="relative">
          <div ref={cardsRef} className="flex md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible gap-4 pt-2 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 mt-8">
            {sorted.map((base, i) => {
              const isSelected = selectedBase === base.name
              return (
                <motion.div
                  key={base.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl p-5 border card-shadow card-hover w-[290px] xs:w-[325px] md:w-auto shrink-0 snap-center flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-emerald-50 to-crema border-emerald-400 ring-2 ring-emerald-400/25'
                      : recommendedBase.winner === base.name
                        ? 'bg-gradient-to-br from-terracotta-50 to-crema border-terracotta-200'
                        : 'bg-white/70 border-terracotta-100/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-display text-lg font-semibold text-notte">{base.name}</h3>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-wider">
                            La tua base
                          </span>
                        )}
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        base.score >= 9 ? 'bg-emerald-100 text-emerald-800' :
                        base.score >= 8 ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {base.score}/10
                      </span>
                    </div>
                    <p className="text-xs text-mare-700/50 uppercase tracking-wider mb-2">{base.cost_level}</p>
                    <div className="space-y-1.5 mb-3">
                      {base.pros.map((p: string) => (
                        <p key={p} className="text-xs text-mare-700/70 flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                          {p}
                        </p>
                      ))}
                      {base.cons.map((c: string) => (
                        <p key={c} className="text-xs text-mare-700/50 flex items-start gap-1.5">
                          <XIcon className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />
                          {c}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  {/* Select Base Button */}
                  <button
                    onClick={() => handleSelectBase(base.name)}
                    className={`w-full py-2.5 mt-4 rounded-xl text-xs font-bold transition-all border duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700 shadow-md shadow-emerald-600/10'
                        : 'bg-white text-mare-700 hover:bg-terracotta-50 border-terracotta-100/60 hover:text-terracotta-600 hover:border-terracotta-200'
                    }`}
                  >
                    {isSelected ? '✓ Base Selezionata' : 'Imposta come Base'}
                  </button>
                </motion.div>
              )
            })}
          </div>

          <AnimatePresence>
            {showCardsHint && isCardsOverflowing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-sabbia via-sabbia/90 to-transparent flex items-center justify-end pr-3 pointer-events-none md:hidden"
              >
                <div className="flex items-center gap-0.5">
                  {[0, 0.15, 0.3].map((d) => (
                    <motion.div
                      key={d}
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: d, ease: 'easeInOut' }}
                    >
                      <ChevronRight className="w-4 h-4 text-terracotta-400" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── SUGGESTIONS BY SELECTED BASE ─── */}
        {selectedBase && (
          <div className="mt-16 pt-8 border-t border-terracotta-100/50">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-terracotta-500 to-oro flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-notte">Idee Consigliate vicino a te</h3>
                <p className="text-xs text-mare-400">Le 10 cose più vicine a {selectedBase} (ordinate per tempo di guida ⏱)</p>
              </div>
            </div>

            <div className="flex sm:grid sm:grid-cols-5 overflow-x-auto sm:overflow-visible gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {nearbySuggestions.map((item, i) => {
                const meta = getTypeMeta(item.type)
                const isSaved = bookmarks.some(b => b.id === item.id)
                const driveTime = getDriveTime(selectedBase, item.zone)
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-terracotta-100/30 card-shadow card-hover w-[240px] sm:w-auto shrink-0 snap-center flex flex-col justify-between"
                  >
                    <div>
                      {/* Header: Type icon & Heart */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border flex items-center gap-1 ${meta.color}`}>
                          <meta.icon className="w-2.5 h-2.5" />
                          {meta.label}
                        </span>
                        <button
                          onClick={() => toggleBookmark(item)}
                          className="p-1 text-mare-400 hover:text-red-500 transition-colors cursor-pointer"
                          title={isSaved ? "Rimuovi" : "Salva"}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-mare-300'}`} />
                        </button>
                      </div>

                      <h4 className="font-display font-bold text-sm text-notte line-clamp-1 mb-1" title={item.name}>
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-mare-700/60 line-clamp-2 min-h-[30px] mb-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-terracotta-50/50">
                      {/* Drive time & Zone */}
                      <div className="flex items-center justify-between text-[9px] text-mare-400">
                        <span className="truncate">📍 {item.zone}</span>
                        <span className="font-semibold text-terracotta-600 flex items-center gap-0.5 shrink-0">
                          <Car className="w-3 h-3 text-terracotta-500" />
                          ~{driveTime} min
                        </span>
                      </div>

                      {/* Google Maps link */}
                      {item.mapLink && (
                        <a
                          href={item.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-1 text-center rounded-lg text-[9px] font-semibold bg-sabbia text-mare-750 hover:bg-terracotta-50 transition-colors border border-terracotta-100/30 flex items-center justify-center gap-1"
                        >
                          <Map className="w-2.5 h-2.5" />
                          Vedi Mappa
                        </a>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
