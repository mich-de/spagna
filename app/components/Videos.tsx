'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Play, Clock, MapPin, Film } from 'lucide-react'
import trip from '@/data/trip.json'

const videos = trip.videos || []
const zones = ['Tutte', ...Array.from(new Set(videos.map((v: any) => v.zone))).sort()]
const types = ['Tutti', ...Array.from(new Set(videos.map((v: any) => v.type))).sort()]

const typeLabels: Record<string, string> = {
  guide: 'Guida',
  walking: 'Walking Tour',
  nightlife: 'Nightlife',
  vlog: 'Vlog',
  beach: 'Spiaggia',
}

const typeColors: Record<string, string> = {
  guide: 'bg-surface-variant text-on-surface-variant',
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
    <section id="videos" className="scroll-mt-20 px-container-margin md:px-lg pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Film className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Ispirati</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Video & Guide</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-2xl">Video selezionati per scoprire le atmosfere e i segreti della Costa del Sol prima di partire.</p>
        </motion.div>

        <div className="glass-panel border border-outline-variant/30 rounded-xl card-hover p-4 mb-6 space-y-3">
          <div className="flex flex-row flex-nowrap sm:flex-wrap gap-1.5 items-center overflow-x-auto scrollbar-hide whitespace-nowrap sm:whitespace-normal">
            <span className="font-label-sm text-label-sm text-on-surface-variant mr-1 shrink-0">Zona:</span>
            {zones.map((z) => (
              <button key={z} onClick={() => setZoneFilter(z)}
                className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all shrink-0 active:scale-95 ${
                  zoneFilter === z
                    ? 'bg-secondary text-on-secondary shadow-sm'
                    : 'border border-outline-variant text-on-surface-variant hover:border-tertiary transition-colors'
                }`}
              >{z === 'Tutte' ? 'Tutte le zone' : z}</button>
            ))}
          </div>
          <div className="flex flex-row flex-nowrap sm:flex-wrap gap-1.5 items-center overflow-x-auto scrollbar-hide whitespace-nowrap sm:whitespace-normal">
            <span className="font-label-sm text-label-sm text-on-surface-variant mr-1 shrink-0">Tipo:</span>
            {types.map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all shrink-0 active:scale-95 ${
                  typeFilter === t
                    ? 'bg-secondary text-on-secondary shadow-sm'
                    : 'border border-outline-variant text-on-surface-variant hover:border-tertiary transition-colors'
                }`}
              >{t === 'Tutti' ? 'Tutti i tipi' : typeLabels[t] || t}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((video: any, i: number) => (
            <motion.a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group bg-surface-container-lowest rounded-2xl overflow-hidden card-hover border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] transition-all duration-200 hover:scale-[0.98] block"
            >
              <div className="relative aspect-video overflow-hidden bg-surface-variant">
                <img src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 text-primary ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white font-label-sm text-label-sm rounded flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {video.duration_min} min
                </div>
              </div>
              <div className="p-sm">
                <h3 className="font-label-md text-label-md text-on-surface font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  <span className="font-label-sm text-label-sm bg-surface-variant text-on-surface-variant rounded-full px-2 py-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{video.zone}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-sm text-label-sm ${typeColors[video.type] || 'bg-surface-variant text-on-surface-variant'}`}>{typeLabels[video.type] || video.type}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
                    <Film className="w-2.5 h-2.5" />{video.year}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-on-surface-variant">
            <Play className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p className="font-body-md">Nessun video trovato. Prova altri filtri.</p>
          </div>
        )}
      </div>
    </section>
  )
}
