'use client'

import { motion } from 'framer-motion'
import { Flame, Clock, AlertTriangle, Backpack, MapPin, Sparkles, Map, Star } from 'lucide-react'
import sj from '@/data/san-juan.json'

export default function SanJuan() {
  return (
    <section id="sanjuan" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <p className="text-sm text-red-500 font-medium uppercase tracking-widest mb-1 flex items-center gap-2">
            <Flame className="w-4 h-4" /> Evento speciale
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">{sj.title}</h2>
          <p className="text-mare-700/70 mt-2 max-w-2xl">{sj.description}</p>
        </motion.div>

        <div className="bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 rounded-2xl p-6 sm:p-8 border border-red-200/50 san-juan-glow mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="font-display text-lg font-semibold text-notte mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" /> Piano ora per ora
              </h3>
              <div className="space-y-2">
                {Object.entries(sj.schedule).map(([time, activity]) => (
                  <div key={time} className="flex items-start gap-3 p-2.5 bg-white/60 rounded-xl">
                    <span className="text-sm font-bold text-red-600 min-w-[60px]">{time}</span>
                    <span className="text-sm text-mare-700/80">{activity as string}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/60 rounded-xl p-4">
                <h4 className="font-display font-semibold text-sm text-notte mb-2 flex items-center gap-1.5">
                  <Backpack className="w-4 h-4 text-red-500" /> Cosa portare
                </h4>
                <ul className="space-y-1">
                  {sj.whatToBring.map((item: string) => (
                    <li key={item} className="text-xs text-mare-700/70 flex items-start gap-1.5">
                      <span className="text-red-400 mt-0.5">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/60 rounded-xl p-4">
                <h4 className="font-display font-semibold text-sm text-notte mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Regole da sapere
                </h4>
                <ul className="space-y-1">
                  {sj.restrictions.map((item: string) => (
                    <li key={item} className="text-xs text-mare-700/70 flex items-start gap-1.5">
                      <span className="text-amber-400 mt-0.5">⚠</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3 className="font-display text-xl font-semibold text-notte mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-terracotta-500" /> Dove andare
        </h3>
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto sm:overflow-visible gap-3 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 mb-6">
          {sj.spots.map((spot: any, i: number) => (
            <motion.div
              key={spot.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-2xl p-4 border card-shadow card-hover min-w-[85vw] xs:min-w-[300px] sm:min-w-0 snap-center ${
                spot.name === sj.recommendedSpot
                  ? 'bg-gradient-to-br from-red-50 to-amber-50 border-red-200 ring-1 ring-red-300'
                  : 'bg-white/70 border-terracotta-100/40'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-display font-bold text-sm text-notte">{spot.name}</h4>
                {spot.name === sj.recommendedSpot && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-red-500 text-white rounded font-bold">TOP</span>
                )}
              </div>
              <p className="text-xs text-mare-500 mb-1">{spot.zone}</p>
              <p className="text-xs text-mare-700/70 mb-2">{spot.vibe}</p>
              <div className="flex items-center gap-2 text-xs text-mare-600">
                <Sparkles className="w-3 h-3 text-terracotta-500" />
                Social: {spot.social}/10 · Autentico: {spot.authenticity}/10
              </div>
              <div className="mt-2 text-[11px] text-mare-500">
                <p>🚗 {spot.parking}</p>
                <p>🚕 {spot.transport}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <a
                  href={spot.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                >
                  <Map className="w-3 h-3" /> Maps
                </a>
                <a
                  href={spot.tripadvisorLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  <Star className="w-3 h-3" /> TA
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-5 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-2xl text-white text-center">
          <p className="font-display text-xl font-bold mb-1">🔥 LA NOTTE PIÙ BELLA DELL&apos;ANNO</p>
          <p className="text-white/80 text-sm">23 giugno 2026 — Arriva fresco, porta birra e costume, non fermarti fino all&apos;alba</p>
        </div>
      </div>
    </section>
  )
}
