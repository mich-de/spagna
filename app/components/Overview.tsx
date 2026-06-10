'use client'

import { motion } from 'framer-motion'
import { CalendarDays, Plane, Car, Thermometer, MapPin, Star } from 'lucide-react'
import trip from '@/data/trip.json'
import recommendedBase from '@/data/recommended-base.json'

export default function Overview() {
  return (
    <section
      id="overview"
      className="scroll-mt-20 px-4 sm:px-6 pt-8 pb-4 relative
        bg-gradient-to-b from-terracotta-50/20 via-transparent to-mare-50/10"
    >
      <div className="max-w-[1920px] mx-auto">
        {/* ─── Hero title ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-terracotta-500 mb-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium uppercase tracking-[0.3em]">Tour Operator Premium</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-notte leading-[1.1] tracking-tight">
            <span className="gradient-text">{trip.title.split(' ').slice(0, -1).join(' ')} </span>
            <span className="italic font-medium text-terracotta-500">{trip.title.split(' ').slice(-1)}</span>
          </h1>
          <p className="text-lg sm:text-xl text-mare-700/70 mt-4 max-w-2xl font-body leading-relaxed">
            {trip.subtitle}
          </p>
        </motion.div>

        {/* ─── Trip metadata grid ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          {[
            { icon: CalendarDays, label: 'Date', value: '19 → 25 Giu 2026' },
            { icon: Plane, label: 'Arrivo', value: trip.arrival },
            { icon: Car, label: 'Trasporto', value: trip.transport },
            { icon: Thermometer, label: 'Clima', value: `${trip.weather.temp_min}°–${trip.weather.temp_max}°C, ${trip.weather.conditions}` },
            { icon: MapPin, label: 'Stile', value: trip.style },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="glass rounded-2xl p-4 border border-terracotta-100/40 card-shadow card-hover"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-terracotta-100 to-crema flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-terracotta-600" />
                </div>
                <div>
                  <p className="text-xs text-mare-700/50 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-medium text-notte">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Trip badges ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {trip.badges.map((badge: string, i: number) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.05 }}
              className="badge-pill text-sm"
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>

        {/* ─── Recommendation card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="relative rounded-2xl overflow-hidden card-shadow card-hover img-zoom"
        >
          {/* Main card */}
          <div className="bg-gradient-to-br from-mare-800 via-mare-700 to-mare-900 p-6 sm:p-8 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-terracotta-500/8 rounded-full -translate-y-1/3 translate-x-1/4 blur-xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-oro/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-lg" />
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

            {/* Andalusian-inspired geometric pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #ffffff 1px, transparent 1px),
                  linear-gradient(-45deg, #ffffff 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px',
              }}
            />

            {/* Decorative border accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-oro to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-oro/50 to-transparent" />

            {/* Corner seal — Tour Operator Pick */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                <svg viewBox="0 0 80 80" className="w-full h-full">
                  <defs>
                    <linearGradient id="seal-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#D4A373" />
                      <stop offset="100%" stopColor="#E07A5F" />
                    </linearGradient>
                  </defs>
                  <circle cx="40" cy="40" r="38" fill="none" stroke="url(#seal-grad)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
                  <circle cx="40" cy="40" r="35" fill="none" stroke="url(#seal-grad)" strokeWidth="0.5" opacity="0.3" />
                  <text x="40" y="36" textAnchor="middle" fill="#D4A373" fontSize="9" fontWeight="600" fontFamily="serif" letterSpacing="1">TOUR</text>
                  <text x="40" y="48" textAnchor="middle" fill="#E07A5F" fontSize="7" fontWeight="600" fontFamily="sans-serif" letterSpacing="0.5">PICK</text>
                </svg>
              </div>
            </div>

            <div className="relative z-10 max-w-4xl">
              {/* Section label */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-oro to-terracotta-500 flex items-center justify-center">
                  <span className="text-mare-900 text-[10px] font-bold">★</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-terracotta-300 font-medium">
                  Raccomandazione Tour Operator
                </span>
              </div>

              {/* Editorial heading */}
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">
                La scelta migliore?{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-oro via-oro to-terracotta-400">
                  {recommendedBase.winner}
                </span>
              </h3>

              {/* Decorative divider */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-oro/40 via-oro/20 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-oro/60" />
                <div className="h-px flex-1 bg-gradient-to-l from-oro/40 via-oro/20 to-transparent" />
              </div>

              {/* Reason */}
              <p className="text-white/70 leading-relaxed text-sm sm:text-base max-w-3xl font-body">
                {recommendedBase.reason}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  { emoji: '🥇', label: 'Vincitore', value: recommendedBase.winner },
                  { emoji: '🥈', label: 'Seconda scelta', value: recommendedBase.secondChoice },
                  { emoji: '🌙', label: 'Nightlife', value: recommendedBase.alternativeNightlife },
                  { emoji: '🧘', label: 'Relax', value: recommendedBase.alternativeRelax },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.08 }}
                    className="group relative"
                  >
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                      bg-white/5 hover:bg-white/10 border border-white/10 hover:border-oro/30
                      transition-all duration-300 cursor-default"
                    >
                      <span className="text-xs">{item.emoji}</span>
                      <span className="text-xs text-white/50 hidden sm:inline">{item.label}:</span>
                      <span className="text-xs font-medium text-white/90">{item.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}