'use client'

import { motion } from 'framer-motion'
import { Car, ParkingCircle, AlertTriangle, Clock, Gauge, ShieldCheck, ExternalLink } from 'lucide-react'
import log from '@/data/logistics.json'

export default function Logistics() {
  return (
    <section id="logistics" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Muoversi</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Logistica & Auto</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white/70 rounded-2xl p-5 border border-terracotta-100/40 card-shadow">
              <h3 className="font-display text-lg font-bold text-notte mb-3 flex items-center gap-2">
                <Car className="w-5 h-5 text-terracotta-500" /> Noleggio auto
              </h3>
              <p className="text-sm text-mare-700/70 mb-2"><strong>Aeroporto:</strong> {log.carRental.airport}</p>
              <p className="text-sm text-mare-700/70 mb-2">
                <strong>Consigliato:</strong>{' '}
                {log.carRental.recommended}
                {log.carRental.recommendedMapLink && (
                  <a
                    href={log.carRental.recommendedMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-terracotta-500 hover:text-terracotta-600 transition-colors inline-flex items-center gap-0.5"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </p>
              <p className="text-sm text-mare-700/70 mb-2"><strong>Taglia:</strong> {log.carRental.size}</p>
              <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-800">
                <AlertTriangle className="w-4 h-4 inline mr-1" /> {log.carRental.tip}
              </div>
            </div>

            <div className="bg-white/70 rounded-2xl p-5 border border-terracotta-100/40 card-shadow">
              <h3 className="font-display text-lg font-bold text-notte mb-3 flex items-center gap-2">
                <ParkingCircle className="w-5 h-5 text-terracotta-500" /> Parcheggi
              </h3>
              <div className="space-y-1.5 text-sm text-mare-700/70">
                <p><strong>Málaga:</strong> {log.parking.malaga}</p>
                <p><strong>Marbella:</strong> {log.parking.marbella}</p>
                <p><strong>San Pedro:</strong> {log.parking.san_pedro}</p>
                <p><strong>Estepona:</strong> {log.parking.estepona}</p>
                <p><strong>Puerto Banús:</strong> {log.parking.puerto_banus}</p>
                <p><strong>Benalmádena:</strong> {log.parking.benalmadena}</p>
              </div>
              <div className="p-3 mt-2 bg-red-50 rounded-xl text-xs text-red-700">
                <AlertTriangle className="w-4 h-4 inline mr-1" /> {log.parking.general_tip}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/70 rounded-2xl p-5 border border-terracotta-100/40 card-shadow">
              <h3 className="font-display text-lg font-bold text-notte mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-terracotta-500" /> Tempi di guida
              </h3>
              <div className="flex gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> AP-7 (pedaggio)
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> A-7 (gratuita)
                </span>
              </div>
              <div className="space-y-2">
                {log.drive_times.map((route, i) => (
                  <div key={i} className="p-2.5 bg-terracotta-50/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-notte">
                        {route.from} → {route.to}
                      </span>
                      <span className="text-[10px] text-mare-400">{route.toll_cost}</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 flex items-center gap-1.5 px-2 py-1 bg-blue-50 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-[10px] text-blue-700 font-medium">{route.toll}</span>
                        <span className="text-[9px] text-blue-500">pedaggio</span>
                      </div>
                      <div className="flex-1 flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                        <span className="text-[10px] text-green-700 font-medium">{route.free}</span>
                        <span className="text-[9px] text-green-500">gratuita</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 rounded-2xl p-5 border border-terracotta-100/40 card-shadow">
              <h3 className="font-display text-lg font-bold text-notte mb-3 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-terracotta-500" /> Consigli guida
              </h3>
              <div className="space-y-2 text-sm text-mare-700/70">
                <div className="p-2.5 bg-blue-50 rounded-xl">
                  <p className="text-xs font-medium text-blue-800">Autostrada</p>
                  <p className="text-xs text-blue-700">{log.driving.highway}</p>
                  <p className="text-xs text-blue-700 mt-1">{log.driving.recommendation}</p>
                </div>
                <div className="p-2.5 bg-amber-50 rounded-xl">
                  <p className="text-xs font-medium text-amber-800">Traffico</p>
                  <p className="text-xs text-amber-700">{log.driving.traffic_warning}</p>
                  <p className="text-xs text-amber-700 mt-1">{log.driving.summer_heat}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 rounded-2xl p-5 border border-terracotta-100/40 card-shadow">
              <h3 className="font-display text-lg font-bold text-notte mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-terracotta-500" /> Mobilità notturna
              </h3>
              <p className="text-sm text-mare-700/70 mb-1"><strong>Taxi/App:</strong> {log.night_mobility.taxi}</p>
              <p className="text-sm text-mare-700/70 mb-1"><strong>Costi:</strong> {log.night_mobility.cost}</p>
              <div className="p-3 bg-red-50 rounded-xl text-xs text-red-700 mt-2">
                <AlertTriangle className="w-4 h-4 inline mr-1" /> {log.night_mobility.tip}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
