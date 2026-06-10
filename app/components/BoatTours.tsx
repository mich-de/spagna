'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Clock, Users, Anchor, ExternalLink, MessageSquare, Ship, DollarSign } from 'lucide-react'
import toursData from '@/data/boat-tours.json'

const tourTypes = ['Tutti', 'catamaran', 'boat', 'sailboat', 'rental']

const typeLabels: Record<string, { label: string; icon: string; bg: string; text: string }> = {
  catamaran: { label: 'Catamarano', icon: '⛵', bg: 'bg-blue-500/10', text: 'text-blue-500' },
  boat: { label: 'Motoscafo', icon: '🚤', bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  sailboat: { label: 'Barca a Vela', icon: '⛵', bg: 'bg-indigo-500/10', text: 'text-indigo-500' },
  rental: { label: 'Noleggio', icon: '⚓', bg: 'bg-amber-500/10', text: 'text-amber-500' },
}

export default function BoatTours() {
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('Tutti')
  const [expandedTour, setExpandedTour] = useState<string | null>(null)

  const filteredTours = useMemo(() => {
    return toursData.filter((tour: any) => {
      const matchesSearch =
        tour.name.toLowerCase().includes(search.toLowerCase()) ||
        tour.departure.toLowerCase().includes(search.toLowerCase()) ||
        tour.description.toLowerCase().includes(search.toLowerCase())

      const matchesType = activeType === 'Tutti' || tour.type === activeType

      return matchesSearch && matchesType
    })
  }, [search, activeType])

  return (
    <section id="boat-tours" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Esperienze in Mare</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Giri in Barca & Catamarano</h2>
        </motion.div>

        {/* Filters */}
        <div className="glass flex flex-col gap-4 mb-8 p-4 rounded-2xl border border-terracotta-100/40">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mare-400" />
            <input
              type="text"
              placeholder="Cerca tour, porto di partenza o descrizione..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/80 border border-terracotta-100/50 text-sm text-notte placeholder:text-mare-300 focus:outline-none focus:ring-2 focus:ring-terracotta-300/50 transition-all focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-mare-600 ml-1 uppercase tracking-wider">
              <Anchor className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Filtra per tipologia</span>
            </div>
            <div className="flex flex-wrap gap-1.5 py-1 px-0.5">
              {tourTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    activeType === type
                      ? 'text-white'
                      : 'text-mare-750/90 hover:text-terracotta-600 bg-white border border-terracotta-100/40 shadow-sm hover:scale-102'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{type === 'Tutti' ? '🗺️' : typeLabels[type]?.icon}</span>
                    <span>{type === 'Tutti' ? 'Tutti i tour' : typeLabels[type]?.label}</span>
                  </span>
                  {activeType === type && (
                    <motion.span
                      layoutId="tourTypeBg"
                      className="absolute inset-0 bg-gradient-to-r from-terracotta-500 to-terracotta-600 rounded-xl shadow-sm shadow-terracotta-500/25 border border-terracotta-400/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTours.map((tour: any, i: number) => {
              const details = typeLabels[tour.type]
              const isExpanded = expandedTour === tour.name

              return (
                <motion.div
                  key={tour.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-terracotta-100/40 card-shadow card-hover flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-display text-lg font-bold text-notte leading-tight">{tour.name}</h3>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${details?.bg} ${details?.text}`}>
                        {details?.icon} {details?.label}
                      </span>
                    </div>

                    <p className="text-xs text-mare-700/80 leading-relaxed mb-4">{tour.description}</p>

                    {/* Specifications */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-mare-700/70">
                        <Clock className="w-3.5 h-3.5 text-terracotta-400 shrink-0" />
                        <span><strong>Durata:</strong> {tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-mare-700/70">
                        <Users className="w-3.5 h-3.5 text-terracotta-400 shrink-0" />
                        <span><strong>Capacità:</strong> {tour.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-mare-700/70">
                        <DollarSign className="w-3.5 h-3.5 text-terracotta-400 shrink-0" />
                        <span><strong>Prezzo:</strong> {tour.price}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-mare-700/70">
                        <MapPin className="w-3.5 h-3.5 text-terracotta-400 shrink-0 mt-0.5" />
                        <div>
                          <strong>Partenza:</strong>{' '}
                          <a
                            href={tour.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-mare-600 hover:text-terracotta-600 hover:underline transition-colors"
                          >
                            {tour.departure} <ExternalLink className="inline-block w-3 h-3 ml-0.5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tour.highlights.map((highlight: string, idx: number) => (
                        <span key={idx} className="badge-pill text-[10px] py-0.5 px-2 bg-crema/60 border-terracotta-100/30 text-mare-750">
                          ✓ {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Booking and Comments Footer */}
                  <div className="mt-auto pt-3 border-t border-terracotta-100/20">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-mare-400 truncate max-w-[150px]">
                        📍 {tour.booking}
                      </span>
                      <button
                        onClick={() => setExpandedTour(isExpanded ? null : tour.name)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm shrink-0"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        {isExpanded ? 'Chiudi' : `Forum (${tour.comments.length})`}
                      </button>
                    </div>

                    {/* Expanded reviews */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-3 border-t border-terracotta-100/10 space-y-2.5">
                            {tour.comments.map((comment: string, idx: number) => {
                              const [source, text] = comment.split(': ')
                              return (
                                <div key={idx} className="bg-white/80 p-2.5 rounded-lg border border-terracotta-100/10 text-[11px] leading-relaxed">
                                  <span className={`font-bold uppercase tracking-wider text-[9px] px-1 py-0.5 rounded mr-1.5 ${
                                    source === 'Reddit' ? 'bg-orange-100 text-orange-700' :
                                    source === 'TripAdvisor' ? 'bg-emerald-100 text-emerald-700' :
                                    source === 'Google' ? 'bg-blue-100 text-blue-700' :
                                    'bg-mare-100 text-mare-700'
                                  }`}>
                                    {source}
                                  </span>
                                  <span className="text-mare-750">{text}</span>
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
          <div className="text-center py-12 text-mare-400">
            <Ship className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p className="font-body">Nessun tour in barca trovato. Prova altri filtri.</p>
          </div>
        )}
      </div>
    </section>
  )
}
