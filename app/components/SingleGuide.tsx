'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Clock, 
  VenetianMask, 
  MapPin, 
  Flame, 
  Smartphone, 
  Music, 
  Calendar, 
  ShieldAlert, 
  Youtube,
  ExternalLink,
  ChevronRight,
  Play,
  Instagram,
  MessageSquare
} from 'lucide-react'
import movidaData from '@/data/movida-over35.json'

export default function SingleGuide() {
  const [activeTab, setActiveTab] = useState('mindset')
  const [selectedCity, setSelectedCity] = useState('malaga')

  const cities = [
    { id: 'malaga', label: 'Málaga Centro' },
    { id: 'sanpedro', label: 'San Pedro' },
    { id: 'marbella', label: 'Marbella' },
    { id: 'estepona', label: 'Estepona' },
    { id: 'nerja', label: 'Nerja' },
    { id: 'benalmadena', label: 'Benalmádena' },
    { id: 'fuengirola', label: 'Fuengirola' },
    { id: 'torremolinos', label: 'Torremolinos' },
  ]

  const getActiveLocali = () => {
    if (selectedCity === 'malaga') {
      return movidaData.locali
    }
    const zoneMap: Record<string, string> = {
      sanpedro: 'sanpedro',
      marbella: 'marbella',
      estepona: 'estepona',
      nerja: 'nerjacosta',
      benalmadena: 'benalmadena',
      fuengirola: 'fuengirola',
      torremolinos: 'torremolinos'
    }
    const targetZoneId = zoneMap[selectedCity]
    const zone = movidaData.costa.zones.find((z: any) => z.id === targetZoneId)
    if (!zone) return []
    return zone.venues.map((v: any, idx: number) => ({
      id: `${selectedCity}-venue-${idx}`,
      name: v.name,
      description: v.details,
      category: v.category || 'LOCALE',
      categoryColor: v.categoryColor || 'bg-terracotta-500',
      address: v.address,
      mapLink: v.mapLink,
      instagram: v.instagram,
      instagramHandle: v.instagramHandle,
      comments: v.comments
    }))
  }

  const activeLocali = getActiveLocali()

  const tabs = [
    { id: 'mindset', label: 'Briefing & Mindset', icon: '🧠' },
    { id: 'alloggio', label: 'Dove Alloggiare', icon: '🏨' },
    { id: 'locali', label: 'Mappa Locali', icon: '🍹' },
    { id: 'costa', label: 'Mappa Costa', icon: '🏝️' },
    { id: 'tardeo', label: 'Tardeo al Perreo', icon: '🌊' },
    { id: 'nerja', label: 'Focus Nerja', icon: '🏖️' },
    { id: 'dating', label: 'Dating & Social App', icon: '📱' },
    { id: 'plan', label: 'Piano d\'Azione', icon: '📅' },
    { id: 'historical', label: 'Report Storico 2013', icon: '📜' },
    { id: 'sicurezza', label: 'Sicurezza & Logistica', icon: '🛡️' },
  ]

  return (
    <section id="single-guide" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Single & Local</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Movida Over 35 (Locali e Non Turisti)</h2>
          <p className="text-mare-700/70 mt-1">Guida strategica di socializzazione per residenti locali, tardeo tropicale ed intrattenimento per adulti (Giugno 2026)</p>
        </motion.div>

        <div className="glass p-3 sm:p-6 rounded-2xl border border-terracotta-100/40 card-shadow bg-gradient-to-br from-indigo-50/20 via-purple-50/15 to-crema/20">
          
          {/* Tabs Container */}
          <div className="relative mb-6">
            {/* Left and Right Fade Masks for Horizontal Scrolling on Mobile */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#faf8f5] via-[#faf8f5]/80 to-transparent pointer-events-none z-10 md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#faf8f5] via-[#faf8f5]/80 to-transparent pointer-events-none z-10 md:hidden" />
            
            <div className="flex overflow-x-auto md:flex-wrap md:overflow-visible gap-1.5 pb-2 border-b border-terracotta-100/30 whitespace-nowrap md:whitespace-normal scrollbar-hide snap-x md:snap-none px-4 md:px-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold tracking-wide transition-all snap-center cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-terracotta-500 text-white shadow-sm'
                      : 'bg-white/80 text-mare-750 border border-terracotta-100/40 hover:bg-terracotta-50 hover:text-terracotta-600'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="text-sm text-mare-800 leading-relaxed">
            
            {/* BRIEFING & MINDSET */}
            {activeTab === 'mindset' && (
              <div className="space-y-4 bg-white/60 p-3.5 sm:p-5 rounded-xl border border-terracotta-100/30">
                <h3 className="font-display text-base font-bold text-notte flex items-center gap-2 mb-2">
                  <span>🧠 Briefing Iniziale e Mindset (Stile &quot;Field Report&quot;)</span>
                </h3>
                <p>{movidaData.briefing.intro}</p>
                <p>{movidaData.briefing.subIntro}</p>

                {movidaData.briefing.disclaimer && (
                  <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-250/20 text-xs italic text-mare-750/95 leading-relaxed mt-3 flex items-start gap-2">
                    <span className="text-sm shrink-0">💡</span>
                    <div>
                      <strong>Nota di Pragmatismo:</strong> {movidaData.briefing.disclaimer}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {movidaData.briefing.cards.map((card: any, idx: number) => (
                    <div key={idx} className="p-3.5 bg-terracotta-50/50 rounded-xl border border-terracotta-100/30">
                      <p className="font-bold text-sm text-terracotta-600 mb-1 flex items-center gap-1.5">
                        <span>{card.icon}</span> {card.title}
                      </p>
                      <p className="text-xs text-mare-700/80 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DOVE ALLOGGIARE */}
            {activeTab === 'alloggio' && (
              <div className="space-y-4 bg-white/60 p-3.5 sm:p-5 rounded-xl border border-terracotta-100/30">
                <h3 className="font-display text-base font-bold text-notte flex items-center gap-2 mb-2">
                  <span>🏨 Dove Alloggiare per la Movida Over 35 &amp; Dating</span>
                </h3>
                <p className="text-xs text-mare-750 leading-relaxed mb-4">
                  {movidaData.alloggio?.intro || "La scelta dell'area in cui alloggiare è fondamentale per ottimizzare il tasso di conversione delle dating app, ridurre i costi di parcheggio/trasferimento e facilitare i rientri notturni."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movidaData.alloggio?.zone?.map((zona: any) => (
                    <div 
                      key={zona.id} 
                      className="p-4 bg-white/80 rounded-xl border border-terracotta-100/20 card-shadow card-hover flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2.5">
                          <h4 className="font-display text-sm font-bold text-notte">{zona.name}</h4>
                          <span className="px-2 py-0.5 bg-terracotta-50 text-terracotta-700 border border-terracotta-100/30 rounded-full text-[9px] font-bold uppercase tracking-wider">
                            {zona.vibe}
                          </span>
                        </div>

                        <div className="space-y-2 mb-3.5">
                          <div className="text-[11px] text-mare-800">
                            <span className="font-bold text-emerald-600 uppercase tracking-wide block mb-0.5 text-[9px]">🟢 PRO:</span>
                            <ul className="list-disc pl-4 space-y-0.5">
                              {zona.pro.map((pro: string, idx: number) => (
                                <li key={idx} className="leading-relaxed">{pro}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="text-[11px] text-mare-800 pt-1.5 border-t border-terracotta-100/5">
                            <span className="font-bold text-red-500 uppercase tracking-wide block mb-0.5 text-[9px]">🔴 CONTRO:</span>
                            <ul className="list-disc pl-4 space-y-0.5">
                              {zona.contro.map((contro: string, idx: number) => (
                                <li key={idx} className="leading-relaxed">{contro}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-terracotta-150/10 text-xs text-mare-750">
                        <span className="font-bold text-terracotta-600 block text-[10px] mb-0.5 uppercase tracking-wide">💡 Strategia di Socializzazione:</span>
                        <p className="italic leading-relaxed">{zona.strategia}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MAPPA LOCALI */}
            {activeTab === 'locali' && (
              <div className="space-y-4 bg-white/60 p-3.5 sm:p-5 rounded-xl border border-terracotta-100/30">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                  <h3 className="font-display text-base font-bold text-notte flex items-center gap-2">
                    <span>🍹 Mappa Strategica dei Locali (Residenti vs Adult Entertainment)</span>
                  </h3>
                  <a 
                    href="https://www.youtube.com/watch?v=sSei8qcn72w" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 border border-red-200/50 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    Guarda Video Report
                  </a>
                </div>

                {/* City Filter Selection */}
                <div className="relative">
                  {/* Left and Right Fade Masks for Horizontal Scrolling on Mobile */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#faf8f5] via-[#faf8f5]/85 to-transparent pointer-events-none z-10 sm:hidden" />
                  <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#faf8f5] via-[#faf8f5]/85 to-transparent pointer-events-none z-10 sm:hidden" />
                  
                  <div className="flex overflow-x-auto sm:flex-wrap gap-1.5 pb-2.5 mb-2 whitespace-nowrap scrollbar-hide snap-x px-2 sm:px-0">
                    {cities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => setSelectedCity(city.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] sm:text-xs font-bold tracking-wide transition-all snap-center cursor-pointer ${
                          selectedCity === city.id
                            ? 'bg-mare-600 text-white shadow-sm'
                            : 'bg-white text-mare-750 border border-terracotta-100/20 hover:bg-mare-50'
                        }`}
                      >
                        {city.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {activeLocali.map((locale: any) => (
                    <div key={locale.id} className={`p-3 sm:p-4 rounded-xl border ${locale.category === 'ADULT' ? 'bg-red-50/30 border-red-200/40' : 'bg-white/80 border-terracotta-100/20'}`}>
                      <p className={`text-sm font-bold flex items-center gap-2 ${locale.category === 'ADULT' ? 'text-red-700' : 'text-terracotta-600'}`}>
                        <span className={`badge-pill text-white border-0 py-0 px-2 text-[10px] ${locale.categoryColor || 'bg-terracotta-500'}`}>
                          {locale.category}
                        </span>
                        {locale.name}
                      </p>

                      {locale.imageUrl && (
                        <div className="mt-3 relative h-32 sm:h-40 w-full overflow-hidden rounded-lg border border-terracotta-100/10">
                          <img 
                            src={locale.imageUrl} 
                            alt={locale.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      )}

                      <p className="text-xs text-mare-700 mt-2 leading-relaxed whitespace-pre-line">
                        {locale.description}
                      </p>

                      {locale.isDouble ? (
                        <div className="mt-3 pt-2.5 border-t border-terracotta-150/10 space-y-3">
                          {locale.venues?.map((venue: any, vIdx: number) => (
                            <div key={vIdx} className="flex flex-col space-y-1 pt-0.5">
                              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-4 gap-y-1.5 text-xs">
                                <span className="font-semibold text-mare-800 shrink-0">{venue.label}</span>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                  <a
                                    href={venue.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-mare-600 hover:text-terracotta-600 transition-colors py-0.5"
                                  >
                                    <MapPin className="w-3.5 h-3.5 shrink-0 text-terracotta-500" />
                                    <span className="truncate max-w-[200px] sm:max-w-none">{venue.address}</span>
                                  </a>
                                  <a
                                    href={venue.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-mare-600 hover:text-terracotta-600 transition-colors py-0.5"
                                  >
                                    <Instagram className="w-3.5 h-3.5 shrink-0 text-pink-500" />
                                    <span className="truncate max-w-[150px] sm:max-w-none">{venue.instagramHandle}</span>
                                  </a>
                                </div>
                              </div>
                              {venue.comments && (
                                <div className="pl-3 border-l border-terracotta-200/40 mt-1 space-y-1 max-h-28 overflow-y-auto pr-1">
                                  {venue.comments.map((comment: string, cIdx: number) => (
                                    <p key={cIdx} className="text-[10px] text-mare-600 italic leading-relaxed">
                                      &ldquo;{comment}&rdquo;
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3 pt-2.5 border-t ${locale.category === 'ADULT' ? 'border-red-200/20' : 'border-terracotta-150/10'}`}>
                            <a
                              href={locale.mapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 text-xs transition-colors ${
                                locale.category === 'ADULT' 
                                  ? 'text-red-700 hover:text-red-900' 
                                  : 'text-mare-600 hover:text-terracotta-600'
                              } py-0.5`}
                            >
                              <MapPin className={`w-3.5 h-3.5 shrink-0 ${locale.category === 'ADULT' ? 'text-red-500' : 'text-terracotta-500'}`} />
                              <span className="truncate max-w-[220px] sm:max-w-none">{locale.address}</span>
                            </a>
                            {locale.website && (
                              <a
                                href={locale.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1 text-xs transition-colors ${
                                  locale.category === 'ADULT' 
                                    ? 'text-red-700 hover:text-red-900' 
                                    : 'text-mare-600 hover:text-terracotta-600'
                                } py-0.5`}
                              >
                                <ExternalLink className={`w-3.5 h-3.5 shrink-0 ${locale.category === 'ADULT' ? 'text-red-500' : 'text-terracotta-500'}`} />
                                <span className="truncate max-w-[150px] sm:max-w-none">Sito Ufficiale</span>
                              </a>
                            )}
                            {locale.instagram && (
                              <a
                                href={locale.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-mare-600 hover:text-terracotta-600 transition-colors py-0.5"
                              >
                                <Instagram className="w-3.5 h-3.5 shrink-0 text-pink-500" />
                                <span className="truncate max-w-[150px] sm:max-w-none">{locale.instagramHandle}</span>
                              </a>
                            )}
                          </div>
                          {locale.comments && (
                            <div className="mt-2.5 pt-2 border-t border-terracotta-150/5">
                              <p className="text-[10px] font-semibold text-terracotta-600 flex items-center gap-1 mb-1">
                                <MessageSquare className="w-3 h-3" />
                                <span>Voci dai Forum (Reddit &amp; GnoccaTravel):</span>
                              </p>
                              <div className="space-y-1.5 pl-3 border-l border-terracotta-200/40 max-h-36 overflow-y-auto pr-1">
                                {locale.comments.map((comment: string, cIdx: number) => (
                                  <p key={cIdx} className="text-[10px] text-mare-600 italic leading-relaxed">
                                    &ldquo;{comment}&rdquo;
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MAPPA COSTA */}
            {activeTab === 'costa' && (
              <div className="space-y-4 bg-white/60 p-3.5 sm:p-5 rounded-xl border border-terracotta-100/30">
                <h3 className="font-display text-base font-bold text-notte flex items-center gap-2 mb-2">
                  <span>🏝️ Mappa Strategica Costa del Sol (Località Esterne)</span>
                </h3>
                <p className="text-xs text-mare-700 leading-relaxed mb-3">
                  {movidaData.costa?.intro}
                </p>

                <div className="space-y-4">
                  {movidaData.costa?.zones.map((zone: any) => (
                    <div key={zone.id} className="p-3 sm:p-4 bg-white/80 rounded-xl border border-terracotta-100/20 card-shadow">
                      <p className="text-sm font-bold text-terracotta-600 flex items-center gap-1.5">
                        <span>📍</span> {zone.name}
                      </p>
                      <p className="text-xs text-mare-750/90 mt-2 leading-relaxed italic border-l-2 border-terracotta-300 pl-2">
                        {zone.description}
                      </p>
                      
                      <div className="mt-3 pt-3 border-t border-terracotta-150/10 space-y-3">
                        <p className="text-[10px] font-semibold text-mare-400 uppercase tracking-wider">Hotspots & Strategia:</p>
                        <div className="flex md:grid overflow-x-auto md:overflow-visible gap-3 pb-3 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-3 px-3 md:mx-0 md:px-0">
                          {zone.venues.map((venue: any, vIdx: number) => (
                            <div key={vIdx} className="min-w-[85vw] sm:min-w-[45%] md:min-w-0 snap-center p-3 bg-terracotta-50/40 rounded-lg border border-terracotta-100/10 flex flex-col justify-between">
                              <div>
                                <span className="font-bold text-xs text-mare-800 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 bg-terracotta-500 rounded-full animate-pulse shrink-0"></span>
                                  {venue.name}
                                </span>
                                <p className="text-[10px] text-mare-700/80 mt-1.5 leading-relaxed">
                                  {venue.details}
                                </p>
                                {venue.comments && (
                                  <div className="mt-2.5 pt-2 border-t border-terracotta-150/10">
                                    <p className="text-[9px] font-semibold text-terracotta-600 flex items-center gap-1 mb-1">
                                      <MessageSquare className="w-2.5 h-2.5 shrink-0" />
                                      <span>Voci dai Forum:</span>
                                    </p>
                                    <div className="space-y-1 pl-2 border-l border-terracotta-200/35 max-h-24 overflow-y-auto pr-1">
                                      {venue.comments.map((comment: string, cIdx: number) => (
                                        <p key={cIdx} className="text-[9px] text-mare-600 italic leading-normal">
                                          &ldquo;{comment}&rdquo;
                                        </p>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              {(venue.address || venue.instagram) && (
                                <div className="mt-2.5 pt-2 border-t border-terracotta-100/20 flex flex-col gap-1 text-[9px]">
                                  {venue.address && (
                                    <a
                                      href={venue.mapLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-mare-600 hover:text-terracotta-600 transition-colors py-0.5"
                                    >
                                      <MapPin className="w-3 h-3 text-terracotta-500 shrink-0" />
                                      <span className="truncate max-w-[220px] sm:max-w-none">{venue.address}</span>
                                    </a>
                                  )}
                                  {venue.instagram && (
                                    <a
                                      href={venue.instagram}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-mare-600 hover:text-terracotta-600 transition-colors py-0.5"
                                    >
                                      <Instagram className="w-3 h-3 text-pink-500 shrink-0" />
                                      <span className="truncate max-w-[150px] sm:max-w-none">{venue.instagramHandle}</span>
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TARDEO AL PERREO */}
            {activeTab === 'tardeo' && (
              <div className="space-y-4 bg-white/60 p-3.5 sm:p-5 rounded-xl border border-terracotta-100/30">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                  <h3 className="font-display text-base font-bold text-notte flex items-center gap-2">
                    <span>🌊 Il Fenomeno &quot;Del Tardeo al Perreo&quot;</span>
                  </h3>
                  <a 
                    href="https://www.youtube.com/watch?v=U1hS1arFIUw" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 border border-red-200/50 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    Guarda Video Vibe
                  </a>
                </div>
                <p>{movidaData.tardeo.intro}</p>

                <div className="space-y-3 mt-3">
                  {movidaData.tardeo.steps.map((step: any, idx: number) => (
                    <div key={idx} className="p-3 sm:p-4 bg-white/80 rounded-xl border border-terracotta-100/20">
                      <p className="text-xs font-bold text-terracotta-600">{step.title}</p>
                      <p className="text-xs text-mare-700 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FOCUS NERJA */}
            {activeTab === 'nerja' && (
              <div className="space-y-4 bg-white/60 p-3.5 sm:p-5 rounded-xl border border-terracotta-100/30">
                <h3 className="font-display text-base font-bold text-notte flex items-center gap-2 mb-2">
                  <span>🏖️ Focus Logistico e Strategico: Nerja (Costa del Sol Est)</span>
                </h3>
                <p>{movidaData.nerja.intro}</p>

                <div className="space-y-3">
                  <div className="p-3 sm:p-4 bg-white/80 rounded-xl border border-terracotta-100/20">
                    <p className="text-xs font-bold text-terracotta-600 flex items-center gap-1">
                      <span>📍</span> Mappatura delle Zone (La Logica della Notte)
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 text-xs">
                      {movidaData.nerja.zones.map((zone: any, idx: number) => (
                        <div key={idx} className="p-2.5 bg-terracotta-50/50 rounded-lg">
                          <strong>{zone.title}</strong>
                          <p className="text-[10px] text-terracotta-500 italic mt-0.5">{zone.time}</p>
                          <p className="mt-1 text-mare-750/90 leading-relaxed">{zone.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 bg-white/80 rounded-xl border border-terracotta-100/20">
                    <p className="text-xs font-bold text-terracotta-600 mb-2">🍹 Locali Target (Over 35 & Latino-Spagnoli)</p>
                    <div className="space-y-3 text-xs">
                      {movidaData.nerja.venues.map((venue: any, idx: number) => (
                        <div key={idx} className="p-2.5 bg-white rounded-lg border border-terracotta-100/10">
                          {venue.isDouble ? (
                            <>
                              <div>
                                <strong>⚡ {venue.name}:</strong> {venue.description}
                              </div>
                              <div className="mt-2 pt-1.5 border-t border-terracotta-100/5 space-y-3 text-[11px]">
                                {venue.venues?.map((subV: any, sIdx: number) => (
                                  <div key={sIdx} className="flex flex-col space-y-1">
                                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-3 gap-y-1">
                                      <span className="font-semibold text-mare-750 shrink-0">{subV.label}</span>
                                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <a
                                          href={subV.mapLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 text-mare-600 hover:text-terracotta-600 transition-colors py-0.5"
                                        >
                                          <MapPin className="w-3 h-3 shrink-0 text-terracotta-500" />
                                          <span className="truncate max-w-[200px] sm:max-w-none">{subV.address}</span>
                                        </a>
                                        {subV.facebookUrl && (
                                          <a
                                            href={subV.facebookUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-mare-600 hover:text-terracotta-600 transition-colors py-0.5"
                                          >
                                            <ExternalLink className="w-3 h-3 shrink-0 text-blue-500" />
                                            <span>Facebook</span>
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                    {subV.comments && (
                                      <div className="pl-3 border-l border-terracotta-200/40 mt-1 space-y-1 max-h-28 overflow-y-auto pr-1">
                                        {subV.comments.map((comment: string, cIdx: number) => (
                                          <p key={cIdx} className="text-[10px] text-mare-600 italic leading-relaxed">
                                            &ldquo;{comment}&rdquo;
                                          </p>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <strong>{venue.name}:</strong> {venue.description}
                              </div>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 pt-1.5 border-t border-terracotta-100/5 text-[11px]">
                                <a
                                  href={venue.mapLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-mare-600 hover:text-terracotta-600 transition-colors py-0.5"
                                >
                                  <MapPin className="w-3 h-3 shrink-0 text-terracotta-500" />
                                  <span className="truncate max-w-[200px] sm:max-w-none">{venue.address}</span>
                                </a>
                                <a
                                  href={venue.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-mare-600 hover:text-terracotta-600 transition-colors py-0.5"
                                >
                                  <Instagram className="w-3 h-3 shrink-0 text-pink-500" />
                                  <span className="truncate max-w-[150px] sm:max-w-none">{venue.instagramHandle}</span>
                                </a>
                              </div>
                              {venue.comments && (
                                <div className="mt-2 pt-1.5 border-t border-terracotta-100/5">
                                  <p className="text-[10px] font-semibold text-terracotta-600 flex items-center gap-1 mb-1">
                                    <MessageSquare className="w-3 h-3" />
                                    <span>Voci dai Forum (Reddit &amp; GnoccaTravel):</span>
                                  </p>
                                  <div className="space-y-1 pl-3 border-l border-terracotta-200/40 max-h-36 overflow-y-auto pr-1">
                                    {venue.comments.map((comment: string, cIdx: number) => (
                                      <p key={cIdx} className="text-[10px] text-mare-600 italic leading-relaxed">
                                        &ldquo;{comment}&rdquo;
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-white/80 rounded-xl border border-terracotta-100/20">
                      <p className="text-xs font-bold text-terracotta-600 flex items-center gap-1.5">
                        <span>🔥</span> {movidaData.nerja.sanJuan.title}
                      </p>
                      <p className="text-xs text-mare-700/90 mt-1 leading-relaxed">
                        {movidaData.nerja.sanJuan.description}
                      </p>
                    </div>
                    <div className="p-4 bg-white/80 rounded-xl border border-terracotta-100/20">
                      <p className="text-xs font-bold text-terracotta-600 flex items-center gap-1.5">
                        <span>📱</span> {movidaData.nerja.datingTricks.title}
                      </p>
                      <p className="text-xs text-mare-700/90 mt-1 leading-relaxed">
                        {movidaData.nerja.datingTricks.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DATING & APPS */}
            {activeTab === 'dating' && (
              <div className="space-y-4 bg-white/60 p-3.5 sm:p-5 rounded-xl border border-terracotta-100/30">
                <h3 className="font-display text-base font-bold text-notte flex items-center gap-2 mb-2">
                  <span>📱 Mappatura e Strategia Digitale delle Dating App in Spagna</span>
                </h3>
                <p className="text-xs text-mare-700 leading-relaxed">
                  {movidaData.dating.intro}
                </p>

                <div className="font-display text-xs font-bold text-notte pt-2 border-t border-terracotta-100/20 uppercase tracking-wider text-terracotta-600">
                  {movidaData.dating.puroLocal.title}
                </div>
                <div className="flex md:grid overflow-x-auto md:overflow-visible gap-4 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-3 px-3 md:mx-0 md:px-0">
                  {movidaData.dating.puroLocal.apps.map((app: any, idx: number) => (
                    <div key={idx} className="min-w-[85vw] sm:min-w-[45%] md:min-w-0 snap-center p-3 sm:p-4 bg-white/80 rounded-xl border border-terracotta-100/20 flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-xs text-notte mb-1 flex items-center gap-1.5">
                          <span>{app.icon}</span> {app.name}
                        </p>
                        <p className="text-xs text-mare-700/90 leading-relaxed mt-1.5">
                          <strong className="text-terracotta-600">Chi ci trovi:</strong> {app.who}
                          <br /><strong className="text-terracotta-600">Perché usarla:</strong> {app.why}
                        </p>
                      </div>
                      {app.playStoreLinks && (
                        <div className="mt-3 pt-2.5 border-t border-terracotta-150/10 flex flex-wrap items-center gap-1.5">
                          <span className="text-[9px] text-mare-400 font-semibold uppercase tracking-wider">Android:</span>
                          {app.playStoreLinks.map((link: any, lIdx: number) => (
                            <a
                              key={lIdx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-0.5 text-[10px] text-mare-600 hover:text-terracotta-600 font-bold transition-colors bg-mare-50/50 hover:bg-terracotta-50 px-1.5 py-0.5 rounded border border-mare-100/30"
                            >
                              <ExternalLink className="w-2.5 h-2.5" />
                              <span>{link.label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="font-display text-xs font-bold text-notte pt-2 border-t border-terracotta-100/20 uppercase tracking-wider text-terracotta-600">
                  {movidaData.dating.mainstream.title}
                </div>
                <div className="flex md:grid overflow-x-auto md:overflow-visible gap-4 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-3 px-3 md:mx-0 md:px-0">
                  {movidaData.dating.mainstream.apps.map((app: any, idx: number) => (
                    <div key={idx} className="min-w-[85vw] sm:min-w-[45%] md:min-w-0 snap-center p-3 sm:p-4 bg-white/80 rounded-xl border border-terracotta-100/20 flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-xs text-notte mb-1 flex items-center gap-1.5">
                          <span>{app.icon}</span> {app.name}
                        </p>
                        <p className="text-xs text-mare-700/90 leading-relaxed mt-1.5 whitespace-pre-line">
                          {app.details}
                        </p>
                      </div>
                      {app.playStoreLinks && (
                        <div className="mt-3 pt-2.5 border-t border-terracotta-150/10 flex flex-wrap items-center gap-1.5">
                          <span className="text-[9px] text-mare-400 font-semibold uppercase tracking-wider">Android:</span>
                          {app.playStoreLinks.map((link: any, lIdx: number) => (
                            <a
                              key={lIdx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-0.5 text-[10px] text-mare-600 hover:text-terracotta-600 font-bold transition-colors bg-mare-50/50 hover:bg-terracotta-50 px-1.5 py-0.5 rounded border border-mare-100/30"
                            >
                              <ExternalLink className="w-2.5 h-2.5" />
                              <span>{link.label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-terracotta-50/50 rounded-xl border border-terracotta-100/30 mt-3">
                  <p className="font-bold text-sm text-terracotta-700 mb-2 flex items-center gap-1.5">
                    <span>💡</span> {movidaData.dating.rules.title}
                  </p>
                  <ul className="list-disc pl-4 space-y-2 text-xs text-mare-750">
                    {movidaData.dating.rules.items.map((item: any, idx: number) => (
                      <li key={idx}>
                        <strong>{item.label}</strong> {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* PIANO D'AZIONE */}
            {activeTab === 'plan' && (
              <div className="space-y-4 bg-white/60 p-3.5 sm:p-5 rounded-xl border border-terracotta-100/30">
                <h3 className="font-display text-base font-bold text-notte flex items-center gap-2 mb-2">
                  <span>📅 Integrazione nel Piano d&apos;Azione (19 - 25 Giugno 2026)</span>
                </h3>
                <p>
                  Ottimizza il tuo itinerario settimanale nella Costa del Sol per incontri e socializzazione locale inserendo queste coordinate reali:
                </p>

                <div className="space-y-3 mt-3">
                  {movidaData.plan.map((pItem: any, idx: number) => (
                    <div key={idx} className="p-3 bg-white/80 rounded-xl border-l-4 border-terracotta-500 flex items-start gap-3">
                      <span className="font-bold text-xs text-terracotta-600 mt-0.5 shrink-0">{pItem.days}</span>
                      <div className="text-xs text-mare-700 leading-relaxed whitespace-pre-line">
                        {pItem.details}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REPORT STORICO 2013 */}
            {activeTab === 'historical' && movidaData.historicalReport && (
              <div className="space-y-4 bg-white/60 p-3.5 sm:p-5 rounded-xl border border-terracotta-100/30">
                <h3 className="font-display text-base font-bold text-notte flex items-center gap-2 mb-2">
                  <span>📜 {movidaData.historicalReport.title}</span>
                </h3>
                
                <div className="p-3 bg-red-50/40 rounded-xl border border-red-200/20 text-xs italic text-red-800 leading-relaxed mb-4 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <div>
                    <strong>{movidaData.historicalReport.warning}</strong>
                  </div>
                </div>

                <div className="bg-white/80 p-4 rounded-xl border border-terracotta-100/20 card-shadow mb-4">
                  <p className="text-sm font-bold text-notte mb-2">Analisi dell&apos;epoca:</p>
                  <p className="text-xs text-mare-750 leading-relaxed italic">
                    &ldquo;{movidaData.historicalReport.analysis.vibe}&rdquo;
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-terracotta-600 uppercase tracking-wider">Spot Citati (Evoluzione):</p>
                    <div className="space-y-2">
                      {movidaData.historicalReport.analysis.keySpots.map((spot: any, idx: number) => (
                        <div key={idx} className="p-2.5 bg-white/80 rounded-lg border border-terracotta-100/10 text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-notte">{spot.name}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${spot.status === 'Chiuso/Scomparso' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                              {spot.status}
                            </span>
                          </div>
                          <p className="text-[10px] text-mare-600 italic leading-snug">{spot.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold text-terracotta-600 uppercase tracking-wider">Tattiche del Tempo:</p>
                    <div className="p-3 bg-amber-50/30 rounded-xl border border-amber-200/20 text-xs text-mare-750 leading-relaxed">
                      {movidaData.historicalReport.analysis.tactics}
                    </div>
                    <div className="pt-2">
                      <a 
                        href={movidaData.historicalReport.analysis.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-notte text-white rounded-lg text-xs font-bold hover:bg-terracotta-600 transition-all w-full justify-center shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Leggi Report Originale (2013)
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SICUREZZA & LOGISTICA */}
            {activeTab === 'sicurezza' && (
              <div className="space-y-4 bg-white/60 p-3.5 sm:p-5 rounded-xl border border-terracotta-100/30">
                <h3 className="font-display text-base font-bold text-notte flex items-center gap-2 mb-2">
                  <span>🛡️ Sicurezza, Budget e Logistica Operativa</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-xs">
                  {movidaData.safety.map((sItem: any, idx: number) => (
                    <div key={idx} className="p-4 bg-white/80 rounded-xl border border-terracotta-100/20">
                      <p className="font-bold text-terracotta-600 mb-1 flex items-center gap-1.5">
                        <span>{sItem.icon}</span> {sItem.title}
                      </p>
                      <p className="text-mare-700/90 leading-relaxed mt-1">
                        {sItem.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 pt-3 border-t border-terracotta-100/30 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span className="text-[10px] text-mare-500 italic">
              💡 Guida elaborata incrociando i riscontri dei canali di viaggio locali, vlog di tendenza e report di dating per la Costa del Sol.
            </span>
            <div className="flex gap-3 text-[10px] text-mare-400">
              <span>Aggiornato: Giugno 2026</span>
              <span>•</span>
              <span>Dati: Gnocca Travel & YouTube Reports</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
