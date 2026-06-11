'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ClipboardCheck, Check, Plane, FileText, Shirt, Plug, Luggage, Smartphone, Camera, Umbrella, Wallet, Pill } from 'lucide-react'

interface ChecklistItem {
  id: string
  text: string
  category: string
}

const defaultItems: ChecklistItem[] = [
  // Documenti
  { id: 'doc-id', text: 'Documenti d\'identità (MDA + ROG)', category: 'documenti' },
  { id: 'doc-passaporto', text: 'Passaporti (se necessario)', category: 'documenti' },
  { id: 'doc-voli', text: 'Booking voli FR9660 (andata) + FR223 (ritorno)', category: 'documenti' },
  { id: 'doc-auto', text: 'Prenotazione noleggio auto (RecordGo / Sixt)', category: 'documenti' },
  { id: 'doc-assicurazione', text: 'Assicurazione viaggio', category: 'documenti' },
  { id: 'doc-carta', text: 'Carta d\'credito / bancomat (Euro)', category: 'documenti' },
  { id: 'doc-contanti', text: 'Contanti ~€100 (bar piccoli, mercati)', category: 'documenti' },
  { id: 'doc-health', text: 'TEAM Europea / EHIC', category: 'documenti' },

  // Check-in / Volo
  { id: 'check-online', text: 'Check-in online (apre 24h prima)', category: 'checkin' },
  { id: 'check-bagaglio', text: '1 bagaglio 20kg in comune (MDA+ROG) — peso', category: 'checkin' },
  { id: 'check-cabina', text: 'Zaino/cabina — 10kg, sotto il sedile', category: 'checkin' },
  { id: 'check-mobile', text: 'Boarding pass mobile / stampa', category: 'checkin' },
  { id: 'check-arrivo', text: 'Arrivo aeroporto 2h prima partenza', category: 'checkin' },

  // Bagaglio — Vestiti
  { id: 'vest-camice', text: 'Canotte / magliette (7gg)', category: 'vestiti' },
  { id: 'vest-pantaloncini', text: 'Pantaloncini (3-4 paia)', category: 'vestiti' },
  { id: 'vest-vestito', text: 'Abito/camicia elegante (per serata)', category: 'vestiti' },
  { id: 'vest-costume', text: 'Costumi da bagno (2)', category: 'vestiti' },
  { id: 'vest-telo', text: 'Telo mare / pareo', category: 'vestiti' },
  { id: 'vest-cappello', text: 'Cappello / visiera', category: 'vestiti' },
  { id: 'vest-scarpe', text: 'Sandali + scarpe comode da camminare', category: 'vestiti' },
  { id: 'vest-scoglio', text: 'Scarpe da scoglio (fondamentali per Maro!)', category: 'vestiti' },
  { id: 'vest-felpa', text: 'Felpa leggera (serate brezza marina)', category: 'vestiti' },
  { id: 'vest-giacca', text: 'Giacca leggera impermeabile', category: 'vestiti' },

  // Gadget elettronici
  { id: 'gad-telefoni', text: 'Telefoni MDA + ROG', category: 'gadget' },
  { id: 'gad-caricatori', text: 'Caricatori telefoni (2)', category: 'gadget' },
  { id: 'gad-powerbank', text: 'Powerbank 10000mAh+', category: 'gadget' },
  { id: 'gad-adattatore', text: 'Adattatore spina europea (se serve)', category: 'gadget' },
  { id: 'gad-cavi', text: 'Cavi USB-C / Lightning', category: 'gadget' },
  { id: 'gad-cuffie', text: 'Cuffie / auricolari per volo', category: 'gadget' },
  { id: 'gad-navigatore', text: 'Navigatore Google Maps offline (zona scaricata)', category: 'gadget' },
  { id: 'gad-auto-accendi', text: 'Accendisigari auto / caricatore USB auto', category: 'gadget' },
  { id: 'gad-auto-plate', text: 'Supporto telefono per auto / braccetto', category: 'gadget' },
  { id: 'gad-fotocamera', text: 'Fotocamera / GoPro (per kayak!)', category: 'gadget' },
  { id: 'gad-occhiali', text: 'Occhiali da sole', category: 'gadget' },

  // Bagno / salute
  { id: 'bag-cremasole', text: 'Crema solare SPF50+', category: 'bagno' },
  { id: 'bag-doposole', text: 'Doposole / aloe vera', category: 'bagno' },
  { id: 'bag-shampoo', text: 'Shampoo + bagnoschiuma travel', category: 'bagno' },
  { id: 'bag-dentifricio', text: 'Spazzolino + dentifricio', category: 'bagno' },
  { id: 'bag-deodorante', text: 'Deodorante', category: 'bagno' },

  // Farmacia
  { id: 'farm-antidolore', text: 'Antidolorifico (Tachipirina)', category: 'farmacia' },
  { id: 'farm-salve', text: 'Cerotti + disinfettante', category: 'farmacia' },
  { id: 'farm-mosquito', text: 'Repellente zanzare', category: 'farmacia' },
  { id: 'farm-allergia', text: 'Antistaminico (se necessario)', category: 'farmacia' },
]

const categories = [
  { id: 'documenti', label: 'Documenti & Soldi', icon: FileText, color: 'text-blue-500' },
  { id: 'checkin', label: 'Check-in & Volo', icon: Plane, color: 'text-amber-500' },
  { id: 'vestiti', label: 'Vestiti & Scarpe', icon: Shirt, color: 'text-pink-500' },
  { id: 'gadget', label: 'Gadget & Elettronica', icon: Smartphone, color: 'text-indigo-500' },
  { id: 'bagno', label: 'Bagno & Igiene', icon: Umbrella, color: 'text-teal-500' },
  { id: 'farmacia', label: 'Farmacia', icon: Pill, color: 'text-red-500' },
]

export default function PreTripChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('sol-pretrip-checklist')
    if (stored) {
      try {
        setChecked(JSON.parse(stored))
      } catch (e) {}
    }
  }, [])

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] }
    setChecked(next)
    localStorage.setItem('sol-pretrip-checklist', JSON.stringify(next))
  }

  const totalItems = defaultItems.length
  const completedCount = Object.values(checked).filter(Boolean).length
  const progress = totalItems > 0 ? (completedCount / totalItems) * 100 : 0

  const getCategoryStats = (catId: string) => {
    const catItems = defaultItems.filter(i => i.category === catId)
    const catDone = catItems.filter(i => checked[i.id]).length
    return { total: catItems.length, done: catDone }
  }

  if (!mounted) return null

  return (
    <section id="pretrip-checklist" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-terracotta-500 mb-2">
            <ClipboardCheck className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-[0.3em]">Preparativi</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-notte leading-tight">
            Checklist <span className="italic font-medium text-terracotta-500">Prima del Viaggio</span>
          </h2>
          <p className="text-mare-700/70 mt-3 max-w-3xl text-base sm:text-lg font-body leading-relaxed">
            Tutto quello che serve per la{' '}
            <span className="text-terracotta-400 font-semibold">Costa del Sol</span>. Bagaglio condiviso{' '}
            <span className="text-terracotta-400 font-semibold">MDA + ROG</span>: 1 valigia da 20kg + 1 zaino cabina a testa.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="glass rounded-2xl p-5 border border-terracotta-100/40 card-shadow mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-notte">Progresso preparativi</span>
            <span className="text-sm font-bold text-terracotta-600">{completedCount}/{totalItems}</span>
          </div>
          <div className="w-full h-3 rounded-full bg-terracotta-100 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-terracotta-500 to-salvia-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <p className="text-[11px] text-mare-400 mt-2">
            {progress === 100 ? '✅ Tutto pronto! Buon viaggio!' :
             progress > 60 ? 'Quasi pronto...' :
             progress > 0 ? 'Buon inizio, continua!' :
             'Inizia a preparare i bagagli!'}
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => {
            const stats = getCategoryStats(cat.id)
            const catItems = defaultItems.filter(item => item.category === cat.id)
            const allDone = stats.done === stats.total

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl p-5 border card-shadow ${
                  allDone
                    ? 'bg-salvia-50/50 border-salvia-200/50'
                    : 'bg-white/80 border-terracotta-100/30'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <cat.icon className={`w-5 h-5 ${cat.color}`} />
                    <h3 className="font-display text-base font-bold text-notte">{cat.label}</h3>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    allDone
                      ? 'bg-salvia-100 text-salvia-700'
                      : 'bg-terracotta-50 text-terracotta-600'
                  }`}>
                    {stats.done}/{stats.total}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {catItems.map(item => (
                    <label
                      key={item.id}
                      className="flex items-start gap-3 p-2 rounded-xl hover:bg-terracotta-50/40 transition-colors cursor-pointer group"
                    >
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          checked={!!checked[item.id]}
                          onChange={() => toggle(item.id)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                          checked[item.id]
                            ? 'bg-terracotta-500 border-terracotta-500'
                            : 'border-terracotta-200 group-hover:border-terracotta-400'
                        }`}>
                          {checked[item.id] && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      <span className={`text-sm leading-snug transition-all ${
                        checked[item.id]
                          ? 'line-through text-mare-400'
                          : 'text-mare-700 font-medium'
                      }`}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bagaglio info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl p-5 bg-gradient-to-r from-mare-50 to-terracotta-50 border border-mare-100/50 card-shadow"
        >
          <div className="flex items-start gap-3">
            <Luggage className="w-6 h-6 text-mare-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-base font-bold text-notte mb-2">Bagaglio condiviso MDA + ROG</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-mare-600">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🧳</span>
                  <div>
                    <p className="font-semibold text-notte">1 valigia 20kg</p>
                    <p className="text-[11px] text-mare-400">In comune tra MDA e ROG</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎒</span>
                  <div>
                    <p className="font-semibold text-notte">1 zaino cabina ciascuno</p>
                    <p className="text-[11px] text-mare-400">Max 10kg, sotto il sedile</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚖️</span>
                  <div>
                    <p className="font-semibold text-notte">Pesa a casa!</p>
                    <p className="text-[11px] text-mare-400">Ryanair multa ~€70/kg extra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
