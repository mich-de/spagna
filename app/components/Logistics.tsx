'use client'

import { motion } from 'framer-motion'
import { Car, ParkingCircle, AlertTriangle, Clock, Gauge, ShieldCheck, ExternalLink, Compass, Info } from 'lucide-react'
import log from '@/data/logistics.json'

export default function Logistics() {
  return (
    <section id="logistics" className="scroll-mt-20 px-container-margin md:px-lg pt-16 pb-8">
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
            <div className="bg-surface-container-lowest rounded-xl p-md card-hover border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
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

            <div className="bg-surface-container-lowest rounded-xl p-md card-hover border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
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
            <div className="bg-surface-container-lowest rounded-xl p-md card-hover border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
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

            <div className="bg-surface-container-lowest rounded-xl p-md card-hover border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
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

            <div className="bg-surface-container-lowest rounded-xl p-md card-hover border border-outline-variant/30 shadow-[0px_4px_12px_rgba(30,58,95,0.08)]">
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

        {/* Highway comparison container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-8"
        >
          <div className="bg-white/70 rounded-2xl p-6 sm:p-8 border border-terracotta-100/40 card-shadow card-hover">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-notte flex items-center gap-2.5">
                  <Compass className="w-6 h-6 text-terracotta-500" />
                  {log.highways_comparison.title}
                </h3>
                <p className="text-sm text-mare-700/70 mt-1 max-w-3xl">
                  {log.highways_comparison.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-100">
                  <AlertTriangle className="w-3.5 h-3.5" /> Alta Stagione: Tariffe Raddoppiate
                </span>
              </div>
            </div>

            {/* Comparison Table / Cards */}
            <div className="overflow-hidden border border-mare-100/50 rounded-xl bg-white/40 mb-6">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-mare-50 border-b border-mare-100/50 text-mare-800 text-xs font-bold uppercase tracking-wider">
                      <th className="p-4">Percorso</th>
                      <th className="p-4 text-center">AP-7 (Pedaggio)</th>
                      <th className="p-4 text-center">A-7 (Gratuita)</th>
                      <th className="p-4 text-center">Differenza</th>
                      <th className="p-4">Pedaggio (Giugno)</th>
                      <th className="p-4">Consiglio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-mare-100/40 text-sm">
                    {log.highways_comparison.routes.map((r, idx) => {
                      const timeAp7 = parseInt(r.via_ap7);
                      const timeA7 = parseInt(r.via_a7);
                      const diff = timeA7 - timeAp7;
                      return (
                        <tr key={idx} className="hover:bg-terracotta-50/20 transition-colors">
                          <td className="p-4 font-semibold text-notte">{r.route}</td>
                          <td className="p-4 text-center font-semibold text-mare-700">{r.via_ap7}</td>
                          <td className="p-4 text-center text-mare-600/80">{r.via_a7}</td>
                          <td className="p-4 text-center">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-terracotta-100 text-terracotta-800">
                              -{diff} min
                            </span>
                          </td>
                          <td className="p-4 text-amber-800 font-medium">{r.toll}</td>
                          <td className="p-4 text-xs text-mare-700/80">{r.tip}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile List/Cards View */}
              <div className="block md:hidden divide-y divide-mare-100/40">
                {log.highways_comparison.routes.map((r, idx) => {
                  const timeAp7 = parseInt(r.via_ap7);
                  const timeA7 = parseInt(r.via_a7);
                  const diff = timeA7 - timeAp7;
                  return (
                    <div key={idx} className="p-4 space-y-3 bg-white/30">
                      <div className="font-semibold text-notte text-sm">{r.route}</div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 bg-mare-50 rounded-lg">
                          <div className="text-mare-500 text-[10px] uppercase font-bold">AP-7</div>
                          <div className="font-semibold text-notte">{r.via_ap7}</div>
                        </div>
                        <div className="p-2 bg-mare-50/50 rounded-lg">
                          <div className="text-mare-500 text-[10px] uppercase font-bold">A-7</div>
                          <div className="text-mare-600">{r.via_a7}</div>
                        </div>
                        <div className="p-2 bg-terracotta-50 rounded-lg flex flex-col justify-center items-center">
                          <div className="text-terracotta-600 text-[10px] uppercase font-bold">Salva</div>
                          <div className="font-semibold text-terracotta-700">-{diff} min</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-mare-600">Pedaggio (Giugno):</span>
                        <span className="font-semibold text-amber-800">{r.toll}</span>
                      </div>

                      <div className="p-2 bg-amber-50/40 rounded-lg border border-amber-100/20 text-xs text-mare-700/80">
                        <strong>Nota:</strong> {r.tip}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Info Banner */}
            <div className="flex gap-3 p-4 bg-blue-50/60 rounded-xl border border-blue-100/50 text-xs text-blue-800">
              <Info className="w-5 h-5 flex-shrink-0 text-blue-600" />
              <div>
                <p className="font-semibold mb-0.5">Pagamento Pedaggi & Informazioni Utili</p>
                <p className="text-blue-700/90 leading-relaxed">{log.highways_comparison.payment_tip}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
