'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Heart, MapPin, Clock, DollarSign, Lightbulb, Map, Star, Car } from 'lucide-react'
import experiences from '@/data/local-experiences.json'
import { getDriveTime, getShortBaseName } from '@/app/utils/driveTimes'

export default function LocalExperiences() {
  const [sortByDriveTime, setSortByDriveTime] = useState(false)

  // Bookmarks state
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
      const customEvent = e as CustomEvent
      if (customEvent.detail) {
        if (customEvent.detail.bookmarks !== undefined) {
          setBookmarks(customEvent.detail.bookmarks)
        }
        if (customEvent.detail.selectedBase !== undefined) {
          setSelectedBase(customEvent.detail.selectedBase || "San Pedro de Alcántara")
        }
      }
    }
    window.addEventListener('sol-local-planner-update', handleUpdate)
    return () => window.removeEventListener('sol-local-planner-update', handleUpdate)
  }, [])

  const toggleBookmark = (exp: any) => {
    const isBookmarked = bookmarks.some(b => b.id === exp.title)
    let nextBookmarks
    if (isBookmarked) {
      nextBookmarks = bookmarks.filter(b => b.id !== exp.title)
    } else {
      nextBookmarks = [...bookmarks, {
        id: exp.title,
        name: exp.title,
        type: 'experience',
        zone: exp.where
      }]
    }
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
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Autenticità</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Esperienze da locale</h2>
            <p className="text-mare-700/70 mt-1">15 modi per vivere la Costa del Sol come un residente</p>
          </motion.div>
          
          <button
            onClick={() => setSortByDriveTime(!sortByDriveTime)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shrink-0 ${
              sortByDriveTime
                ? 'bg-terracotta-500 text-white border-terracotta-500 shadow-md shadow-terracotta-500/25'
                : 'bg-white/80 text-mare-750 border-terracotta-100/50 hover:bg-terracotta-50 hover:text-terracotta-600'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            {sortByDriveTime ? 'Ordinate per vicinanza (⏱)' : 'Ordina per vicinanza (⏱)'}
          </button>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-visible gap-3 pt-2 pb-4 sm:pt-0 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {sortedExperiences.map((exp: any, i: number) => {
            const isBookmarked = bookmarks.some(b => b.id === exp.title)
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-terracotta-100/40 card-shadow card-hover w-[290px] xs:w-[325px] sm:w-auto shrink-0 snap-center"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(exp)}
                      className="p-1 text-mare-400 hover:text-red-500 hover:scale-115 transition-all cursor-pointer"
                      title={isBookmarked ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isBookmarked ? 'fill-red-500 text-red-500' : 'text-mare-300'
                        }`}
                      />
                    </button>
                    <h3 className="font-display font-bold text-sm text-notte">{exp.title}</h3>
                  </div>
                </div>
              <div className="space-y-1 text-xs text-mare-700/60 mb-2">
                <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-terracotta-400" /> {exp.where}</p>
                {exp.where.toLowerCase().includes('ovunque') ? null : (
                  <p className="flex items-center gap-1.5 font-semibold text-terracotta-600">
                    <Car className="w-3 h-3 text-terracotta-400" /> ~{getDriveTime(selectedBase, exp.where)} min (da {getShortBaseName(selectedBase)})
                  </p>
                )}
                <p className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-terracotta-400" /> {exp.when}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 bg-mare-100 text-mare-700 rounded-full flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> {exp.cost}
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-terracotta-100/30">
                <p className="text-xs text-mare-700/70 flex items-start gap-1.5">
                  <Lightbulb className="w-3 h-3 text-amber-500 mt-0.5 shrink-0" />
                  {exp.tip}
                </p>
              </div>
              {(exp.mapLink || exp.tripadvisorLink) && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {exp.mapLink && (
                    <a
                      href={exp.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                    >
                      <Map className="w-3 h-3" /> Maps
                    </a>
                  )}
                  {exp.tripadvisorLink && (
                    <a
                      href={exp.tripadvisorLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
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
