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

  const tabs = [
    { id: 'mindset', label: 'Briefing & Mindset', icon: '🧠' },
    { id: 'locali', label: 'Mappa Locali', icon: '🍹' },
    { id: 'costa', label: 'Mappa Costa', icon: '🏝️' },
    { id: 'tardeo', label: 'Tardeo al Perreo', icon: '🌊' },
    { id: 'nerja', label: 'Focus Nerja', icon: '🏖️' },
    { id: 'dating', label: 'Dating & Social App', icon: '📱' },
    { id: 'plan', label: 'Piano d\'Azione', icon: '📅' },
    { id: 'sicurezza', label: 'Sicurezza & Logistica', icon: '🛡️' },
  ]

  return (
    <section id="single-guide" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
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

        <div className="glass p-5 rounded-2xl border border-terracotta-100/40 card-shadow bg-gradient-to-br from-indigo-50/20 via-purple-50/15 to-crema/20">
          
          {/* Tabs Container */}
          <div className="flex overflow-x-auto sm:flex-wrap sm:overflow-visible gap-1.5 pb-2 mb-6 border-b border-terracotta-100/30 whitespace-nowrap sm:whitespace-normal scrollbar-hide snap-x sm:snap-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all snap-center cursor-pointer ${
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

          {/* Tab Content */}
          <div className="text-sm text-mare-800 leading-relaxed">
            
            {/* BRIEFING & MINDSET */}
            {activeTab === 'mindset' && (
              <div className="space-y-4 bg-white/60 p-5 rounded-xl border border-terracotta-100/30">
                <h3 className="font-display text-base font-bold text-notte flex items-center gap-2 mb-2">
                  <span>🧠 Briefing Iniziale e Mindset (Stile &quot;Field Report&quot;)</span>
                </h3>
                <p>{movidaData.briefing.intro}</p>
                <p>{movidaData.briefing.subIntro}</p>

                {movidaData.briefing.disclaimer && (
                  <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-250/20 text-xs italic text-mare-750/95 leading-relaxed mt-3 flex items-start gap-2">
                    <span className="text-sm shrink-0">💡</span>
                    <div>
                      <strong>Nota di Pragmatismo:</strong> {movidaData.briefing.disclaimer}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {movidaData.briefing.cards.map((card: any, idx: number) => (
                    <div key={idx} className="p-4 bg-terracotta-50/50 rounded-xl border border-terracotta-100/30">
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

            {/* MAPPA LOCALI */}
            {activeTab === 'locali' && (
              <div className="space-y-4 bg-white/60 p-5 rounded-xl border border-terracotta-100/30">
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

                <div className="space-y-3">
                  {movidaData.locali.map((locale: any) => (
                    <div key={locale.id} className={`p-4 rounded-xl border ${locale.id === 'divas' ? 'bg-red-50/30 border-red-200/40' : 'bg-white/80 border-terracotta-100/20'}`}>
                      <p className={`text-sm font-bold flex items-center gap-2 ${locale.id === 'divas' ? 'text-red-700' : 'text-terracotta-600'}`}>
                        <span className={`badge-pill text-white border-0 py-0 px-2 text-[10px] ${locale.categoryColor || 'bg-terracotta-500'}`}>
                          {locale.category}
                        </span>
                        {locale.name}
                      </p>
                      <p className="text-xs text-mare-700 mt-2 leading-relaxed whitespace-pre-line">
                        {locale.description}
                      </p>

                      {locale.isDouble ? (
                        <div className="mt-3 pt-2.5 border-t border-terracotta-150/10 space-y-3">
                          {locale.venues?.map((venue: any, vIdx: number) => (
                            <div key={vIdx} className="flex flex-col space-y-1 pt-0.5">
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                                <span className="font-semibold text-mare-800">{venue.label}</span>
                                <a
                                  href={venue.mapLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-mare-600 hover:text-terracotta-600 transition-colors"
                                >
                                  <MapPin className="w-3.5 h-3.5" />
                                  <span>{venue.address}</span>
                                </a>
                                <a
                                  href={venue.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-mare-600 hover:text-terracotta-600 transition-colors"
                                >
                                  <Instagram className="w-3.5 h-3.5" />
                                  <span>{venue.instagramHandle}</span>
                                </a>
                              </div>
                              {venue.comments && (
                                <div className="pl-3 border-l border-terracotta-200/40 mt-1 space-y-1">
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
                          <div className={`flex flex-wrap gap-3 mt-3 pt-2.5 border-t ${locale.id === 'divas' ? 'border-red-200/20' : 'border-terracotta-150/10'}`}>
                            <a
                              href={locale.mapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 text-xs transition-colors ${locale.id === 'divas' ? 'text-red-700 hover:text-red-900' : 'text-mare-600 hover:text-terracotta-600'}`}
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{locale.address}</span>
                            </a>
                            {locale.instagram && (
                              <a
                                href={locale.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-mare-600 hover:text-terracotta-600 transition-colors"
                              >
                                <Instagram className="w-3.5 h-3.5" />
                                <span>{locale.instagramHandle}</span>
                              </a>
                            )}
                          </div>
                          {locale.comments && (
                            <div className="mt-2.5 pt-2 border-t border-terracotta-150/5">
                              <p className="text-[10px] font-semibold text-terracotta-600 flex items-center gap-1 mb-1">
                                <MessageSquare className="w-3 h-3" />
                                <span>Voci dai Forum (Reddit &amp; GnoccaTravel):</span>
                              </p>
                              <div className="space-y-1 pl-3 border-l border-terracotta-200/40">
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
              <div className="space-y-4 bg-white/60 p-5 rounded-xl border border-terracotta-100/30">
                <h3 className="font-display text-base font-bold text-notte flex items-center gap-2 mb-2">
                  <span>🏝️ Mappa Strategica Costa del Sol (Località Esterne)</span>
                </h3>
                <p className="text-xs text-mare-700 leading-relaxed mb-3">
                  {movidaData.costa?.intro}
                </p>

                <div className="space-y-4">
                  {movidaData.costa?.zones.map((zone: any) => (
                    <div key={zone.id} className="p-4 bg-white/80 rounded-xl border border-terracotta-100/20 card-shadow">
                      <p className="text-sm font-bold text-terracotta-600 flex items-center gap-1.5">
                        <span>📍</span> {zone.name}
                      </p>
                      <p className="text-xs text-mare-750/90 mt-2 leading-relaxed italic border-l-2 border-terracotta-300 pl-2">
                        {zone.description}
                      </p>
                      
                      <div className="mt-3 pt-3 border-t border-terracotta-150/10 space-y-3">
                        <p className="text-[10px] font-semibold text-mare-400 uppercase tracking-wider">Hotspots & Strategia:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {zone.venues.map((venue: any, vIdx: number) => (
                            <div key={vIdx} className="p-3 bg-terracotta-50/40 rounded-lg border border-terracotta-100/10 flex flex-col">
                              <span className="font-bold text-xs text-mare-800 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-terracotta-500 rounded-full animate-pulse"></span>
                                {venue.name}
                              </span>
                              <p className="text-[10px] text-mare-700/80 mt-1.5 leading-relaxed flex-1">
                                {venue.details}
                              </p>
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
              <div className="space-y-4 bg-white/60 p-5 rounded-xl border border-terracotta-100/30">
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
                    <div key={idx} className="p-4 bg-white/80 rounded-xl border border-terracotta-100/20">
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
              <div className="space-y-4 bg-white/60 p-5 rounded-xl border border-terracotta-100/30">
                <h3 className="font-display text-base font-bold text-notte flex items-center gap-2 mb-2">
                  <span>🏖️ Focus Logistico e Strategico: Nerja (Costa del Sol Est)</span>
                </h3>
                <p>{movidaData.nerja.intro}</p>

                <div className="space-y-3">
                  <div className="p-4 bg-white/80 rounded-xl border border-terracotta-100/20">
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

                  <div className="p-4 bg-white/80 rounded-xl border border-terracotta-100/20">
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
                                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                                      <span className="font-semibold text-mare-750">{subV.label}</span>
                                      <a
                                        href={subV.mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-mare-600 hover:text-terracotta-600 transition-colors"
                                      >
                                        <MapPin className="w-3 h-3" />
                                        <span>{subV.address}</span>
                                      </a>
                                      {subV.facebookUrl && (
                                        <a
                                          href={subV.facebookUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 text-mare-600 hover:text-terracotta-600 transition-colors"
                                        >
                                          <ExternalLink className="w-3 h-3" />
                                          <span>Facebook</span>
                                        </a>
                                      )}
                                    </div>
                                    {subV.comments && (
                                      <div className="pl-3 border-l border-terracotta-200/40 mt-1 space-y-1">
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
                              <div className="flex flex-wrap gap-3 mt-2 pt-1.5 border-t border-terracotta-100/5 text-[11px]">
                                <a
                                  href={venue.mapLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-mare-600 hover:text-terracotta-600 transition-colors"
                                >
                                  <MapPin className="w-3 h-3" />
                                  <span>{venue.address}</span>
                                </a>
                                <a
                                  href={venue.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-mare-600 hover:text-terracotta-600 transition-colors"
                                >
                                  <Instagram className="w-3 h-3" />
                                  <span>{venue.instagramHandle}</span>
                                </a>
                              </div>
                              {venue.comments && (
                                <div className="mt-2 pt-1.5 border-t border-terracotta-100/5">
                                  <p className="text-[10px] font-semibold text-terracotta-600 flex items-center gap-1 mb-1">
                                    <MessageSquare className="w-3 h-3" />
                                    <span>Voci dai Forum (Reddit &amp; GnoccaTravel):</span>
                                  </p>
                                  <div className="space-y-1 pl-3 border-l border-terracotta-200/40">
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
              <div className="space-y-4 bg-white/60 p-5 rounded-xl border border-terracotta-100/30">
                <h3 className="font-display text-base font-bold text-notte flex items-center gap-2 mb-2">
                  <span>📱 Mappatura e Strategia Digitale delle Dating App in Spagna</span>
                </h3>
                <p className="text-xs text-mare-700 leading-relaxed">
                  {movidaData.dating.intro}
                </p>

                <div className="font-display text-xs font-bold text-notte pt-2 border-t border-terracotta-100/20 uppercase tracking-wider text-terracotta-600">
                  {movidaData.dating.puroLocal.title}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {movidaData.dating.puroLocal.apps.map((app: any, idx: number) => (
                    <div key={idx} className="p-4 bg-white/80 rounded-xl border border-terracotta-100/20 flex flex-col justify-between">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movidaData.dating.mainstream.apps.map((app: any, idx: number) => (
                    <div key={idx} className="p-4 bg-white/80 rounded-xl border border-terracotta-100/20 flex flex-col justify-between">
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
              <div className="space-y-4 bg-white/60 p-5 rounded-xl border border-terracotta-100/30">
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

            {/* SICUREZZA & LOGISTICA */}
            {activeTab === 'sicurezza' && (
              <div className="space-y-4 bg-white/60 p-5 rounded-xl border border-terracotta-100/30">
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
