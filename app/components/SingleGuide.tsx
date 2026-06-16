'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, MapPin, ShieldAlert, Youtube, ExternalLink, Instagram, MessageSquare, Clock, Lightbulb, Car } from 'lucide-react'
import movidaData from '@/data/movida-over35.json'
import nightlifeData from '@/data/nightlife.json'

export default function SingleGuide() {
  const [activeTab, setActiveTab] = useState('mindset')
  const [selectedCity, setSelectedCity] = useState('nerja')

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
    if (selectedCity === 'malaga') return movidaData.locali
    const zoneMap: Record<string, string> = { sanpedro: 'sanpedro', marbella: 'marbella', estepona: 'estepona', nerja: 'nerjacosta', benalmadena: 'benalmadena', fuengirola: 'fuengirola', torremolinos: 'torremolinos' }
    const targetZoneId = zoneMap[selectedCity]
    const zone = movidaData.costa.zones.find((z: any) => z.id === targetZoneId)
    if (!zone) return []
    return zone.venues.map((v: any, idx: number) => ({
      id: `${selectedCity}-venue-${idx}`, name: v.name, description: v.details, category: v.category || 'LOCALE',
      categoryColor: v.categoryColor || 'bg-primary', address: v.address, mapLink: v.mapLink,
      instagram: v.instagram, instagramHandle: v.instagramHandle, comments: v.comments,
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
    { id: 'nightlife', label: 'Nightlife Nerja', icon: '🌙' },
    { id: 'dating', label: 'Dating & Social App', icon: '📱' },
    { id: 'plan', label: "Piano d'Azione", icon: '📅' },
    { id: 'historical', label: 'Report Storico 2013', icon: '📜' },
    { id: 'sicurezza', label: 'Sicurezza & Logistica', icon: '🛡️' },
  ]

  return (
    <section id="single-guide" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Users className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Single & Local</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Movida <span className="italic text-primary">Over 35</span> (Locali e Non Turisti)</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-3xl">Guida strategica di socializzazione per residenti locali, tardeo tropicale ed intrattenimento per adulti <span className="text-primary font-semibold">(Giugno 2026)</span></p>
        </motion.div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-3 sm:p-6 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">

          <div className="relative mb-6">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent pointer-events-none z-10 md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface-container-lowest via-surface-container-lowest/80 to-transparent pointer-events-none z-10 md:hidden" />

            <div className="flex overflow-x-auto md:flex-wrap md:overflow-visible gap-1.5 pb-2 border-b border-outline-variant/20 whitespace-nowrap md:whitespace-normal scrollbar-hide snap-x md:snap-none px-4 md:px-0">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-label-sm text-label-sm font-bold tracking-wide transition-all snap-center ${
                    activeTab === tab.id
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:bg-surface-variant hover:text-primary'
                  }`}>
                  <span className="relative z-10 flex items-center gap-1.5"><span>{tab.icon}</span><span>{tab.label}</span></span>
                </button>
              ))}
            </div>
          </div>

          <div className="font-body-md text-body-md text-on-surface leading-relaxed">

            {activeTab === 'mindset' && (
              <div className="space-y-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3.5 sm:p-5">
                <h3 className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-2 mb-2"><span>🧠 Briefing Iniziale e Mindset (Stile "Field Report")</span></h3>
                <p>{movidaData.briefing.intro}</p>
                <p>{movidaData.briefing.subIntro}</p>
                {movidaData.briefing.disclaimer && (
                  <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-200/20 font-body-md text-[13px] text-on-surface-variant leading-relaxed mt-3 flex items-start gap-2">
                    <span className="text-sm shrink-0">💡</span>
                    <div><strong>Nota di Pragmatismo:</strong> {movidaData.briefing.disclaimer}</div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {movidaData.briefing.cards.map((card: any, idx: number) => (
                    <div key={idx} className="p-3.5 bg-surface-variant rounded-xl border border-outline-variant/20">
                      <p className="font-label-sm text-label-sm text-primary font-bold mb-1 flex items-center gap-1.5"><span>{card.icon}</span> {card.title}</p>
                      <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'alloggio' && (
              <div className="space-y-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3.5 sm:p-5">
                <h3 className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-2 mb-2"><span>🏨 Dove Alloggiare per la Movida Over 35 & Dating</span></h3>
                <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed mb-4">{movidaData.alloggio?.intro || "La scelta dell'area in cui alloggiare è fondamentale per ottimizzare il tasso di conversione delle dating app, ridurre i costi di parcheggio/trasferimento e facilitare i rientri notturni."}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movidaData.alloggio?.zone?.map((zona: any) => (
                    <div key={zona.id}
                      className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] hover:scale-[0.98] transition-all duration-200 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2.5">
                          <h4 className="font-label-md text-label-md text-on-surface font-bold">{zona.name}</h4>
                          <span className="px-2 py-0.5 bg-surface-variant text-primary border border-outline-variant/20 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider">{zona.vibe}</span>
                        </div>
                        <div className="space-y-2 mb-3.5">
                          <div className="font-body-md text-[13px] text-on-surface-variant">
                            <span className="font-bold text-tertiary uppercase tracking-wide block mb-0.5">🟢 PRO:</span>
                            <ul className="list-disc pl-4 space-y-0.5">{zona.pro.map((pro: string, idx: number) => (<li key={idx} className="leading-relaxed">{pro}</li>))}</ul>
                          </div>
                          <div className="font-body-md text-[13px] text-on-surface-variant pt-1.5 border-t border-outline-variant/10">
                            <span className="font-bold text-red-500 uppercase tracking-wide block mb-0.5">🔴 CONTRO:</span>
                            <ul className="list-disc pl-4 space-y-0.5">{zona.contro.map((contro: string, idx: number) => (<li key={idx} className="leading-relaxed">{contro}</li>))}</ul>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2.5 border-t border-outline-variant/10 font-body-md text-[13px] text-on-surface-variant">
                        <span className="font-bold text-primary block mb-0.5 uppercase tracking-wide">💡 Strategia di Socializzazione:</span>
                        <p className="italic leading-relaxed">{zona.strategia}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'locali' && (
              <div className="space-y-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3.5 sm:p-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                  <h3 className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-2"><span>🍹 Mappa Strategica dei Locali (Residenti vs Adult Entertainment)</span></h3>
                  <a href="https://www.youtube.com/watch?v=sSei8qcn72w" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 border border-red-200/50 rounded-lg font-label-sm text-label-sm font-semibold hover:bg-red-100 transition-colors">
                    <Youtube className="w-3.5 h-3.5" />Guarda Video Report
                  </a>
                </div>

                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/85 to-transparent pointer-events-none z-10 sm:hidden" />
                  <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-surface-container-lowest via-surface-container-lowest/85 to-transparent pointer-events-none z-10 sm:hidden" />

                  <div className="flex overflow-x-auto sm:flex-wrap gap-1.5 pb-2.5 mb-2 whitespace-nowrap scrollbar-hide snap-x px-2 sm:px-0">
                    {cities.map((city) => (
                      <button key={city.id} onClick={() => setSelectedCity(city.id)}
                        className={`px-3 py-1 rounded-lg font-label-sm text-label-sm font-bold tracking-wide transition-all snap-center ${
                          selectedCity === city.id
                            ? 'bg-secondary text-on-secondary shadow-sm'
                            : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:border-secondary/50'
                        }`}>{city.label}</button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {activeLocali.map((locale: any) => (
                    <div key={locale.id} className={`p-3 sm:p-4 rounded-xl border ${locale.category === 'ADULT' ? 'bg-red-50/30 border-red-200/40' : 'bg-surface-container-lowest border-outline-variant/20'}`}>
                      <p className={`font-label-sm text-label-sm font-bold flex items-center gap-2 ${locale.category === 'ADULT' ? 'text-red-700' : 'text-primary'}`}>
                        <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm text-white border-0 ${locale.categoryColor || 'bg-primary'}`}>{locale.category}</span>
                        {locale.name}
                      </p>
                      {locale.imageUrl && (
                        <div className="mt-3 relative h-32 sm:h-40 w-full overflow-hidden rounded-lg border border-outline-variant/10">
                          <img src={locale.imageUrl} alt={locale.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                        </div>
                      )}
                      <p className="font-body-md text-[13px] text-on-surface-variant mt-2 leading-relaxed whitespace-pre-line">{locale.description}</p>

                      {locale.isDouble ? (
                        <div className="mt-3 pt-2.5 border-t border-outline-variant/10 space-y-3">
                          {locale.venues?.map((venue: any, vIdx: number) => (
                            <div key={vIdx} className="flex flex-col space-y-1 pt-0.5">
                              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-4 gap-y-1.5 font-body-md text-[13px]">
                                <span className="font-semibold text-on-surface shrink-0">{venue.label}</span>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                  <a href={venue.mapLink} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors py-0.5">
                                    <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" /><span className="truncate max-w-[200px] sm:max-w-none">{venue.address}</span>
                                  </a>
                                  <a href={venue.instagram} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors py-0.5">
                                    <Instagram className="w-3.5 h-3.5 shrink-0 text-pink-500" /><span className="truncate max-w-[150px] sm:max-w-none">{venue.instagramHandle}</span>
                                  </a>
                                </div>
                              </div>
                              {venue.comments && (
                                <div className="pl-3 border-l border-outline-variant/40 mt-1 space-y-1 max-h-28 overflow-y-auto pr-1">
                                  {venue.comments.map((comment: string, cIdx: number) => (
                                    <p key={cIdx} className="font-body-md text-[13px] text-on-surface-variant italic leading-relaxed">&ldquo;{comment}&rdquo;</p>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3 pt-2.5 border-t ${locale.category === 'ADULT' ? 'border-red-200/20' : 'border-outline-variant/10'}`}>
                            <a href={locale.mapLink} target="_blank" rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 font-body-md text-[13px] transition-colors py-0.5 ${locale.category === 'ADULT' ? 'text-red-700 hover:text-red-900' : 'text-on-surface-variant hover:text-primary'}`}>
                              <MapPin className={`w-3.5 h-3.5 shrink-0 ${locale.category === 'ADULT' ? 'text-red-500' : 'text-primary'}`} />
                              <span className="truncate max-w-[220px] sm:max-w-none">{locale.address}</span>
                            </a>
                            {locale.website && (
                              <a href={locale.website} target="_blank" rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1 font-body-md text-[13px] transition-colors py-0.5 ${locale.category === 'ADULT' ? 'text-red-700 hover:text-red-900' : 'text-on-surface-variant hover:text-primary'}`}>
                                <ExternalLink className={`w-3.5 h-3.5 shrink-0 ${locale.category === 'ADULT' ? 'text-red-500' : 'text-primary'}`} />
                                <span className="truncate max-w-[150px] sm:max-w-none">Sito Ufficiale</span>
                              </a>
                            )}
                            {locale.instagram && (
                              <a href={locale.instagram} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-body-md text-[13px] text-on-surface-variant hover:text-primary transition-colors py-0.5">
                                <Instagram className="w-3.5 h-3.5 shrink-0 text-pink-500" />
                                <span className="truncate max-w-[150px] sm:max-w-none">{locale.instagramHandle}</span>
                              </a>
                            )}
                          </div>
                          {locale.comments && (
                            <div className="mt-2.5 pt-2 border-t border-outline-variant/10">
                              <p className="font-label-sm text-label-sm text-primary flex items-center gap-1 mb-1">
                                <MessageSquare className="w-3 h-3" /><span>Voci dai Forum (Reddit & GnoccaTravel):</span>
                              </p>
                              <div className="space-y-1.5 pl-3 border-l border-outline-variant/40 max-h-36 overflow-y-auto pr-1">
                                {locale.comments.map((comment: string, cIdx: number) => (
                                  <p key={cIdx} className="font-body-md text-[13px] text-on-surface-variant italic leading-relaxed">&ldquo;{comment}&rdquo;</p>
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

            {activeTab === 'costa' && (
              <div className="space-y-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3.5 sm:p-5">
                <h3 className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-2 mb-2"><span>🏝️ Mappa Strategica Costa del Sol (Località Esterne)</span></h3>
                <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed mb-3">{movidaData.costa?.intro}</p>
                <div className="space-y-4">
                  {movidaData.costa?.zones.map((zone: any) => (
                    <div key={zone.id} className="p-3 sm:p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
                      <p className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1.5"><span>📍</span> {zone.name}</p>
                      <p className="font-body-md text-[13px] text-on-surface-variant mt-2 leading-relaxed italic border-l-2 border-primary pl-2">{zone.description}</p>
                      <div className="mt-3 pt-3 border-t border-outline-variant/10 space-y-3">
                        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Hotspots & Strategia:</p>
                        <div className="flex md:grid overflow-x-auto md:overflow-visible gap-3 pb-3 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-3 px-3 md:mx-0 md:px-0">
                          {zone.venues.map((venue: any, vIdx: number) => (
                            <div key={vIdx} className="min-w-[85vw] sm:min-w-[45%] md:min-w-0 snap-center p-3 bg-surface-variant rounded-lg border border-outline-variant/10 flex flex-col justify-between">
                              <div>
                                <span className="font-label-sm text-label-sm text-on-surface font-bold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shrink-0"></span>{venue.name}
                                </span>
                                <p className="font-body-md text-[13px] text-on-surface-variant mt-1.5 leading-relaxed">{venue.details}</p>
                                {venue.comments && (
                                  <div className="mt-2.5 pt-2 border-t border-outline-variant/10">
                                    <p className="font-label-sm text-label-sm text-primary flex items-center gap-1 mb-1">
                                      <MessageSquare className="w-2.5 h-2.5 shrink-0" /><span>Voci dai Forum:</span>
                                    </p>
                                    <div className="space-y-1 pl-2 border-l border-outline-variant/35 max-h-24 overflow-y-auto pr-1">
                                      {venue.comments.map((comment: string, cIdx: number) => (
                                        <p key={cIdx} className="font-body-md text-[13px] text-on-surface-variant italic leading-normal">&ldquo;{comment}&rdquo;</p>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              {(venue.address || venue.instagram) && (
                                <div className="mt-2.5 pt-2 border-t border-outline-variant/20 flex flex-col gap-1 font-body-md text-[13px]">
                                  {venue.address && (
                                    <a href={venue.mapLink} target="_blank" rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors py-0.5">
                                      <MapPin className="w-3 h-3 text-primary shrink-0" /><span className="truncate max-w-[220px] sm:max-w-none">{venue.address}</span>
                                    </a>
                                  )}
                                  {venue.instagram && (
                                    <a href={venue.instagram} target="_blank" rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors py-0.5">
                                      <Instagram className="w-3 h-3 text-pink-500 shrink-0" /><span className="truncate max-w-[150px] sm:max-w-none">{venue.instagramHandle}</span>
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

            {activeTab === 'tardeo' && (
              <div className="space-y-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3.5 sm:p-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                  <h3 className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-2"><span>🌊 Il Fenomeno "Del Tardeo al Perreo"</span></h3>
                  <a href="https://www.youtube.com/watch?v=U1hS1arFIUw" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 border border-red-200/50 rounded-lg font-label-sm text-label-sm font-semibold hover:bg-red-100 transition-colors">
                    <Youtube className="w-3.5 h-3.5" />Guarda Video Vibe
                  </a>
                </div>
                <p className="text-on-surface-variant">{movidaData.tardeo.intro}</p>
                <div className="space-y-3 mt-3">
                  {movidaData.tardeo.steps.map((step: any, idx: number) => (
                    <div key={idx} className="p-3 sm:p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
                      <p className="font-label-sm text-label-sm text-primary font-bold">{step.title}</p>
                      <p className="font-body-md text-[13px] text-on-surface-variant mt-1 leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'nerja' && (
              <div className="space-y-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3.5 sm:p-5">
                <h3 className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-2 mb-2"><span>🏖️ Focus Logistico e Strategico: Nerja (Costa del Sol Est)</span></h3>
                <p className="text-on-surface-variant">{movidaData.nerja.intro}</p>
                <div className="space-y-3">
                  <div className="p-3 sm:p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
                    <p className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1"><span>📍</span> Mappatura delle Zone (La Logica della Notte)</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 font-body-md text-[13px]">
                      {movidaData.nerja.zones.map((zone: any, idx: number) => (
                        <div key={idx} className="p-2.5 bg-surface-variant rounded-lg">
                          <strong className="text-on-surface">{zone.title}</strong>
                          <p className="font-label-sm text-label-sm text-primary italic mt-0.5">{zone.time}</p>
                          <p className="mt-1 text-on-surface-variant leading-relaxed">{zone.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
                    <p className="font-label-sm text-label-sm text-primary font-bold mb-2">🍹 Locali Target (Over 35 & Latino-Spagnoli)</p>
                    <div className="space-y-3 font-body-md text-[13px]">
                      {movidaData.nerja.venues.map((venue: any, idx: number) => (
                        <div key={idx} className="p-2.5 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
                          {venue.isDouble ? (
                            <>
                              <div><strong>⚡ {venue.name}:</strong> {venue.description}</div>
                              <div className="mt-2 pt-1.5 border-t border-outline-variant/10 space-y-3">
                                {venue.venues?.map((subV: any, sIdx: number) => (
                                  <div key={sIdx} className="flex flex-col space-y-1">
                                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-3 gap-y-1">
                                      <span className="font-semibold text-on-surface shrink-0">{subV.label}</span>
                                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <a href={subV.mapLink} target="_blank" rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors py-0.5">
                                          <MapPin className="w-3 h-3 shrink-0 text-primary" /><span className="truncate max-w-[200px] sm:max-w-none">{subV.address}</span>
                                        </a>
                                        {subV.facebookUrl && (
                                          <a href={subV.facebookUrl} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors py-0.5">
                                            <ExternalLink className="w-3 h-3 shrink-0 text-blue-500" /><span>Facebook</span>
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                    {subV.comments && (
                                      <div className="pl-3 border-l border-outline-variant/40 mt-1 space-y-1 max-h-28 overflow-y-auto pr-1">
                                        {subV.comments.map((comment: string, cIdx: number) => (
                                          <p key={cIdx} className="font-body-md text-[13px] text-on-surface-variant italic leading-relaxed">&ldquo;{comment}&rdquo;</p>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : (
                            <>
                              <div><strong>{venue.name}:</strong> {venue.description}</div>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 pt-1.5 border-t border-outline-variant/10">
                                <a href={venue.mapLink} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors py-0.5">
                                  <MapPin className="w-3 h-3 shrink-0 text-primary" /><span className="truncate max-w-[200px] sm:max-w-none">{venue.address}</span>
                                </a>
                                <a href={venue.instagram} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors py-0.5">
                                  <Instagram className="w-3 h-3 shrink-0 text-pink-500" /><span className="truncate max-w-[150px] sm:max-w-none">{venue.instagramHandle}</span>
                                </a>
                              </div>
                              {venue.comments && (
                                <div className="mt-2 pt-1.5 border-t border-outline-variant/10">
                                  <p className="font-label-sm text-label-sm text-primary flex items-center gap-1 mb-1">
                                    <MessageSquare className="w-3 h-3" /><span>Voci dai Forum (Reddit & GnoccaTravel):</span>
                                  </p>
                                  <div className="space-y-1 pl-3 border-l border-outline-variant/40 max-h-36 overflow-y-auto pr-1">
                                    {venue.comments.map((comment: string, cIdx: number) => (
                                      <p key={cIdx} className="font-body-md text-[13px] text-on-surface-variant italic leading-relaxed">&ldquo;{comment}&rdquo;</p>
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
                    <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
                      <p className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1.5"><span>🔥</span> {movidaData.nerja.sanJuan.title}</p>
                      <p className="font-body-md text-[13px] text-on-surface-variant mt-1 leading-relaxed">{movidaData.nerja.sanJuan.description}</p>
                    </div>
                    <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
                      <p className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1.5"><span>📱</span> {movidaData.nerja.datingTricks.title}</p>
                      <p className="font-body-md text-[13px] text-on-surface-variant mt-1 leading-relaxed">{movidaData.nerja.datingTricks.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nightlife' && (
              <div className="space-y-5 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3.5 sm:p-5">
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-2 mb-1"><span>🌙 {nightlifeData.title}</span></h3>
                  <p className="font-body-md text-[13px] text-on-surface-variant">{nightlifeData.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nightlifeData.zones.map((zone: any) => (
                    <div key={zone.name} className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] hover:scale-[0.98] transition-all duration-200">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-label-md text-label-md text-on-surface font-bold">{zone.name}</h4>
                        <span className="px-2 py-0.5 bg-secondary text-on-secondary rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider whitespace-nowrap">{zone.venues.length} locali</span>
                      </div>
                      <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed mb-3">{zone.description}</p>
                      <div className="space-y-1.5 font-body-md text-[13px] text-on-surface-variant mb-3">
                        <div className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-primary shrink-0" /><span>{zone.hours}</span></div>
                        {zone.tip && <div className="flex items-start gap-1.5"><Lightbulb className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" /><span className="italic">{zone.tip}</span></div>}
                        {zone.parking && <div className="flex items-start gap-1.5"><Car className="w-3 h-3 text-outline shrink-0 mt-0.5" /><span>{zone.parking}</span></div>}
                      </div>
                      <div className="space-y-2">
                        {zone.venues.map((venue: any) => (
                          <div key={venue.name} className={`p-2.5 rounded-lg border ${venue.over35 ? 'bg-surface-variant border-outline-variant/30' : 'bg-surface-container-lowest border-outline-variant/20'}`}>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className="font-label-sm text-label-sm text-on-surface font-bold">{venue.name}</p>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {venue.over35 && <span className="px-1.5 py-0.5 bg-primary text-on-primary rounded font-label-sm text-label-sm font-bold">35+</span>}
                                <span className="font-body-md text-[13px] text-on-surface-variant">{venue.price}</span>
                              </div>
                            </div>
                            <p className="font-body-md text-[13px] text-on-surface-variant mb-1">{venue.type} · {venue.hours}</p>
                            <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">{venue.vibe}</p>
                            <p className="font-body-md text-[13px] text-on-surface-variant mt-1 italic">🎵 {venue.music}</p>
                            {venue.mapLink && (
                              <a href={venue.mapLink} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-2 font-body-md text-[13px] text-on-surface-variant hover:text-primary transition-colors">
                                <MapPin className="w-3 h-3 text-primary" /><span className="underline underline-offset-2">{venue.address}</span>
                              </a>
                            )}
                            {venue.comments && venue.comments.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-outline-variant/20 space-y-1.5">
                                <p className="font-label-sm text-label-sm text-primary flex items-center gap-1">
                                  <MessageSquare className="w-2.5 h-2.5" />Voci dai Forum:
                                </p>
                                <div className="pl-2.5 border-l border-outline-variant/40 space-y-1">
                                  {venue.comments.map((comment: string, cIdx: number) => (
                                    <p key={cIdx} className="font-body-md text-[13px] text-on-surface-variant italic leading-relaxed">&ldquo;{comment}&rdquo;</p>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-surface-variant rounded-xl border border-outline-variant/20">
                  <h4 className="font-label-md text-label-md text-primary font-bold mb-3 flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5" />Consigli Pratici Over 35</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {nightlifeData.tipsOver35.map((tip: any) => (
                      <div key={tip.title} className="p-2.5 bg-surface-container-lowest rounded-lg border border-outline-variant/15">
                        <p className="font-label-sm text-label-sm text-primary font-bold mb-1">{tip.title}</p>
                        <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">{tip.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dating' && (
              <div className="space-y-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3.5 sm:p-5">
                <h3 className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-2 mb-2"><span>📱 Mappatura e Strategia Digitale delle Dating App in Spagna</span></h3>
                <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">{movidaData.dating.intro}</p>

                <div className="font-label-sm text-label-sm text-primary font-bold pt-2 border-t border-outline-variant/20 uppercase tracking-wider">{movidaData.dating.puroLocal.title}</div>
                <div className="flex md:grid overflow-x-auto md:overflow-visible gap-4 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-3 px-3 md:mx-0 md:px-0">
                  {movidaData.dating.puroLocal.apps.map((app: any, idx: number) => (
                    <div key={idx} className="min-w-[85vw] sm:min-w-[45%] md:min-w-0 snap-center p-3 sm:p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20 flex flex-col justify-between">
                      <div>
                        <p className="font-label-sm text-label-sm text-on-surface font-bold mb-1 flex items-center gap-1.5"><span>{app.icon}</span> {app.name}</p>
                        <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed mt-1.5">
                          <strong className="text-primary">Chi ci trovi:</strong> {app.who}<br /><strong className="text-primary">Perché usarla:</strong> {app.why}
                        </p>
                      </div>
                      {app.playStoreLinks && (
                        <div className="mt-3 pt-2.5 border-t border-outline-variant/10 flex flex-wrap items-center gap-1.5">
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">Android:</span>
                          {app.playStoreLinks.map((link: any, lIdx: number) => (
                            <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-0.5 font-label-sm text-label-sm text-on-surface-variant hover:text-primary font-bold transition-colors bg-surface-variant hover:bg-primary/10 px-1.5 py-0.5 rounded border border-outline-variant/30">
                              <ExternalLink className="w-2.5 h-2.5" /><span>{link.label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="font-label-sm text-label-sm text-primary font-bold pt-2 border-t border-outline-variant/20 uppercase tracking-wider">{movidaData.dating.mainstream.title}</div>
                <div className="flex md:grid overflow-x-auto md:overflow-visible gap-4 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-3 px-3 md:mx-0 md:px-0">
                  {movidaData.dating.mainstream.apps.map((app: any, idx: number) => (
                    <div key={idx} className="min-w-[85vw] sm:min-w-[45%] md:min-w-0 snap-center p-3 sm:p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20 flex flex-col justify-between">
                      <div>
                        <p className="font-label-sm text-label-sm text-on-surface font-bold mb-1 flex items-center gap-1.5"><span>{app.icon}</span> {app.name}</p>
                        <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed mt-1.5 whitespace-pre-line">{app.details}</p>
                      </div>
                      {app.playStoreLinks && (
                        <div className="mt-3 pt-2.5 border-t border-outline-variant/10 flex flex-wrap items-center gap-1.5">
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">Android:</span>
                          {app.playStoreLinks.map((link: any, lIdx: number) => (
                            <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-0.5 font-label-sm text-label-sm text-on-surface-variant hover:text-primary font-bold transition-colors bg-surface-variant hover:bg-primary/10 px-1.5 py-0.5 rounded border border-outline-variant/30">
                              <ExternalLink className="w-2.5 h-2.5" /><span>{link.label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-surface-variant rounded-xl border border-outline-variant/20 mt-3">
                  <p className="font-label-sm text-label-sm text-primary font-bold mb-2 flex items-center gap-1.5"><span>💡</span> {movidaData.dating.rules.title}</p>
                  <ul className="list-disc pl-4 space-y-2 font-body-md text-[13px] text-on-surface-variant">
                    {movidaData.dating.rules.items.map((item: any, idx: number) => (
                      <li key={idx}><strong>{item.label}</strong> {item.text}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'plan' && (
              <div className="space-y-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3.5 sm:p-5">
                <h3 className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-2 mb-2"><span>📅 Integrazione nel Piano d'Azione (19 - 25 Giugno 2026)</span></h3>
                <p className="text-on-surface-variant">Ottimizza il tuo itinerario settimanale nella Costa del Sol per incontri e socializzazione locale inserendo queste coordinate reali:</p>
                <div className="space-y-3 mt-3">
                  {movidaData.plan.map((pItem: any, idx: number) => (
                    <div key={idx} className="p-3 bg-surface-container-lowest rounded-xl border-l-4 border-primary flex items-start gap-3">
                      <span className="font-label-sm text-label-sm text-primary font-bold mt-0.5 shrink-0">{pItem.days}</span>
                      <div className="font-body-md text-[13px] text-on-surface-variant leading-relaxed whitespace-pre-line">{pItem.details}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'historical' && movidaData.historicalReport && (
              <div className="space-y-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3.5 sm:p-5">
                <h3 className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-2 mb-2"><span>📜 {movidaData.historicalReport.title}</span></h3>
                <div className="p-3 bg-red-50/40 rounded-xl border border-red-200/20 font-body-md text-[13px] text-red-800 leading-relaxed mb-4 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <div><strong>{movidaData.historicalReport.warning}</strong></div>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] mb-4">
                  <p className="font-label-sm text-label-sm text-on-surface font-bold mb-2">Analisi dell'epoca:</p>
                  <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed italic">&ldquo;{movidaData.historicalReport.analysis.vibe}&rdquo;</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <p className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Spot Citati (Evoluzione):</p>
                    <div className="space-y-2">
                      {movidaData.historicalReport.analysis.keySpots.map((spot: any, idx: number) => (
                        <div key={idx} className="p-2.5 bg-surface-container-lowest rounded-lg border border-outline-variant/10 font-body-md text-[13px]">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-on-surface">{spot.name}</span>
                            <span className={`px-1.5 py-0.5 rounded font-label-sm text-label-sm font-bold ${spot.status === 'Chiuso/Scomparso' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>{spot.status}</span>
                          </div>
                          <p className="font-body-md text-[13px] text-on-surface-variant italic leading-snug">{spot.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Tattiche del Tempo:</p>
                    <div className="p-3 bg-amber-50/30 rounded-xl border border-amber-200/20 font-body-md text-[13px] text-on-surface-variant leading-relaxed">{movidaData.historicalReport.analysis.tactics}</div>
                    <div className="pt-2">
                      <a href={movidaData.historicalReport.analysis.link} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm font-bold hover:bg-primary/90 transition-all w-full justify-center shadow-sm">
                        <ExternalLink className="w-3.5 h-3.5" />Leggi Report Originale (2013)
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sicurezza' && (
              <div className="space-y-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3.5 sm:p-5">
                <h3 className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-2 mb-2"><span>🛡️ Sicurezza, Budget e Logistica Operativa</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 font-body-md text-[13px]">
                  {movidaData.safety.map((sItem: any, idx: number) => (
                    <div key={idx} className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
                      <p className="font-label-sm text-label-sm text-primary font-bold mb-1 flex items-center gap-1.5"><span>{sItem.icon}</span> {sItem.title}</p>
                      <p className="text-on-surface-variant leading-relaxed mt-1">{sItem.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 pt-3 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant italic">💡 Guida elaborata incrociando i riscontri dei canali di viaggio locali, vlog di tendenza e report di dating per la Costa del Sol.</span>
            <div className="flex gap-3 font-label-sm text-label-sm text-on-surface-variant">
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
