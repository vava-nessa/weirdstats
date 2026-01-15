import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'WeirdStats - Statistiques Mondiales en Temps Réel',
  description:
    'Dashboard en temps réel des statistiques mondiales - naissances, décès, événements sociaux et plus encore',
  keywords: [
    'statistiques',
    'monde',
    'temps réel',
    'population',
    'données mondiales',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
