'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Calendar, Clock, Car, Store, ExternalLink, HelpCircle, MessageSquare } from 'lucide-react'
import marketsData from '@/data/markets.json'

const daysOfWeek = ['Tutti', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']
const citiesList = [
  'Tutte',
  'Nerja',
  'Fuengirola',
  'Marbella',
  'Estepona',
  'San Pedro de Alcántara',
  'Torre del Mar',
  'Frigiliana',
  'Vélez-Málaga',
]

export default function Markets() {
  const [search, setSearch] = useState('')
  const [selectedDay, setSelectedDay] = useState('Tutti')
  const [selectedCity, setSelectedCity] = useState('Tutte')
  const [expandedComments, setExpandedComments] = useState<string | null>(null)
  const [expandedTips, setExpandedTips] = useState<string | null>(null)

  const filteredMarkets = useMemo(() => {
    return marketsData.markets.filter((m: any) => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.city.toLowerCase().includes(search.toLowerCase()) ||
        m.location.toLowerCase().includes(search.toLowerCase()) ||
        m.products.some((p: string) => p.toLowerCase().includes(search.toLowerCase()))

      const matchesDay = selectedDay === 'Tutti' || m.day === selectedDay
      const matchesCity = selectedCity === 'Tutte' || m.city === selectedCity

      return matchesSearch && matchesDay && matchesCity
    })
  }, [search, selectedDay, selectedCity])

  return (
    <section id="markets" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-terracotta-500 mb-2">
            <Store className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-[0.3em]">Tradizioni Locali</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-notte leading-tight">
            Mercati & <span className="italic font-medium text-terracotta-500">Rastro</span>
          </h2>
          <p className="text-mare-700/70 mt-3 max-w-3xl text-base sm:text-lg font-body leading-relaxed">
            {marketsData.intro}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="glass flex flex-col gap-5 mb-8 p-4 rounded-2xl border border-terracotta-100/40">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mare-400" />
            <input
              type="text"
              placeholder="Cerca per nome, città, indirizzo o prodotti..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/80 border border-terracotta-100/50 text-sm text-notte placeholder:text-mare-300 focus:outline-none focus:ring-2 focus:ring-terracotta-300/50 transition-all focus:bg-white"
            />
          </div>

          <div className="space-y-4">
            {/* City Filter */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-mare-600 ml-1 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
                <span>Filtra per città</span>
              </div>
              <div className="flex flex-wrap gap-1.5 py-1 px-0.5">
                {citiesList.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`relative px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                      selectedCity === city
                        ? 'text-white'
                        : 'text-mare-750/90 hover:text-terracotta-600 bg-white border border-terracotta-100/40 shadow-sm hover:scale-102'
                    }`}
                  >
                    <span className="relative z-10">{city === 'Tutte' ? '📍 Tutte' : city}</span>
                    {selectedCity === city && (
                      <motion.span
                        layoutId="marketCityBg"
                        className="absolute inset-0 bg-gradient-to-r from-terracotta-500 to-terracotta-600 rounded-xl shadow-sm shadow-terracotta-500/25 border border-terracotta-400/20"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Day Filter */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-mare-600 ml-1 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-terracotta-500" />
                <span>Filtra per giorno</span>
              </div>
              <div className="flex flex-wrap gap-1.5 py-1 px-0.5">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`relative px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                      selectedDay === day
                        ? 'text-white'
                        : 'text-mare-750/90 hover:text-terracotta-600 bg-white border border-terracotta-100/40 shadow-sm hover:scale-102'
                    }`}
                  >
                    <span className="relative z-10">{day === 'Tutti' ? '📅 Tutti' : day}</span>
                    {selectedDay === day && (
                      <motion.span
                        layoutId="marketDayBg"
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

        {/* Markets List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMarkets.map((market: any, i: number) => {
              const isTipsExpanded = expandedTips === market.name
              const isCommentsExpanded = expandedComments === market.name

              return (
                <motion.div
                  key={market.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-terracotta-100/40 card-shadow card-hover flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-display text-lg font-bold text-notte leading-tight">{market.name}</h3>
                      <span className="px-2 py-0.5 bg-terracotta-100 text-terracotta-700 text-[10px] font-bold rounded-lg shrink-0">
                        {market.city}
                      </span>
                    </div>

                    {/* Day / Time Info */}
                    <div className="flex items-center gap-4 mb-4 text-xs font-semibold text-mare-600 bg-terracotta-50/50 p-2 rounded-xl border border-terracotta-100/20">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
                        <span>{market.day}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
                        <span>{market.time}</span>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-2.5 mb-4">
                      <div className="flex items-start gap-2 text-xs text-mare-700/75">
                        <MapPin className="w-3.5 h-3.5 text-terracotta-400 shrink-0 mt-0.5" />
                        <div>
                          <strong>Indirizzo:</strong>{' '}
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              market.name + ' ' + market.location
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-mare-600 hover:text-terracotta-600 hover:underline transition-colors"
                          >
                            {market.location} <ExternalLink className="inline-block w-3 h-3 ml-0.5" />
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-mare-700/75">
                        <Car className="w-3.5 h-3.5 text-terracotta-400 shrink-0 mt-0.5" />
                        <span><strong>Parcheggio:</strong> {market.parking}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-mare-700/75">
                        <Store className="w-3.5 h-3.5 text-terracotta-400 shrink-0" />
                        <span><strong>Bancarelle:</strong> ~{market.stalls} puestos</span>
                      </div>
                    </div>

                    {/* Products sold */}
                    <div className="mb-4">
                      <p className="text-[10px] font-bold text-mare-500 uppercase tracking-wider mb-1.5">Prodotti principali</p>
                      <div className="flex flex-wrap gap-1.5">
                        {market.products.map((product: string, idx: number) => (
                          <span key={idx} className="text-[10px] py-0.5 px-2 bg-white/95 text-mare-800 rounded-lg border border-terracotta-100/30">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Accordions Footer */}
                  <div className="mt-4 pt-3 border-t border-terracotta-100/20 space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setExpandedTips(isTipsExpanded ? null : market.name)
                          if (isCommentsExpanded) setExpandedComments(null)
                        }}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-crema/60 hover:bg-crema text-mare-750 border border-terracotta-100/10 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-terracotta-500" />
                        {isTipsExpanded ? 'Chiudi info' : 'Consigli'}
                      </button>

                      <button
                        onClick={() => {
                          setExpandedComments(isCommentsExpanded ? null : market.name)
                          if (isTipsExpanded) setExpandedTips(null)
                        }}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        {isCommentsExpanded ? 'Chiudi forum' : `Recensioni (${market.comments.length})`}
                      </button>
                    </div>

                    {/* Expanded tips */}
                    <AnimatePresence>
                      {isTipsExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 bg-crema/40 p-3 rounded-xl border border-terracotta-100/20 space-y-1.5 text-xs text-mare-750">
                            {market.tips.map((tip: string, idx: number) => (
                              <div key={idx} className="flex items-start gap-1.5">
                                <span className="text-terracotta-500 mt-0.5">💡</span>
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expanded comments */}
                    <AnimatePresence>
                      {isCommentsExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 space-y-2">
                            {market.comments.map((comment: string, idx: number) => {
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

        {filteredMarkets.length === 0 && (
          <div className="text-center py-12 text-mare-400">
            <Store className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p className="font-body">Nessun mercato trovato. Prova altri filtri.</p>
          </div>
        )}
      </div>
    </section>
  )
}
