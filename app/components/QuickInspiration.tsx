'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Shuffle, Heart, MapPin, Car, Utensils, Waves, Map, Star } from 'lucide-react'
import beaches from '@/data/beaches.json'
import restaurants from '@/data/restaurants.json'
import experiences from '@/data/local-experiences.json'
import attractions from '@/data/attractions.json'
import { getDriveTime, getShortBaseName } from '@/app/utils/driveTimes'

interface InspirationItem {
  id: string; name: string; type: 'beach' | 'restaurant' | 'experience' | 'nightlife'
  description: string; zone: string; tip: string; additionalInfo: string
  mapLink?: string; tripadvisorLink?: string
}

export default function QuickInspiration() {
  const [activeTab, setActiveTab] = useState<'deck' | 'matcher'>('deck')
  const [categoryFilter, setCategoryFilter] = useState<'tutti' | 'spiagge' | 'cibo' | 'esperienze' | 'attrazioni'>('tutti')
  const [selectedBase, setSelectedBase] = useState<string>('San Pedro de Alcántara')
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [currentCard, setCurrentCard] = useState<InspirationItem | null>(null)
  const [shuffleTrigger, setShuffleTrigger] = useState(0)
  const [matchedDay, setMatchedDay] = useState<{ zone: string; morning: InspirationItem; lunch: InspirationItem; afternoon: InspirationItem } | null>(null)
  const [isMatching, setIsMatching] = useState(false)
  const [showMatcherSuccess, setShowMatcherSuccess] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('sol_local_planner')
    if (stored) {
      try { const data = JSON.parse(stored); if (data.selectedBase) setSelectedBase(data.selectedBase); if (data.bookmarks) setBookmarks(data.bookmarks) } catch (e) {}
    }
  }, [])

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail) {
        if (customEvent.detail.selectedBase !== undefined) setSelectedBase(customEvent.detail.selectedBase || 'San Pedro de Alcántara')
        if (customEvent.detail.bookmarks !== undefined) setBookmarks(customEvent.detail.bookmarks)
      }
    }
    window.addEventListener('sol-local-planner-update', handleUpdate)
    return () => window.removeEventListener('sol-local-planner-update', handleUpdate)
  }, [])

  const normalizedItems = useMemo(() => {
    const bItems: InspirationItem[] = beaches.map((b: any) => ({
      id: b.name, name: b.name, type: 'beach', description: b.description, zone: b.zone || 'Ovunque', tip: b.localTip || '',
      additionalInfo: `Best Time: ${b.bestTime} · Sabbia: ${b.sand}`, mapLink: b.mapLink, tripadvisorLink: b.tripadvisorLink, imageUrl: b.imageUrl
    }))
    const rItems: InspirationItem[] = restaurants.map((r: any) => ({
      id: r.name, name: r.name, type: 'restaurant', description: r.description, zone: r.zone || 'Ovunque',
      tip: r.localTip || `Specialità: ${r.specialty}`, additionalInfo: `Prezzo: ${r.price} · Tipo: ${r.type}`,
      mapLink: r.mapLink, tripadvisorLink: r.tripadvisorLink, imageUrl: r.imageUrl
    }))
    const eItems: InspirationItem[] = experiences.map((e: any) => ({
      id: e.title, name: e.title, type: 'experience', description: e.tip || "Un'esperienza autentica consigliata da locali.",
      zone: e.where || 'Ovunque', tip: e.when ? `Quando: ${e.when}` : '', additionalInfo: `Costo: ${e.cost}`,
      mapLink: e.mapLink, tripadvisorLink: e.tripadvisorLink,
    }))
    const aItems: InspirationItem[] = attractions.map((a: any) => ({
      id: a.name, name: a.name, type: 'experience', description: a.whyVisit, zone: a.zone || 'Ovunque',
      tip: a.pairWith ? `Abbina con: ${a.pairWith}` : '', additionalInfo: `Durata: ${a.duration} · Costo: ${a.cost}`, mapLink: a.mapLink,
    }))
    return { tutti: [...bItems, ...rItems, ...eItems, ...aItems], spiagge: bItems, cibo: rItems, esperienze: eItems, attrazioni: aItems }
  }, [])

  const rollCard = () => {
    let maxDistance = 60
    let list: InspirationItem[] = []
    while (list.length < 5 && maxDistance <= 150) {
      list = normalizedItems[categoryFilter].filter(item => {
        if (item.zone && item.zone.toLowerCase().includes('ovunque')) return true
        return getDriveTime(selectedBase, item.zone) <= maxDistance
      })
      maxDistance += 30
    }
    if (list.length === 0) list = normalizedItems[categoryFilter]
    if (list.length === 0) return
    let rolled = list[Math.floor(Math.random() * list.length)]
    if (currentCard && list.length > 1 && rolled.name === currentCard.name) {
      const filteredList = list.filter(item => item.name !== currentCard.name)
      rolled = filteredList[Math.floor(Math.random() * filteredList.length)]
    }
    setCurrentCard(rolled)
    setShuffleTrigger(prev => prev + 1)
  }

  useEffect(() => { rollCard() }, [categoryFilter, selectedBase])

  const toggleBookmark = (item: InspirationItem) => {
    const isBookmarked = bookmarks.some(b => b.id === item.id)
    const nextBookmarks = isBookmarked
      ? bookmarks.filter(b => b.id !== item.id)
      : [...bookmarks, { id: item.id, name: item.name, type: item.type, zone: item.zone }]
    setBookmarks(nextBookmarks)
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const nextState = { ...current, bookmarks: nextBookmarks }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
  }

  const generatePerfectDay = () => {
    setIsMatching(true)
    setShowMatcherSuccess(false)
    setTimeout(() => {
      let maxDistance = 60
      let availableZones: string[] = []
      const allZones = ['Nerja', 'Málaga', 'Marbella', 'Estepona', 'Benalmádena', 'Mijas']
      while (availableZones.length < 2 && maxDistance <= 150) {
        availableZones = allZones.filter(zoneName => getDriveTime(selectedBase, zoneName) <= maxDistance)
        maxDistance += 30
      }
      const chosenZone = availableZones.length > 0 ? availableZones[Math.floor(Math.random() * availableZones.length)] : 'Marbella'
      const morningCandidates = [...normalizedItems.spiagge.filter(b => b.zone.includes(chosenZone)), ...normalizedItems.attrazioni.filter(a => a.zone.includes(chosenZone))]
      const morning = morningCandidates.length > 0 ? morningCandidates[Math.floor(Math.random() * morningCandidates.length)] : normalizedItems.spiagge[0]
      const lunchCandidates = normalizedItems.cibo.filter(r => r.zone.includes(chosenZone))
      const lunch = lunchCandidates.length > 0 ? lunchCandidates[Math.floor(Math.random() * lunchCandidates.length)] : normalizedItems.cibo[0]
      const afternoonCandidates = [...normalizedItems.esperienze.filter(e => e.zone.includes(chosenZone) || e.zone.toLowerCase().includes('ovunque')), ...normalizedItems.attrazioni.filter(a => a.zone.includes(chosenZone) && a.name !== morning.name)]
      const afternoon = afternoonCandidates.length > 0 ? afternoonCandidates[Math.floor(Math.random() * afternoonCandidates.length)] : normalizedItems.esperienze[0]
      setMatchedDay({ zone: chosenZone, morning, lunch, afternoon })
      setIsMatching(false)
    }, 600)
  }

  useEffect(() => { generatePerfectDay() }, [selectedBase])

  const saveEntireDay = () => {
    if (!matchedDay) return
    const { morning, lunch, afternoon } = matchedDay
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const currentBookmarks = current.bookmarks || []
    const itemsToAdd = [morning, lunch, afternoon]
    let nextBookmarks = [...currentBookmarks]
    itemsToAdd.forEach(item => {
      if (!nextBookmarks.some(b => b.id === item.id)) {
        nextBookmarks.push({ id: item.id, name: item.name, type: item.type, zone: item.zone })
      }
    })
    setBookmarks(nextBookmarks)
    const nextState = { ...current, bookmarks: nextBookmarks }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
    setShowMatcherSuccess(true)
    setTimeout(() => setShowMatcherSuccess(false), 3000)
  }

  const getTypeMeta = (type: string) => {
    switch (type) {
      case 'beach': return { label: 'Spiaggia', icon: Waves, color: 'bg-sky-50 text-sky-600 border-sky-100' }
      case 'restaurant': return { label: 'Cibo & Drink', icon: Utensils, color: 'bg-amber-50 text-amber-600 border-amber-100' }
      case 'experience': default: return { label: 'Esperienza / Sguardo', icon: Sparkles, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' }
    }
  }

  return (
    <section id="inspiration" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8 relative bg-gradient-to-b from-transparent to-surface-variant/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Idee Volanti</span>
            </div>
            <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Centro Ispirazione</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-2xl">Prendi spunti immediati ed esplora combinazioni ideali per la tua giornata andalusa.</p>
          </motion.div>

          <div className="flex p-1 bg-surface-container-lowest border border-outline-variant/20 rounded-xl max-w-sm w-full md:w-auto">
            <button onClick={() => setActiveTab('deck')}
              className={`flex-1 md:flex-none px-4 py-2 font-label-sm text-label-sm font-bold rounded-lg transition-colors ${
                activeTab === 'deck' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'
              }`}>Deck Ispirazioni</button>
            <button onClick={() => setActiveTab('matcher')}
              className={`flex-1 md:flex-none px-4 py-2 font-label-sm text-label-sm font-bold rounded-lg transition-colors ${
                activeTab === 'matcher' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'
              }`}>Giornata Perfetta</button>
          </div>
        </div>

        {activeTab === 'deck' && (
          <div className="space-y-6">
            <div className="flex flex-row flex-nowrap sm:flex-wrap gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap sm:whitespace-normal -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
              {[
                { id: 'tutti', label: 'Tutti i tipi' },
                { id: 'spiagge', label: 'Spiagge 🏖' },
                { id: 'cibo', label: 'Ristoranti & Piatti 🍽' },
                { id: 'esperienze', label: 'Esperienze Locali 🧘' },
                { id: 'attrazioni', label: 'Attrazioni storiche 🏛' },
              ].map(cat => (
                <button key={cat.id} onClick={() => setCategoryFilter(cat.id as any)}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm font-bold whitespace-nowrap transition-all border shrink-0 ${
                    categoryFilter === cat.id
                      ? 'bg-secondary text-on-secondary border-secondary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/30 hover:border-secondary/50'
                  }`}>{cat.label}</button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
              <div className="lg:col-span-7 flex justify-center relative">
                <AnimatePresence mode="wait">
                  {currentCard && (
                    <motion.div key={currentCard.id + '-' + shuffleTrigger}
                      initial={{ opacity: 0, scale: 0.92, y: 15, rotate: -2 }}
                      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20, rotate: 2 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                      className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-full blur-xl" />
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {(() => { const meta = getTypeMeta(currentCard.type); return (
                            <div className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold border flex items-center gap-1.5 ${meta.color}`}>
                              <meta.icon className="w-3 h-3" />{meta.label}
                            </div>
                          )})()}
                          <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" />{currentCard.zone}
                          </span>
                        </div>
                        <button onClick={() => toggleBookmark(currentCard)}
                          className="p-2 text-outline hover:text-red-500 rounded-full hover:bg-red-50/50 transition-colors cursor-pointer">
                          <Heart className={`w-5 h-5 transition-colors ${bookmarks.some(b => b.id === currentCard.id) ? 'fill-red-500 text-red-500 scale-110' : 'text-outline hover:scale-105'}`} />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-snug">{currentCard.name}</h3>
                          <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed min-h-[60px]">{currentCard.description}</p>
                        </div>
                        {currentCard.tip && (
                          <div className="p-3 bg-surface-variant border border-outline-variant/20 rounded-2xl">
                            <p className="font-body-md text-[13px] text-on-surface leading-relaxed">
                              <span className="font-bold text-primary">💡 Consiglio: </span>{currentCard.tip}
                            </p>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 font-label-sm text-label-sm text-on-surface-variant font-medium">
                          <span className="px-2.5 py-1 bg-surface-variant rounded-lg border border-outline-variant/20">{currentCard.additionalInfo}</span>
                          <span className="px-2.5 py-1 bg-surface-variant rounded-lg border border-outline-variant/20 flex items-center gap-1">
                            <Car className="w-3 h-3 text-primary" />⏱ ~{getDriveTime(selectedBase, currentCard.zone)} min da {getShortBaseName(selectedBase)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          {currentCard.mapLink && (
                            <a href={currentCard.mapLink} target="_blank" rel="noopener noreferrer"
                              className="flex-1 py-2 text-center rounded-xl font-label-sm text-label-sm font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors border border-sky-100 flex items-center justify-center gap-1.5">
                              <Map className="w-3.5 h-3.5" />Google Maps
                            </a>
                          )}
                          {currentCard.tripadvisorLink && (
                            <a href={currentCard.tripadvisorLink} target="_blank" rel="noopener noreferrer"
                              className="flex-1 py-2 text-center rounded-xl font-label-sm text-label-sm font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-100 flex items-center justify-center gap-1.5">
                              <Star className="w-3.5 h-3.5" />TripAdvisor
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="lg:col-span-5 space-y-6 lg:pl-6 text-center lg:text-left">
                <div className="space-y-3">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Sei a corto di idee?</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Filtra per la categoria che ti interessa e premi il bottone qui sotto per pescare una scheda dal nostro mazzo andaluso. Salvala subito nel tuo piano per non perderla!</p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:justify-start">
                  <button onClick={rollCard}
                    className="px-6 py-4.5 rounded-2xl bg-primary text-on-primary font-bold font-label-md text-label-md shadow-md shadow-primary/25 hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <Shuffle className="w-4 h-4 shrink-0 animate-spin-slow" />Genera Altra Idea
                  </button>
                  <button onClick={() => currentCard && toggleBookmark(currentCard)}
                    className={`px-6 py-4.5 rounded-2xl font-bold font-label-md text-label-md transition-all border flex items-center justify-center gap-2 ${
                      currentCard && bookmarks.some(b => b.id === currentCard.id)
                        ? 'bg-red-500 text-white border-red-500 shadow-md shadow-red-500/25'
                        : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/30 hover:bg-surface-variant'
                    }`}>
                    <Heart className={`w-4 h-4 shrink-0 ${currentCard && bookmarks.some(b => b.id === currentCard.id) ? 'fill-white' : ''}`} />
                    {currentCard && bookmarks.some(b => b.id === currentCard.id) ? 'Salvata nei preferiti' : 'Salva nel mio Piano'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'matcher' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Il Matcher di Giornata 🎲</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Il generatore seleziona una zona focale e unisce una spiaggia/attrazione, un ottimo pranzo e un'esperienza coerenti nello stesso distretto per minimizzare i tempi di viaggio!</p>
            </div>

            <div className="relative">
              {isMatching && (
                <div className="absolute inset-0 bg-surface-container-lowest/60 backdrop-blur-sm z-20 flex items-center justify-center rounded-3xl">
                  <div className="text-center space-y-3">
                    <Shuffle className="w-8 h-8 text-primary animate-spin mx-auto" />
                    <p className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Abbinando la tua giornata ideale...</p>
                  </div>
                </div>
              )}

              {matchedDay && (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="px-4 py-1.5 rounded-full bg-primary text-on-primary font-bold font-label-sm text-label-sm uppercase tracking-widest shadow-sm">Zona focale: {matchedDay.zone}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    <div className="hidden md:block absolute top-[140px] left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-primary/30 via-tertiary/30 to-primary/30 -z-10" />

                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                      className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">1. Mattina</span>
                          <span className="font-label-sm text-label-sm px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-100 rounded-full">
                            {matchedDay.morning.type === 'beach' ? 'Spiaggia 🏖' : 'Attrazione 🏛'}
                          </span>
                        </div>
                        <h4 className="font-label-md text-label-md text-on-surface font-bold mb-1">{matchedDay.morning.name}</h4>
                        <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mb-3">{matchedDay.morning.description}</p>
                      </div>
                      <div className="pt-2 border-t border-outline-variant/20 font-label-sm text-label-sm text-on-surface-variant space-y-1">
                        <p className="flex items-center gap-1"><Car className="w-3.5 h-3.5 text-outline" />⏱ ~{getDriveTime(selectedBase, matchedDay.morning.zone)} min da {getShortBaseName(selectedBase)}</p>
                        <p>📍 {matchedDay.morning.zone}</p>
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                      className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">2. Pranzo</span>
                          <span className="font-label-sm text-label-sm px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-full">Pranzo tipico 🍽</span>
                        </div>
                        <h4 className="font-label-md text-label-md text-on-surface font-bold mb-1">{matchedDay.lunch.name}</h4>
                        <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mb-3">{matchedDay.lunch.description}</p>
                      </div>
                      <div className="pt-2 border-t border-outline-variant/20 font-label-sm text-label-sm text-on-surface-variant space-y-1">
                        <p className="flex items-center gap-1"><Car className="w-3.5 h-3.5 text-outline" />⏱ ~{getDriveTime(selectedBase, matchedDay.lunch.zone)} min da {getShortBaseName(selectedBase)}</p>
                        <p>📍 {matchedDay.lunch.zone}</p>
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">3. Pomeriggio</span>
                          <span className="font-label-sm text-label-sm px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">Attività / Esperienza 🧘</span>
                        </div>
                        <h4 className="font-label-md text-label-md text-on-surface font-bold mb-1">{matchedDay.afternoon.name}</h4>
                        <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mb-3">{matchedDay.afternoon.description}</p>
                      </div>
                      <div className="pt-2 border-t border-outline-variant/20 font-label-sm text-label-sm text-on-surface-variant space-y-1">
                        <p className="flex items-center gap-1"><Car className="w-3.5 h-3.5 text-outline" />⏱ ~{getDriveTime(selectedBase, matchedDay.afternoon.zone)} min da {getShortBaseName(selectedBase)}</p>
                        <p>📍 {matchedDay.afternoon.zone}</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <button onClick={generatePerfectDay}
                      className="px-5 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:bg-surface-variant transition-colors font-bold font-label-md text-label-md flex items-center gap-2 w-full sm:w-auto justify-center">
                      <Shuffle className="w-4 h-4 shrink-0" />Rimescola Giornata
                    </button>
                    <button onClick={saveEntireDay}
                      className="px-6 py-3.5 rounded-xl bg-primary text-on-primary font-bold font-label-md text-label-md shadow-md shadow-primary/25 hover:shadow-lg transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
                      <Heart className="w-4 h-4 shrink-0 fill-on-primary" />Aggiungi Intera Giornata al Piano
                    </button>
                  </div>

                  <AnimatePresence>
                    {showMatcherSuccess && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="bg-tertiary/10 border border-tertiary/30 text-tertiary p-3 rounded-2xl text-center font-label-sm text-label-sm font-semibold max-w-sm mx-auto">
                        ✅ Giornata salvata! Apri &ldquo;Il Mio Piano&rdquo; per vederla.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
