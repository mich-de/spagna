'use client'

import { motion } from 'framer-motion'
import { Car, ParkingCircle, AlertTriangle, Clock, Gauge, ShieldCheck, ExternalLink } from 'lucide-react'
import log from '@/data/logistics.json'

export default function Logistics() {
  return (
    <section id="logistics" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Car className="w-4 h-4" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]">Muoversi in Libertà</span>
          </div>
          <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Logistica & Mobilità</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-3xl">Guida pratica per esplorare la costa in autonomia. Dai consigli sul noleggio auto ai segreti per evitare il traffico andaluso.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 flex items-center gap-2">
                <Car className="w-5 h-5 text-primary" /> Noleggio auto
              </h3>
              <p className="font-body-md text-[14px] text-on-surface-variant mb-2"><strong>Aeroporto:</strong> {log.carRental.airport}</p>
              <p className="font-body-md text-[14px] text-on-surface-variant mb-2">
                <strong>Consigliato:</strong> {log.carRental.recommended}
                {log.carRental.recommendedMapLink && (
                  <a href={log.carRental.recommendedMapLink} target="_blank" rel="noopener noreferrer" className="ml-1 text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-0.5">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </p>
              <p className="font-body-md text-[14px] text-on-surface-variant mb-2"><strong>Taglia:</strong> {log.carRental.size}</p>
              <div className="p-3 bg-tertiary-container/10 rounded-lg font-body-md text-[13px] text-tertiary border border-tertiary/20">
                <AlertTriangle className="w-4 h-4 inline mr-1" /> {log.carRental.tip}
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 flex items-center gap-2">
                <ParkingCircle className="w-5 h-5 text-primary" /> Parcheggi
              </h3>
              <div className="space-y-1.5 font-body-md text-[14px] text-on-surface-variant">
                <p><strong>Málaga:</strong> {log.parking.malaga}</p>
                <p><strong>Marbella:</strong> {log.parking.marbella}</p>
                <p><strong>San Pedro:</strong> {log.parking.san_pedro}</p>
                <p><strong>Estepona:</strong> {log.parking.estepona}</p>
                <p><strong>Puerto Banús:</strong> {log.parking.puerto_banus}</p>
                <p><strong>Benalmádena:</strong> {log.parking.benalmadena}</p>
              </div>
              <div className="p-3 mt-2 bg-error-container/50 rounded-lg font-body-md text-[13px] text-error border border-error/20">
                <AlertTriangle className="w-4 h-4 inline mr-1" /> {log.parking.general_tip}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Tempi di guida
              </h3>
              <div className="flex gap-2 mb-3">
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-2 py-1 bg-secondary/10 text-secondary rounded-full">
                  <span className="w-2 h-2 rounded-full bg-secondary" /> AP-7 (pedaggio)
                </span>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-emerald-50 text-emerald-700 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> A-7 (gratuita)
                </span>
              </div>
              <div className="space-y-2">
                {log.drive_times.map((route: any, i: number) => (
                  <div key={i} className="p-2.5 bg-surface-container-low rounded-lg">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-label-md text-label-md text-on-surface">{route.from} → {route.to}</span>
                      <span className="font-body-md text-[12px] text-outline">{route.toll_cost}</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 flex items-center gap-1.5 px-2 py-1 bg-secondary/10 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        <span className="font-label-sm text-label-sm text-secondary">{route.toll}</span>
                        <span className="font-label-sm text-label-sm text-secondary/60">pedaggio</span>
                      </div>
                      <div className="flex-1 flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="font-label-sm text-label-sm text-emerald-700">{route.free}</span>
                        <span className="font-label-sm text-label-sm text-emerald-500">gratuita</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-primary" /> Consigli guida
              </h3>
              <div className="space-y-2 font-body-md text-[14px] text-on-surface-variant">
                <div className="p-2.5 bg-secondary/10 rounded-lg border border-secondary/20">
                  <p className="font-label-md text-label-md text-secondary mb-1">Autostrada</p>
                  <p>{log.driving.highway}</p>
                  <p className="mt-1">{log.driving.recommendation}</p>
                </div>
                <div className="p-2.5 bg-tertiary-container/10 rounded-lg border border-tertiary/20">
                  <p className="font-label-md text-label-md text-tertiary mb-1">Traffico</p>
                  <p>{log.driving.traffic_warning}</p>
                  <p className="mt-1">{log.driving.summer_heat}</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> Mobilità notturna
              </h3>
              <p className="font-body-md text-[14px] text-on-surface-variant mb-1"><strong>Taxi/App:</strong> {log.night_mobility.taxi}</p>
              <p className="font-body-md text-[14px] text-on-surface-variant mb-1"><strong>Costi:</strong> {log.night_mobility.cost}</p>
              <div className="p-3 bg-error-container/50 rounded-lg font-body-md text-[13px] text-error border border-error/20 mt-2">
                <AlertTriangle className="w-4 h-4 inline mr-1" /> {log.night_mobility.tip}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
