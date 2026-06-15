'use client'

import { motion } from 'framer-motion'
import { Receipt, CreditCard, ArrowRight, Users, ReceiptText } from 'lucide-react'
import expensesData from '@/data/expenses.json'

const travelers = expensesData.travelers

export default function Expenses() {
  const totalSpent = expensesData.expenses.reduce((sum, e) => sum + e.total, 0)
  const paidByMDA = expensesData.expenses.filter(e => e.paid_by === 'MDA').reduce((sum, e) => sum + e.total, 0)
  const paidByROG = expensesData.expenses.filter(e => e.paid_by === 'ROG').reduce((sum, e) => sum + e.total, 0)
  const perPerson = totalSpent / 2
  const balance = paidByROG - paidByMDA

  return (
    <section id="expenses" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <ReceiptText className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Cassa Comune</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Gestione Spese Effettive</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-2xl">Monitoraggio in tempo reale dei pagamenti effettuati e bilancio tra i partecipanti.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Totale speso', value: `€${totalSpent.toFixed(2)}`, color: '' },
            { label: 'Pagato da MDA', value: `€${paidByMDA.toFixed(2)}`, color: travelers[0].color },
            { label: 'Pagato da ROG', value: `€${paidByROG.toFixed(2)}`, color: travelers[1].color },
            { label: 'A testa (2 persone)', value: `€${perPerson.toFixed(2)}`, color: '' },
          ].map((item) => (
            <div key={item.label} className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">{item.label}</p>
              <p className="font-headline-sm text-headline-sm" style={item.color ? { color: item.color } : {}}>{item.value}</p>
            </div>
          ))}
        </motion.div>

        {balance !== 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="mb-6 p-4 bg-surface-container rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="font-body-md text-[14px] text-on-surface-variant">
                  <span className="font-semibold" style={{ color: balance > 0 ? travelers[0].color : travelers[1].color }}>
                    {balance > 0 ? 'MDA' : 'ROG'}
                  </span>
                  {' '}deve dare <span className="font-semibold text-on-surface">€{Math.abs(balance).toFixed(2)}</span> a {balance > 0 ? 'ROG' : 'MDA'}
                </p>
                <p className="font-label-sm text-label-sm text-outline mt-0.5">Differenza calcolata sulle spese confermate (escluso noleggio auto TBD)</p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-secondary text-on-secondary font-label-sm text-label-sm rounded-full shadow-sm">
                  {balance > 0 ? 'MDA' : 'ROG'} → {balance > 0 ? 'ROG' : 'MDA'} €{Math.abs(balance).toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-3">
          {expensesData.expenses.map((expense, i) => {
            const payer = travelers.find(t => t.id === expense.paid_by)
            return (
              <motion.div key={expense.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] overflow-hidden"
              >
                <div className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Receipt className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-label-md text-on-surface truncate">{expense.description}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded" style={{ backgroundColor: payer?.color + '20', color: payer?.color }}>
                        {expense.paid_by}
                      </span>
                      <span className="font-label-sm text-label-sm text-outline">{expense.date}</span>
                      <span className="text-outline">·</span>
                      <span className="font-label-sm text-label-sm text-outline">{expense.payment_method}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-headline-sm text-headline-sm text-on-surface">€{expense.total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="border-t border-outline-variant/20">
                  <div className="p-4 space-y-2">
                    {expense.items.map((item, j) => (
                      <div key={j} className="flex items-center justify-between py-1.5">
                        <div className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-outline" />
                          <span className="font-body-md text-[13px] text-on-surface-variant">{item.label}</span>
                          {item.note && <span className="font-label-sm text-label-sm text-outline italic">({item.note})</span>}
                        </div>
                        <span className={`font-label-sm text-label-sm ${item.amount === 0 ? 'text-outline' : 'text-on-surface'}`}>
                          {item.amount === 0 ? '—' : `€${item.amount.toFixed(2)}`}
                        </span>
                      </div>
                    ))}
                    {expense.note && (
                      <div className="mt-2 p-2 bg-surface-container rounded-lg">
                        <p className="font-label-sm text-label-sm text-on-surface-variant italic">{expense.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-4 p-4 bg-surface-container rounded-lg font-body-md text-[13px] text-on-surface-variant border border-outline-variant/20">
          <CreditCard className="w-4 h-4 inline mr-1" />
          Le spese vengono aggiornate man mano che vengono sostenute. Il bilancio tiene conto di chi ha pagato.
        </div>
      </div>
    </section>
  )
}
