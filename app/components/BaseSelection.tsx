'use client'

import { motion } from 'framer-motion'
import { Check, X as XIcon } from 'lucide-react'
import bases from '@/data/bases.json'
import recommendedBase from '@/data/recommended-base.json'

const attributes = [
  { key: 'distance_airport_min', label: 'Distanza aeroporto', suffix: ' min', invert: true },
  { key: 'distance_marbella_min', label: 'Distanza Marbella', suffix: ' min', invert: true },
  { key: 'parking_ease', label: 'Parcheggio', suffix: '/10', max: 10 },
  { key: 'nightlife_level', label: 'Nightlife', suffix: '/10', max: 10 },
  { key: 'beach_quality', label: 'Spiagge', suffix: '/10', max: 10 },
  { key: 'authenticity', label: 'Autenticità', suffix: '/10', max: 10 },
  { key: 'social_ease', label: 'Socializzare', suffix: '/10', max: 10 },
]

function getColor(score: number, invert = false) {
  const val = invert ? 10 - score : score
  if (val >= 8) return 'bg-emerald-100 text-emerald-800 border-emerald-200'
  if (val >= 6) return 'bg-amber-100 text-amber-800 border-amber-200'
  if (val >= 4) return 'bg-orange-100 text-orange-800 border-orange-200'
  return 'bg-red-100 text-red-800 border-red-200'
}

export default function BaseSelection() {
  const sorted = [...bases].sort((a: any, b: any) => b.score - a.score)

  return (
    <section id="base" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Analisi strategica</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Scelta della base</h2>
        </motion.div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full px-4 sm:px-0">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-mare-700/50 uppercase tracking-wider">Attributo</th>
                  {sorted.map((b) => (
                    <th key={b.name} className="py-3 px-4 text-center">
                      <span className="font-display text-lg font-semibold text-notte">{b.name}</span>
                      {recommendedBase.winner === b.name && (
                        <span className="ml-1 text-xs text-terracotta-500">🏆</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr) => (
                  <tr key={attr.key} className="border-t border-terracotta-100/30">
                    <td className="py-3 px-4 text-sm text-mare-700/70">{attr.label}</td>
                    {sorted.map((b) => {
                      const val = (b as any)[attr.key]
                      const display = attr.max ? `${val}${attr.suffix}` : `${val}${attr.suffix}`
                      return (
                        <td key={b.name} className="py-3 px-4 text-center">
                          <span className={`inline-block px-2.5 py-1 rounded-lg text-sm font-medium border ${getColor(val, attr.invert)}`}>
                            {display}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                ))}
                <tr className="border-t-2 border-terracotta-200">
                  <td className="py-4 px-4 text-sm font-semibold text-notte">Punteggio finale</td>
                  {sorted.map((b) => (
                    <td key={b.name} className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold ${
                        b.score >= 9 ? 'bg-emerald-100 text-emerald-800' :
                        b.score >= 8 ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {b.score}/10
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {sorted.map((base, i) => (
            <motion.div
              key={base.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-5 border card-hover ${
                recommendedBase.winner === base.name
                  ? 'bg-gradient-to-br from-terracotta-50 to-crema border-terracotta-200'
                  : 'bg-white/70 border-terracotta-100/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-lg font-semibold text-notte">{base.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  base.score >= 9 ? 'bg-emerald-100 text-emerald-800' :
                  base.score >= 8 ? 'bg-blue-100 text-blue-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {base.score}/10
                </span>
              </div>
              <p className="text-xs text-mare-700/50 uppercase tracking-wider mb-2">{base.cost_level}</p>
              <div className="space-y-1.5 mb-3">
                {base.pros.map((p: string) => (
                  <p key={p} className="text-xs text-mare-700/70 flex items-start gap-1.5">
                    <Check className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                    {p}
                  </p>
                ))}
                {base.cons.map((c: string) => (
                  <p key={c} className="text-xs text-mare-700/50 flex items-start gap-1.5">
                    <XIcon className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />
                    {c}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
