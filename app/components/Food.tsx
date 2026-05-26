'use client'

import { motion } from 'framer-motion'
import foods from '@/data/food.json'
import restaurants from '@/data/restaurants.json'

const zones = ['Tutte', ...new Set(restaurants.map((r: any) => r.zone).sort())]

export default function Food() {
  return (
    <section id="food" className="px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Gastronomia andalusa</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Piatti tipici & Ristoranti</h2>
        </motion.div>

        <div className="mb-10">
          <h3 className="font-display text-xl font-semibold text-notte mb-4">🍤 Piatti da provare</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {foods.map((item: any, i: number) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/70 rounded-xl p-4 border border-terracotta-100/40 card-hover"
              >
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-display font-bold text-notte">{item.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    item.authenticity >= 9 ? 'bg-emerald-100 text-emerald-700' :
                    item.authenticity >= 7 ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {item.authenticity}/10
                  </span>
                </div>
                <p className="text-xs text-mare-700/60 mb-2">{item.description}</p>
                <div className="flex flex-wrap gap-1.5 text-xs text-mare-700/50">
                  <span className="px-2 py-0.5 bg-terracotta-50 rounded">🕐 {item.when}</span>
                  <span className="px-2 py-0.5 bg-terracotta-50 rounded">📍 {item.where}</span>
                </div>
                <p className="text-xs text-terracotta-600 mt-1.5 italic">🍷 {item.pairing}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl font-semibold text-notte mb-4">🍽 Ristoranti & Chiringuiti</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((r: any, i: number) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-terracotta-100/40 card-hover"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-display font-bold text-notte">{r.name}</h4>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-mare-100 text-mare-700">
                    {r.price}
                  </span>
                </div>
                <p className="text-xs text-mare-500 mb-1">{r.zone} · {r.type}</p>
                <p className="text-xs text-mare-700/60 mb-2">{r.description}</p>
                <p className="text-xs font-medium text-terracotta-600 mb-2">🔥 {r.specialty}</p>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  <span className={`px-2 py-0.5 rounded ${
                    r.reservation.includes('no') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {r.reservation.includes('no') ? 'Walk-in' : r.reservation}
                  </span>
                  <span className="px-2 py-0.5 bg-terracotta-50 text-mare-700 rounded">
                    🕐 {r.bestTime}
                  </span>
                </div>
                {r.localTip && (
                  <p className="text-xs text-terracotta-600 mt-2 italic border-t border-terracotta-100/30 pt-2">
                    💡 {r.localTip}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
