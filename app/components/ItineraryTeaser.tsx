'use client'

import { motion } from 'framer-motion'
import { Sun, ArrowRight, MapPin, Waves, Utensils, Moon } from 'lucide-react'
import itinerary from '@/data/itinerary.json'
import Link from 'next/link'

const dayIcons: Record<string, any> = {
  'Ven': Sun,
  'Sab': Waves,
  'Dom': MapPin,
  'Lun': Utensils,
  'Mar': Moon,
  'Mer': Sun,
  'Gio': ArrowRight,
}

export default function ItineraryTeaser() {
  return (
    <section id="itinerary-teaser" className="scroll-mt-20 px-container-margin md:px-lg pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Sun className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Programma Settimanale</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">
            La settimana <span className="italic text-primary">giorno per giorno</span>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-3xl">
            Itinerario ottimizzato da Nerja: mare al mattino, cibo di qualità, tramonto e movida over 35. Tutti i dettagli nella pagina dedicata.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {(itinerary as any[]).slice(0, 7).map((day, idx) => {
            const Icon = dayIcons[day.dayName] || Sun
            return (
              <motion.div key={day.date} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                className="bg-surface-container-lowest rounded-2xl card-hover border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] p-sm hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] transition-all duration-200 hover:scale-[0.99]">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{day.dayName} {day.date.slice(8)}/{day.date.slice(5, 7)}</span>
                  <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="font-label-md text-label-md text-on-surface font-bold mb-2 line-clamp-2">{day.title}</h4>
                <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed line-clamp-3">{day.evening} {day.night && `→ ${day.night}`}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {day.beach && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm">{day.beach}</span>}
                  {day.club && <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm">{day.club}</span>}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Link href="/itinerary"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-full font-label-md text-label-md font-bold shadow-md hover:shadow-lg hover:scale-[0.98] transition-all">
            Vedi itinerario completo <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
