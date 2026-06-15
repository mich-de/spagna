'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Compass, Car, Clock, Heart, ExternalLink, Info, Map, Waves } from 'lucide-react'

interface NerjaBeach {
  id: string
  name: string
  distance: string
  walkTime: string
  driveTime: string
  bestTransport: 'walk' | 'drive'
  accessDetails: string
  vibe: 'wild' | 'active'
  atmosphere: string
  sand: string
  chiringuitos: boolean
  bestTime: string
  localTip: string
  mapLink: string
  tripadvisorLink: string
  description: string
  zoom: number
  lat: number
  lng: number
}

const nerjaBeaches: NerjaBeach[] = [
  {
    id: 'Torrecilla',
    name: 'Playa de la Torrecilla',
    distance: '450 m',
    walkTime: '5 min',
    driveTime: '2 min',
    bestTransport: 'walk',
    accessDetails: 'Uscire a destra su C. Antonio Ferrandis Chanquete, poi scendere a destra su Calle Castilla Pérez. Accesso diretto e pianeggiante.',
    vibe: 'active',
    atmosphere: 'Popolare / Attrezzata',
    sand: 'Sabbia scura e ciottoli fini',
    chiringuitos: true,
    bestTime: 'Mattina e pomeriggio',
    localTip: 'La spiaggia più comoda e vicina all\'alloggio. Ideale per un bagno veloce o per rilassarsi senza spostarsi in auto.',
    mapLink: 'https://www.google.com/maps/dir/?api=1&origin=36.7455557,-3.8838644&destination=36.7441,-3.8827',
    tripadvisorLink: 'https://www.tripadvisor.com/Search?q=Playa%20de%20la%20Torrecilla%20Nerja',
    description: 'Spiaggia urbana molto popolare, dotata di tutti i servizi e Bandiera Blu. Acqua pulita e comodo lungomare.',
    zoom: 15,
    lat: 36.7441,
    lng: -3.8827
  },
  {
    id: 'Chucho',
    name: 'Playa El Chucho',
    distance: '600 m',
    walkTime: '7 min',
    driveTime: '2 min',
    bestTransport: 'walk',
    accessDetails: 'Uscire a destra su C. Antonio Ferrandis Chanquete, poi scendere a sinistra su Calle El Chucho. Spiaggia tranquilla collegata alla Torrecilla.',
    vibe: 'active',
    atmosphere: 'Tranquilla / Locale',
    sand: 'Sabbia scura e ciottoli',
    chiringuitos: false,
    bestTime: 'Pomeriggio',
    localTip: 'Perfetta se la vicina Torrecilla è troppo affollata, offre gli stessi servizi a pochi metri di distanza.',
    mapLink: 'https://www.google.com/maps/dir/?api=1&origin=36.7455557,-3.8838644&destination=36.7445,-3.8860',
    tripadvisorLink: 'https://www.tripadvisor.com/Search?q=Playa%20El%20Chucho%20Nerja',
    description: 'Piccola spiaggia situata tra il Playazo e la Torrecilla. Meno affollata.',
    zoom: 15,
    lat: 36.7445,
    lng: -3.8860
  },
  {
    id: 'Playazo',
    name: 'Playa El Playazo',
    distance: '850 m',
    walkTime: '10 min',
    driveTime: '2 min',
    bestTransport: 'walk',
    accessDetails: 'Procedere verso ovest direttamente lungo Calle Antonio Ferrandis Chanquete. Ampio parcheggio sterrato gratuito se si va in auto.',
    vibe: 'active',
    atmosphere: 'Tranquilla / Spaziosa',
    sand: 'Sabbia scura grossolana',
    chiringuitos: true,
    bestTime: 'Tutto il giorno',
    localTip: 'Ottima per lunghe passeggiate sul bagnasciuga. C\'è sempre posto libero anche in alta stagione grazie alla sua estensione.',
    mapLink: 'https://www.google.com/maps/dir/?api=1&origin=36.7455557,-3.8838644&destination=36.7475,-3.8916',
    tripadvisorLink: 'https://www.tripadvisor.com/Search?q=Playa%20El%20Playazo%20Nerja',
    description: 'La spiaggia più lunga di Nerja. Meno costruita rispetto ad altre, offre grandi spazi e un panorama aperto.',
    zoom: 15,
    lat: 36.7475,
    lng: -3.8916
  },
  {
    id: 'Salón',
    name: 'Playa del Salón',
    distance: '1.0 km',
    walkTime: '12 min',
    driveTime: '3 min (ZTL centro)',
    bestTransport: 'walk',
    accessDetails: 'Percorrere Calle Antonio Ferrandis in direzione est, proseguire per Calle El Barrio fino a Plaza Cavana. Scendere la stradina scoscesa a fianco della chiesa. In auto è ZTL pedonale.',
    vibe: 'wild',
    atmosphere: 'Pittoresca / Intima',
    sand: 'Sabbia scura fine',
    chiringuitos: false,
    bestTime: 'Mattina',
    localTip: 'Conserva l\'atmosfera dei pescatori con le caratteristiche casette sulla sabbia. Molto riparata dal vento.',
    mapLink: 'https://www.google.com/maps/dir/?api=1&origin=36.7455557,-3.8838644&destination=36.7450,-3.8760',
    tripadvisorLink: 'https://www.tripadvisor.com/Search?q=Playa%20del%20Salon%20Nerja',
    description: 'Caletta storica di pescatori situata proprio a ridosso del Balcón de Europa. Suggestiva e protetta.',
    zoom: 15,
    lat: 36.7450,
    lng: -3.8760
  },
  {
    id: 'Caletilla',
    name: 'Playa de la Caletilla',
    distance: '900 m',
    walkTime: '11 min',
    driveTime: '3 min (ZTL centro)',
    bestTransport: 'walk',
    accessDetails: 'Camminare verso est in direzione del Balcón de Europa. La caletta si trova sul lato ovest del Balcón, sotto il promontorio dell\'Hotel El Salvador. In auto è ZTL pedonale.',
    vibe: 'active',
    atmosphere: 'Centrale / Piccola',
    sand: 'Sabbia fine scura',
    chiringuitos: false,
    bestTime: 'Mattina',
    localTip: 'Spiaggia piccolissima che quasi scompare con l\'alta marea. Ottima per un tuffo veloce nel cuore del centro storico.',
    mapLink: 'https://www.google.com/maps/dir/?api=1&origin=36.7455557,-3.8838644&destination=36.7451,-3.8752',
    tripadvisorLink: 'https://www.tripadvisor.com/Search?q=Playa%20de%20la%20Caletilla%20Nerja',
    description: 'Minuscola caletta adiacente al Balcón de Europa. Sembra una spiaggia privata dell\'hotel soprastante.',
    zoom: 15,
    lat: 36.7451,
    lng: -3.8752
  },
  {
    id: 'Calahonda',
    name: 'Playa de Calahonda',
    distance: '1.1 km',
    walkTime: '13 min',
    driveTime: '3 min (ZTL centro)',
    bestTransport: 'walk',
    accessDetails: 'Raggiungere il Balcón de Europa in centro, poi scendere le scale bianche situate a destra dell\'ufficio del turismo. Area pedonale non accessibile in auto.',
    vibe: 'active',
    atmosphere: 'Suggestiva / Iconica',
    sand: 'Sabbia scura fine',
    chiringuitos: false,
    bestTime: 'Mattina',
    localTip: 'La spiaggia cartolina di Nerja. Andateci la mattina presto prima che arrivi l\'ombra del Balcón o la folla dei turisti.',
    mapLink: 'https://www.google.com/maps/dir/?api=1&origin=36.7455557,-3.8838644&destination=36.7453,-3.8745',
    tripadvisorLink: 'https://www.tripadvisor.com/Search?q=Playa%20de%20Calahonda%20Nerja',
    description: 'Piccola e scenografica caletta incastonata sotto il Balcón de Europa. Simbolo e cuore della città.',
    zoom: 15,
    lat: 36.7453,
    lng: -3.8745
  },
  {
    id: 'Carabeo',
    name: 'Playa de Carabeo',
    distance: '1.3 km',
    walkTime: '15 min',
    driveTime: '4 min (ZTL centro)',
    bestTransport: 'walk',
    accessDetails: 'Superare il Balcón de Europa, percorrere Calle Carabeo verso est e scendere la ripida scalinata in pietra. Non accessibile direttamente in auto.',
    vibe: 'wild',
    atmosphere: 'Intima / Riparata',
    sand: 'Sabbia scura e rocce',
    chiringuitos: false,
    bestTime: 'Tardo pomeriggio',
    localTip: 'Essendo accessibile solo da una scalinata nascosta, è solitamente molto più tranquilla di Calahonda pur essendo vicinissima al centro.',
    mapLink: 'https://www.google.com/maps/dir/?api=1&origin=36.7455557,-3.8838644&destination=36.7465,-3.8727',
    tripadvisorLink: 'https://www.tripadvisor.com/Search?q=Playa%20de%20Carabeo%20Nerja',
    description: 'Deliziosa insenatura naturale riparata da alte scogliere rocciose. Perfetta per chi cerca riservatezza.',
    zoom: 15,
    lat: 36.7465,
    lng: -3.8727
  },
  {
    id: 'Carabeillo',
    name: 'Playa de Carabeillo',
    distance: '1.8 km',
    walkTime: '22 min',
    driveTime: '5 min',
    bestTransport: 'walk',
    accessDetails: 'Percorrerere Calle Carabeo verso est fino alla fine, scendere la scalinata immersa in una fitta vegetazione. Parcheggio auto vicino a Burriana.',
    vibe: 'wild',
    atmosphere: 'Tranquilla / Rigogliosa',
    sand: 'Sabbia fine e ciottoli',
    chiringuitos: false,
    bestTime: 'Tutto il giorno',
    localTip: 'Uno splendido compromesso: confina con la vivace spiaggia di Burriana ma è molto più riparata e tranquilla.',
    mapLink: 'https://www.google.com/maps/dir/?api=1&origin=36.7455557,-3.8838644&destination=36.7450,-3.8690',
    tripadvisorLink: 'https://www.tripadvisor.com/Search?q=Playa%20de%20Carabeillo%20Nerja',
    description: 'Insenatura naturale verdeggiante ai piedi delle scogliere, situata proprio prima di scendere a Burriana.',
    zoom: 15,
    lat: 36.7450,
    lng: -3.8690
  },
  {
    id: 'Burriana',
    name: 'Playa de Burriana',
    distance: '2.5 km',
    walkTime: '25 min (Salite)',
    driveTime: '5 min',
    bestTransport: 'drive',
    accessDetails: 'In auto procedere verso est su Av. de Pescia, svoltare in Calle Filipinas ed effettuare la discesa ripidissima. Parcheggio gratuito in strada o sotterraneo.',
    vibe: 'active',
    atmosphere: 'Vivace / Turistica',
    sand: 'Sabbia dorata e ciottoli',
    chiringuitos: true,
    bestTime: 'Tutto il giorno',
    localTip: 'Andate a mangiare la famosa paella cotta a legna da "Ayo" sulla spiaggia. Qui si noleggiano anche i kayak per esplorare le scogliere di Maro.',
    mapLink: 'https://www.google.com/maps/dir/?api=1&origin=36.7455557,-3.8838644&destination=36.7445,-3.8647',
    tripadvisorLink: 'https://www.tripadvisor.com/Search?q=Playa%20de%20Burriana%20Nerja',
    description: 'La spiaggia più celebre e attrezzata di Nerja. Ricca di ristoranti, pub, negozi sul lungomare ed attività sportive.',
    zoom: 14,
    lat: 36.7445,
    lng: -3.8647
  },
  {
    id: 'Maro',
    name: 'Playa de Maro',
    distance: '5.5 km',
    walkTime: '1h 15 min (Statale)',
    driveTime: '10 min',
    bestTransport: 'drive',
    accessDetails: 'Prendere la strada statale N-340 verso est in direzione Maro. Parcheggiare nelle aree sterrate in alto e scendere la discesa a piedi per 10 minuti. Il cammino a piedi dall\'hotel segue la strada statale ed è sconsigliato.',
    vibe: 'wild',
    atmosphere: 'Selvaggia / Naturale',
    sand: 'Sabbia scura e ciottoli',
    chiringuitos: true,
    bestTime: 'Mattina e primo pomeriggio',
    localTip: 'Acqua limpidissima e fondali rocciosi spettacolari, perfetti per lo snorkeling. Fate il tour in kayak per ammirare la cascata che cade direttamente nel mare.',
    mapLink: 'https://www.google.com/maps/dir/?api=1&origin=36.7455557,-3.8838644&destination=36.7533,-3.8444',
    tripadvisorLink: 'https://www.tripadvisor.com/Search?q=Playa%20de%20Maro%20Nerja',
    description: 'Una delle calette naturali più belle dell\'Andalusia, immersa nell\'area protetta dei calanchi di Maro-Cerro Gordo.',
    zoom: 13,
    lat: 36.7533,
    lng: -3.8444
  },
  {
    id: 'Alberquillas',
    name: 'Playa de las Alberquillas',
    distance: '10.0 km',
    walkTime: '2h 15 min (Statale)',
    driveTime: '12 min',
    bestTransport: 'drive',
    accessDetails: 'Procedere in auto sulla N-340 verso est, superare Maro. Parcheggiare nello spiazzo sterrato vicino al km 299 e percorrere a piedi il sentiero naturale. Percorso a piedi dall\'hotel sconsigliato.',
    vibe: 'wild',
    atmosphere: 'Incontaminata / Silenziosa',
    sand: 'Sabbia scura e ciottoli',
    chiringuitos: false,
    bestTime: 'Mattina e pomeriggio',
    localTip: 'Spiaggia sprovvista di qualsiasi servizio. Portare abbondante acqua e ombrellone. Regna la massima quiete.',
    mapLink: 'https://www.google.com/maps/dir/?api=1&origin=36.7455557,-3.8838644&destination=36.7468,-3.8115',
    tripadvisorLink: 'https://www.tripadvisor.com/Search?q=Playa%20de%20las%20Alberquillas%20Nerja',
    description: 'Spiaggia vergine protetta dalle scogliere. Acqua straordinariamente trasparente.',
    zoom: 12,
    lat: 36.7468,
    lng: -3.8115
  },
  {
    id: 'Cala del Pino',
    name: 'Cala del Pino',
    distance: '11.0 km',
    walkTime: '2h 30 min (Statale)',
    driveTime: '13 min',
    bestTransport: 'drive',
    accessDetails: 'Prendere la N-340 verso est, parcheggiare nei pressi del km 301. Scendere a piedi per il sentiero ripido e accidentato che attraversa la pineta. Cammino a piedi dall\'hotel sconsigliato.',
    vibe: 'wild',
    atmosphere: 'Isolata / Nudista',
    sand: 'Sabbia dorata grossolana',
    chiringuitos: false,
    bestTime: 'Mattina',
    localTip: 'L\'accesso è piuttosto faticoso ma la caletta è paradisiaca. Frequentata da amanti del naturismo e dello snorkeling.',
    mapLink: 'https://www.google.com/maps/dir/?api=1&origin=36.7455557,-3.8838644&destination=36.7460,-3.8015',
    tripadvisorLink: 'https://www.tripadvisor.com/Search?q=Cala%20del%20Pino%20Nerja',
    description: 'Due splendide insenature sabbiose divise da una barriera naturale di rocce, lambite da acque smeraldine.',
    zoom: 12,
    lat: 36.7460,
    lng: -3.8015
  },
  {
    id: 'Cañuelo',
    name: 'Cala del Cañuelo',
    distance: '13.0 km',
    walkTime: '3h (Statale)',
    driveTime: '15 min',
    bestTransport: 'drive',
    accessDetails: 'Procedere sulla N-340 verso est fino al confine provinciale (km 302). Parcheggiare in alto. In estate scendere con il minibus navetta autorizzato (€2 A/R). Percorso a piedi dall\'hotel non consigliato.',
    vibe: 'wild',
    atmosphere: 'Selvaggia / Snorkeling',
    sand: 'Ciottoli chiari e sabbia grossolana',
    chiringuitos: true,
    bestTime: 'Tutto il giorno',
    localTip: 'Famosissima per i giardini di corallo arancione e la fauna sottomarina. Perfetta per fare snorkeling. Ha due ottimi chiringuiti.',
    mapLink: 'https://www.google.com/maps/dir/?api=1&origin=36.7455557,-3.8838644&destination=36.7455,-3.7915',
    tripadvisorLink: 'https://www.tripadvisor.com/Search?q=Cala%20del%20Canuelo%20Nerja',
    description: 'L\'ultima spiaggia della provincia di Málaga. Una baia naturale chiusa e protetta con acque magnifiche.',
    zoom: 12,
    lat: 36.7455,
    lng: -3.7915
  }
]

export default function NerjaMap() {
  const [selectedBeach, setSelectedBeach] = useState<NerjaBeach>(nerjaBeaches[0])
  const [transportFilter, setTransportFilter] = useState<'all' | 'walk' | 'drive'>('all')
  const [vibeFilter, setVibeFilter] = useState<'all' | 'wild' | 'active'>('all')
  const [bookmarks, setBookmarks] = useState<any[]>([])
  
  // Dynamic transit mode to update Google Maps routing (walk vs drive)
  const [activeMode, setActiveMode] = useState<'walk' | 'drive'>('walk')

  // Load and sync planner bookmarks
  useEffect(() => {
    const stored = localStorage.getItem('sol_local_planner')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.bookmarks) setBookmarks(data.bookmarks)
      } catch (e) {}
    }
  }, [])

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail && customEvent.detail.bookmarks !== undefined) {
        setBookmarks(customEvent.detail.bookmarks)
      }
    }
    window.addEventListener('sol-local-planner-update', handleUpdate)
    return () => window.removeEventListener('sol-local-planner-update', handleUpdate)
  }, [])

  // Auto-set recommended mode when beach changes
  useEffect(() => {
    setActiveMode(selectedBeach.bestTransport)
  }, [selectedBeach])

  const toggleBookmark = (beach: NerjaBeach) => {
    const isBookmarked = bookmarks.some(b => b.id === beach.name)
    let nextBookmarks
    if (isBookmarked) {
      nextBookmarks = bookmarks.filter(b => b.id !== beach.name)
    } else {
      nextBookmarks = [...bookmarks, {
        id: beach.name,
        name: beach.name,
        type: 'beach',
        zone: 'Nerja'
      }]
    }
    setBookmarks(nextBookmarks)
    const stored = localStorage.getItem('sol_local_planner')
    const current = stored ? JSON.parse(stored) : {}
    const nextState = { ...current, bookmarks: nextBookmarks }
    localStorage.setItem('sol_local_planner', JSON.stringify(nextState))
    window.dispatchEvent(new CustomEvent('sol-local-planner-update', { detail: nextState }))
  }

  // Filtered beaches list
  const filteredBeaches = useMemo(() => {
    return nerjaBeaches.filter(b => {
      if (transportFilter !== 'all' && b.bestTransport !== transportFilter) return false
      if (vibeFilter !== 'all' && b.vibe !== vibeFilter) return false
      return true
    })
  }, [transportFilter, vibeFilter])

  // Google Maps Directions Embed URL using latitude/longitude AND dirflg mode of transport
  const mapIframeUrl = useMemo(() => {
    const origin = '36.7455557,-3.8838644' // Hotel
    const destination = `${selectedBeach.lat},${selectedBeach.lng}` // Selected beach coords
    const mode = activeMode === 'walk' ? 'w' : 'd' // w = walking, d = driving
    return `https://maps.google.com/maps?saddr=${origin}&daddr=${destination}&dirflg=${mode}&t=&z=${selectedBeach.zoom}&ie=UTF8&iwloc=&output=embed`
  }, [selectedBeach, activeMode])

  // Multi-stop directions URL to plot all main locations on Google Maps at once in a new tab
  const multiStopGoogleMapsUrl = 'https://www.google.com/maps/dir/36.7455557,-3.8838644/36.7441,-3.8827/36.7445,-3.8860/36.7475,-3.8916/36.7450,-3.8760/36.7451,-3.8752/36.7453,-3.8745/36.7465,-3.8727/36.7450,-3.8690/36.7445,-3.8647/36.7533,-3.8444/36.7468,-3.8115/36.7460,-3.8015/36.7455,-3.7915'

  return (
    <section id="nerja-map" className="scroll-mt-20 px-4 sm:px-6 pt-16 pb-8 bg-gradient-to-b from-transparent to-mare-50/10">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <p className="text-sm text-terracotta-500 font-medium uppercase tracking-widest mb-1">Mappa Stradale & Percorsi</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-notte">Tutte le 13 Spiagge di Nerja</h2>
            <p className="text-sm text-mare-600/70 mt-1">
              Visualizza gli itinerari geolocalizzati partendo dall'appartamento in <span className="font-semibold text-terracotta-600">Calle Antonio Ferrandis Chanquete 29</span>.
            </p>
          </div>

          <a
            href={multiStopGoogleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0f3e4a] hover:bg-terracotta-600 transition-all flex items-center justify-center gap-2 shadow-sm shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <Map className="w-4 h-4" />
            Apri Tutte le Tappe su Google Maps ↗
          </a>
        </motion.div>

        {/* Filters bar */}
        <div className="glass flex flex-col md:flex-row gap-4 mb-6 p-4 rounded-2xl border border-terracotta-100/40 justify-between items-stretch md:items-center">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Transport Filter */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-mare-500 uppercase tracking-wide">Mezzo Consigliato</span>
              <div className="flex bg-white/70 border border-terracotta-100/40 p-0.5 rounded-xl">
                {(['all', 'walk', 'drive'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTransportFilter(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      transportFilter === t
                        ? 'bg-terracotta-500 text-white shadow-sm'
                        : 'text-mare-700 hover:text-terracotta-600'
                    }`}
                  >
                    {t === 'all' && 'Tutti'}
                    {t === 'walk' && 'A piedi (<15m)'}
                    {t === 'drive' && 'In auto'}
                  </button>
                ))}
              </div>
            </div>

            {/* Vibe Filter */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-mare-500 uppercase tracking-wide">Atmosfera</span>
              <div className="flex bg-white/70 border border-terracotta-100/40 p-0.5 rounded-xl">
                {(['all', 'wild', 'active'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVibeFilter(v)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      vibeFilter === v
                        ? 'bg-terracotta-500 text-white shadow-sm'
                        : 'text-mare-700 hover:text-terracotta-600'
                    }`}
                  >
                    {v === 'all' && 'Tutte'}
                    {v === 'wild' && 'Selvaggia / Caletta'}
                    {v === 'active' && 'Attrezzata / Attiva'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-xs text-mare-400 self-end md:self-center">
            Seleziona una spiaggia per calcolare il percorso dall'hotel
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Sidebar list (Takes 4 cols on desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1.5 scrollbar-thin">
            {filteredBeaches.map((beach) => {
              const isSelected = selectedBeach.id === beach.id
              const isBookmarked = bookmarks.some(b => b.id === beach.name)
              
              return (
                <button
                  key={beach.id}
                  onClick={() => setSelectedBeach(beach)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-terracotta-500 shadow-md ring-1 ring-terracotta-500/20'
                      : 'bg-white/60 border-terracotta-100/30 hover:bg-white hover:border-terracotta-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-notte">{beach.name}</span>
                      {isBookmarked && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      )}
                    </div>
                    
                    <p className="text-[11px] text-mare-600/70 line-clamp-2">{beach.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[10px] text-mare-500 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
                        {beach.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        🚶 {beach.walkTime}
                      </span>
                      <span className="flex items-center gap-1">
                        🚗 {beach.driveTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between h-full gap-4 shrink-0">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                      beach.vibe === 'wild'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200/50'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                    }`}>
                      {beach.vibe === 'wild' ? 'Selvaggia' : 'Attiva'}
                    </span>
                  </div>
                </button>
              )
            })}

            {filteredBeaches.length === 0 && (
              <div className="text-center py-12 bg-white/40 border border-dashed border-terracotta-100/60 rounded-2xl text-mare-400">
                <Waves className="w-10 h-10 mx-auto mb-2 opacity-30 animate-pulse" />
                <p className="text-xs font-semibold">Nessuna spiaggia trovata con questi filtri</p>
              </div>
            )}
          </div>

          {/* Map display area & details panel (Takes 8 cols on desktop) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Real Google Maps iframe */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-3 border border-terracotta-100/40 card-shadow h-[400px] w-full relative overflow-hidden">
              <iframe
                title={`Mappa percorsi per ${selectedBeach.name}`}
                src={mapIframeUrl}
                className="w-full h-full border-0 rounded-2xl z-10"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Quick Detail and Local Tips panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBeach.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl p-5 border border-terracotta-100/40 card-shadow space-y-4"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="badge-pill bg-terracotta-50 text-terracotta-600 border-terracotta-100/30 text-[9px] uppercase tracking-wider mb-1">
                      {selectedBeach.atmosphere}
                    </span>
                    <h3 className="font-display text-xl font-bold text-notte">{selectedBeach.name}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(selectedBeach)}
                      className="p-2.5 bg-white border border-terracotta-100/30 hover:border-terracotta-300 rounded-xl hover:scale-105 hover:bg-terracotta-50/20 transition-all cursor-pointer shadow-sm text-mare-600 flex items-center gap-1.5 text-xs font-bold"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          bookmarks.some(b => b.id === selectedBeach.name) ? 'fill-red-500 text-red-500' : 'text-mare-400'
                        }`}
                      />
                      {bookmarks.some(b => b.id === selectedBeach.name) ? 'Nel Piano' : 'Salva nel Piano'}
                    </button>
                    
                    <a
                      href={selectedBeach.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white rounded-xl hover:scale-105 transition-all cursor-pointer shadow-sm text-xs font-bold flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ottieni Indicazioni ↗
                    </a>
                  </div>
                </div>

                {/* Routing Box with Interactive Mode Selection */}
                <div className="p-3.5 bg-gradient-to-br from-terracotta-50/25 to-crema/25 border border-terracotta-100/30 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-bold text-mare-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-terracotta-500" />
                      Seleziona il Percorso da Mostrare sulla Mappa:
                    </span>
                    <span className="text-[9px] text-terracotta-600 lowercase italic">
                      (clicca per cambiare rotta)
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {/* Distance (Non-clickable stat) */}
                    <div className="flex items-center gap-1.5 p-2 bg-white/70 border border-transparent rounded-xl">
                      <Map className="w-4 h-4 text-terracotta-600 shrink-0" />
                      <div>
                        <p className="text-[8px] text-mare-400 uppercase tracking-tight">Distanza</p>
                        <p className="font-bold text-notte text-[11px] whitespace-nowrap">{selectedBeach.distance}</p>
                      </div>
                    </div>

                    {/* Walking Mode Button */}
                    <button
                      onClick={() => setActiveMode('walk')}
                      className={`flex items-center gap-1.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        activeMode === 'walk'
                          ? 'bg-white border-terracotta-500 ring-2 ring-terracotta-500/20'
                          : 'bg-white/50 border-transparent hover:bg-white hover:border-terracotta-200'
                      }`}
                    >
                      <span className="text-[14px] shrink-0">🚶</span>
                      <div>
                        <p className="text-[8px] text-mare-400 uppercase tracking-tight font-body">A Piedi</p>
                        <p className="font-bold text-notte text-[11px] whitespace-nowrap">{selectedBeach.walkTime}</p>
                      </div>
                    </button>

                    {/* Driving Mode Button */}
                    <button
                      onClick={() => setActiveMode('drive')}
                      className={`flex items-center gap-1.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        activeMode === 'drive'
                          ? 'bg-white border-terracotta-500 ring-2 ring-terracotta-500/20'
                          : 'bg-white/50 border-transparent hover:bg-white hover:border-terracotta-200'
                      }`}
                    >
                      <span className="text-[14px] shrink-0">🚗</span>
                      <div>
                        <p className="text-[8px] text-mare-400 uppercase tracking-tight font-body">In Auto</p>
                        <p className="font-bold text-notte text-[11px] whitespace-nowrap">{selectedBeach.driveTime}</p>
                      </div>
                    </button>
                  </div>

                  <div className="bg-white/70 p-2.5 rounded-xl border border-terracotta-100/10">
                    <p className="text-[9px] font-bold text-terracotta-600 mb-1 flex items-center gap-1">
                      {activeMode === 'walk' ? (
                        <>🚶 Dettagli Percorso Pedonale (Attivo sulla Mappa)</>
                      ) : (
                        <>🚗 Dettagli Percorso in Auto (Attivo sulla Mappa)</>
                      )}
                    </p>
                    <p className="text-[11px] text-mare-700/80 leading-relaxed font-body">
                      {activeMode === 'walk' ? selectedBeach.accessDetails : `Percorso stradale in auto. ${selectedBeach.accessDetails}`}
                    </p>
                  </div>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-terracotta-100/30 text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-mare-400">Struttura & Sabbia:</span>
                    <span className="font-semibold text-notte">{selectedBeach.sand}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-mare-400">Chiringuitos / Ristoranti:</span>
                    <span className="font-semibold text-notte">{selectedBeach.chiringuitos ? 'Disponibili ✅' : 'Non presenti ❌'}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-mare-400">Momento Consigliato:</span>
                    <span className="font-semibold text-notte">{selectedBeach.bestTime}</span>
                  </div>
                </div>

                {/* Local Insider tip box */}
                {selectedBeach.localTip && (
                  <div className="p-3 bg-gradient-to-r from-oro/5 via-terracotta-50/10 to-transparent border-l-2 border-oro rounded-r-xl">
                    <p className="text-xs text-mare-750/90 leading-relaxed font-body">
                      <span className="font-bold text-oro">💡 Consiglio Locale: </span>
                      {selectedBeach.localTip}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  )
}
