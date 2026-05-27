import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sabbia flex flex-col items-center justify-center p-4 text-center">
      <h2 className="font-display text-4xl font-bold text-notte mb-4">404 - Pagina non trovata</h2>
      <p className="text-mare-700 mb-8">Oops! Sembra che tu ti sia perso tra le spiagge della Costa del Sol.</p>
      <Link 
        href="/"
        className="px-6 py-3 bg-terracotta-500 text-white rounded-xl font-medium shadow-md hover:bg-terracotta-600 transition-all"
      >
        Torna alla Dashboard
      </Link>
    </div>
  )
}
