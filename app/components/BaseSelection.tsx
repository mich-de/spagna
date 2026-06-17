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
  { key: 'distance_nerja_min', label: 'Distanza da Nerja', suffix: ' min', invert: true },
  { key: 'distance_marbella_min', label: 'Distanza Marbella', suffix: ' min', invert: true },
  { key: 'cost_score', label: 'Costi', suffix: '/10', invert: true },
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
  const [selectedBase, setSelectedBase] = useState<string>('Nerja')

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
    id: string; name: string; type: 'beach' | 'restaurant' | 'experience' | 'nightlife'
    description: string; zone: string; tip: string; additionalInfo: string
    mapLink?: string; tripadvisorLink?: string
  }

  const toggleBookmark = (item: InspirationItem) => {
    const isBookmarked = bookmarks.some(b => b.id === item.id)
    const nextBookmarks = isBookmarked
      ? bookmarks.filter(b => b.id !== item.id)
      : [...bookmarks, { id: item.id, name: item.name, type: item.type, zone: item.zone }]
    setBookmarks(nextBookmarks)
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const nextState = { ...current, bookmarks: nextBookmarks }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
  }

  const getTypeMeta = (type: string) => {
    switch (type) {
      case 'beach': return { label: 'Spiaggia', icon: Waves, color: 'bg-sky-50 text-sky-600 border-sky-100' }
      case 'restaurant': return { label: 'Cibo & Drink', icon: Utensils, color: 'bg-amber-50 text-amber-600 border-amber-100' }
      case 'experience': default: return { label: 'Esperienza / Sguardo', icon: Sparkles, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' }
    }
  }

  const normalizedItems = useMemo(() => {
    const bItems: InspirationItem[] = beaches.map((b: any) => ({
      id: b.name, name: b.name, type: 'beach', description: b.description, zone: b.zone || 'Ovunque', tip: b.localTip || '',
      additionalInfo: `Best Time: ${b.bestTime} · Sabbia: ${b.sand}`, mapLink: b.mapLink, tripadvisorLink: b.tripadvisorLink,
    }))
    const rItems: InspirationItem[] = restaurants.map((r: any) => ({
      id: r.name, name: r.name, type: 'restaurant', description: r.description, zone: r.zone || 'Ovunque',
      tip: r.localTip || `Specialità: ${r.specialty}`, additionalInfo: `Prezzo: ${r.price} · Tipo: ${r.type}`,
      mapLink: r.mapLink, tripadvisorLink: r.tripadvisorLink,
    }))
    const eItems: InspirationItem[] = experiences.map((e: any) => ({
      id: e.title, name: e.title, type: 'experience', description: e.tip || "Un'esperienza autentica consigliata da locali.",
      zone: e.where || 'Ovunque', tip: e.when ? `Quando: ${e.when}` : '', additionalInfo: `Costo: ${e.cost}`,
      mapLink: e.mapLink, tripadvisorLink: e.tripadvisorLink,
    }))
    const aItems: InspirationItem[] = attractions.map((a: any) => ({
      id: a.name, name: a.name, type: 'experience', description: a.whyVisit, zone: a.zone || 'Ovunque',
      tip: a.pairWith ? `Abbina con: ${a.pairWith}` : '', additionalInfo: `Durata: ${a.duration} · Costo: ${a.cost}`, mapLink: a.mapLink,
    }))
    return { tutti: [...bItems, ...rItems, ...eItems, ...aItems] }
  }, [])

  const nearbySuggestions = useMemo(() => {
    const all = normalizedItems.tutti
    const localized = all.filter((item, index, self) =>
      (!item.zone || !item.zone.toLowerCase().includes('ovunque')) && self.findIndex(t => t.name === item.name) === index)
    const sorted = [...localized].sort((a, b) => getDriveTime(selectedBase, a.zone) - getDriveTime(selectedBase, b.zone))
    const selected: InspirationItem[] = []
    const types = ['beach', 'restaurant', 'experience'] as const
    types.forEach(t => { const match = sorted.find(item => item.type === t && !selected.some(s => s.name === item.name)); if (match) selected.push(match) })
    for (const item of sorted) { if (selected.length >= 10) break; if (!selected.some(s => s.name === item.name)) selected.push(item) }
    return selected.sort((a, b) => getDriveTime(selectedBase, a.zone) - getDriveTime(selectedBase, b.zone))
  }, [normalizedItems, selectedBase])

  const checkOverflow = useCallback(() => {
    const el = tableRef.current; if (!el) return; setIsOverflowing(el.scrollWidth > el.clientWidth + 4)
  }, [])
  const checkCardsOverflow = useCallback(() => {
    const el = cardsRef.current; if (!el) return; setIsCardsOverflowing(el.scrollWidth > el.clientWidth + 4)
  }, [])

  useEffect(() => {
    const el = tableRef.current; if (!el) return; checkOverflow()
    const onScroll = () => { if (el.scrollLeft > 10) setShowScrollHint(false) }
    el.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', checkOverflow)
    return () => { el.removeEventListener('scroll', onScroll); window.removeEventListener('resize', checkOverflow) }
  }, [checkOverflow])

  useEffect(() => {
    const el = cardsRef.current; if (!el) return; checkCardsOverflow()
    const onScroll = () => { if (el.scrollLeft > 10) setShowCardsHint(false) }
    el.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', checkCardsOverflow)
    return () => { el.removeEventListener('scroll', onScroll); window.removeEventListener('resize', checkCardsOverflow) }
  }, [checkCardsOverflow])

  return (
    <section id="base" className="scroll-mt-20 px-container-margin md:px-lg pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <MapPin className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Analisi Strategica</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Scelta della Base Operativa</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-3xl">Dove alloggiare per ottimizzare spostamenti e atmosfera? Un confronto analitico tra le perle della costa per trovare il tuo punto di partenza ideale.</p>
        </motion.div>

        <div className="relative">
          <div ref={tableRef} className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full px-4 sm:px-0">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Attributo</th>
                    {sorted.map((b) => (
                      <th key={b.name}
                        className={`py-3 px-4 text-center rounded-t-xl transition-colors duration-300 ${
                          selectedBase === b.name ? 'bg-primary/10 border-t border-x border-primary/30' : ''
                        }`}>
                        <span className="font-label-md text-label-md text-on-surface font-bold">{b.name}</span>
                        {recommendedBase.winner === b.name && <span className="ml-1 text-xs" title="Consigliata da noi">🏆</span>}
                        {selectedBase === b.name && <span className="ml-1 font-label-sm text-label-sm text-primary font-bold" title="La tua scelta"> (Tu)</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attributes.map((attr) => (
                    <tr key={attr.key} className="border-t border-outline-variant/30">
                      <td className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant">{attr.label}</td>
                      {sorted.map((b) => {
                        const val = (b as any)[attr.key]
                        const display = attr.max ? `${val}${attr.suffix}` : `${val}${attr.suffix}`
                        return (
                          <td key={b.name}
                            className={`py-3 px-4 text-center transition-colors duration-300 ${
                              selectedBase === b.name ? 'bg-primary/5 border-x border-primary/20' : ''
                            }`}>
                            <span className={`inline-block px-2.5 py-1 rounded-lg font-label-sm text-label-sm font-medium border ${getColor(val, attr.invert)}`}>{display}</span>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                  <tr className="border-t-2 border-outline-variant">
                    <td className="py-4 px-4 font-label-md text-label-md text-on-surface font-bold">Punteggio finale</td>
                    {sorted.map((b) => (
                      <td key={b.name}
                        className={`py-4 px-4 text-center rounded-b-xl transition-colors duration-300 ${
                          selectedBase === b.name ? 'bg-primary/10 border-b border-x border-primary/30' : ''
                        }`}>
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold ${
                          b.score >= 9 ? 'bg-emerald-100 text-emerald-800' :
                          b.score >= 8 ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>{b.score}/10</span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <AnimatePresence>
            {showScrollHint && isOverflowing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-surface-container-lowest via-surface-container-lowest/90 to-transparent flex items-center justify-end pr-3 pointer-events-none md:hidden">
                <div className="flex items-center gap-0.5">
                  {[0, 0.15, 0.3].map((d) => (
                    <motion.div key={d} animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: d, ease: 'easeInOut' }}>
                      <ChevronRight className="w-4 h-4 text-outline" />
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
                <motion.div key={base.name}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl p-5 border shadow-[0px_4px_12px_rgba(30,58,95,0.08)] hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] hover:scale-[0.98] transition-all duration-200 w-[290px] xs:w-[325px] md:w-auto shrink-0 snap-center flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-primary/10 to-surface-container-lowest border-primary ring-2 ring-primary/25'
                      : recommendedBase.winner === base.name
                        ? 'bg-gradient-to-br from-surface-variant to-surface-container-lowest border-outline-variant'
                        : 'bg-surface-container-lowest border-outline-variant/30'
                  }`}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-label-md text-label-md text-on-surface font-bold">{base.name}</h3>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold uppercase tracking-wider">La tua base</span>
                        )}
                      </div>
                      <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${
                        base.score >= 9 ? 'bg-emerald-100 text-emerald-800' :
                        base.score >= 8 ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>{base.score}/10</span>
                    </div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">{base.cost_level}</p>
                    <div className="space-y-1.5 mb-3">
                      {base.pros.map((p: string) => (
                        <p key={p} className="font-body-md text-[13px] text-on-surface-variant flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-tertiary mt-0.5 shrink-0" />{p}
                        </p>
                      ))}
                      {base.cons.map((c: string) => (
                        <p key={c} className="font-body-md text-[13px] text-on-surface-variant/70 flex items-start gap-1.5">
                          <XIcon className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />{c}
                        </p>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => handleSelectBase(base.name)}
                    className={`w-full py-2.5 mt-4 rounded-xl font-label-sm text-label-sm font-bold transition-all border duration-300 ${
                      isSelected
                        ? 'bg-primary text-on-primary border-primary hover:bg-primary/90 shadow-md shadow-primary/10'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-variant border-outline-variant/30 hover:border-primary/50'
                    }`}>
                    {isSelected ? '✓ Base Selezionata' : 'Imposta come Base'}
                  </button>
                </motion.div>
              )
            })}
          </div>

          <AnimatePresence>
            {showCardsHint && isCardsOverflowing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-surface-container-lowest via-surface-container-lowest/90 to-transparent flex items-center justify-end pr-3 pointer-events-none md:hidden">
                <div className="flex items-center gap-0.5">
                  {[0, 0.15, 0.3].map((d) => (
                    <motion.div key={d} animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: d, ease: 'easeInOut' }}>
                      <ChevronRight className="w-4 h-4 text-outline" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {selectedBase && (
          <div className="mt-16 pt-8 border-t border-outline-variant/30">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="w-4 h-4 text-on-primary" />
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface font-bold">Idee Consigliate vicino a te</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Le 10 cose più vicine a {selectedBase} (ordinate per tempo di guida ⏱)</p>
              </div>
            </div>

            <div className="flex sm:grid sm:grid-cols-5 overflow-x-auto sm:overflow-visible gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {nearbySuggestions.map((item, i) => {
                const meta = getTypeMeta(item.type)
                const isSaved = bookmarks.some(b => b.id === item.id)
                const driveTime = getDriveTime(selectedBase, item.zone)
                return (
                  <motion.div key={item.id}
                    initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] hover:scale-[0.98] transition-all duration-200 w-[240px] sm:w-auto shrink-0 snap-center flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold border flex items-center gap-1 ${meta.color}`}>
                          <meta.icon className="w-2.5 h-2.5" />{meta.label}
                        </span>
                        <button onClick={() => toggleBookmark(item)}
                          className="p-1 text-outline hover:text-red-500 transition-colors cursor-pointer"
                          title={isSaved ? "Rimuovi" : "Salva"}>
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-outline'}`} />
                        </button>
                      </div>
                      <h4 className="font-label-sm text-label-sm text-on-surface font-bold line-clamp-1 mb-1" title={item.name}>{item.name}</h4>
                      <p className="font-body-md text-[13px] text-on-surface-variant line-clamp-2 min-h-[30px] mb-3">{item.description}</p>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-outline-variant/20">
                      <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                        <span className="truncate">📍 {item.zone}</span>
                        <span className="font-semibold text-primary flex items-center gap-0.5 shrink-0">
                          <Car className="w-3 h-3 text-primary" />~{driveTime} min
                        </span>
                      </div>
                      {item.mapLink && (
                        <a href={item.mapLink} target="_blank" rel="noopener noreferrer"
                          className="w-full py-1 text-center rounded-lg font-label-sm text-label-sm font-semibold bg-surface-variant text-on-surface-variant hover:bg-primary/10 transition-colors border border-outline-variant/30 flex items-center justify-center gap-1">
                          <Map className="w-2.5 h-2.5" />Vedi Mappa
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
