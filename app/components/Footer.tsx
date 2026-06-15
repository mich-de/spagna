export default function Footer() {
  return (
    <footer className="border-t border-outline-variant/30 bg-surface-container-lowest/40 py-8 px-4 sm:px-6">
      <div className="max-w-[1920px] mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-5 h-5 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
            <span className="text-on-primary text-[10px] font-bold">S</span>
          </div>
          <span className="font-headline-sm text-on-surface font-semibold">Sol & Local</span>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant/60">
          Costa del Sol · 19–25 Giugno 2026 · Generato da Tour Operator Premium
        </p>
        <p className="font-label-sm text-label-sm text-on-surface-variant/40 mt-1">
          Verifica sempre orari e prenotazioni prima della partenza
        </p>
      </div>
    </footer>
  )
}
