'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Play, Clock, MapPin, Film } from 'lucide-react'
import trip from '@/data/trip.json'

const videos = trip.videos || []
const zones = ['Tutte', ...Array.from(new Set(videos.map((v: any) => v.zone))).sort()]
const types = ['Tutti', ...Array.from(new Set(videos.map((v: any) => v.type))).sort()]

const typeLabels: Record<string, string> = {
  guide: '📖 Guida',
  walking: '🚶 Walking Tour',
  nightlife: '🌙 Nightlife',
  vlog: '🎬 Vlog',
  beach: '🏖 Spiaggia',
}

const typeColors: Record<string, string> = {
  guide: 'bg-mare-100 text-mare-700',
  walking: 'bg-emerald-100 text-emerald-700',
  nightlife: 'bg-purple-100 text-purple-700',
  vlog: 'bg-amber-100 text-amber-700',
  beach: 'bg-blue-100 text-blue-700',
}

export default function Videos() {
  const [zoneFilter, setZoneFilter] = useState('Tutte')
  const [typeFilter, setTypeFilter] = useState('Tutti')

  const filtered = useMemo(() =>
    videos.filter((v: any) => {
      if (zoneFilter !== 'Tutte' && v.zone !== zoneFilter) return false
      if (typeFilter !== 'Tutti' && v.type !== typeFilter) return false
      return true
    }),
  [zoneFilter, typeFilter])

  if (videos.length === 0) return null

  return (
    <section id="videos" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Ispirati</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Video & Guide</h2>
          <p className="text-mare-700/70 mt-1">Video selezionati per scoprire la Costa del Sol prima di partire</p>
        </motion.div>

        {/* Filter bar */}
        <div className="glass flex flex-col gap-3 mb-6 p-3 rounded-xl">
          <div className="flex flex-row flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-x-visible scrollbar-hide gap-1.5 items-center pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 whitespace-nowrap sm:whitespace-normal">
            <span className="text-xs text-mare-500 font-medium mr-1 shrink-0">Zona:</span>
            {zones.map((z) => (
              <button
                key={z}
                onClick={() => setZoneFilter(z)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 shrink-0 ${
                  zoneFilter === z
                    ? 'bg-terracotta-500 text-white shadow-sm'
                    : 'bg-white/60 text-mare-600 border border-terracotta-100/50 hover:bg-terracotta-50 hover:text-terracotta-600'
                }`}
              >
                {z === 'Tutte' ? 'Tutte le zone' : z}
              </button>
            ))}
          </div>
          <div className="flex flex-row flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-x-visible scrollbar-hide gap-1.5 items-center pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 whitespace-nowrap sm:whitespace-normal">
            <span className="text-xs text-mare-500 font-medium mr-1 shrink-0">Tipo:</span>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 shrink-0 ${
                  typeFilter === t
                    ? 'bg-terracotta-500 text-white shadow-sm'
                    : 'bg-white/60 text-mare-600 border border-terracotta-100/50 hover:bg-terracotta-50 hover:text-terracotta-600'
                }`}
              >
                {t === 'Tutti' ? 'Tutti i tipi' : typeLabels[t] || t}
              </button>
            ))}
          </div>
        </div>

        {/* Video grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-visible gap-4 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {filtered.map((video: any, i: number) => (
            <motion.a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-terracotta-100/40 card-shadow card-hover block min-w-[85vw] xs:min-w-[300px] sm:min-w-0 snap-center"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-mare-100">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 text-terracotta-600 ml-1" />
                  </div>
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-[10px] font-medium rounded flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {video.duration_min} min
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-display text-sm font-bold text-notte mb-2 line-clamp-2 group-hover:text-terracotta-600 transition-colors">
                  {video.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  <span className="badge-pill text-[10px]">
                    <MapPin className="w-3 h-3" />
                    {video.zone}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${typeColors[video.type] || 'bg-gray-100 text-gray-700'}`}>
                    {typeLabels[video.type] || video.type}
                  </span>
                  <span className="text-[10px] text-mare-400 flex items-center gap-0.5">
                    <Film className="w-2.5 h-2.5" />
                    {video.year}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-mare-400">
            <Play className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p className="font-body">Nessun video trovato. Prova altri filtri.</p>
          </div>
        )}
      </div>
    </section>
  )
}
