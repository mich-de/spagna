'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Anchor, MapPin, Clock, ExternalLink, Star, Waves, Mountain, CheckCircle } from 'lucide-react'
import activities from '@/data/water-activities.json'

const activityFilters = ['Tutte', 'kayak', 'hiking', 'snorkel', 'boat']
const activityLabels: Record<string, { label: string; icon: string }> = {
  kayak: { label: 'Kayak', icon: '🛶' },
  hiking: { label: 'Sentiero', icon: '🥾' },
  snorkel: { label: 'Snorkel', icon: '🤿' },
  boat: { label: 'Barca', icon: '⛵' },
}

export default function WaterActivities() {
  const [activeFilter, setActiveFilter] = useState('Tutte')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return activities.filter((a: any) => {
      if (activeFilter === 'Tutte') return true
      return a.activity === activeFilter
    })
  }, [activeFilter])

  return (
    <section id="water-activities" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-terracotta-500 mb-2">
            <Waves className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-[0.3em]">Mare & Cascate</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-notte leading-tight">
            Attività <span className="italic font-medium text-terracotta-500">Aquatiche</span>
          </h2>
          <p className="text-mare-700/70 mt-3 max-w-3xl text-base sm:text-lg font-body leading-relaxed">
            Kayak verso la <span className="text-terracotta-400 font-semibold">Cascata de Maro</span>, sentieri costieri sugli acantilados e spiagge segrete accessibili solo a piedi. Tutti gli itinerari da{' '}
            <a href="https://it.wikiloc.com" target="_blank" rel="noopener noreferrer" className="underline decoration-terracotta-300 hover:text-terracotta-600 transition-colors">Wikiloc</a>.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {activityFilters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white shadow-md shadow-terracotta-500/25'
                  : 'bg-white/70 text-mare-700 hover:bg-terracotta-50 border border-terracotta-100/50'
              }`}
            >
              {f === 'Tutte' ? '🗺️ Tutte' : `${activityLabels[f]?.icon} ${activityLabels[f]?.label}`}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((activity: any, i: number) => (
            <motion.div
              key={activity.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden card-shadow card-hover bg-white/80 border border-terracotta-100/30"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.imageUrl}
                  alt={activity.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Activity badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 text-terracotta-600 backdrop-blur-sm">
                    {activityLabels[activity.activity]?.icon} {activityLabels[activity.activity]?.label}
                  </span>
                </div>
                {/* Difficulty */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm ${
                    activity.difficulty === 'Facile' ? 'bg-emerald-500/90 text-white' :
                    activity.difficulty === 'Media' ? 'bg-amber-500/90 text-white' :
                    'bg-red-500/90 text-white'
                  }`}>
                    {activity.difficulty}
                  </span>
                </div>
                {/* Price */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-white text-sm font-bold drop-shadow-lg">{activity.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-lg font-bold text-notte leading-tight">{activity.name}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-3.5 h-3.5 text-oro fill-oro" />
                    <span className="text-xs font-bold text-notte">{activity.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-[11px] text-mare-500 mb-3">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-terracotta-400" /> {activity.zone}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-terracotta-400" /> {activity.duration}</span>
                  <span className="flex items-center gap-1"><Mountain className="w-3 h-3 text-terracotta-400" /> {activity.distance}</span>
                </div>

                <p className="text-sm text-mare-700/80 font-body leading-relaxed mb-4 line-clamp-3">
                  {activity.description}
                </p>

                {/* Highlights */}
                {expandedCard === activity.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4"
                  >
                    <div className="space-y-1.5">
                      {activity.highlights.map((h: string) => (
                        <div key={h} className="flex items-center gap-2 text-xs text-mare-600">
                          <CheckCircle className="w-3 h-3 text-salvia-500 shrink-0" />
                          {h}
                        </div>
                      ))}
                    </div>
                    {activity.includes && (
                      <p className="text-[11px] text-mare-400 mt-2 italic">Include: {activity.includes}</p>
                    )}
                    <p className="text-[11px] text-mare-400 mt-1">Stagione: {activity.season}</p>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandedCard(expandedCard === activity.name ? null : activity.name)}
                    className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold bg-terracotta-50 text-terracotta-600 hover:bg-terracotta-100 transition-colors cursor-pointer"
                  >
                    {expandedCard === activity.name ? 'Meno dettagli' : 'Dettagli'}
                  </button>
                  <a
                    href={activity.wikilocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-mare-50 text-mare-600 hover:bg-mare-100 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> Wikiloc
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
