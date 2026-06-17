'use client'

import { motion } from 'framer-motion'
import { Star, CalendarDays, Plane, Car, Thermometer, MapPin, ArrowDown, Check, X, Plus, Minus, ChevronRight } from 'lucide-react'
import trip from '@/data/trip.json'
import recommendedBase from '@/data/recommended-base.json'

export default function Overview() {
  const nerjaHeroImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Burriana_%286861858288%29.jpg/1280px-Burriana_%286861858288%29.jpg'

  return (
    <section id="overview" className="scroll-mt-20">
      {/* ─── Hero ─── */}
      <div className="relative w-full h-[819px] md:h-screen flex items-center justify-center overflow-hidden bg-surface-container-high">
        <img src={nerjaHeroImage} alt="Playa de Burriana, Nerja" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-surface-container-high/50 to-surface-container-high/90" />
        <div className="absolute inset-0 bg-[rgba(34,26,15,0.45)]" />
        <div className="relative z-10 text-center px-container-margin md:px-0 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-tertiary-container/50 bg-surface/10 backdrop-blur-sm"
          >
            <Star className="w-3.5 h-3.5 text-tertiary-fixed mr-2 fill-current" />
            <span className="font-label-sm text-label-sm text-tertiary-fixed tracking-widest uppercase">Confirmed Journey</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display-lg text-display-lg-mobile md:text-[80px] md:leading-[88px] text-on-primary mb-4"
          >
            {trip.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-headline-sm text-headline-sm text-surface-container-low font-light tracking-wide"
          >
            {trip.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 animate-bounce"
          >
            <ArrowDown className="w-8 h-8 text-on-primary opacity-80" />
          </motion.div>
        </div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-surface-container-high/95 via-surface-container-high/40 to-transparent z-10" />
      </div>

      {/* ─── Main content area ─── */}
      <div className="max-w-7xl mx-auto px-container-margin md:px-lg py-xl relative z-20 -mt-16 md:-mt-32">
        {/* ─── Overview Bento Grid ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8"
        >
          {[
            { icon: CalendarDays, label: 'Dates', value: '19→25 Giu 2026', sub: '7 Days, 6 Nights', circle: 'bg-secondary-container text-on-secondary-container' },
            { icon: Plane, label: 'Arrival', value: 'AGP', sub: 'Málaga Airport', circle: 'bg-tertiary-container/20 text-tertiary' },
            { icon: Car, label: 'Transport', value: 'SUV Rental', sub: 'Premium Class', circle: 'bg-surface-variant text-on-surface-variant' },
            { icon: Thermometer, label: 'Weather', value: `${trip.weather.temp_max}°C`, sub: trip.weather.conditions, circle: 'bg-primary-fixed text-primary' },
            { icon: MapPin, label: 'Style', value: 'Mediterranean', sub: 'Luxury Vibe', circle: 'bg-surface-tint/10 text-primary' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="bg-surface-container-lowest rounded-xl p-4 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] card-hover border border-outline-variant/30 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">{item.label}</span>
                <div className={`w-8 h-8 rounded-full ${item.circle} flex items-center justify-center`}>
                  <item.icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm text-on-surface">{item.value}</div>
                <div className="font-body-md text-body-md text-on-surface-variant mt-1">{item.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Gradient Divider ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-xl" />

        {/* ─── Recommendation Section ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface mb-5">Base Consigliata</h2>
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_4px_12px_rgba(30,58,95,0.08)] card-hover border border-outline-variant/20 flex flex-col md:flex-row">
            <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-surface-container-high">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center shadow-md">
                <Star className="w-3.5 h-3.5 mr-1 fill-current" /> Winner
              </div>
              <img
                src="/images/beaches/balcon-de-europa.jpg"
                alt="Nerja Centro"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6 w-full md:w-3/5 flex flex-col justify-center">
              <h3 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2">{recommendedBase.winner}</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">{recommendedBase.reason}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <div className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-3 flex items-center">
                    <Plus className="w-3.5 h-3.5 mr-2 text-secondary" />
                    Advantages
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5 mr-2" />
                      <span className="font-body-md text-body-md text-on-surface">Authentic Spanish atmosphere</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5 mr-2" />
                      <span className="font-body-md text-body-md text-on-surface">Spectacular cliffside views</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5 mr-2" />
                      <span className="font-body-md text-body-md text-on-surface">Excellent high-end gastronomy</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="font-label-md text-label-md text-tertiary uppercase tracking-widest mb-3 flex items-center">
                    <Minus className="w-3.5 h-3.5 mr-2 text-tertiary" />
                    Considerations
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <X className="w-4 h-4 text-outline shrink-0 mt-0.5 mr-2" />
                      <span className="font-body-md text-body-md text-on-surface-variant">Further from AGP airport (45 min)</span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-4 h-4 text-outline shrink-0 mt-0.5 mr-2" />
                      <span className="font-body-md text-body-md text-on-surface-variant">Hilly terrain requires walking</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-outline-variant/30">
                <button className="w-full md:w-auto px-6 py-3 bg-secondary text-on-secondary rounded-full font-label-md text-label-md hover:bg-secondary/90 transition-colors shadow-sm flex items-center justify-center">
                  View Accommodations in {recommendedBase.winner}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
