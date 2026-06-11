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
  id: string
  name: string
  type: 'beach' | 'restaurant' | 'experience' | 'nightlife'
  description: string
  zone: string
  tip: string
  additionalInfo: string
  mapLink?: string
  tripadvisorLink?: string
}

export default function QuickInspiration() {
  const [activeTab, setActiveTab] = useState<'deck' | 'matcher'>('deck')
  const [categoryFilter, setCategoryFilter] = useState<'tutti' | 'spiagge' | 'cibo' | 'esperienze' | 'attrazioni'>('tutti')
  const [selectedBase, setSelectedBase] = useState<string>('San Pedro de Alcántara')
  const [bookmarks, setBookmarks] = useState<any[]>([])

  // State for Inspiration Deck
  const [currentCard, setCurrentCard] = useState<InspirationItem | null>(null)
  const [shuffleTrigger, setShuffleTrigger] = useState(0)

  // State for Perfect Day Matcher
  const [matchedDay, setMatchedDay] = useState<{
    zone: string
    morning: InspirationItem
    lunch: InspirationItem
    afternoon: InspirationItem
  } | null>(null)
  const [isMatching, setIsMatching] = useState(false)
  const [showMatcherSuccess, setShowMatcherSuccess] = useState(false)

  // Load selected base & bookmarks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('sol_local_planner')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.selectedBase) setSelectedBase(data.selectedBase)
        if (data.bookmarks) setBookmarks(data.bookmarks)
      } catch (e) {}
    }
  }, [])

  // Sync state with local planner updates
  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail) {
        if (customEvent.detail.selectedBase !== undefined) {
          setSelectedBase(customEvent.detail.selectedBase || 'San Pedro de Alcántara')
        }
        if (customEvent.detail.bookmarks !== undefined) {
          setBookmarks(customEvent.detail.bookmarks)
        }
      }
    }
    window.addEventListener('sol-local-planner-update', handleUpdate)
    return () => window.removeEventListener('sol-local-planner-update', handleUpdate)
  }, [])

  // Normalize data into common format
  const normalizedItems = useMemo(() => {
    const bItems: InspirationItem[] = beaches.map((b: any) => ({
      id: b.name,
      name: b.name,
      type: 'beach',
      description: b.description,
      zone: b.zone || 'Ovunque',
      tip: b.localTip || '',
      additionalInfo: `Best Time: ${b.bestTime} · Sabbia: ${b.sand}`,
      mapLink: b.mapLink,
      tripadvisorLink: b.tripadvisorLink,
    }))

    const rItems: InspirationItem[] = restaurants.map((r: any) => ({
      id: r.name,
      name: r.name,
      type: 'restaurant',
      description: r.description,
      zone: r.zone || 'Ovunque',
      tip: r.localTip || `Specialità: ${r.specialty}`,
      additionalInfo: `Prezzo: ${r.price} · Tipo: ${r.type}`,
      mapLink: r.mapLink,
      tripadvisorLink: r.tripadvisorLink,
    }))

    const eItems: InspirationItem[] = experiences.map((e: any) => ({
      id: expId(e),
      name: e.title,
      type: 'experience',
      description: e.tip || 'Un\'esperienza autentica consigliata da locali.',
      zone: e.where || 'Ovunque',
      tip: e.when ? `Quando: ${e.when}` : '',
      additionalInfo: `Costo: ${e.cost}`,
      mapLink: e.mapLink,
      tripadvisorLink: e.tripadvisorLink,
    }))

    const aItems: InspirationItem[] = attractions.map((a: any) => ({
      id: a.name,
      name: a.name,
      type: 'experience', // Map to experience for plan simplicity
      description: a.whyVisit,
      zone: a.zone || 'Ovunque',
      tip: a.pairWith ? `Abbina con: ${a.pairWith}` : '',
      additionalInfo: `Durata: ${a.duration} · Costo: ${a.cost}`,
      mapLink: a.mapLink,
    }))

    return {
      tutti: [...bItems, ...rItems, ...eItems, ...aItems],
      spiagge: bItems,
      cibo: rItems,
      esperienze: eItems,
      attrazioni: aItems,
    }
  }, [])


  // Helper helper to get stable id
  function expId(e: any) {
    return e.title
  }

  // Shuffle logic for card deck
  const rollCard = () => {
    let maxDistance = 60
    let list: InspirationItem[] = []
    
    // Dynamically increase distance threshold until we have at least 5 items in the pool
    while (list.length < 5 && maxDistance <= 150) {
      list = normalizedItems[categoryFilter].filter(item => {
        if (item.zone && item.zone.toLowerCase().includes('ovunque')) return true
        return getDriveTime(selectedBase, item.zone) <= maxDistance
      })
      maxDistance += 30
    }

    // Fallback to all items if we still don't have enough
    if (list.length === 0) {
      list = normalizedItems[categoryFilter]
    }

    if (list.length === 0) return
    let rolled = list[Math.floor(Math.random() * list.length)]
    // Avoid rolling the exact same card twice in a row if possible
    if (currentCard && list.length > 1 && rolled.name === currentCard.name) {
      const filteredList = list.filter(item => item.name !== currentCard.name)
      rolled = filteredList[Math.floor(Math.random() * filteredList.length)]
    }
    setCurrentCard(rolled)
    setShuffleTrigger(prev => prev + 1)
  }

  // Initial card roll or when category/base changes
  useEffect(() => {
    rollCard()
  }, [categoryFilter, selectedBase])

  // Toggle bookmark helper
  const toggleBookmark = (item: InspirationItem) => {
    const isBookmarked = bookmarks.some(b => b.id === item.id)
    let nextBookmarks
    if (isBookmarked) {
      nextBookmarks = bookmarks.filter(b => b.id !== item.id)
    } else {
      nextBookmarks = [
        ...bookmarks,
        {
          id: item.id,
          name: item.name,
          type: item.type,
          zone: item.zone,
        },
      ]
    }
    setBookmarks(nextBookmarks)
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const nextState = { ...current, bookmarks: nextBookmarks }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
  }

  // Generate perfect day schedule
  const generatePerfectDay = () => {
    setIsMatching(true)
    setShowMatcherSuccess(false)
    
    setTimeout(() => {
      // Step 1: Select a focus zone within 60 minutes driving distance of chosen base, expanding threshold if needed to get variety
      let maxDistance = 60
      let availableZones: string[] = []
      const allZones = ['Nerja', 'Málaga', 'Marbella', 'Estepona', 'Benalmádena', 'Mijas']
      
      while (availableZones.length < 2 && maxDistance <= 150) {
        availableZones = allZones.filter(zoneName => {
          return getDriveTime(selectedBase, zoneName) <= maxDistance
        })
        maxDistance += 30
      }
      
      const chosenZone = availableZones.length > 0 
        ? availableZones[Math.floor(Math.random() * availableZones.length)]
        : 'Marbella'

      // Step 2: Get morning activity (Beach or Attraction) in that zone
      const morningCandidates = [
        ...normalizedItems.spiagge.filter(b => b.zone.includes(chosenZone)),
        ...normalizedItems.attrazioni.filter(a => a.zone.includes(chosenZone))
      ]
      const morning = morningCandidates.length > 0 
        ? morningCandidates[Math.floor(Math.random() * morningCandidates.length)]
        : normalizedItems.spiagge[Math.floor(Math.random() * normalizedItems.spiagge.length)]

      // Step 3: Get lunch (Restaurant in that zone, or fallback to any restaurant)
      const lunchCandidates = normalizedItems.cibo.filter(r => r.zone.includes(chosenZone))
      const lunch = lunchCandidates.length > 0
        ? lunchCandidates[Math.floor(Math.random() * lunchCandidates.length)]
        : normalizedItems.cibo[Math.floor(Math.random() * normalizedItems.cibo.length)]

      // Step 4: Get afternoon/evening experience (Experience or Attraction in that zone or general)
      const afternoonCandidates = [
        ...normalizedItems.esperienze.filter(e => e.zone.includes(chosenZone) || e.zone.toLowerCase().includes('ovunque')),
        ...normalizedItems.attrazioni.filter(a => a.zone.includes(chosenZone) && a.name !== morning.name)
      ]
      const afternoon = afternoonCandidates.length > 0
        ? afternoonCandidates[Math.floor(Math.random() * afternoonCandidates.length)]
        : normalizedItems.esperienze[Math.floor(Math.random() * normalizedItems.esperienze.length)]

      setMatchedDay({
        zone: chosenZone,
        morning,
        lunch,
        afternoon
      })
      setIsMatching(false)
    }, 600)
  }

  // Re-generate perfect day when base changes
  useEffect(() => {
    generatePerfectDay()
  }, [selectedBase])

  // Save the entire matched day
  const saveEntireDay = () => {
    if (!matchedDay) return
    const { morning, lunch, afternoon } = matchedDay
    
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const currentBookmarks = current.bookmarks || []
    
    // Add all 3 items (avoiding duplicates)
    const itemsToAdd = [morning, lunch, afternoon]
    let nextBookmarks = [...currentBookmarks]
    
    itemsToAdd.forEach(item => {
      if (!nextBookmarks.some(b => b.id === item.id)) {
        nextBookmarks.push({
          id: item.id,
          name: item.name,
          type: item.type,
          zone: item.zone
        })
      }
    })

    setBookmarks(nextBookmarks)
    const nextState = { ...current, bookmarks: nextBookmarks }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
    
    setShowMatcherSuccess(true)
    setTimeout(() => setShowMatcherSuccess(false), 3000)
  }

  // Get icons based on item type
  const getTypeMeta = (type: string) => {
    switch (type) {
      case 'beach':
        return { label: 'Spiaggia', icon: Waves, color: 'bg-sky-50 text-sky-600 border-sky-100' }
      case 'restaurant':
        return { label: 'Cibo & Drink', icon: Utensils, color: 'bg-amber-50 text-amber-600 border-amber-100' }
      case 'experience':
      default:
        return { label: 'Esperienza / Sguardo', icon: Sparkles, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' }
    }
  }

  return (
    <section id="inspiration" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8 relative bg-gradient-to-b from-transparent to-terracotta-50/10">
      <div className="max-w-[1920px] mx-auto">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-terracotta-500 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-[0.3em]">Idee Volanti</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-notte leading-tight">
              Centro <span className="italic font-medium text-terracotta-500">Ispirazione</span>
            </h2>
            <p className="text-mare-700/70 text-base sm:text-lg mt-3 max-w-2xl font-body leading-relaxed">
              Prendi spunti immediati ed esplora combinazioni ideali per la tua giornata andalusa.
            </p>
          </motion.div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-1 bg-white/60 border border-terracotta-100/40 rounded-xl max-w-sm w-full md:w-auto">
            <button
              onClick={() => setActiveTab('deck')}
              className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'deck'
                  ? 'bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white shadow-sm'
                  : 'text-mare-500 hover:text-terracotta-600'
              }`}
            >
              Deck Ispirazioni
            </button>
            <button
              onClick={() => setActiveTab('matcher')}
              className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'matcher'
                  ? 'bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white shadow-sm'
                  : 'text-mare-500 hover:text-terracotta-600'
              }`}
            >
              Giornata Perfetta
            </button>
          </div>
        </div>

        {/* ─── TAB 1: DECK ISPIRAZIONI ─── */}
        {activeTab === 'deck' && (
          <div className="space-y-6">
            {/* Category Quick Filters */}
             <div className="flex flex-row flex-nowrap sm:flex-wrap gap-2 pb-2 overflow-x-auto sm:overflow-x-visible scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 whitespace-nowrap sm:whitespace-normal">
              {[
                { id: 'tutti', label: 'Tutti i tipi ✨' },
                { id: 'spiagge', label: 'Spiagge 🏖' },
                { id: 'cibo', label: 'Ristoranti & Piatti 🍽' },
                { id: 'esperienze', label: 'Esperienze Locali 🧘' },
                { id: 'attrazioni', label: 'Attrazioni storiche 🏛' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                    categoryFilter === cat.id
                      ? 'bg-notte text-white border-notte'
                      : 'bg-white/80 text-mare-750 border-terracotta-100/50 hover:bg-terracotta-50/50 hover:border-terracotta-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Inspiration Card Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
              {/* Card deck visual */}
              <div className="lg:col-span-7 flex justify-center relative">
                <AnimatePresence mode="wait">
                  {currentCard && (
                    <motion.div
                      key={currentCard.id + '-' + shuffleTrigger}
                      initial={{ opacity: 0, scale: 0.92, y: 15, rotate: -2 }}
                      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20, rotate: 2 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                      className="w-full max-w-md bg-white rounded-3xl p-6 border border-terracotta-100/60 card-shadow relative overflow-hidden"
                    >
                      {/* Stylized background glow elements */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-terracotta-200/10 to-oro/10 rounded-full blur-xl" />
                      
                      {/* Top Info Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {(() => {
                            const meta = getTypeMeta(currentCard.type)
                            return (
                              <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${meta.color}`}>
                                <meta.icon className="w-3 h-3" />
                                {meta.label}
                              </div>
                            )
                          })()}
                          <span className="text-[10px] font-semibold text-mare-400 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" />
                            {currentCard.zone}
                          </span>
                        </div>

                        {/* Heart toggle */}
                        <button
                          onClick={() => toggleBookmark(currentCard)}
                          className="p-2 text-mare-400 hover:text-red-500 rounded-full hover:bg-red-50/50 transition-colors cursor-pointer"
                        >
                          <Heart
                            className={`w-5 h-5 transition-colors ${
                              bookmarks.some(b => b.id === currentCard.id)
                                ? 'fill-red-500 text-red-500 scale-110'
                                : 'text-mare-300 hover:scale-105'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-display text-2xl font-bold text-notte leading-snug">{currentCard.name}</h3>
                          <p className="text-xs text-mare-750/70 mt-2 leading-relaxed font-body min-h-[60px]">{currentCard.description}</p>
                        </div>

                        {/* Local tip box */}
                        {currentCard.tip && (
                          <div className="p-3 bg-gradient-to-r from-terracotta-50 to-crema/40 border border-terracotta-100/20 rounded-2xl">
                            <p className="text-xs text-mare-800 leading-relaxed">
                              <span className="font-bold text-terracotta-600">💡 Consiglio: </span>
                              {currentCard.tip}
                            </p>
                          </div>
                        )}

                        {/* Metadata pills */}
                        <div className="flex flex-wrap gap-2 text-[11px] text-mare-500/80 font-medium">
                          <span className="px-2.5 py-1 bg-sabbia rounded-lg border border-terracotta-100/20">
                            {currentCard.additionalInfo}
                          </span>
                          <span className="px-2.5 py-1 bg-sabbia rounded-lg border border-terracotta-100/20 flex items-center gap-1">
                            <Car className="w-3 h-3 text-terracotta-500" />
                            ⏱ ~{getDriveTime(selectedBase, currentCard.zone)} min da {getShortBaseName(selectedBase)}
                          </span>
                        </div>

                        {/* Action links */}
                        <div className="flex items-center gap-2 pt-2">
                          {currentCard.mapLink && (
                            <a
                              href={currentCard.mapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2 text-center rounded-xl text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors border border-sky-100 flex items-center justify-center gap-1.5"
                            >
                              <Map className="w-3.5 h-3.5" />
                              Google Maps
                            </a>
                          )}
                          {currentCard.tripadvisorLink && (
                            <a
                              href={currentCard.tripadvisorLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2 text-center rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-100 flex items-center justify-center gap-1.5"
                            >
                              <Star className="w-3.5 h-3.5" />
                              TripAdvisor
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Inspiration generator column */}
              <div className="lg:col-span-5 space-y-6 lg:pl-6 text-center lg:text-left">
                <div className="space-y-3">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-notte">Sei a corto di idee?</h3>
                  <p className="text-sm text-mare-700/70 leading-relaxed font-body">
                    Filtra per la categoria che ti interessa e premi il bottone qui sotto per pescare una scheda dal nostro mazzo andaluso. Salvala subito nel tuo piano per non perderla!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:justify-start">
                  <button
                    onClick={rollCard}
                    className="px-6 py-4.5 rounded-2xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white font-bold text-sm shadow-md shadow-terracotta-500/25 hover:scale-103 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Shuffle className="w-4 h-4 shrink-0 animate-spin-slow" />
                    Genera Altra Idea
                  </button>

                  <button
                    onClick={() => currentCard && toggleBookmark(currentCard)}
                    className={`px-6 py-4.5 rounded-2xl font-bold text-sm transition-all border flex items-center justify-center gap-2 cursor-pointer ${
                      currentCard && bookmarks.some(b => b.id === currentCard.id)
                        ? 'bg-red-500 text-white border-red-500 shadow-md shadow-red-500/25'
                        : 'bg-white text-mare-750 border-terracotta-100/50 hover:bg-terracotta-50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 shrink-0 ${currentCard && bookmarks.some(b => b.id === currentCard.id) ? 'fill-white' : ''}`} />
                    {currentCard && bookmarks.some(b => b.id === currentCard.id) ? 'Salvata nei preferiti' : 'Salva nel mio Piano'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: GIORNATA MATCHER ─── */}
        {activeTab === 'matcher' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-notte">Il Matcher di Giornata 🎲</h3>
              <p className="text-xs sm:text-sm text-mare-700/70 font-body">
                Il generatore seleziona una zona focale e unisce una spiaggia/attrazione, un ottimo pranzo e un&apos;esperienza coerenti nello stesso distretto per minimizzare i tempi di viaggio!
              </p>
            </div>

            {/* Generated Matchboard Container */}
            <div className="relative">
              {/* Overlay loader */}
              {isMatching && (
                <div className="absolute inset-0 bg-[#fcf7ec]/60 backdrop-blur-sm z-20 flex items-center justify-center rounded-3xl">
                  <div className="text-center space-y-3">
                    <Shuffle className="w-8 h-8 text-terracotta-500 animate-spin mx-auto" />
                    <p className="text-xs font-semibold text-mare-700">Abbinando la tua giornata ideale...</p>
                  </div>
                </div>
              )}

              {matchedDay && (
                <div className="space-y-6">
                  {/* Focus Zone Pill */}
                  <div className="text-center">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white font-bold text-xs uppercase tracking-widest shadow-sm">
                      Zona focale: {matchedDay.zone}
                    </span>
                  </div>

                  {/* Horizontal Match Timeline Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    {/* Visual Connector Line for Large Screens */}
                    <div className="hidden md:block absolute top-[140px] left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-terracotta-200 via-oro to-terracotta-200 -z-10" />

                    {/* Morning Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white/90 rounded-2xl p-5 border border-terracotta-100/40 card-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-mare-400">1. Mattina</span>
                          <span className="badge-pill py-0.5 text-[9px] bg-sky-50 text-sky-700 border-sky-100">
                            {matchedDay.morning.type === 'beach' ? 'Spiaggia 🏖' : 'Attrazione 🏛'}
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-notte text-base mb-1">{matchedDay.morning.name}</h4>
                        <p className="text-xs text-mare-700/60 font-body line-clamp-3 mb-3">{matchedDay.morning.description}</p>
                      </div>
                      <div className="pt-2 border-t border-terracotta-50 text-[10px] text-mare-400 space-y-1">
                        <p className="flex items-center gap-1">
                          <Car className="w-3.5 h-3.5 text-terracotta-400" />
                          ⏱ ~{getDriveTime(selectedBase, matchedDay.morning.zone)} min da {getShortBaseName(selectedBase)}
                        </p>
                        <p>📍 {matchedDay.morning.zone}</p>
                      </div>
                    </motion.div>

                    {/* Lunch Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/90 rounded-2xl p-5 border border-terracotta-100/40 card-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-mare-400">2. Pranzo</span>
                          <span className="badge-pill py-0.5 text-[9px] bg-amber-50 text-amber-700 border-amber-100">
                            Pranzo tipico 🍽
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-notte text-base mb-1">{matchedDay.lunch.name}</h4>
                        <p className="text-xs text-mare-700/60 font-body line-clamp-3 mb-3">{matchedDay.lunch.description}</p>
                      </div>
                      <div className="pt-2 border-t border-terracotta-50 text-[10px] text-mare-400 space-y-1">
                        <p className="flex items-center gap-1">
                          <Car className="w-3.5 h-3.5 text-terracotta-400" />
                          ⏱ ~{getDriveTime(selectedBase, matchedDay.lunch.zone)} min da {getShortBaseName(selectedBase)}
                        </p>
                        <p>📍 {matchedDay.lunch.zone}</p>
                      </div>
                    </motion.div>

                    {/* Afternoon Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/90 rounded-2xl p-5 border border-terracotta-100/40 card-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-mare-400">3. Pomeriggio</span>
                          <span className="badge-pill py-0.5 text-[9px] bg-emerald-50 text-emerald-700 border-emerald-100">
                            Attività / Esperienza 🧘
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-notte text-base mb-1">{matchedDay.afternoon.name}</h4>
                        <p className="text-xs text-mare-700/60 font-body line-clamp-3 mb-3">{matchedDay.afternoon.description}</p>
                      </div>
                      <div className="pt-2 border-t border-terracotta-50 text-[10px] text-mare-400 space-y-1">
                        <p className="flex items-center gap-1">
                          <Car className="w-3.5 h-3.5 text-terracotta-400" />
                          ⏱ ~{getDriveTime(selectedBase, matchedDay.afternoon.zone)} min da {getShortBaseName(selectedBase)}
                        </p>
                        <p>📍 {matchedDay.afternoon.zone}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Actions under the matchtimeline */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <button
                      onClick={generatePerfectDay}
                      className="px-5 py-3.5 rounded-xl bg-white text-mare-750 border border-terracotta-100/50 hover:bg-terracotta-50 hover:border-terracotta-200 transition-colors font-bold text-xs flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                    >
                      <Shuffle className="w-4 h-4 shrink-0" />
                      Rimescola Giornata
                    </button>

                    <button
                      onClick={saveEntireDay}
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white font-bold text-xs shadow-md shadow-terracotta-500/25 hover:scale-102 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                    >
                      <Heart className="w-4 h-4 shrink-0 fill-white" />
                      Aggiungi Intera Giornata al Piano
                    </button>
                  </div>

                  {/* Success notification banner */}
                  <AnimatePresence>
                    {showMatcherSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-3 rounded-2xl text-center text-xs font-semibold max-w-sm mx-auto"
                      >
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
