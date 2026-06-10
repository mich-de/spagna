'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Wallet, DollarSign } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import budgetData from '@/data/budget.json'

const levels = [
  { key: 'low', label: 'Low', icon: '€' },
  { key: 'medium', label: 'Medio', icon: '€€' },
  { key: 'comfort', label: 'Comfort', icon: '€€€' },
  { key: 'premium', label: 'Premium', icon: '€€€€' },
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
  const [splitMode, setSplitMode] = useState<'single' | 'split'>('split')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 640)
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const current = budgetData[activeLevel as keyof typeof budgetData] as any

  const sharedKeys = ['accommodation_total', 'car_rental_total', 'fuel_total', 'parking_total']

  const getCategoryValue = (key: string) => {
    const val = current[key] || 0
    if (splitMode === 'split' && sharedKeys.includes(key)) {
      return Math.round(val / 2)
    }
    return val
  }

  const barData = categories.map((cat) => ({
    name: cat.label,
    value: getCategoryValue(cat.key),
    fill: cat.color,
  }))

  const totalEstimated = barData.reduce((sum, item) => sum + item.value, 0)
  const perDay = Math.round(totalEstimated / 7)

  return (
    <section id="budget" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-12">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-terracotta-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-[0.3em]">Finanze di Viaggio</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-notte leading-tight">
            Analisi del <span className="italic font-medium text-terracotta-500">Budget</span>
          </h2>
          <p className="text-mare-700/70 text-base sm:text-lg mt-3 max-w-2xl font-body leading-relaxed">
            Una stima dettagliata dei costi per garantire un&apos;esperienza premium senza sorprese.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-row flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-x-visible scrollbar-hide gap-1.5 pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 whitespace-nowrap sm:whitespace-normal">
            {levels.map((lvl) => (
              <button
                key={lvl.key}
                onClick={() => setActiveLevel(lvl.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shrink-0 ${
                  activeLevel === lvl.key
                    ? 'bg-terracotta-500 text-white shadow-md'
                    : 'bg-white/70 text-mare-600 border border-terracotta-100/40 hover:bg-terracotta-50'
                }`}
              >
                  {lvl.icon} {lvl.label}
              </button>
            ))}
          </div>

          {/* Divisione Spese Toggle */}
          <div className="flex bg-white/70 p-1 rounded-xl border border-terracotta-100/40 self-start sm:self-auto shadow-sm">
            <button
              onClick={() => setSplitMode('single')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                splitMode === 'single'
                  ? 'bg-terracotta-500 text-white shadow-sm'
                  : 'text-mare-600 hover:text-terracotta-600'
              }`}
            >
              👤 Singolo
            </button>
            <button
              onClick={() => setSplitMode('split')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                splitMode === 'split'
                  ? 'bg-terracotta-500 text-white shadow-sm'
                  : 'text-mare-600 hover:text-terracotta-600'
              }`}
            >
              👥 2 Amici (Dividi spese)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-1 bg-white/70 rounded-2xl p-5 border border-terracotta-100/40">
            <h3 className="font-display text-lg font-bold text-notte mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-terracotta-500" /> Riepilogo
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-terracotta-50 to-crema rounded-xl">
                <p className="text-xs text-mare-500">Totale stimato {splitMode === 'split' && '(a persona)'}</p>
                <p className="font-display text-2xl font-bold text-notte">
                  €{totalEstimated.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-mare-50 rounded-xl">
                <p className="text-xs text-mare-500">Costo giornaliero {splitMode === 'split' && '(a persona)'}</p>
                <p className="font-display text-xl font-bold text-notte">
                  €{perDay.toLocaleString()}/giorno
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white/70 rounded-2xl p-5 border border-terracotta-100/40">
            <h3 className="font-display text-lg font-bold text-notte mb-3">Distribuzione spese</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <XAxis dataKey="name" tick={isMobile ? false : { fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
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
          {categories.map((cat) => {
            const isShared = sharedKeys.includes(cat.key);
            const val = getCategoryValue(cat.key);
            return (
              <div key={cat.key} className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-terracotta-100/30">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-mare-700">
                    {cat.label} {splitMode === 'split' && isShared && <span className="text-[10px] text-mare-400 font-normal">(condiviso)</span>}
                  </span>
                </div>
                <span className="text-sm font-medium text-notte">€{val}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-mare-50 to-terracotta-50 rounded-xl text-xs text-mare-600">
          <Wallet className="w-4 h-4 inline mr-1" />
          I prezzi sono stimati per giugno 2026. Prenota auto e beach club con anticipo per evitare rincari dell&apos;ultimo minuto.
        </div>
      </div>
    </section>
  )
}