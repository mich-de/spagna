'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Clock, Car, Instagram, ExternalLink, Star, MessageSquare, Filter, Flame, Music, UtensilsCrossed, Palmtree, Landmark, ChevronDown, ChevronUp } from 'lucide-react'
import events from '@/data/events.json'

const categories = [
  { id: 'all', label: 'Tutti', icon: Palmtree },
  { id: 'fiesta', label: 'Feste', icon: Flame },
  { id: 'music', label: 'Musica', icon: Music },
  { id: 'beach', label: 'Spiaggia', icon: Palmtree },
  { id: 'food', label: 'Food', icon: UtensilsCrossed },
  { id: 'culture', label: 'Cultura', icon: Landmark },
]

const formatDate = (iso: string) => {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' })
}

const formatFullDate = (iso: string) => {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })
}

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [showFilters, setShowFilters] = useState(false)

  const uniqueDates = useMemo(() => {
    const dates = Array.from(new Set(events.map((e: any) => e.date)))
    return dates.sort()
  }, [])

  const filtered = useMemo(() => {
    return (events as any[]).filter((e) => {
      const catOk = activeCategory === 'all' || e.category === activeCategory
      const dateOk = !selectedDate || e.date === selectedDate
      return catOk && dateOk
    }).sort((a, b) => {
      const dateA = new Date(a.date + 'T00:00:00').getTime()
      const dateB = new Date(b.date + 'T00:00:00').getTime()
      if (dateA !== dateB) return dateA - dateB
      return (a.time || '').localeCompare(b.time || '')
    })
  }, [activeCategory, selectedDate])

  const grouped = useMemo(() => {
    const map: Record<string, any[]> = {}
    filtered.forEach((e) => {
      if (!map[e.date]) map[e.date] = []
      map[e.date].push(e)
    })
    return Object.entries(map).sort(([a], [b]) => new Date(a + 'T00:00:00').getTime() - new Date(b + 'T00:00:00').getTime())
  }, [filtered])

  const toggleExpand = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))

  const filterPanel = (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 mb-6 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
      <div className="mb-4">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2 block">Giorno</span>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setSelectedDate(null)}
            className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-medium transition-all active:scale-95 ${selectedDate === null ? 'bg-secondary text-on-secondary shadow-sm' : 'bg-surface text-on-surface-variant border border-outline-variant/30 hover:bg-surface-variant'}`}>
            Tutti
          </button>
          {uniqueDates.map((d) => (
            <button key={d} onClick={() => setSelectedDate(d)}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-medium transition-all active:scale-95 ${selectedDate === d ? 'bg-secondary text-on-secondary shadow-sm' : 'bg-surface text-on-surface-variant border border-outline-variant/30 hover:bg-surface-variant'}`}>
              {formatDate(d)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2 block">Categoria</span>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const Icon = c.icon
            const active = activeCategory === c.id
            return (
              <button key={c.id} onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-medium flex items-center gap-1.5 transition-all active:scale-95 ${active ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface text-on-surface-variant border border-outline-variant/30 hover:bg-surface-variant'}`}>
                <Icon className="w-3.5 h-3.5" />
                {c.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <section id="events" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Calendar className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Eventi 19-24 Giu 2026</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">
            Cosa succede <span className="italic text-primary">intorno a Nerja</span>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-3xl">
            Distanze calcolate da <span className="text-primary font-semibold">Nerja centro</span>. Eventi confermati e appuntamenti tipici della settimana di San Juan.
          </p>
        </motion.div>

        <div className="hidden lg:block">{filterPanel}</div>

        <div className="lg:hidden mb-4">
          <button onClick={() => setShowFilters((s) => !s)}
            className="w-full flex items-center justify-between px-4 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl font-label-md text-label-md text-on-surface active:scale-95 transition-transform">
            <span className="flex items-center gap-2"><Filter className="w-4 h-4 text-primary" /> Filtri</span>
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden">
              {filterPanel}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-4">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {filtered.length} evento{filtered.length !== 1 ? 'i' : ''} trovato{filtered.length !== 1 ? 'i' : ''}
          </span>
          {(selectedDate || activeCategory !== 'all') && (
            <button onClick={() => { setSelectedDate(null); setActiveCategory('all') }}
              className="font-label-sm text-label-sm text-primary hover:underline active:scale-95 transition-transform">
              Reset filtri
            </button>
          )}
        </div>

        <div className="space-y-8">
          {grouped.map(([date, dayEvents]) => (
            <div key={date}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{formatFullDate(date)}</h3>
                <div className="flex-1 h-px bg-outline-variant/30" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {dayEvents.map((e, idx) => {
                  const isOpen = expanded[e.id]
                  const categoryMeta = categories.find((c) => c.id === e.category) || categories[0]
                  const CatIcon = categoryMeta.icon
                  return (
                    <motion.div key={e.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                      className="bg-surface rounded-2xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] overflow-hidden hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] transition-all duration-200 hover:scale-[0.99] flex flex-col">
                      <div className="relative h-44 bg-surface-container-high overflow-hidden">
                        <EventImage event={e} />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1.5 bg-surface/90 backdrop-blur-sm text-on-surface shadow-sm">
                            <CatIcon className="w-3 h-3" /> {categoryMeta.label}
                          </span>
                        </div>
                        {e.confirmed && (
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 rounded-full font-label-sm text-label-sm font-bold bg-primary text-on-primary shadow-sm flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" /> Confermato
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <h4 className="font-label-lg text-label-lg text-on-surface font-bold leading-tight mb-2">{e.title}</h4>

                        <div className="flex flex-wrap gap-y-2 gap-x-4 mb-3 text-on-surface-variant">
                          <span className="flex items-center gap-1.5 font-body-md text-body-md">
                            <MapPin className="w-3.5 h-3.5 text-primary" /> {e.location}
                          </span>
                          <span className="flex items-center gap-1.5 font-body-md text-body-md">
                            <Clock className="w-3.5 h-3.5 text-secondary" /> {e.time}
                          </span>
                          <span className="flex items-center gap-1.5 font-body-md text-body-md">
                            <Car className="w-3.5 h-3.5 text-tertiary" /> {e.distance_min_from_nerja} min da Nerja
                          </span>
                        </div>

                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4 line-clamp-3">{e.description}</p>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="space-y-4 mb-4">
                                {e.tips && e.tips.length > 0 && (
                                  <div className="bg-amber-50/40 border border-amber-200/20 rounded-xl p-3">
                                    <span className="font-label-sm text-label-sm text-amber-700 font-bold mb-1 block">Tips locali</span>
                                    <ul className="space-y-1">
                                      {e.tips.map((tip: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 font-body-md text-[13px] text-on-surface-variant">
                                          <span className="text-primary shrink-0">•</span>{tip}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                <div className="flex flex-wrap gap-2">
                                  {e.instagram_handle && (
                                    <a href={e.url || `https://www.instagram.com/${e.instagram_handle.replace('@', '')}/`} target="_blank" rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-label-sm text-label-sm font-medium hover:opacity-90 transition-opacity">
                                      <Instagram className="w-3.5 h-3.5" /> {e.instagram_handle}
                                    </a>
                                  )}
                                  {e.website && (
                                    <a href={e.website} target="_blank" rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-variant text-on-surface-variant border border-outline-variant/30 font-label-sm text-label-sm font-medium hover:bg-surface-container-high transition-colors">
                                      <ExternalLink className="w-3.5 h-3.5" /> Sito
                                    </a>
                                  )}
                                </div>

                                {e.user_comments && e.user_comments.length > 0 && (
                                  <div className="space-y-2">
                                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                                      <MessageSquare className="w-3.5 h-3.5" /> Commenti
                                    </span>
                                    {e.user_comments.map((c: any, i: number) => (
                                      <div key={i} className="bg-surface-container-lowest rounded-xl p-3 border border-outline-variant/20">
                                        <div className="flex items-center justify-between mb-1">
                                          <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                                              {c.avatar}
                                            </div>
                                            <span className="font-label-sm text-label-sm text-on-surface font-medium">{c.author}</span>
                                          </div>
                                          <div className="flex items-center gap-0.5">
                                            {Array.from({ length: 5 }).map((_, r) => (
                                              <Star key={r} className={`w-3 h-3 ${r < c.rating ? 'text-amber-500 fill-current' : 'text-outline-variant'}`} />
                                            ))}
                                          </div>
                                        </div>
                                        <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">{c.text}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="mt-auto pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">{e.price}</span>
                          <button onClick={() => toggleExpand(e.id)}
                            className="flex items-center gap-1 font-label-sm text-label-sm font-bold text-primary hover:text-secondary transition-all active:scale-95">
                            {isOpen ? 'Meno dettagli' : 'Dettagli'}
                            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
            <Calendar className="w-10 h-10 text-outline mx-auto mb-3" />
            <p className="font-body-md text-body-md text-on-surface-variant">Nessun evento con questi filtri. Prova a resettare.</p>
          </div>
        )}
      </div>
    </section>
  )
}

function EventImage({ event }: { event: any }) {
  const [error, setError] = useState(false)
  const src = event.imageUrl || `/images/events/${event.id}.jpg`
  if (error) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-surface-container-high flex items-center justify-center">
        <div className="text-center">
          <Palmtree className="w-10 h-10 text-primary/40 mx-auto mb-2" />
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{event.zone}</span>
        </div>
      </div>
    )
  }
  return <img src={src} alt={event.title} className="absolute inset-0 w-full h-full object-cover" onError={() => setError(true)} />
}
