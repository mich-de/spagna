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
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-mare-800 mb-3">
            <span className="inline-block mr-2">🌙</span>
            {nightlife.title}
          </h2>
          <p className="text-mare-600 text-lg max-w-2xl mx-auto">
            {nightlife.subtitle}
          </p>
        </motion.div>

        <div className="space-y-4 mb-10">
          {nightlife.zones.map((zone, i) => (
            <motion.div
              key={zone.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setExpandedZone(expandedZone === zone.name ? null : zone.name)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-mare-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${zoneColors[zone.name] || 'from-mare-400 to-mare-600'} flex items-center justify-center text-white font-bold text-sm`}>
                    {zone.venues.length}
                  </div>
                  <div>
                    <h3 className="font-bold text-mare-800 text-lg">{zone.name}</h3>
                    <p className="text-mare-500 text-sm">{zone.venues.length} locali</p>
                  </div>
                </div>
                {expandedZone === zone.name ? (
                  <ChevronUp className="w-5 h-5 text-mare-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-mare-400" />
                )}
              </button>

              {expandedZone === zone.name && (
                <div className="px-5 pb-5 border-t border-mare-100">
                  <p className="text-mare-600 text-sm mt-4 mb-3">{zone.description}</p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs bg-mare-100 text-mare-700 px-2.5 py-1 rounded-full">
                      <Clock className="w-3 h-3" /> {zone.hours}
                    </span>
                    {zone.parking && (
                      <span className="inline-flex items-center gap-1.5 text-xs bg-mare-100 text-mare-700 px-2.5 py-1 rounded-full">
                        <MapPin className="w-3 h-3" /> {zone.parking}
                      </span>
                    )}
                  </div>
                  {zone.tip && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                      <p className="text-amber-800 text-sm">💡 {zone.tip}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {zone.venues.map((venue) => (
                      <div
                        key={venue.name}
                        className={`rounded-xl border p-4 transition-all ${
                          venue.over35
                            ? 'border-amber-200 bg-amber-50/50'
                            : 'border-mare-100 bg-mare-50/30'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-mare-800 text-sm">{venue.name}</h4>
                            <span className="text-xs text-mare-500">{venue.type}</span>
                          </div>
                          {venue.over35 && (
                            <span className="inline-flex items-center gap-1 text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full font-medium">
                              <Sparkles className="w-2.5 h-2.5" /> 35+
                            </span>
                          )}
                        </div>
                        <div className="space-y-1.5 text-xs text-mare-600">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-mare-400" /> {venue.address}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-mare-400" /> {venue.hours}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Music className="w-3 h-3 text-mare-400" /> {venue.music}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Wine className="w-3 h-3 text-mare-400" /> {venue.price}
                          </div>
                          {venue.rating && (
                            <div className="flex items-center gap-1.5">
                              <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {venue.rating}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-mare-500 mt-2 italic">{venue.vibe}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => setShowTips(!showTips)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl hover:from-fuchsia-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <Users className="w-5 h-5" />
            {showTips ? 'Nascondi Consigli Over 35' : 'Mostra Consigli Over 35'}
          </button>

          {showTips && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-2xl p-6 border border-fuchsia-200"
            >
              <h3 className="font-bold text-fuchsia-800 text-lg mb-4">🎯 Guida Over 35 — Consigli Pratici</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nightlife.tipsOver35.map((tip, i) => (
                  <div key={i} className="bg-white/70 rounded-xl p-4">
                    <h4 className="font-bold text-mare-800 text-sm mb-1">{tip.title}</h4>
                    <p className="text-mare-600 text-xs leading-relaxed">{tip.text}</p>
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
