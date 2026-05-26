'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Wallet } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Sector
} from 'recharts'
import budgetData from '@/data/budget.json'

const levels = [
  { key: 'medium', label: 'Medio', icon: '€' },
  { key: 'comfort', label: 'Comfort', icon: '€€' },
  { key: 'premium', label: 'Premium', icon: '€€€' },
]

const categories = [
  { key: 'flights_total', label: 'Volo A/R', color: '#1B4965' },
  { key: 'accommodation_total', label: 'Alloggio', color: '#E07A5F' },
  { key: 'car_rental_total', label: 'Auto', color: '#D4A373' },
  { key: 'restaurants_total', label: 'Ristoranti', color: '#3B89A8' },
  { key: 'beach_clubs_total', label: 'Beach Club', color: '#CD5C5C' },
  { key: 'nightlife_total', label: 'Nightlife', color: '#8B5CF6' },
  { key: 'museums_total', label: 'Musei', color: '#10B981' },
  { key: 'fuel_total', label: 'Carburante', color: '#F59E0B' },
  { key: 'parking_total', label: 'Parcheggi', color: '#6B7280' },
  { key: 'groceries_spuntini_total', label: 'Spuntini', color: '#EC4899' },
]

export default function Budget() {
  const [activeLevel, setActiveLevel] = useState<string>('comfort')

  const current = budgetData[activeLevel as keyof typeof budgetData] as any

  const barData = categories.map((cat) => ({
    name: cat.label,
    value: current[cat.key] || 0,
    fill: cat.color,
  }))

  const pieData = categories
    .map((cat) => ({ name: cat.label, value: current[cat.key] || 0 }))
    .filter((d) => d.value > 0)

  return (
    <section id="budget" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Pianificazione finanziaria</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Budget</h2>
        </motion.div>

        <div className="flex gap-2 mb-6">
          {levels.map((lvl) => (
            <button
              key={lvl.key}
              onClick={() => setActiveLevel(lvl.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeLevel === lvl.key
                  ? 'bg-terracotta-500 text-white shadow-md'
                  : 'bg-white/70 text-mare-600 border border-terracotta-100/40 hover:bg-terracotta-50'
              }`}
            >
              {lvl.icon} {lvl.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-1 bg-white/70 rounded-2xl p-5 border border-terracotta-100/40">
            <h3 className="font-display text-lg font-bold text-notte mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-terracotta-500" /> Riepilogo
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-terracotta-50 to-crema rounded-xl">
                <p className="text-xs text-mare-500">Totale stimato</p>
                <p className="font-display text-2xl font-bold text-notte">
                  €{current.total_estimated.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-mare-50 rounded-xl">
                <p className="text-xs text-mare-500">Costo giornaliero</p>
                <p className="font-display text-xl font-bold text-notte">
                  €{current.per_day.toLocaleString()}/giorno
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white/70 rounded-2xl p-5 border border-terracotta-100/40">
            <h3 className="font-display text-lg font-bold text-notte mb-3">Distribuzione spese</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#FAF8F5', border: '1px solid rgba(231,141,106,0.2)', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(value: number) => [`€${value}`, '']}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {categories.map((cat) => (
            <div key={cat.key} className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-terracotta-100/30">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-xs text-mare-700">{cat.label}</span>
              </div>
              <span className="text-sm font-medium text-notte">€{current[cat.key]}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-mare-50 to-terracotta-50 rounded-xl text-xs text-mare-600">
          <Wallet className="w-4 h-4 inline mr-1" />
          I prezzi sono stimati per giugno 2026. Prenota auto e beach club con anticipo per evitare rincari dell&apos;ultimo minuto.
        </div>
      </div>
    </section>
  )
}
