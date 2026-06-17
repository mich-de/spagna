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
    <section id="water-activities" className="scroll-mt-20 px-container-margin md:px-lg pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Waves className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Mare & Cascate</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Attività Aquatiche</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-3xl">
            Kayak verso la <span className="text-primary font-semibold">Cascata de Maro</span>, sentieri costieri sugli acantilados e spiagge segrete accessibili solo a piedi. Tutti gli itinerari da{' '}
            <a href="https://it.wikiloc.com" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:text-primary transition-colors">Wikiloc</a>.
          </p>
        </motion.div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {activityFilters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-all active:scale-95 ${
                activeFilter === f
                  ? 'bg-secondary text-on-secondary shadow-sm'
                  : 'border border-outline-variant text-on-surface-variant hover:border-tertiary transition-colors'
              }`}
            >{f === 'Tutte' ? '🗺️ Tutte' : `${activityLabels[f]?.icon} ${activityLabels[f]?.label}`}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((activity: any, i: number) => (
            <motion.div key={activity.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden bg-surface-container-lowest card-hover border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] transition-all duration-200 hover:scale-[0.98]"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={activity.imageUrl} alt={activity.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider bg-surface-container-lowest/90 text-primary backdrop-blur-sm">
                    {activityLabels[activity.activity]?.icon} {activityLabels[activity.activity]?.label}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold backdrop-blur-sm ${
                    activity.difficulty === 'Facile' ? 'bg-emerald-500/90 text-white' :
                    activity.difficulty === 'Media' ? 'bg-amber-500/90 text-white' :
                    'bg-red-500/90 text-white'
                  }`}>{activity.difficulty}</span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-white font-label-md text-label-md font-bold drop-shadow-lg">{activity.price}</span>
                </div>
              </div>

              <div className="p-md">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-label-md text-label-md text-on-surface font-bold leading-tight">{activity.name}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-label-sm text-label-sm text-on-surface font-bold">{activity.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 font-label-sm text-label-sm text-on-surface-variant mb-3">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-outline" /> {activity.zone}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-outline" /> {activity.duration}</span>
                  <span className="flex items-center gap-1"><Mountain className="w-3 h-3 text-outline" /> {activity.distance}</span>
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-3">{activity.description}</p>

                {expandedCard === activity.name && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4">
                    <div className="space-y-1.5">
                      {activity.highlights.map((h: string) => (
                        <div key={h} className="flex items-center gap-2 font-body-md text-[13px] text-on-surface-variant">
                          <CheckCircle className="w-3 h-3 text-tertiary shrink-0" />{h}
                        </div>
                      ))}
                    </div>
                    {activity.includes && (
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-2 italic">Include: {activity.includes}</p>
                    )}
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Stagione: {activity.season}</p>
                  </motion.div>
                )}

                <div className="flex items-center gap-2">
                  <button onClick={() => setExpandedCard(expandedCard === activity.name ? null : activity.name)}
                    className="flex-1 px-3 py-2 rounded-xl font-label-sm text-label-sm bg-surface-variant text-primary hover:bg-primary/10 transition-colors cursor-pointer active:scale-95 transition-transform"
                  >{expandedCard === activity.name ? 'Meno dettagli' : 'Dettagli'}</button>
                  <a href={activity.wikilocUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-label-sm text-label-sm bg-surface-variant text-on-surface-variant hover:text-primary transition-colors">
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
