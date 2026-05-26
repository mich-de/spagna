'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Waves, Car, Clock, Map, Star } from 'lucide-react'
import beaches from '@/data/beaches.json'

const zones = ['Tutte', ...Array.from(new Set(beaches.map((b: any) => b.zone))).sort()]
const atmospheres = ['Tutte', ...Array.from(new Set(beaches.map((b: any) => b.atmosphere))).sort()]

export default function Beaches() {
  const [search, setSearch] = useState('')
  const [zoneFilter, setZoneFilter] = useState('Tutte')
  const [atmosFilter, setAtmosFilter] = useState('Tutte')

  const filtered = useMemo(() =>
    beaches.filter((b: any) => {
      if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.zone.toLowerCase().includes(search.toLowerCase())) return false
      if (zoneFilter !== 'Tutte' && b.zone !== zoneFilter) return false
      if (atmosFilter !== 'Tutte' && b.atmosphere !== atmosFilter) return false
      return true
    }),
  [search, zoneFilter, atmosFilter])

  return (
    <section id="beaches" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Costa del Sol</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Spiagge consigliate</h2>
        </motion.div>

        {/* FILTER BAR — glass container */}
        <div className="glass flex flex-col sm:flex-row gap-3 mb-6 p-3 rounded-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mare-400" />
            <input
              type="text"
              placeholder="Cerca spiaggia o zona..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/80 border border-terracotta-100/50 text-sm text-notte placeholder:text-mare-300 focus:outline-none focus:ring-2 focus:ring-terracotta-300/50"
            />
          </div>

          {/* Zona filter buttons */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {zones.map((z) => (
              <button
                key={z}
                onClick={() => setZoneFilter(z)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  zoneFilter === z
                    ? 'bg-terracotta-500 text-white shadow-sm'
                    : 'bg-white/60 text-mare-600 border border-terracotta-100/50 hover:bg-terracotta-50 hover:text-terracotta-600'
                }`}
              >
                {z === 'Tutte' ? 'Tutte le zone' : z}
              </button>
            ))}
          </div>

          {/* Atmosfera filter buttons */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {atmospheres.map((a) => (
              <button
                key={a}
                onClick={() => setAtmosFilter(a)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  atmosFilter === a
                    ? 'bg-terracotta-500 text-white shadow-sm'
                    : 'bg-white/60 text-mare-600 border border-terracotta-100/50 hover:bg-terracotta-50 hover:text-terracotta-600'
                }`}
              >
                {a === 'Tutte' ? 'Tutte atmosfere' : a}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((beach: any, i: number) => (
            <motion.div
              key={beach.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-terracotta-100/40 card-shadow card-hover"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-lg font-bold text-notte">{beach.name}</h3>
                <span className="badge-pill">
                  {beach.atmosphere}
                </span>
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
          ))}
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