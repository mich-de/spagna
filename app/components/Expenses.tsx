'use client'

import { motion } from 'framer-motion'
import { Receipt, CreditCard, ArrowRight, Users, ReceiptText } from 'lucide-react'
import expensesData from '@/data/expenses.json'

const travelers = expensesData.travelers

export default function Expenses() {
  const totalSpent = expensesData.expenses.reduce((sum, e) => sum + e.total, 0)

  const paidByMDA = expensesData.expenses
    .filter(e => e.paid_by === 'MDA')
    .reduce((sum, e) => sum + e.total, 0)

  const paidByROG = expensesData.expenses
    .filter(e => e.paid_by === 'ROG')
    .reduce((sum, e) => sum + e.total, 0)

  const perPerson = totalSpent / 2

  const balance = paidByROG - paidByMDA

  return (
    <section id="expenses" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-12">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-terracotta-500 mb-2">
            <ReceiptText className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-[0.3em]">Cassa Comune</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-notte leading-tight">
            Gestione <span className="italic font-medium text-terracotta-500">Spese</span> Effettive
          </h2>
          <p className="text-mare-700/70 text-base sm:text-lg mt-3 max-w-2xl font-body leading-relaxed">
            Monitoraggio in tempo reale dei pagamenti effettuati e bilancio tra i partecipanti.
          </p>
        </motion.div>

        {/* Riepilogo rapido */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          <div className="bg-white/70 rounded-2xl p-4 border border-terracotta-100/40">
            <p className="text-xs text-mare-500 mb-1">Totale speso</p>
            <p className="font-display text-2xl font-bold text-notte">€{totalSpent.toFixed(2)}</p>
          </div>
          <div className="bg-white/70 rounded-2xl p-4 border border-terracotta-100/40">
            <p className="text-xs text-mare-500 mb-1">Pagato da MDA</p>
            <p className="font-display text-2xl font-bold" style={{ color: travelers[0].color }}>€{paidByMDA.toFixed(2)}</p>
          </div>
          <div className="bg-white/70 rounded-2xl p-4 border border-terracotta-100/40">
            <p className="text-xs text-mare-500 mb-1">Pagato da ROG</p>
            <p className="font-display text-2xl font-bold" style={{ color: travelers[1].color }}>€{paidByROG.toFixed(2)}</p>
          </div>
          <div className="bg-white/70 rounded-2xl p-4 border border-terracotta-100/40">
            <p className="text-xs text-mare-500 mb-1">A testa (2 persone)</p>
            <p className="font-display text-2xl font-bold text-notte">€{perPerson.toFixed(2)}</p>
          </div>
        </motion.div>

        {/* Bilancio */}
        {balance > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-mare-50 rounded-2xl border border-blue-100/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-mare-600">
                  <span className="font-semibold" style={{ color: travelers[0].color }}>MDA</span>
                  {' '}deve dare <span className="font-semibold text-notte">€{balance.toFixed(2)}</span> a ROG
                </p>
                <p className="text-xs text-mare-400 mt-0.5">
                  Differenza calcolata sulle spese confermate (escluso noleggio auto TBD)
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-full">
                  MDA → ROG €{balance.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
        {balance < 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-mare-50 rounded-2xl border border-blue-100/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-mare-600">
                  <span className="font-semibold" style={{ color: travelers[1].color }}>ROG</span>
                  {' '}deve dare <span className="font-semibold text-notte">€{Math.abs(balance).toFixed(2)}</span> a MDA
                </p>
                <p className="text-xs text-mare-400 mt-0.5">
                  Differenza calcolata sulle spese confermate (escluso noleggio auto TBD)
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-full">
                  ROG → MDA €{Math.abs(balance).toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Lista spese */}
        <div className="space-y-3">
          {expensesData.expenses.map((expense, i) => {
            const payer = travelers.find(t => t.id === expense.paid_by)

            return (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                className="bg-white/70 rounded-2xl border border-terracotta-100/40 overflow-hidden"
              >
                <div className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-xl bg-terracotta-100 flex items-center justify-center shrink-0">
                    <Receipt className="w-5 h-5 text-terracotta-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-notte truncate">{expense.description}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: payer?.color + '20', color: payer?.color }}
                      >
                        {expense.paid_by}
                      </span>
                      <span className="text-[10px] text-mare-400">{expense.date}</span>
                      <span className="text-[10px] text-mare-400">•</span>
                      <span className="text-[10px] text-mare-400">{expense.payment_method}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-display text-lg font-bold text-notte">€{expense.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-terracotta-100/30">
                  <div className="p-4 space-y-2">
                    {expense.items.map((item, j) => (
                      <div key={j} className="flex items-center justify-between py-1.5">
                        <div className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-mare-300" />
                          <span className="text-xs text-mare-600">{item.label}</span>
                          {item.note && (
                            <span className="text-[10px] text-mare-400 italic">({item.note})</span>
                          )}
                        </div>
                        <span className={`text-xs font-medium ${item.amount === 0 ? 'text-mare-400' : 'text-notte'}`}>
                          {item.amount === 0 ? '—' : `€${item.amount.toFixed(2)}`}
                        </span>
                      </div>
                    ))}
                    {expense.note && (
                      <div className="mt-2 p-2 bg-crema rounded-lg">
                        <p className="text-[10px] text-mare-500 italic">{expense.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-mare-50 to-terracotta-50 rounded-xl text-xs text-mare-600">
          <CreditCard className="w-4 h-4 inline mr-1" />
          Le spese vengono aggiornate man mano che vengono sostenute. Il bilancio tiene conto di chi ha pagato.
        </div>
      </div>
    </section>
  )
}
