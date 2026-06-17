'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Euro, Home, Wifi, Car, Waves, Check, ExternalLink } from 'lucide-react'
import accommodations from '@/data/accommodations.json'
import { asset } from '@/app/utils/paths'

const iconMap: Record<string, React.ElementType> = {
  Parcheggio: Car,
  'Vicino al centro': MapPin,
  'Zona tranquilla': Home,
  'Cucina attrezzata': Home,
  'WiFi gratis': Wifi,
  'Vista mare': Waves,
  'Piscina infinity': Waves,
  'Vicino alla spiaggia': Waves,
  '300m dalla spiaggia': Waves,
  '5min a piedi dalla spiaggia': Waves,
  'Design moderno': Home,
  'Atmosfera tradizionale': Home,
  'Parcheggio pubblico facile': Car,
  'Parcheggio pubblico €3/giorno vicino': Car,
  'Parcheggio incluso': Car,
  'Parcheggio gratuito nell\'urbanizzazione': Car,
  'Cancellazione gratuita': Check,
  'Punteggio 9.6/10': Check,
}

export default function Accommodations() {
  const chosen = accommodations.find((a: any) => a.id === 'nerja-el-capistrano')
  const alternatives = accommodations.filter((a: any) => a.id !== 'nerja-el-capistrano')

  return (
    <section id="accommodations" className="scroll-mt-20 px-container-margin md:px-lg pt-16 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Home className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Dove Dormire</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Alloggi Consigliati</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-2xl">La base perfetta per esplorare la Costa del Sol.</p>
        </motion.div>

        {chosen && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-10">
            <div className="relative bg-gradient-to-br from-surface-container-lowest to-surface-container rounded-2xl border border-primary/20 shadow-[0_8px_30px_rgba(30,58,95,0.08)] overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary px-4 py-1.5 rounded-bl-xl">
                <span className="font-label-sm text-label-sm text-on-primary font-bold tracking-wide">SCELTO</span>
              </div>
              <div className="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">{chosen.name}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">{chosen.zone} · {chosen.type}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-headline-sm text-headline-sm text-primary">€{chosen.price_total}</p>
                    <p className="font-label-sm text-label-sm text-outline">totale (2 pers.)</p>
                  </div>
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant mb-5 leading-relaxed">{chosen.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  <div className="flex items-center gap-2.5 bg-surface-container/60 rounded-xl px-3.5 py-2.5">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-body-md text-[13px] text-on-surface-variant">{chosen.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-surface-container/60 rounded-xl px-3.5 py-2.5">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-body-md text-[13px] text-on-surface-variant">{chosen.phone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {(chosen.features || []).map((f: string) => {
                    const Icon = iconMap[f] || Check
                    return (
                      <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-variant/70 text-on-surface-variant font-label-sm text-label-sm rounded-full border border-outline-variant/10">
                        <Icon className="w-3 h-3 text-primary" />
                        {f}
                      </span>
                    )
                  })}
                </div>

                <div className="flex flex-wrap gap-3">
                  {chosen.mapLink && (
                    <a href={chosen.mapLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-xl font-label-sm text-label-sm font-semibold hover:opacity-90 transition-all active:scale-95 shadow-sm">
                      <MapPin className="w-3.5 h-3.5" /> Vedi sulla Mappa <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {chosen.gps && (
                <div className="border-t border-outline-variant/10 px-5 sm:px-7 py-2.5 bg-surface-container/30">
                  <p className="font-label-sm text-label-sm text-outline flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    GPS: {chosen.gps.lat.toFixed(6)}, {chosen.gps.lng.toFixed(6)} ·
                    Coordinate: N {Math.floor(chosen.gps.lat)}° {(chosen.gps.lat % 1 * 60).toFixed(3)}, W {Math.floor(Math.abs(chosen.gps.lng))}° {(Math.abs(chosen.gps.lng) % 1 * 60).toFixed(3)}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {alternatives.map((alt: any, i: number) => (
            <motion.div key={alt.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]">
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-label-md text-label-md text-on-surface font-semibold">{alt.name}</h4>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary font-label-sm text-label-sm rounded-md shrink-0">€{alt.price_per_night}/notte</span>
                </div>
                <p className="font-label-sm text-label-sm text-outline mb-2">{alt.zone} · {alt.type}</p>
                <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed mb-3 line-clamp-2">{alt.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(alt.features || []).slice(0, 3).map((f: string) => (
                    <span key={f} className="px-2 py-0.5 bg-surface-variant/60 text-on-surface-variant font-label-sm text-label-sm rounded-md">{f}</span>
                  ))}
                </div>
                {alt.mapLink && (
                  <a href={alt.mapLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline">
                    <MapPin className="w-3 h-3" /> Mappa
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
