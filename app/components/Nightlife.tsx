'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, Clock, VenetianMask, DollarSign, MapPin, Map, Star } from 'lucide-react'
import nightlife from '@/data/nightlife.json'

const zones = ['Tutte', ...Array.from(new Set(nightlife.map((n: any) => n.zone))).sort()]

export default function Nightlife() {
  const [zoneFilter, setZoneFilter] = useState('Tutte')

  const filteredNightlife = useMemo(() => 
    nightlife.filter((n: any) => {
      if (zoneFilter !== 'Tutte' && n.zone !== zoneFilter) return false
      return true
    }),
  [zoneFilter])

  return (
    <section id="nightlife" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Dopo il tramonto</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Vita notturna</h2>
        </motion.div>

        {/* Zone filter buttons */}
        <div className="glass p-3 rounded-2xl border border-terracotta-100/40 mb-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-mare-400 ml-1">Filtra per zona:</span>
            <div className="flex flex-wrap gap-1.5">
              {zones.map((z) => (
                <button
                  key={z}
                  onClick={() => setZoneFilter(z)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    zoneFilter === z
                      ? 'bg-terracotta-500 text-white shadow-md'
                      : 'bg-white/60 text-mare-600 border border-terracotta-100/50 hover:bg-terracotta-50 hover:text-terracotta-600 hover:border-terracotta-200'
                  }`}
                >
                  {z === 'Tutte' ? 'Tutte le zone' : z}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredNightlife.map((zone: any, i: number) => (
            <motion.div
              key={zone.zone}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-terracotta-100/40 card-hover"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-notte mb-1">{zone.zone}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs px-2 py-0.5 bg-terracotta-50 text-terracotta-600 rounded-full">
                      <Users className="w-3 h-3 inline mr-0.5" /> {zone.clientType.split(',')[0]}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-terracotta-50 text-terracotta-600 rounded-full">
                      <Clock className="w-3 h-3 inline mr-0.5" /> {zone.bestTime}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-terracotta-50 text-terracotta-600 rounded-full">
                      <VenetianMask className="w-3 h-3 inline mr-0.5" /> {zone.dressCode}
                    </span>
                  </div>
                  <p className="text-sm text-mare-700/70 mb-3">{zone.vibe.charAt(0).toUpperCase() + zone.vibe.slice(1)}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {zone.venues.map((v: any) => (
                      <div key={v.name} className="flex flex-col gap-1 p-2 bg-terracotta-50/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-terracotta-600 shrink-0">{v.name}</span>
                          <span className="text-[10px] text-mare-500">{v.type}</span>
                          <span className="text-[10px] ml-auto font-medium text-mare-600">{v.price}</span>
                        </div>
                        <div className="flex gap-1.5">
                          <a
                            href={v.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                          >
                            <Map className="w-2.5 h-2.5" /> Maps
                          </a>
                          <a
                            href={v.tripadvisorLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          >
                            <Star className="w-2.5 h-2.5" /> TA
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-mare-700/50">
                    <MapPin className="w-3 h-3" /> {zone.start}
                    <span className="mx-1">→</span> {zone.continueTo}
                    <span className="mx-1 text-mare-300">|</span>
                    <a
                      href={zone.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                    >
                      <Map className="w-3 h-3" /> Maps
                    </a>
                    <a
                      href={zone.tripadvisorLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      <Star className="w-3 h-3" /> TA
                    </a>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center gap-3 sm:min-w-[100px]">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-mare-400" />
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                        <div key={n} className={`w-1.5 h-3 rounded-full ${
                          n <= Math.round(zone.socialEase) ? 'bg-terracotta-400' : 'bg-terracotta-200/30'
                        }`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-mare-400 uppercase tracking-wider">Social</span>
                  <div className="text-xs text-mare-500 bg-terracotta-50 px-2 py-1 rounded-lg w-full text-center">
                    <DollarSign className="w-3 h-3 inline" /> {zone.venues[0]?.price || '€€'}
                  </div>
                </div>
              </div>
              {zone.notes && (
                <div className="mt-3 pt-3 border-t border-terracotta-100/30">
                  <p className="text-xs text-mare-600/70 italic">💡 {zone.notes}</p>
                </div>
              )}
            </motion.div>
          ))}
          
          {filteredNightlife.length === 0 && (
            <div className="text-center py-12 text-mare-400">
              <p className="font-body">Nessuna zona nightlife trovata per questa selezione.</p>
            </div>
          )}
        </div>

        <div className="mt-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200/50">
          <h4 className="font-display text-lg font-semibold text-notte mb-2">🌙 Strategia nightlife consigliata</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-mare-700/80">
            <div className="p-3 bg-white/50 rounded-xl">
              <p className="font-medium text-terracotta-600 mb-1">2 sere a Marbella / Puerto Banús</p>
              <p className="text-sm text-mare-700/80">Per l&apos;esperienza luxury, vedere e farsi vedere, il lato patinato della Costa del Sol</p>
            </div>
            <div className="p-3 bg-white/50 rounded-xl">
              <p className="font-medium text-terracotta-600 mb-1">2 sere a Málaga</p>
              <p className="text-sm text-mare-700/80">Per socializzare davvero, gente autentica, locali veri, costi contenuti. La notte migliore per conoscere persone</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}