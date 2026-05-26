'use client'

import { motion } from 'framer-motion'
import { Heart, MapPin, Clock, DollarSign, Lightbulb, Map, Star } from 'lucide-react'
import experiences from '@/data/local-experiences.json'

export default function LocalExperiences() {
  return (
    <section id="experiences" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Autenticità</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Esperienze da locale</h2>
          <p className="text-mare-700/70 mt-1">15 modi per vivere la Costa del Sol come un residente</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {experiences.map((exp: any, i: number) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-terracotta-100/40 card-hover"
            >
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-terracotta-500" />
                <h3 className="font-display font-bold text-sm text-notte">{exp.title}</h3>
              </div>
              <div className="space-y-1 text-xs text-mare-700/60 mb-2">
                <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-terracotta-400" /> {exp.where}</p>
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
          ))}
        </div>
      </div>
    </section>
  )
}
