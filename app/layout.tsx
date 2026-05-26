import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sol & Local — Costa del Sol 2026',
  description: 'Dashboard di viaggio premium per la Costa del Sol. Itinerario 19-25 giugno 2026 con San Juan.',
  icons: [{ rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className="noise-bg" suppressHydrationWarning>{children}</body>
    </html>
  )
}
