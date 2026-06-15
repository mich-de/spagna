'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Wallet, DollarSign } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import budgetData from '@/data/budget.json'

const levels = [
  { key: 'low', label: 'Low', icon: '€' },
  { key: 'medium', label: 'Medio', icon: '€€' },
  { key: 'comfort', label: 'Comfort', icon: '€€€' },
  { key: 'premium', label: 'Premium', icon: '€€€€' },
]

const categories = [
  { key: 'flights_total', label: 'Volo A/R', color: '#1B4965' },
  { key: 'accommodation_total', label: 'Alloggio', color: '#9e3d1d' },
  { key: 'car_rental_total', label: 'Auto', color: '#455f87' },
  { key: 'restaurants_total', label: 'Ristoranti', color: '#79542b' },
  { key: 'beach_clubs_total', label: 'Beach Club', color: '#be5433' },
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
    return splitMode === 'split' && sharedKeys.includes(key) ? Math.round(val / 2) : val
  }

  const barData = categories.map((cat) => ({ name: cat.label, value: getCategoryValue(cat.key), fill: cat.color }))
  const totalEstimated = barData.reduce((sum, item) => sum + item.value, 0)
  const perDay = Math.round(totalEstimated / 7)

  return (
    <section id="budget" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Finanze di Viaggio</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Analisi del Budget</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-2xl">Una stima dettagliata dei costi per garantire un'esperienza premium senza sorprese.</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-1.5">
            {levels.map((lvl) => (
              <button key={lvl.key} onClick={() => setActiveLevel(lvl.key)}
                className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all ${
                  activeLevel === lvl.key
                    ? 'bg-secondary text-on-secondary shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:border-secondary/50'
                }`}>
                {lvl.icon} {lvl.label}
              </button>
            ))}
          </div>
          <div className="flex bg-surface-container-lowest p-1 rounded-lg border border-outline-variant/30 self-start sm:self-auto shadow-sm">
            <button onClick={() => setSplitMode('single')}
              className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-all ${
                splitMode === 'single' ? 'bg-secondary text-on-secondary shadow-sm' : 'text-on-surface-variant hover:text-primary'
              }`}>
              👤 Singolo
            </button>
            <button onClick={() => setSplitMode('split')}
              className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-all ${
                splitMode === 'split' ? 'bg-secondary text-on-secondary shadow-sm' : 'text-on-surface-variant hover:text-primary'
              }`}>
              👥 2 Amici
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Riepilogo
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-surface-container rounded-lg">
                <p className="font-label-sm text-label-sm text-on-surface-variant">Totale stimato {splitMode === 'split' && '(a persona)'}</p>
                <p className="font-headline-sm text-headline-sm text-on-surface">€{totalEstimated.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-surface-container rounded-lg">
                <p className="font-label-sm text-label-sm text-on-surface-variant">Costo giornaliero {splitMode === 'split' && '(a persona)'}</p>
                <p className="font-headline-sm text-headline-sm text-on-surface">€{perDay.toLocaleString()}/giorno</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Distribuzione spese</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <XAxis dataKey="name" tick={isMobile ? false : { fontSize: 10, fill: '#8a726b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#8a726b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#fff8f3', border: '1px solid rgba(158,61,29,0.2)', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(value: number) => [`€${value}`, '']}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                  {barData.map((entry, i) => (<Cell key={i} fill={entry.fill} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {categories.map((cat) => {
            const isShared = sharedKeys.includes(cat.key)
            const val = getCategoryValue(cat.key)
            return (
              <div key={cat.key} className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="font-body-md text-[13px] text-on-surface-variant">
                    {cat.label} {splitMode === 'split' && isShared && <span className="text-[11px] text-outline font-normal">(condiviso)</span>}
                  </span>
                </div>
                <span className="font-label-md text-label-md text-on-surface">€{val}</span>
              </div>
            )
          })}
        </div>

        <div className="mt-4 p-4 bg-surface-container rounded-lg font-body-md text-[13px] text-on-surface-variant border border-outline-variant/20">
          <Wallet className="w-4 h-4 inline mr-1" />
          I prezzi sono stimati per giugno 2026. Prenota auto e beach club con anticipo per evitare rincari dell'ultimo minuto.
        </div>
      </div>
    </section>
  )
}
