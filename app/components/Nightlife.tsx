'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Star, Music, Wine, Users, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import nightlife from '@/data/nightlife.json'

export default function Nightlife() {
  const [expandedZone, setExpandedZone] = useState<string | null>('Plaza Tutti Frutti')
  const [showTips, setShowTips] = useState(false)

  const zoneColors: Record<string, string> = {
    'Plaza Tutti Frutti': 'from-fuchsia-500 to-pink-500',
    'Calle Antonio Millón': 'from-violet-500 to-purple-500',
    "Balcón de Europa & Centro Storico": 'from-amber-500 to-orange-500',
    'Plaza Cavana': 'from-cyan-500 to-blue-500',
    'Playa Burriana': 'from-emerald-500 to-teal-500',
  }

  return (
    <section id="nightlife" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Nerja Nightlife</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface mb-3">
            <span className="inline-block mr-2">🌙</span>{nightlife.title}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">{nightlife.subtitle}</p>
        </motion.div>

        <div className="space-y-4 mb-10">
          {nightlife.zones.map((zone, i) => (
            <motion.div key={zone.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] overflow-hidden">
              <button onClick={() => setExpandedZone(expandedZone === zone.name ? null : zone.name)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-variant/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${zoneColors[zone.name] || 'from-primary to-secondary'} flex items-center justify-center text-on-primary font-bold text-sm`}>
                    {zone.venues.length}
                  </div>
                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface font-bold">{zone.name}</h3>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">{zone.venues.length} locali</p>
                  </div>
                </div>
                {expandedZone === zone.name ? (
                  <ChevronUp className="w-5 h-5 text-on-surface-variant" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-on-surface-variant" />
                )}
              </button>

              {expandedZone === zone.name && (
                <div className="px-5 pb-5 border-t border-outline-variant/30">
                  <p className="font-body-md text-[13px] text-on-surface-variant mt-4 mb-3">{zone.description}</p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm bg-surface-variant text-on-surface-variant px-2.5 py-1 rounded-full">
                      <Clock className="w-3 h-3" /> {zone.hours}
                    </span>
                    {zone.parking && (
                      <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm bg-surface-variant text-on-surface-variant px-2.5 py-1 rounded-full">
                        <MapPin className="w-3 h-3" /> {zone.parking}
                      </span>
                    )}
                  </div>
                  {zone.tip && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                      <p className="font-body-md text-[13px] text-amber-800">💡 {zone.tip}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {zone.venues.map((venue) => (
                      <div key={venue.name}
                        className={`rounded-xl border p-4 transition-all ${
                          venue.over35 ? 'border-outline-variant/30 bg-surface-variant' : 'border-outline-variant/20 bg-surface-container-lowest'
                        }`}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-label-sm text-label-sm text-on-surface font-bold">{venue.name}</h4>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">{venue.type}</span>
                          </div>
                          {venue.over35 && (
                            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full font-medium">
                              <Sparkles className="w-2.5 h-2.5" /> 35+
                            </span>
                          )}
                        </div>
                        <div className="space-y-1.5 font-label-sm text-label-sm text-on-surface-variant">
                          <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-outline" /> {venue.address}</div>
                          <div className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-outline" /> {venue.hours}</div>
                          <div className="flex items-center gap-1.5"><Music className="w-3 h-3 text-outline" /> {venue.music}</div>
                          <div className="flex items-center gap-1.5"><Wine className="w-3 h-3 text-outline" /> {venue.price}</div>
                          {venue.rating && (
                            <div className="flex items-center gap-1.5"><Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {venue.rating}</div>
                          )}
                        </div>
                        <p className="font-body-md text-[13px] text-on-surface-variant mt-2 italic">{venue.vibe}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <button onClick={() => setShowTips(!showTips)}
            className="w-full flex items-center justify-center gap-2 bg-secondary text-on-secondary font-bold font-label-md text-label-md py-3 px-6 rounded-xl hover:shadow-lg transition-all shadow-sm">
            <Users className="w-5 h-5" />
            {showTips ? 'Nascondi Consigli Over 35' : 'Mostra Consigli Over 35'}
          </button>

          {showTips && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 bg-surface-variant rounded-2xl p-6 border border-outline-variant/20">
              <h3 className="font-label-md text-label-md text-on-surface font-bold mb-4">🎯 Guida Over 35 — Consigli Pratici</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nightlife.tipsOver35.map((tip, i) => (
                  <div key={i} className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20">
                    <h4 className="font-label-sm text-label-sm text-on-surface font-bold mb-1">{tip.title}</h4>
                    <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">{tip.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
