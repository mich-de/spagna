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
  const [selectedBase, setSelectedBase] = useState<string>('')
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [customTasks, setCustomTasks] = useState<CustomTask[]>([])
  const [notes, setNotes] = useState<string>('')
  const [newTaskText, setNewTaskText] = useState('')
  const [predefinedTasks, setPredefinedTasks] = useState<{ [key: string]: boolean }>({
    flight: false,
    car: false,
    alhambra: false,
    nerjaCaves: false,
    caminito: false,
    packing: false,
  })

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

  const totalBookmarks = bookmarks.length
  const completedPredefinedCount = Object.values(predefinedTasks).filter(Boolean).length
  const completedCustomCount = customTasks.filter(t => t.completed).length
  const totalTasks = Object.keys(predefinedTasks).length + customTasks.length
  const completedTasks = completedPredefinedCount + completedCustomCount
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
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-on-primary shadow-xl shadow-primary/25 hover:shadow-lg hover:scale-105 border border-primary/30 transition-transform cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Briefcase className="w-5 h-5" />
        <span className="font-label-sm text-label-sm font-semibold tracking-wide">Il Mio Piano</span>
        {(totalBookmarks > 0 || selectedBase) && (
          <span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-secondary text-on-secondary text-xs font-bold leading-none animate-pulse">
            {totalBookmarks + (selectedBase ? 1 : 0)}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md sm:max-w-lg bg-surface-container-lowest shadow-2xl border-l border-outline-variant/30 flex flex-col h-[100dvh]"
            >
              <div className="p-6 border-b border-outline-variant/30 bg-surface-container-lowest/70 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-on-primary" />
                  </div>
                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface font-bold">Piano di Viaggio</h3>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Costa del Sol · Giugno 2026</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex border-b border-outline-variant/20 bg-surface-variant/50 p-1 text-xs relative">
                {(['info', 'bookmarks', 'checklist'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 text-center font-semibold rounded-lg transition-colors relative z-10 cursor-pointer ${
                      activeTab === tab
                        ? 'text-on-primary'
                        : 'text-on-surface-variant hover:text-primary'
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
                        className="absolute inset-0 bg-primary shadow-sm border border-primary/30 rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeTab === 'info' && (
                  <div className="space-y-6">
                    <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
                      <h4 className="font-label-md text-label-md text-on-surface font-bold mb-3 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary" /> Base alloggio selezionata
                      </h4>
                      {selectedBase ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{selectedBase}</span>
                            <button
                              onClick={() => handleBaseChange('')}
                              className="font-label-sm text-label-sm text-red-500 hover:underline flex items-center gap-0.5"
                            >
                              <X className="w-3.5 h-3.5" /> Rimuovi base
                            </button>
                          </div>
                          {baseDetails && (
                            <div className="space-y-2 pt-2 border-t border-outline-variant/20 font-body-md text-[13px] text-on-surface-variant">
                              <p className="flex items-center gap-2">
                                <Car className="w-3.5 h-3.5 text-primary" />
                                <span><strong>Distanza aeroporto:</strong> {baseDetails.distance_airport_min} min</span>
                              </p>
                              <p className="flex items-center gap-2">
                                <Car className="w-3.5 h-3.5 text-primary" />
                                <span><strong>Distanza Marbella:</strong> {baseDetails.distance_marbella_min} min</span>
                              </p>
                              <p className="mt-2 text-on-surface-variant italic">
                                <strong>Vantaggi:</strong> {baseDetails.pros.slice(0, 2).join(', ')}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-4 border border-dashed border-outline-variant/30 rounded-xl bg-surface-variant/30">
                          <p className="font-label-sm text-label-sm text-on-surface-variant mb-2">Non hai ancora selezionato una base per alloggiare.</p>
                          <p className="font-label-sm text-label-sm text-primary/80">Imposta una base scorrendo alla sezione &ldquo;Base&rdquo; del dashboard.</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
                      <h4 className="font-label-md text-label-md text-on-surface font-bold mb-3 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary" /> Informazioni di viaggio
                      </h4>
                      <div className="grid grid-cols-2 gap-3 font-body-md text-[13px] text-on-surface-variant">
                        <div className="p-3 bg-surface-variant rounded-xl">
                          <span className="block text-on-surface-variant uppercase tracking-wider text-[9px] mb-0.5">Date</span>
                          <span className="font-medium text-on-surface">19-25 Giugno 2026</span>
                        </div>
                        <div className="p-3 bg-surface-variant rounded-xl">
                          <span className="block text-on-surface-variant uppercase tracking-wider text-[9px] mb-0.5">Notti</span>
                          <span className="font-medium text-on-surface">6 Notti</span>
                        </div>
                        <div className="p-3 bg-surface-variant rounded-xl">
                          <span className="block text-on-surface-variant uppercase tracking-wider text-[9px] mb-0.5">Clima medio</span>
                          <span className="font-medium text-on-surface">21°–29°C · Soleggiato</span>
                        </div>
                        <div className="p-3 bg-surface-variant rounded-xl">
                          <span className="block text-on-surface-variant uppercase tracking-wider text-[9px] mb-0.5">San Juan</span>
                          <span className="font-medium text-red-500">Notte tra 23 e 24 Giu</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
                      <h4 className="font-label-md text-label-md text-on-surface font-bold mb-2 flex items-center gap-1.5">
                        <Edit3 className="w-4 h-4 text-primary" /> Note personali
                      </h4>
                      <textarea
                        rows={6}
                        placeholder="Inserisci dettagli sui voli, nome dell'hotel, prenotazioni auto o promemoria..."
                        value={notes}
                        onChange={(e) => {
                          setNotes(e.target.value)
                          saveState({ notes: e.target.value })
                        }}
                        className="w-full p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'bookmarks' && (
                  <div className="space-y-6">
                    {totalBookmarks === 0 ? (
                      <div className="text-center py-12 text-on-surface-variant">
                        <Heart className="w-12 h-12 mx-auto mb-2 opacity-30" />
                        <p className="font-body-md text-body-md">Non hai ancora aggiunto alcun elemento ai preferiti.</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant/80 mt-1">Clicca sul cuore ♥ o sull&apos;icona segnalibro vicino a spiagge, ristoranti ed esperienze per salvarli qui.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
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
                              <h4 className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-on-surface-variant">{titleMap[type]}</h4>
                              <div className="space-y-1.5">
                                {items.map(item => (
                                  <div
                                    key={item.id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all shadow-[0px_4px_12px_rgba(30,58,95,0.08)]"
                                  >
                                    <div>
                                      <p className="font-body-md text-[13px] font-medium text-on-surface">{item.name}</p>
                                      <p className="font-label-sm text-label-sm text-on-surface-variant">{item.zone}</p>
                                    </div>
                                    <button
                                      onClick={() => removeBookmark(item.id)}
                                      className="p-1.5 text-on-surface-variant hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
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
                    <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] space-y-3">
                      <h4 className="font-label-md text-label-md text-on-surface font-bold mb-2">📌 Cose da fare fondamentali</h4>
                      
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
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surface-variant/50 transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={predefinedTasks[task.key]}
                            onChange={() => togglePredefined(task.key)}
                            className="mt-0.5 rounded border-outline text-primary focus:ring-primary/30"
                          />
                          <span className={`font-body-md text-[13px] ${predefinedTasks[task.key] ? 'line-through text-on-surface-variant' : 'text-on-surface font-medium'}`}>
                            {task.text}
                          </span>
                        </label>
                      ))}
                    </div>

                    <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] space-y-4">
                      <h4 className="font-label-md text-label-md text-on-surface font-bold">➕ Altre attività personali</h4>

                      <div className="space-y-2">
                        {customTasks.map(task => (
                          <div
                            key={task.id}
                            className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30"
                          >
                            <label className="flex items-start gap-3 cursor-pointer flex-1">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleCustom(task.id)}
                                className="mt-0.5 rounded border-outline text-primary focus:ring-primary/30"
                              />
                              <span className={`font-body-md text-[13px] ${task.completed ? 'line-through text-on-surface-variant' : 'text-on-surface font-medium'}`}>
                                {task.text}
                              </span>
                            </label>
                            <button
                              onClick={() => removeCustomTask(task.id)}
                              className="text-on-surface-variant hover:text-red-500 p-0.5 rounded transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}

                        {customTasks.length === 0 && (
                          <p className="text-center py-2 font-label-sm text-label-sm text-on-surface-variant italic">Nessuna attività personalizzata.</p>
                        )}
                      </div>

                      <form onSubmit={addCustomTask} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Aggiungi attività..."
                          value={newTaskText}
                          onChange={(e) => setNewTaskText(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                        <button
                          type="submit"
                          className="p-2 rounded-xl bg-primary text-on-primary hover:bg-primary/90 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5 pb-safe border-t border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between font-label-sm text-label-sm font-semibold text-on-surface-variant">
                  <span>Progresso preparativi</span>
                  <span>{completedTasks}/{totalTasks} completati</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-variant overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full transition-all duration-500"
                    style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                  />
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant text-center">
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
