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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="noise-bg" suppressHydrationWarning>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function removeAttribute() {
                  document.querySelectorAll('[bis_skin_checked]').forEach(el => el.removeAttribute('bis_skin_checked'));
                }
                removeAttribute();
                try {
                  const observer = new MutationObserver(removeAttribute);
                  observer.observe(document.documentElement, { 
                    attributes: true, 
                    subtree: true, 
                    attributeFilter: ['bis_skin_checked'] 
                  });
                } catch (e) {}
              })();
            `
          }}
        />
      </body>
    </html>
  )
}
