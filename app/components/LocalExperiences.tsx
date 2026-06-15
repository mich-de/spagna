'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Heart, MapPin, Clock, DollarSign, Lightbulb, Map, Star, Car, Compass } from 'lucide-react'
import experiences from '@/data/local-experiences.json'
import { getDriveTime, getShortBaseName } from '@/app/utils/driveTimes'

export default function LocalExperiences() {
  const [sortByDriveTime, setSortByDriveTime] = useState(false)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [selectedBase, setSelectedBase] = useState<string>('San Pedro de Alcántara')

  useEffect(() => {
    const stored = localStorage.getItem('sol_local_planner')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.bookmarks) setBookmarks(data.bookmarks)
        if (data.selectedBase) setSelectedBase(data.selectedBase)
      } catch (e) {}
    }
  }, [])

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const ce = e as CustomEvent
      if (ce.detail) {
        if (ce.detail.bookmarks !== undefined) setBookmarks(ce.detail.bookmarks)
        if (ce.detail.selectedBase !== undefined) setSelectedBase(ce.detail.selectedBase || "San Pedro de Alcántara")
      }
    }
    window.addEventListener('sol-local-planner-update', handleUpdate)
    return () => window.removeEventListener('sol-local-planner-update', handleUpdate)
  }, [])

  const toggleBookmark = (exp: any) => {
    const isBookmarked = bookmarks.some(b => b.id === exp.title)
    const nextBookmarks = isBookmarked
      ? bookmarks.filter(b => b.id !== exp.title)
      : [...bookmarks, { id: exp.title, name: exp.title, type: 'experience', zone: exp.where }]
    setBookmarks(nextBookmarks)
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const nextState = { ...current, bookmarks: nextBookmarks }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
  }

  const sortedExperiences = useMemo(() => {
    if (sortByDriveTime) {
      return [...experiences].sort((a: any, b: any) => {
        const timeA = a.where.toLowerCase().includes('ovunque') ? 999 : getDriveTime(selectedBase, a.where)
        const timeB = b.where.toLowerCase().includes('ovunque') ? 999 : getDriveTime(selectedBase, b.where)
        return timeA - timeB
      })
    }
    return experiences
  }, [sortByDriveTime, selectedBase])

  return (
    <section id="experiences" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Compass className="w-4 h-4" />
              <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Vivere come un Locale</span>
            </div>
            <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Esperienze Autentiche</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-2xl">Una selezione curata per scoprire l'anima vera dell'Andalusia, oltre i circuiti turistici convenzionali.</p>
          </motion.div>
          <button onClick={() => setSortByDriveTime(!sortByDriveTime)}
            className={`px-3 py-2 rounded-lg font-label-sm text-label-sm transition-all border flex items-center gap-1.5 self-start sm:self-auto shrink-0 ${
              sortByDriveTime
                ? 'bg-secondary text-on-secondary border-secondary shadow-sm'
                : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/50 hover:border-secondary/50'
            }`}>
            <Car className="w-3.5 h-3.5" />
            {sortByDriveTime ? 'Ordinate per vicinanza' : 'Ordina per vicinanza'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedExperiences.map((exp: any, i: number) => {
            const isBookmarked = bookmarks.some(b => b.id === exp.title)
            return (
              <motion.div key={exp.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] transition-all duration-200 hover:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleBookmark(exp)}
                      className="p-1 text-outline hover:text-red-500 hover:scale-110 transition-all cursor-pointer"
                      title={isBookmarked ? "Rimuovi" : "Aggiungi"}>
                      <Heart className={`w-4 h-4 transition-colors ${isBookmarked ? 'fill-red-500 text-red-500' : 'text-outline'}`} />
                    </button>
                    <h3 className="font-label-md text-label-md text-on-surface font-bold">{exp.title}</h3>
                  </div>
                </div>
                <div className="space-y-1 font-body-md text-[13px] text-on-surface-variant mb-2">
                  <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-outline" /> {exp.where}</p>
                  {!exp.where.toLowerCase().includes('ovunque') && (
                    <p className="flex items-center gap-1.5 text-primary font-medium">
                      <Car className="w-3 h-3 text-primary" /> ~{getDriveTime(selectedBase, exp.where)} min (da {getShortBaseName(selectedBase)})
                    </p>
                  )}
                  <p className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-outline" /> {exp.when}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm px-2 py-0.5 bg-surface-variant text-on-surface-variant rounded-full flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> {exp.cost}
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-outline-variant/30">
                  <p className="font-body-md text-[13px] text-on-surface-variant flex items-start gap-1.5">
                    <Lightbulb className="w-3 h-3 text-tertiary mt-0.5 shrink-0" />
                    {exp.tip}
                  </p>
                </div>
                {(exp.mapLink || exp.tripadvisorLink) && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {exp.mapLink && (
                      <a href={exp.mapLink} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors">
                        <Map className="w-3 h-3" /> Maps
                      </a>
                    )}
                    {exp.tripadvisorLink && (
                      <a href={exp.tripadvisorLink} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                        <Star className="w-3 h-3" /> TA
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
