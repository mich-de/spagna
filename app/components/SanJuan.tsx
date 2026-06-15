'use client'

import { motion } from 'framer-motion'
import { Flame, Clock, AlertTriangle, Backpack, MapPin, Sparkles, Map, Star } from 'lucide-react'
import sj from '@/data/san-juan.json'

export default function SanJuan() {
  return (
    <section id="sanjuan" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Flame className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Evento Speciale</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">La Noche de San Juan</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-3xl">{sj.description}</p>
        </motion.div>

        <div className="bg-surface-container rounded-xl p-6 sm:p-8 border border-primary/20 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Piano ora per ora
              </h3>
              <div className="space-y-2">
                {Object.entries(sj.schedule).map(([time, activity]) => (
                  <div key={time} className="flex items-start gap-3 p-2.5 bg-surface-container-lowest rounded-lg border border-outline-variant/20">
                    <span className="font-label-md text-label-md text-primary min-w-[60px]">{time}</span>
                    <span className="font-body-md text-[14px] text-on-surface-variant">{activity as string}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 shadow-sm">
                <h4 className="font-label-md text-label-md text-on-surface mb-2 flex items-center gap-1.5">
                  <Backpack className="w-4 h-4 text-primary" /> Cosa portare
                </h4>
                <ul className="space-y-1">
                  {sj.whatToBring.map((item: string) => (
                    <li key={item} className="font-body-md text-[13px] text-on-surface-variant flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 shadow-sm">
                <h4 className="font-label-md text-label-md text-on-surface mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-tertiary" /> Regole da sapere
                </h4>
                <ul className="space-y-1">
                  {sj.restrictions.map((item: string) => (
                    <li key={item} className="font-body-md text-[13px] text-on-surface-variant flex items-start gap-1.5">
                      <span className="text-tertiary mt-0.5">⚠</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" /> Dove andare
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {sj.spots.map((spot: any, i: number) => (
            <motion.div key={spot.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-xl p-4 border shadow-[0px_4px_12px_rgba(30,58,95,0.08)] hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] transition-all hover:scale-[0.98] ${
                spot.name === sj.recommendedSpot
                  ? 'bg-primary-container/20 border-primary/30 ring-1 ring-primary/20'
                  : 'bg-surface-container-lowest border-outline-variant/30'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-label-md text-label-md text-on-surface font-bold">{spot.name}</h4>
                {spot.name === sj.recommendedSpot && (
                  <span className="font-label-sm text-label-sm px-1.5 py-0.5 bg-primary text-on-primary rounded font-bold">TOP</span>
                )}
              </div>
              <p className="font-body-md text-[13px] text-on-surface-variant mb-1">{spot.zone}</p>
              <p className="font-body-md text-[13px] text-on-surface-variant mb-2">{spot.vibe}</p>
              <div className="flex items-center gap-2 font-body-md text-[12px] text-on-surface-variant">
                <Sparkles className="w-3 h-3 text-primary" />
                Social: {spot.social}/10 · Autentico: {spot.authenticity}/10
              </div>
              <div className="mt-2 font-body-md text-[12px] text-on-surface-variant">
                <p>🚗 {spot.parking}</p>
                <p>🚕 {spot.transport}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <a href={spot.mapLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors">
                  <Map className="w-3 h-3" /> Maps
                </a>
                <a href={spot.tripadvisorLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                  <Star className="w-3 h-3" /> TA
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-5 bg-gradient-to-r from-primary via-primary/90 to-secondary rounded-xl text-on-primary text-center shadow-md">
          <p className="font-headline-sm text-headline-sm font-bold mb-1">🔥 LA NOTTE PIÙ BELLA DELL&apos;ANNO</p>
          <p className="text-on-primary/80 font-body-md text-body-md">23 giugno 2026 — Arriva fresco, porta birra e costume, non fermarti fino all&apos;alba</p>
        </div>
      </div>
    </section>
  )
}
