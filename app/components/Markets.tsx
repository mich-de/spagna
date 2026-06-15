'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Calendar, Clock, Car, Store, ExternalLink, MessageSquare, ChevronDown } from 'lucide-react'
import marketsData from '@/data/markets.json'

const daysOfWeek = ['Tutti', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']
const citiesList = ['Tutte', 'Nerja', 'Fuengirola', 'Marbella', 'Estepona', 'San Pedro de Alcántara', 'Torre del Mar', 'Frigiliana', 'Vélez-Málaga']

export default function Markets() {
  const [search, setSearch] = useState('')
  const [selectedDay, setSelectedDay] = useState('Tutti')
  const [selectedCity, setSelectedCity] = useState('Tutte')
  const [expandedNotes, setExpandedNotes] = useState<string | null>(null)

  const filteredMarkets = useMemo(() => {
    return marketsData.markets.filter((m: any) => {
      const q = search.toLowerCase()
      const matchSearch = !q || m.name.toLowerCase().includes(q) || m.city.toLowerCase().includes(q) || m.location.toLowerCase().includes(q) || m.products.some((p: string) => p.toLowerCase().includes(q))
      const matchDay = selectedDay === 'Tutti' || m.day === selectedDay
      const matchCity = selectedCity === 'Tutte' || m.city === selectedCity
      return matchSearch && matchDay && matchCity
    })
  }, [search, selectedDay, selectedCity])

  return (
    <section id="markets" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8 bg-surface-container-high">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Store className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Tradizioni Locali</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Mercati & Rastro</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-3xl">{marketsData.intro}</p>
        </motion.div>

        {/* Search + Filters */}
        <div className="bg-surface-container rounded-xl p-4 mb-8 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] border border-outline-variant/30">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input type="text" placeholder="Cerca per nome, città, indirizzo o prodotti..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant mb-2 block">Città</span>
              <div className="flex flex-wrap gap-1.5">
                {citiesList.map((city) => (
                  <button key={city} onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all active:scale-95 ${
                      selectedCity === city
                        ? 'bg-secondary text-on-secondary shadow-sm'
                        : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:border-secondary/50'
                    }`}>
                    {city}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant mb-2 block">Giorno</span>
              <div className="flex flex-wrap gap-1.5">
                {daysOfWeek.map((day) => (
                  <button key={day} onClick={() => setSelectedDay(day)}
                    className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all active:scale-95 ${
                      selectedDay === day
                        ? 'bg-secondary text-on-secondary shadow-sm'
                        : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:border-secondary/50'
                    }`}>
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Market Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMarkets.map((market: any, i: number) => {
              const isExpanded = expandedNotes === market.name
              return (
                <motion.div key={market.name} layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-surface-container-lowest rounded-xl p-5 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] transition-all duration-200 hover:scale-[0.98] border border-outline-variant/30 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{market.name}</h3>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary font-label-sm text-label-sm rounded-md shrink-0">
                      {market.city}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4 font-label-sm text-label-sm text-on-surface-variant">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary" />{market.day}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" />{market.time}</span>
                  </div>

                  <div className="space-y-2 mb-4 font-body-md text-[14px] text-on-surface-variant">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-outline shrink-0 mt-0.5" />
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(market.name + ' ' + market.location)}`} target="_blank" rel="noopener noreferrer"
                        className="text-on-surface-variant hover:text-primary transition-colors">
                        {market.location} <ExternalLink className="inline w-3 h-3 ml-0.5" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="w-3.5 h-3.5 text-outline shrink-0" />
                      <span><strong>Parcheggio:</strong> {market.parking}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Store className="w-3.5 h-3.5 text-outline shrink-0" />
                      <span><strong>Bancarelle:</strong> ~{market.stalls} puestos</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1.5">Prodotti</div>
                    <div className="flex flex-wrap gap-1.5">
                      {market.products.map((product: string, idx: number) => (
                        <span key={idx} className="font-label-sm text-label-sm px-2 py-0.5 bg-surface-variant text-on-surface-variant rounded-md">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-3 border-t border-outline-variant/30">
                    <button onClick={() => setExpandedNotes(isExpanded ? null : market.name)}
                      className="w-full flex items-center justify-center gap-1 py-2 bg-surface-variant hover:bg-surface-variant/80 text-on-surface-variant rounded-lg font-label-sm text-label-sm transition-all">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {isExpanded ? 'Chiudi' : `Recensioni (${market.comments.length})`}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <div className="mt-3 space-y-2">
                            {market.comments.map((comment: string, idx: number) => {
                              const [source, text] = comment.split(': ')
                              const sourceColors: Record<string, string> = { 'Reddit': 'bg-orange-100 text-orange-700', 'TripAdvisor': 'bg-emerald-100 text-emerald-700', 'Google': 'bg-blue-100 text-blue-700' }
                              return (
                                <div key={idx} className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/20 text-[13px] leading-relaxed text-on-surface-variant">
                                  <span className={`font-bold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded mr-1.5 ${sourceColors[source] || 'bg-surface-variant text-on-surface-variant'}`}>
                                    {source}
                                  </span>
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

        {filteredMarkets.length === 0 && (
          <div className="text-center py-12 text-outline">
            <Store className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p className="font-body-md text-body-md">Nessun mercato trovato. Prova altri filtri.</p>
          </div>
        )}
      </div>
    </section>
  )
}
