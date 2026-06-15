import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col items-center justify-center p-4 text-center">
      <h2 className="font-headline-md text-headline-sm text-on-surface font-bold mb-4">404 - Pagina non trovata</h2>
      <p className="font-body-md text-body-md text-on-surface-variant mb-8">Oops! Sembra che tu ti sia perso tra le spiagge della Costa del Sol.</p>
      <Link href="/" className="px-6 py-3 bg-primary text-on-primary rounded-xl font-semibold shadow-md hover:bg-primary/90 transition-all">
        Torna alla Dashboard
      </Link>
    </div>
  )
}
