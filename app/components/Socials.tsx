'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Globe, Facebook, Filter, ExternalLink, Heart, BadgeCheck, Sparkles, Music, Palmtree, UtensilsCrossed, Landmark, PartyPopper } from 'lucide-react'
import socials from '@/data/socials.json'

const groups = [
  { id: 'all', label: 'Tutti', icon: Sparkles },
  { id: 'official', label: 'Ufficiali', icon: BadgeCheck },
  { id: 'nightlife', label: 'Nightlife', icon: Music },
  { id: 'beach', label: 'Spiaggia', icon: Palmtree },
  { id: 'food', label: 'Food', icon: UtensilsCrossed },
  { id: 'events', label: 'Eventi', icon: PartyPopper },
]

const platformIcons: Record<string, any> = {
  instagram: Instagram,
  website: Globe,
  facebook: Facebook,
}

const platformLabels: Record<string, string> = {
  instagram: 'Instagram',
  website: 'Sito web',
  facebook: 'Facebook',
}

export default function Socials() {
  const [activeGroup, setActiveGroup] = useState('all')

  const filtered = useMemo(() => {
    return (socials as any[]).filter((s) => activeGroup === 'all' || s.category === activeGroup)
  }, [activeGroup])

  return (
    <section id="socials" className="scroll-mt-20 px-container-margin md:px-lg pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Instagram className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Social & News</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">
            Chi seguire <span className="italic text-primary">prima e durante</span>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-3xl">
            Profili Instagram, siti ufficiali e pagine eventi per sapere sempre cosa succede a Nerja e sulla Costa del Sol. I must per le date sono evidenziati.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          {groups.map((g) => {
            const Icon = g.icon
            const active = activeGroup === g.id
            return (
              <button key={g.id} onClick={() => setActiveGroup(g.id)}
                className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-medium flex items-center gap-1.5 transition-all active:scale-95 ${active ? 'bg-secondary text-on-secondary shadow-sm' : 'border border-outline-variant text-on-surface-variant hover:border-tertiary transition-colors'}`}>
                <Icon className="w-3.5 h-3.5" />
                {g.label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((s, idx) => {
            const PlatformIcon = platformIcons[s.platform] || Globe
            const groupLabel = groups.find((g) => g.id === s.category)?.label || s.category
            return (
              <motion.a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.03 }}
                className="group bg-surface-container-lowest rounded-2xl card-hover border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)] p-4 hover:shadow-[0px_12px_24px_rgba(30,58,95,0.12)] hover:scale-[0.98] transition-all duration-200 flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.platform === 'instagram' ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white' : 'bg-surface-variant text-on-surface-variant'}`}>
                      <PlatformIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-label-md text-label-md text-on-surface font-bold truncate">{s.name}</h4>
                      <span className="font-body-md text-body-md text-on-surface-variant">{s.handle}</span>
                    </div>
                  </div>
                  {s.must_for_dates && (
                    <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-label-sm text-label-sm font-bold">
                      <Heart className="w-3 h-3 fill-current" /> Must
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-surface-variant text-on-surface-variant border border-outline-variant/20 font-label-sm text-label-sm font-medium">
                    {groupLabel}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-medium">
                    {platformLabels[s.platform] || s.platform}
                  </span>
                </div>

                <p className="font-body-md text-body-md text-on-surface leading-relaxed mb-2 flex-1">{s.description}</p>

                <div className="pt-3 border-t border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-primary font-medium flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    {s.why_follow}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary transition-colors">
                  Apri <ExternalLink className="w-3 h-3" />
                </div>
              </motion.a>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
            <Filter className="w-8 h-8 text-outline mx-auto mb-2" />
            <p className="font-body-md text-body-md text-on-surface-variant">Nessun profilo in questa categoria.</p>
          </div>
        )}
      </div>
    </section>
  )
}
