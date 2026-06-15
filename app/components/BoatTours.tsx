'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Clock, Users, Anchor, ExternalLink, MessageSquare, Ship, DollarSign, Phone, Globe } from 'lucide-react'
import toursData from '@/data/boat-tours.json'

const tourTypes = ['Tutti', 'catamaran', 'boat', 'sailboat', 'rental', 'kayak']
const typeLabels: Record<string, { label: string; icon: string }> = {
  catamaran: { label: 'Catamarano', icon: '⛵' },
  boat: { label: 'Motoscafo', icon: '🚤' },
  sailboat: { label: 'Barca a Vela', icon: '⛵' },
  rental: { label: 'Noleggio', icon: '⚓' },
  kayak: { label: 'Kayak', icon: '🚣' },
}

export default function BoatTours() {
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('Tutti')
  const [expandedTour, setExpandedTour] = useState<string | null>(null)

  const filteredTours = useMemo(() => {
    return toursData.filter((tour: any) => {
      const q = search.toLowerCase()
      const matchSearch = !q || tour.name.toLowerCase().includes(q) || tour.departure.toLowerCase().includes(q) || tour.description.toLowerCase().includes(q)
      const matchType = activeType === 'Tutti' || tour.type === activeType
      return matchSearch && matchType
    })
  }, [search, activeType])

  return (
    <section id="boat-tours" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Anchor className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Esperienze in Mare</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Escursioni in Barca</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-3xl">Dal catamarano al tramonto alle spedizioni per l&apos;avvistamento dei delfini.</p>
        </motion.div>

        <div className="bg-surface-container rounded-xl p-4 mb-8 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] border border-outline-variant/30">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input type="text" placeholder="Cerca tour, porto di partenza o descrizione..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant mb-2 block">Tipologia</span>
            <div className="flex flex-wrap gap-1.5">
              {tourTypes.map((type) => (
                <button key={type} onClick={() => setActiveType(type)}
                  className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all active:scale-95 ${
                    activeType === type
                      ? 'bg-secondary text-on-secondary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:border-secondary/50'
                  }`}>
                  {type === 'Tutti' ? '🗺️ Tutti' : `${typeLabels[type]?.icon} ${typeLabels[type]?.label}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTours.map((tour: any, i: number) => {
              const details = typeLabels[tour.type]
              const isExpanded = expandedTour === tour.name
              return (
                <motion.div key={tour.name} layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-surface-container-lowest rounded-xl p-5 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] transition-all duration-200 hover:scale-[0.98] border border-outline-variant/30 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{tour.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-variant text-on-surface-variant shrink-0">
                      {details?.icon} {details?.label}
                    </span>
                  </div>
                  <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed mb-4">{tour.description}</p>

                  <div className="space-y-2 font-body-md text-[14px] text-on-surface-variant mb-4">
                    <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-outline shrink-0" /><strong>Durata:</strong> {tour.duration}</p>
                    <p className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-outline shrink-0" /><strong>Capacità:</strong> {tour.capacity}</p>
                    <p className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5 text-outline shrink-0" /><strong>Prezzo:</strong> {tour.price}</p>
                    <p className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 text-outline shrink-0 mt-0.5" />
                      <strong>Partenza:</strong>{' '}
                      <a href={tour.mapLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors">
                        {tour.departure} <ExternalLink className="inline w-3 h-3 ml-0.5" />
                      </a>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tour.highlights.map((h: string, idx: number) => (
                      <span key={idx} className="font-label-sm text-label-sm px-2 py-0.5 bg-primary/5 text-primary rounded-md">✓ {h}</span>
                    ))}
                  </div>

                  {tour.agency && (
                    <div className="mb-4 p-3 bg-surface-container-low rounded-lg border border-outline-variant/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                          <Ship className="w-3.5 h-3.5 text-primary" /> {tour.agency.name}
                        </span>
                        <span className="font-label-sm text-label-sm text-primary bg-primary/10 px-1.5 py-0.5 rounded font-bold uppercase">Consigliata</span>
                      </div>
                      <div className="space-y-1 font-body-md text-[13px] text-on-surface-variant">
                        {tour.agency.phone && (
                          <a href={`tel:${tour.agency.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                            <Phone className="w-3 h-3 text-outline" /> {tour.agency.phone}
                          </a>
                        )}
                        {tour.agency.address && (
                          <div className="flex items-start gap-1.5">
                            <MapPin className="w-3 h-3 text-outline shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{tour.agency.address}</span>
                          </div>
                        )}
                      </div>
                      {tour.agency.website && (
                        <div className="mt-2">
                          <a href={tour.agency.website} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary hover:text-primary/80 transition-colors bg-surface-container-lowest px-2.5 py-1 rounded-lg border border-outline-variant/30">
                            <Globe className="w-3 h-3" /> Sito Web <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-auto pt-3 border-t border-outline-variant/30">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-body-md text-[12px] text-outline truncate">📍 {tour.booking}</span>
                      <button onClick={() => setExpandedTour(isExpanded ? null : tour.name)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-surface-variant hover:bg-surface-variant/80 text-on-surface-variant rounded-lg font-label-sm text-label-sm transition-all">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {isExpanded ? 'Chiudi' : `Forum (${tour.comments.length})`}
                      </button>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <div className="mt-4 pt-3 border-t border-outline-variant/10 space-y-2">
                            {tour.comments.map((comment: string, idx: number) => {
                              const [source, text] = comment.split(': ')
                              const colors: Record<string, string> = { Reddit: 'bg-orange-100 text-orange-700', TripAdvisor: 'bg-emerald-100 text-emerald-700', Google: 'bg-blue-100 text-blue-700' }
                              return (
                                <div key={idx} className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/20 text-[13px] leading-relaxed text-on-surface-variant">
                                  <span className={`font-bold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded mr-1.5 ${colors[source] || 'bg-surface-variant text-on-surface-variant'}`}>{source}</span>
                                  {text}
                                </div>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-12 text-outline">
            <Ship className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p className="font-body-md text-body-md">Nessun tour trovato. Prova altri filtri.</p>
          </div>
        )}
      </div>
    </section>
  )
}
