'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Heart, CheckSquare, Trash2, Plus, X, MapPin, Calendar, Car, Edit3, Compass } from 'lucide-react'
import bases from '@/data/bases.json'

interface Bookmark {
  id: string
  name: string
  type: 'beach' | 'restaurant' | 'experience' | 'nightlife'
  zone: string
}

interface CustomTask {
  id: string
  text: string
  completed: boolean
}

export default function TripPlanner() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'info' | 'bookmarks' | 'checklist'>('info')
  const [mounted, setMounted] = useState(false)

  // Planner state
  const [selectedBase, setSelectedBase] = useState<string>('')
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [customTasks, setCustomTasks] = useState<CustomTask[]>([])
  const [notes, setNotes] = useState<string>('')
  const [newTaskText, setNewTaskText] = useState('')

  // Predefined checklist items
  const [predefinedTasks, setPredefinedTasks] = useState<{ [key: string]: boolean }>({
    flight: false,
    car: false,
    alhambra: false,
    nerjaCaves: false,
    caminito: false,
    packing: false,
  })

  // Load state from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('sol_local_planner')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.selectedBase) setSelectedBase(data.selectedBase)
        if (data.bookmarks) setBookmarks(data.bookmarks)
        if (data.customTasks) setCustomTasks(data.customTasks)
        if (data.notes) setNotes(data.notes)
        if (data.predefinedTasks) setPredefinedTasks(data.predefinedTasks)
      } catch (e) {
        console.error('Error parsing stored planner data', e)
      }
    }
  }, [])

  // Save state helper
  const saveState = (updated: Partial<{
    selectedBase: string
    bookmarks: Bookmark[]
    customTasks: CustomTask[]
    notes: string
    predefinedTasks: { [key: string]: boolean }
  }>) => {
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const nextState = { ...current, ...updated }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
  }

  // Handle external updates (e.g. from bookmark clicks)
  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail) {
        const detail = customEvent.detail
        if (detail.selectedBase !== undefined) setSelectedBase(detail.selectedBase)
        if (detail.bookmarks !== undefined) setBookmarks(detail.bookmarks)
        if (detail.customTasks !== undefined) setCustomTasks(detail.customTasks)
        if (detail.notes !== undefined) setNotes(detail.notes)
        if (detail.predefinedTasks !== undefined) setPredefinedTasks(detail.predefinedTasks)
      }
    }
    window.addEventListener('sol-local-planner-update', handleUpdate)
    return () => window.removeEventListener('sol-local-planner-update', handleUpdate)
  }, [])

  if (!mounted) return null

  // Helper stats
  const totalBookmarks = bookmarks.length
  const completedPredefinedCount = Object.values(predefinedTasks).filter(Boolean).length
  const completedCustomCount = customTasks.filter(t => t.completed).length
  const totalTasks = Object.keys(predefinedTasks).length + customTasks.length
  const completedTasks = completedPredefinedCount + completedCustomCount

  // Base details helper
  const baseDetails = bases.find((b: any) => b.name === selectedBase)

  const handleBaseChange = (baseName: string) => {
    setSelectedBase(baseName)
    saveState({ selectedBase: baseName })
  }

  const removeBookmark = (id: string) => {
    const next = bookmarks.filter(b => b.id !== id)
    setBookmarks(next)
    saveState({ bookmarks: next })
  }

  const togglePredefined = (key: string) => {
    const next = { ...predefinedTasks, [key]: !predefinedTasks[key] }
    setPredefinedTasks(next)
    saveState({ predefinedTasks: next })
  }

  const toggleCustom = (id: string) => {
    const next = customTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    setCustomTasks(next)
    saveState({ customTasks: next })
  }

  const addCustomTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskText.trim()) return
    const newTask: CustomTask = {
      id: Math.random().toString(36).substring(2, 9),
      text: newTaskText.trim(),
      completed: false,
    }
    const next = [...customTasks, newTask]
    setCustomTasks(next)
    setNewTaskText('')
    saveState({ customTasks: next })
  }

  const removeCustomTask = (id: string) => {
    const next = customTasks.filter(t => t.id !== id)
    setCustomTasks(next)
    saveState({ customTasks: next })
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white shadow-xl shadow-terracotta-600/35 hover:scale-105 border border-terracotta-400/30 transition-transform cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Briefcase className="w-5 h-5" />
        <span className="text-sm font-semibold tracking-wide">Il Mio Piano</span>
        {(totalBookmarks > 0 || selectedBase) && (
          <span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-oro text-notte text-xs font-bold leading-none animate-pulse">
            {totalBookmarks + (selectedBase ? 1 : 0)}
          </span>
        )}
      </motion.button>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md sm:max-w-lg bg-sabbia shadow-2xl border-l border-terracotta-100 flex flex-col h-[100dvh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-terracotta-100/50 bg-white/70 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-terracotta-500 to-mare-600 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-notte">Piano di Viaggio</h3>
                    <p className="text-[10px] text-mare-400 uppercase tracking-wider">Costa del Sol · Giugno 2026</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-mare-400 hover:text-terracotta-600 hover:bg-terracotta-50 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-terracotta-100/30 bg-white/30 p-1 text-xs relative">
                {(['info', 'bookmarks', 'checklist'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 text-center font-semibold rounded-lg transition-colors relative z-10 cursor-pointer ${
                      activeTab === tab
                        ? 'text-terracotta-750'
                        : 'text-mare-500 hover:text-terracotta-500'
                    }`}
                  >
                    {tab === 'info' && (
                      <span className="flex items-center justify-center gap-1">
                        <Compass className="w-3.5 h-3.5" /> Info
                      </span>
                    )}
                    {tab === 'bookmarks' && (
                      <span className="flex items-center justify-center gap-1">
                        <Heart className="w-3.5 h-3.5" /> Preferiti ({totalBookmarks})
                      </span>
                    )}
                    {tab === 'checklist' && (
                      <span className="flex items-center justify-center gap-1">
                        <CheckSquare className="w-3.5 h-3.5" /> Tasks ({completedTasks}/{totalTasks})
                      </span>
                    )}
                    {activeTab === tab && (
                      <motion.span
                        layoutId="plannerActiveTabBg"
                        className="absolute inset-0 bg-white shadow-sm border border-terracotta-100/30 rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeTab === 'info' && (
                  <div className="space-y-6">
                    {/* Accommodation base choice */}
                    <div className="bg-white/70 rounded-2xl p-5 border border-terracotta-100/40 card-shadow">
                      <h4 className="font-display text-base font-bold text-notte mb-3 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-terracotta-500" /> Base alloggio selezionata
                      </h4>
                      {selectedBase ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-terracotta-600">{selectedBase}</span>
                            <button
                              onClick={() => handleBaseChange('')}
                              className="text-xs text-red-500 hover:underline flex items-center gap-0.5"
                            >
                              <X className="w-3.5 h-3.5" /> Rimuovi base
                            </button>
                          </div>
                          {baseDetails && (
                            <div className="space-y-2 pt-2 border-t border-terracotta-100/20 text-xs text-mare-700/80">
                              <p className="flex items-center gap-2">
                                <Car className="w-3.5 h-3.5 text-terracotta-400" />
                                <span><strong>Distanza aeroporto:</strong> {baseDetails.distance_airport_min} min</span>
                              </p>
                              <p className="flex items-center gap-2">
                                <Car className="w-3.5 h-3.5 text-terracotta-400" />
                                <span><strong>Distanza Marbella:</strong> {baseDetails.distance_marbella_min} min</span>
                              </p>
                              <p className="mt-2 text-mare-600/70 italic">
                                <strong>Vantaggi:</strong> {baseDetails.pros.slice(0, 2).join(', ')}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-4 border border-dashed border-terracotta-200 rounded-xl bg-terracotta-50/20">
                          <p className="text-xs text-mare-400 mb-2">Non hai ancora selezionato una base per alloggiare.</p>
                          <p className="text-[10px] text-terracotta-500/80">Imposta una base scorrendo alla sezione &ldquo;Base&rdquo; del dashboard.</p>
                        </div>
                      )}
                    </div>

                    {/* Quick Trip Details */}
                    <div className="bg-white/70 rounded-2xl p-5 border border-terracotta-100/40 card-shadow">
                      <h4 className="font-display text-base font-bold text-notte mb-3 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-terracotta-500" /> Informazioni di viaggio
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-xs text-mare-700">
                        <div className="p-3 bg-terracotta-50/50 rounded-xl">
                          <span className="block text-mare-400 uppercase tracking-wider text-[9px] mb-0.5">Date</span>
                          <span className="font-medium">19-25 Giugno 2026</span>
                        </div>
                        <div className="p-3 bg-terracotta-50/50 rounded-xl">
                          <span className="block text-mare-400 uppercase tracking-wider text-[9px] mb-0.5">Notti</span>
                          <span className="font-medium">6 Notti</span>
                        </div>
                        <div className="p-3 bg-terracotta-50/50 rounded-xl">
                          <span className="block text-mare-400 uppercase tracking-wider text-[9px] mb-0.5">Clima medio</span>
                          <span className="font-medium">21°–29°C · Soleggiato</span>
                        </div>
                        <div className="p-3 bg-terracotta-50/50 rounded-xl">
                          <span className="block text-mare-400 uppercase tracking-wider text-[9px] mb-0.5">San Juan</span>
                          <span className="font-medium text-red-500">Notte tra 23 e 24 Giu</span>
                        </div>
                      </div>
                    </div>

                    {/* Trip Notes */}
                    <div className="bg-white/70 rounded-2xl p-5 border border-terracotta-100/40 card-shadow">
                      <h4 className="font-display text-base font-bold text-notte mb-2 flex items-center gap-1.5">
                        <Edit3 className="w-4 h-4 text-terracotta-500" /> Note personali
                      </h4>
                      <textarea
                        rows={6}
                        placeholder="Inserisci dettagli sui voli, nome dell'hotel, prenotazioni auto o promemoria..."
                        value={notes}
                        onChange={(e) => {
                          setNotes(e.target.value)
                          saveState({ notes: e.target.value })
                        }}
                        className="w-full p-3 rounded-xl bg-white border border-terracotta-100/50 text-xs text-notte placeholder:text-mare-300 focus:outline-none focus:ring-2 focus:ring-terracotta-300/50 transition-all resize-none"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'bookmarks' && (
                  <div className="space-y-6">
                    {totalBookmarks === 0 ? (
                      <div className="text-center py-12 text-mare-400">
                        <Heart className="w-12 h-12 mx-auto mb-2 opacity-30" />
                        <p className="font-body text-sm">Non hai ancora aggiunto alcun elemento ai preferiti.</p>
                        <p className="text-[10px] text-mare-400/80 mt-1">Clicca sul cuore ♥ o sull&apos;icona segnalibro vicino a spiagge, ristoranti ed esperienze per salvarli qui.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Grouped by type */}
                        {(['beach', 'restaurant', 'experience', 'nightlife'] as const).map(type => {
                          const items = bookmarks.filter(b => b.type === type)
                          if (items.length === 0) return null

                          const titleMap = {
                            beach: '🏖 Spiagge salvate',
                            restaurant: '🍽 Piatti & Ristoranti',
                            experience: '🧘 Esperienze locali',
                            nightlife: '🌙 Nightlife preferita'
                          }

                          return (
                            <div key={type} className="space-y-2">
                              <h4 className="text-xs uppercase tracking-wider font-bold text-mare-400">{titleMap[type]}</h4>
                              <div className="space-y-1.5">
                                {items.map(item => (
                                  <div
                                    key={item.id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-white/70 border border-terracotta-100/30 hover:border-terracotta-200 transition-all card-shadow"
                                  >
                                    <div>
                                      <p className="text-sm font-medium text-notte">{item.name}</p>
                                      <p className="text-[10px] text-mare-400">{item.zone}</p>
                                    </div>
                                    <button
                                      onClick={() => removeBookmark(item.id)}
                                      className="p-1.5 text-mare-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                                      title="Rimuovi"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'checklist' && (
                  <div className="space-y-6">
                    {/* Predefined tasks */}
                    <div className="bg-white/70 rounded-2xl p-5 border border-terracotta-100/40 card-shadow space-y-3">
                      <h4 className="font-display text-base font-bold text-notte mb-2">📌 Cose da fare fondamentali</h4>
                      
                      {[
                        { key: 'flight', text: 'Prenotare volo di andata e ritorno per Málaga (AGP)' },
                        { key: 'car', text: 'Noleggiare un\'auto con ritiro all\'aeroporto (consigliata)' },
                        { key: 'alhambra', text: 'Prenotare in anticipo i biglietti per l\'Alhambra di Granada' },
                        { key: 'nerjaCaves', text: 'Prenotare i biglietti per la Cueva de Nerja' },
                        { key: 'caminito', text: 'Acquistare i biglietti per il Caminito del Rey' },
                        { key: 'packing', text: 'Acquistare scarpette da scoglio (fondamentali per spiagge Nerja/Maro)' },
                      ].map(task => (
                        <label
                          key={task.key}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-terracotta-50/40 transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={predefinedTasks[task.key]}
                            onChange={() => togglePredefined(task.key)}
                            className="mt-0.5 rounded border-terracotta-200 text-terracotta-500 focus:ring-terracotta-400/50"
                          />
                          <span className={`text-xs ${predefinedTasks[task.key] ? 'line-through text-mare-400' : 'text-mare-700 font-medium'}`}>
                            {task.text}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Custom checklist */}
                    <div className="bg-white/70 rounded-2xl p-5 border border-terracotta-100/40 card-shadow space-y-4">
                      <h4 className="font-display text-base font-bold text-notte">➕ Altre attività personali</h4>

                      {/* Custom checklist list */}
                      <div className="space-y-2">
                        {customTasks.map(task => (
                          <div
                            key={task.id}
                            className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-white border border-terracotta-100/30"
                          >
                            <label className="flex items-start gap-3 cursor-pointer flex-1">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleCustom(task.id)}
                                className="mt-0.5 rounded border-terracotta-200 text-terracotta-500 focus:ring-terracotta-400/50"
                              />
                              <span className={`text-xs ${task.completed ? 'line-through text-mare-400' : 'text-mare-700 font-medium'}`}>
                                {task.text}
                              </span>
                            </label>
                            <button
                              onClick={() => removeCustomTask(task.id)}
                              className="text-mare-400 hover:text-red-500 p-0.5 rounded transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}

                        {customTasks.length === 0 && (
                          <p className="text-center py-2 text-[11px] text-mare-400 italic">Nessuna attività personalizzata.</p>
                        )}
                      </div>

                      {/* Add Custom Task Form */}
                      <form onSubmit={addCustomTask} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Aggiungi attività..."
                          value={newTaskText}
                          onChange={(e) => setNewTaskText(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-white border border-terracotta-100/50 text-xs text-notte placeholder:text-mare-300 focus:outline-none focus:ring-2 focus:ring-terracotta-300/50 transition-all"
                        />
                        <button
                          type="submit"
                          className="p-2 rounded-xl bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Summary Footer */}
              <div className="p-5 pb-safe border-t border-terracotta-100 bg-white/80 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-mare-600">
                  <span>Progresso preparativi</span>
                  <span>{completedTasks}/{totalTasks} completati</span>
                </div>
                <div className="w-full h-2 rounded-full bg-terracotta-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-terracotta-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                  />
                </div>
                <p className="text-[10px] text-mare-400 text-center">
                  I tuoi dati vengono salvati automaticamente sul tuo browser.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
